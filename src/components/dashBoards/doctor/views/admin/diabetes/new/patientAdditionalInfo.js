import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  useColorModeValue,
  Button,
  Flex,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import Card from "../../../../components/card/Card";
import { HSeparator } from "../../../../components/separator/Separator";
import { DiabPatientData } from "../../../../../../../DBConnection/DiabetesPatients";

function PatientAdditionalInfo({ isOpen, onClose }) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColor = useColorModeValue("navy.700", "white");

  // State for doctor's comment and checkbox groups
  const [doctor_comment, setDoctorComment] = useState("");
  const [state, setState] = useState({
    // Clinical Symptoms
    polyuria: false,
    polydipsia: false,
    polyphagia: false,
    // Danger Signs
    hydra: false,
    abspain: false,
    hypo: false,
    sighing: false,
    confusion: false,
    // Complications
    retino: false,
    nephro: false,
    neuro: false,
    footulcer: false,
    // Co-morbidity
    hiv: false,
    htn: false,
    liver: false,
    prego: false,
  });
  
  // Additional inputs for each category (comma separated)
  const [additionalClinicalSymp, setAdditionalClinicalSymp] = useState("");
  const [additionalDangerSigns, setAdditionalDangerSigns] = useState("");
  const [additionalComplications, setAdditionalComplications] = useState("");
  const [additionalComorbidities, setAdditionalComorbidities] = useState("");

  const [errors, setErrors] = useState({});
  // State for fetched patient data
  const patient = DiabPatientData();

  // Notification modal state (pop-up message)
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
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

  const handleCheckboxChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  // Format the current date as "DD/MM/YYYY HH:MM"
  const formatDate = (date) => {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // Generate today's date for doctorDates.
  const todayDate = formatDate(new Date());

  const handleSaveAdditionalInfo = () => {
    const patientPhone = patient?.phone_number;
    if (!patientPhone) {
      setIsSuccess(false);
      setNotificationTitle("Error");
      setNotificationMessage(
        "Patient profile not found. Please register profile first."
      );
      setNotificationOpen(true);
      return;
    }

    // Build arrays from checkbox selections with professional wording.
    const clinicalSympArr = [];
    if (state.polyuria) clinicalSympArr.push("Polyuria");
    if (state.polydipsia) clinicalSympArr.push("Polydipsia");
    if (state.polyphagia) clinicalSympArr.push("Polyphagia");

    const dangerSignsArr = [];
    if (state.hydra) dangerSignsArr.push("Dehydration");
    if (state.abspain) dangerSignsArr.push("Abdominal Pain");
    if (state.hypo) dangerSignsArr.push("Hypoglycemia");
    if (state.sighing) dangerSignsArr.push("Shortness of Breath");
    if (state.confusion) dangerSignsArr.push("Confusion");

    const complicationsArr = [];
    if (state.retino) complicationsArr.push("Retinopathy");
    if (state.nephro) complicationsArr.push("Nephropathy");
    if (state.neuro) complicationsArr.push("Neuropathy");
    if (state.footulcer) complicationsArr.push("Foot Ulcer");

    const comorbiditiesArr = [];
    if (state.hiv) comorbiditiesArr.push("HIV");
    if (state.htn) comorbiditiesArr.push("Hypertension");
    if (state.liver) comorbiditiesArr.push("Liver Disease");
    if (state.prego) comorbiditiesArr.push("Pregnant");

    // Add any additional comma-separated values.
    if (additionalClinicalSymp.trim() !== "") {
      additionalClinicalSymp.split(",").forEach((item) => {
        const trimmed = item.trim();
        if (trimmed) clinicalSympArr.push(trimmed);
      });
    }
    if (additionalDangerSigns.trim() !== "") {
      additionalDangerSigns.split(",").forEach((item) => {
        const trimmed = item.trim();
        if (trimmed) dangerSignsArr.push(trimmed);
      });
    }
    if (additionalComplications.trim() !== "") {
      additionalComplications.split(",").forEach((item) => {
        const trimmed = item.trim();
        if (trimmed) complicationsArr.push(trimmed);
      });
    }
    if (additionalComorbidities.trim() !== "") {
      additionalComorbidities.split(",").forEach((item) => {
        const trimmed = item.trim();
        if (trimmed) comorbiditiesArr.push(trimmed);
      });
    }

    // Send the POST request with the updated fields.
    fetch(
      `${apiHost}/registerDiabPatientAdditionalInfo`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: patientPhone,
          doctorDates: todayDate,
          clinicalSymp: clinicalSympArr,
          dangerSigns: dangerSignsArr,
          complications: complicationsArr,
          comorbidities: comorbiditiesArr,
          doctor_comment: doctor_comment,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setIsSuccess(true);
          setNotificationTitle("Success");
          setNotificationMessage("Additional Information Saved Successfully");
          setNotificationOpen(true);
        } else {
          setIsSuccess(false);
          setNotificationTitle("Error");
          setNotificationMessage("Error saving additional information");
          setNotificationOpen(true);
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setNotificationTitle("Error");
        setNotificationMessage("Error saving additional information");
        setNotificationOpen(true);
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Patient Consultation by NCD Physician</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Card p="20px">
              <Text
                color={textColorPrimary}
                fontWeight="bold"
                fontSize="2xl"
                mt="10px"
                mb="4px"
              >
                Patient Additional Information
              </Text>
              <Flex align="center" mb="10px" mt="10px">
                <HSeparator />
              </Flex>
              <SimpleGrid columns="1" gap="20px">
                {/* Clinical Symptoms Section */}
                <Box>
                  <Text fontWeight="bold" mb="8px" color={textColor}>
                    Clinical Symptoms
                  </Text>
                  <Flex gap="10px" wrap="wrap">
                    <Checkbox
                      name="polyuria"
                      colorScheme="purple"
                      isChecked={state.polyuria}
                      onChange={handleCheckboxChange}
                    >
                      Polyuria
                    </Checkbox>
                    <Checkbox
                      name="polydipsia"
                      colorScheme="purple"
                      isChecked={state.polydipsia}
                      onChange={handleCheckboxChange}
                    >
                      Polydipsia
                    </Checkbox>
                    <Checkbox
                      name="polyphagia"
                      colorScheme="purple"
                      isChecked={state.polyphagia}
                      onChange={handleCheckboxChange}
                    >
                      Polyphagia
                    </Checkbox>
                  </Flex>
                  <FormControl mt="8px">
                    <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                      Additional Clinical Symptoms (comma separated)
                    </FormLabel>
                    <Input
                      value={additionalClinicalSymp}
                      onChange={(e) =>
                        setAdditionalClinicalSymp(e.target.value)
                      }
                      variant="flushed"
                    />
                  </FormControl>
                </Box>
                {/* Danger Signs Section */}
                <Box>
                  <Text fontWeight="bold" mb="8px" color={textColor}>
                    Danger Signs
                  </Text>
                  <Flex gap="10px" wrap="wrap">
                    <Checkbox
                      name="hydra"
                      colorScheme="purple"
                      isChecked={state.hydra}
                      onChange={handleCheckboxChange}
                    >
                      Dehydration
                    </Checkbox>
                    <Checkbox
                      name="abspain"
                      colorScheme="purple"
                      isChecked={state.abspain}
                      onChange={handleCheckboxChange}
                    >
                      Abdominal Pain
                    </Checkbox>
                    <Checkbox
                      name="hypo"
                      colorScheme="purple"
                      isChecked={state.hypo}
                      onChange={handleCheckboxChange}
                    >
                      Hypoglycemia
                    </Checkbox>
                    <Checkbox
                      name="sighing"
                      colorScheme="purple"
                      isChecked={state.sighing}
                      onChange={handleCheckboxChange}
                    >
                      Shortness of Breath
                    </Checkbox>
                    <Checkbox
                      name="confusion"
                      colorScheme="purple"
                      isChecked={state.confusion}
                      onChange={handleCheckboxChange}
                    >
                      Confusion
                    </Checkbox>
                  </Flex>
                  <FormControl mt="8px">
                    <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                      Additional Danger Signs (comma separated)
                    </FormLabel>
                    <Input
                      value={additionalDangerSigns}
                      onChange={(e) =>
                        setAdditionalDangerSigns(e.target.value)
                      }
                      variant="flushed"
                    />
                  </FormControl>
                </Box>
                {/* Complications Section */}
                <Box>
                  <Text fontWeight="bold" mb="8px" color={textColor}>
                    Complications
                  </Text>
                  <Flex gap="10px" wrap="wrap">
                    <Checkbox
                      name="retino"
                      colorScheme="purple"
                      isChecked={state.retino}
                      onChange={handleCheckboxChange}
                    >
                      Retinopathy
                    </Checkbox>
                    <Checkbox
                      name="nephro"
                      colorScheme="purple"
                      isChecked={state.nephro}
                      onChange={handleCheckboxChange}
                    >
                      Nephropathy
                    </Checkbox>
                    <Checkbox
                      name="neuro"
                      colorScheme="purple"
                      isChecked={state.neuro}
                      onChange={handleCheckboxChange}
                    >
                      Neuropathy
                    </Checkbox>
                    <Checkbox
                      name="footulcer"
                      colorScheme="purple"
                      isChecked={state.footulcer}
                      onChange={handleCheckboxChange}
                    >
                      Foot Ulcer
                    </Checkbox>
                  </Flex>
                  <FormControl mt="8px">
                    <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                      Additional Complications (comma separated)
                    </FormLabel>
                    <Input
                      value={additionalComplications}
                      onChange={(e) =>
                        setAdditionalComplications(e.target.value)
                      }
                      variant="flushed"
                    />
                  </FormControl>
                </Box>
                {/* Co-morbidity Section */}
                <Box>
                  <Text fontWeight="bold" mb="8px" color={textColor}>
                    Co-morbidity
                  </Text>
                  <Flex gap="10px" wrap="wrap">
                    <Checkbox
                      name="hiv"
                      colorScheme="purple"
                      isChecked={state.hiv}
                      onChange={handleCheckboxChange}
                    >
                      HIV
                    </Checkbox>
                    <Checkbox
                      name="htn"
                      colorScheme="purple"
                      isChecked={state.htn}
                      onChange={handleCheckboxChange}
                    >
                      Hypertension
                    </Checkbox>
                    <Checkbox
                      name="liver"
                      colorScheme="purple"
                      isChecked={state.liver}
                      onChange={handleCheckboxChange}
                    >
                      Liver Disease
                    </Checkbox>
                    <Checkbox
                      name="prego"
                      colorScheme="purple"
                      isChecked={state.prego}
                      onChange={handleCheckboxChange}
                    >
                      Pregnant
                    </Checkbox>
                  </Flex>
                  <FormControl mt="8px">
                    <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                      Additional Co-morbidities (comma separated)
                    </FormLabel>
                    <Input
                      value={additionalComorbidities}
                      onChange={(e) =>
                        setAdditionalComorbidities(e.target.value)
                      }
                      variant="flushed"
                    />
                  </FormControl>
                </Box>
                <FormControl mt="24px">
                  <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                    Doctor's Comment
                  </FormLabel>
                  <Input
                    value={doctor_comment}
                    fontSize="sm"
                    type="text"
                    variant="flushed"
                    onChange={(e) => setDoctorComment(e.target.value)}
                  />
                </FormControl>
              </SimpleGrid>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="purple"
              _hover={{ bg: "purple.900" }}
              fontWeight="500"
              fontSize="16px"
              py="20px"
              px="27"
              onClick={handleSaveAdditionalInfo}
            >
              Save Additional Info
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Notification Modal */}
      <Modal
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{notificationTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{notificationMessage}</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                setNotificationOpen(false);
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

export default PatientAdditionalInfo;
