import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  SimpleGrid,
  useColorModeValue,
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
import { DiabPatientData } from "../../../../../../../DBConnection/DiabetesPatients";
import SaveButton from "../../../../../../common/buttons/saveButton"; // 👈 Use SaveButton now

function AddVitals({ isOpen, onClose }) {
  const textColor = useColorModeValue("navy.700", "white");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [temp, setTemp] = useState("");
  const [BP, setBP] = useState("");
  const [HR, setHR] = useState("");
  const [RR, setRR] = useState("");
  const [O2, setO2] = useState("");
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false); // 👈 spinner

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const patient = DiabPatientData();
  const [apiHost, setApiHost] = useState("");

  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  const validateVitals = () => {
    const newErrors = {};

    if (!height) newErrors.height = "Height is required";
    else if (!/^\d+(\.\d{1,2})?$/.test(height))
      newErrors.height = "Height must be a number with up to 2 decimals";
    else if (parseFloat(height) < 54 || parseFloat(height) > 280)
      newErrors.height = "Height must be between 54 and 280 cm";

    if (!weight) newErrors.weight = "Weight is required";
    else if (!/^\d+(\.\d{1,2})?$/.test(weight))
      newErrors.weight = "Weight must be a number with up to 2 decimals";
    else if (parseFloat(weight) <= 0)
      newErrors.weight = "Weight must be greater than 0";
    else if (parseFloat(weight) > 999)
      newErrors.weight = "Weight can only be 3 digits";

    if (!temp) newErrors.temp = "Temperature is required";
    else if (isNaN(temp) || temp < 35 || temp > 42)
      newErrors.temp = "Temperature must be between 35.0°C and 42.0°C";
    else if (!/^\d+(\.\d{1})?$/.test(temp))
      newErrors.temp = "Temperature must have at most one decimal place";

    if (!BP) newErrors.BP = "Blood Pressure is required";
    else if (!/^\d{2,3}\/\d{2,3}$/.test(BP))
      newErrors.BP = "Enter BP as Systolic/Diastolic (e.g., 120/80)";
    else {
      const [systolic, diastolic] = BP.split("/").map(Number);
      if (systolic < 90 || systolic > 180)
        newErrors.BP = "Systolic BP must be between 90 and 180 mmHg";
      if (diastolic < 60 || diastolic > 120)
        newErrors.BP = "Diastolic BP must be between 60 and 120 mmHg";
    }

    if (!HR) newErrors.HR = "Heart Rate is required";
    else if (isNaN(HR) || HR < 40 || HR > 200)
      newErrors.HR = "Heart Rate must be between 40 and 200 bpm";

    if (!RR) newErrors.RR = "Respiratory Rate is required";
    else if (isNaN(RR) || RR < 10 || RR > 40)
      newErrors.RR = "Respiratory Rate must be between 10 and 40 breaths/min";

    if (!O2) newErrors.O2 = "Oxygen Saturation is required";
    else if (isNaN(O2) || O2 < 70 || O2 > 100)
      newErrors.O2 = "Oxygen Saturation must be between 70% and 100%";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveVitals = async () => {
    if (!validateVitals()) return;

    const patientPhone = patient?.phone_number;
    if (!patientPhone) {
      setIsSuccess(false);
      setModalTitle("Error");
      setModalMessage("Patient profile not found. Please register profile first.");
      setModalOpen(true);
      return;
    }

    setIsSaving(true);

    try {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
      const randomUUID = Math.random().toString(36).substring(2, 10).toUpperCase();
      const consultationID = `CONS-${formattedDate}-${randomUUID}`;

      const bmiCalculated =
        weight && height
          ? (Number(weight) / Math.pow(Number(height) / 100, 2)).toFixed(2)
          : null;

      const newVitals = {
        consultationID,
        date: formattedDate,
        height,
        weight,
        bmi: bmiCalculated,
        temp,
        BP,
        HR,
        RR,
        O2,
        moreVitals: [],
      };

      const response = await fetch(`${apiHost}/registerDiabVitals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: patientPhone, newVitals }),
      });

      const data = await response.json();

      if (data.status === "ok") {
        setIsSuccess(true);
        setModalTitle("Success");
        setModalMessage("Vital Signs Saved Successfully");
      } else {
        setIsSuccess(false);
        setModalTitle("Error");
        setModalMessage("Error saving vital signs");
      }
      setModalOpen(true);
    } catch (error) {
      console.error("Error saving vitals:", error);
      setIsSuccess(false);
      setModalTitle("Error");
      setModalMessage("An unexpected error occurred");
      setModalOpen(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Patient Vital Signs</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns="2" gap="15px">
              {[
                { label: "Height (Cm)", value: height, setValue: setHeight, error: errors.height },
                { label: "Weight (Kg)", value: weight, setValue: setWeight, error: errors.weight },
                { label: "Temperature (°C)", value: temp, setValue: setTemp, error: errors.temp },
                { label: "Blood Pressure (mmHg)", value: BP, setValue: setBP, error: errors.BP },
                { label: "Heart Rate (bpm)", value: HR, setValue: setHR, error: errors.HR },
                { label: "Respiratory Rate (breaths/min)", value: RR, setValue: setRR, error: errors.RR },
                { label: "Oxygen Saturation (%)", value: O2, setValue: setO2, error: errors.O2 },
              ].map(({ label, value, setValue, error }) => (
                <FormControl isInvalid={error} key={label}>
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    {label} <Text as="span" color="red">*</Text>
                  </FormLabel>
                  <Input
                    value={value}
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
            <Button variant="outline" colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <SaveButton
              onClick={handleSaveVitals}
              isSaving={isSaving}
              text="Save Vital Signs"
              colorScheme="orange"
            />
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Result Modal */}
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

export default AddVitals;