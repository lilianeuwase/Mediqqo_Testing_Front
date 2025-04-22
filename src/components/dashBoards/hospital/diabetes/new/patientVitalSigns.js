import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  useColorModeValue,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { DiabPatientData } from "../../../../../DBConnection/DiabetesPatients";

function PatientVitalSigns({ isOpen, onClose }) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColor = useColorModeValue("navy.700", "white");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [temp, setTemp] = useState("");
  const [BP, setBP] = useState("");
  const [HR, setHR] = useState("");
  const [RR, setRR] = useState("");
  const [O2, setO2] = useState("");
  const [errors, setErrors] = useState({});

  // State for fetched patient data
  const patient = DiabPatientData();

  // Modal state for notifications
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Load API host state
  const [apiHost, setApiHost] = useState("");

  // Load the host URL from a text file (placed in your public folder as apiHost.txt)
  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  const validateVitals = () => {
    let newErrors = {};

    // Height validations: must be a number with up to 2 decimals and between 54 and 280 (units: centimeters)
    if (!height) newErrors.height = "Height is required";
    else if (!/^\d+(\.\d{1,2})?$/.test(height))
      newErrors.height = "Height must be a valid number with up to 2 decimal places";
    else if (parseFloat(height) < 54 || parseFloat(height) > 280)
      newErrors.height = "Height must be between 54 and 280 cm";

    // Weight validations: must be a number with up to 2 decimals, greater than 0 and at most 3 digits
    if (!weight) newErrors.weight = "Weight is required";
    else if (!/^\d+(\.\d{1,2})?$/.test(weight))
      newErrors.weight = "Weight must be a valid number with up to 2 decimal places";
    else if (parseFloat(weight) <= 0)
      newErrors.weight = "Weight must be greater than 0";
    else if (parseFloat(weight) > 999)
      newErrors.weight = "Weight can only be 3 digits";

    // Temperature validation
    if (!temp) newErrors.temp = "Temperature is required";
    else if (isNaN(temp) || temp < 35 || temp > 42)
      newErrors.temp = "Temperature must be between 35.0°C and 42.0°C";
    else if (!/^\d+(\.\d{1})?$/.test(temp))
      newErrors.temp = "Temperature must have at most one decimal place";

    // Blood Pressure validation (format: systolic/diastolic)
    if (!BP) newErrors.BP = "Blood Pressure is required";
    else if (!/^\d{2,3}\/\d{2,3}$/.test(BP))
      newErrors.BP = "Enter BP in format Systolic/Diastolic (e.g., 120/80)";
    else {
      const [systolic, diastolic] = BP.split("/").map(Number);
      if (systolic < 90 || systolic > 180)
        newErrors.BP = "Systolic BP must be between 90 and 180 mmHg";
      if (diastolic < 60 || diastolic > 120)
        newErrors.BP = "Diastolic BP must be between 60 and 120 mmHg";
    }

    // Heart Rate validation
    if (!HR) newErrors.HR = "Heart Rate is required";
    else if (isNaN(HR) || HR < 40 || HR > 200)
      newErrors.HR = "Heart Rate must be between 40 and 200 bpm";

    // Respiratory Rate validation
    if (!RR) newErrors.RR = "Respiratory Rate is required";
    else if (isNaN(RR) || RR < 10 || RR > 40)
      newErrors.RR = "Respiratory Rate must be between 10 and 40 breaths/min";

    // Oxygen Saturation validation
    if (!O2) newErrors.O2 = "Oxygen Saturation is required";
    else if (isNaN(O2) || O2 < 70 || O2 > 100)
      newErrors.O2 = "Oxygen Saturation must be between 70% and 100%";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveVitals = () => {
    if (!validateVitals()) return;

    // Get the phone number from the fetched patient data
    const patientPhone = patient?.phone_number;
    if (!patientPhone) {
      setIsSuccess(false);
      setModalTitle("Error");
      setModalMessage("Patient profile not found. Please register profile first.");
      setModalOpen(true);
      return;
    }

    // Get today's date in "DD/MM/YYYY HH:MM" 24-hour format
    const formatDate = (date) => {
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    };
    const todayDate = formatDate(new Date());

    // Compute BMI (Weight in kg, Height in cm, allowing decimals)
    const bmiCalculated =
      weight &&
      height &&
      !isNaN(weight) &&
      !isNaN(height) &&
      weight > 0 &&
      height > 0
        ? (Number(weight) / Math.pow(Number(height) / 100, 2)).toFixed(2)
        : null;

    fetch(
      `${apiHost}/registerDiabPatientVitalSigns`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: patientPhone,
          vitalsDates: todayDate,
          height,
          weight,
          bmi: bmiCalculated,
          temp,
          BP,
          HR,
          RR,
          O2,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setIsSuccess(true);
          setModalTitle("Success");
          setModalMessage("Vital Signs Saved Successfully");
          setModalOpen(true);
        } else {
          setIsSuccess(false);
          setModalTitle("Error");
          setModalMessage("Error saving vital signs");
          setModalOpen(true);
        }
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Patient Vital Signs</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Changed SimpleGrid to 2 columns to avoid a long pop-up */}
            <SimpleGrid columns="2" gap="15px">
              {[
                {
                  label: "Height (Cm)",
                  value: height,
                  setValue: setHeight,
                  error: errors.height,
                },
                {
                  label: "Weight (Kg)",
                  value: weight,
                  setValue: setWeight,
                  error: errors.weight,
                },
                {
                  label: "Temperature (°C)",
                  value: temp,
                  setValue: setTemp,
                  error: errors.temp,
                },
                {
                  label: "Blood Pressure (BP) (mmHg)",
                  value: BP,
                  setValue: setBP,
                  error: errors.BP,
                },
                {
                  label: "Heart Rate (HR) (bpm)",
                  value: HR,
                  setValue: setHR,
                  error: errors.HR,
                },
                {
                  label: "Respiratory Rate (RR) (breaths per minute)",
                  value: RR,
                  setValue: setRR,
                  error: errors.RR,
                },
                {
                  label: "Oxygen Saturation (SaO₂) (%)",
                  value: O2,
                  setValue: setO2,
                  error: errors.O2,
                },
              ].map(({ label, value, setValue, error }) => (
                <FormControl isInvalid={error} key={label}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor} mb="0px">
                    {label}
                    <Text as="span" color="red">*</Text>
                  </FormLabel>
                  <Input
                    value={value}
                    isRequired
                    fontSize="sm"
                    type="text"
                    size="lg"
                    variant="flushed"
                    onChange={(e) => setValue(e.target.value)}
                  />
                  {error && <FormErrorMessage>{error}</FormErrorMessage>}
                </FormControl>
              ))}
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="orange" onClick={handleSaveVitals}>
              Save Vital Signs
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{modalMessage}</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                setModalOpen(false);
                if (isSuccess) {
                  onClose();
                  window.location.href = "/admin/diabetes/diabprofilecard";
                }
              }}
            >
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PatientVitalSigns;
