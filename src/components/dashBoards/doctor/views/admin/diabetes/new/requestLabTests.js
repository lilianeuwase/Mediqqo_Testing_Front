import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Button,
  Checkbox,
  CheckboxGroup,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
// Import patient data (same as in PatientAdditionalInfo)
import { DiabPatientData } from "../../../../../../../DBConnection/DiabetesPatients";

export function LabExamModal({
  isOpen,
  onClose,
  selectedExams,
  setSelectedExams,
  labExamOptions,
}) {
  const modalTextColor = useColorModeValue("secondaryGray.900", "white");
  const [searchTerm, setSearchTerm] = useState("");
  const [customLabs, setCustomLabs] = useState("");

  // Notification states (error/success)
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Retrieve patient data and phone number.
  const patient = DiabPatientData();

  // Load API host state
  const [apiHost, setApiHost] = useState("");

  // Load the host URL from a text file (placed in your public folder as apiHost.txt)
  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  // Helper function to format the current date as "DD/MM/YYYY HH:MM".
  const formatDate = (date) => {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // Default lab exam options grouped by category.
  const defaultLabExamOptions = [
    // Diabetes tests
    "Fasting Plasma Glucose (FPG) Test",
    "Oral Glucose Tolerance Test (OGTT)",
    "Hemoglobin A1c (HbA1c) Test",
    "Random Blood Glucose Test",
    "C-Peptide Test",
    "Autoantibody Tests (e.g., GAD, insulin autoantibodies)",
    // Hypertension tests
    "Basic/Comprehensive Metabolic Panel (BMP/CMP)",
    "Lipid Profile",
    "Urinalysis",
    "Thyroid Function Tests (TSH, free T4)",
    "Aldosterone and Renin Levels",
    // Asthma tests
    "Complete Blood Count (CBC) with Differential",
    "Serum Immunoglobulin E (IgE) Level",
    "Allergen-Specific IgE Tests (RAST)",
    "Fractional Exhaled Nitric Oxide (FeNO) Test",
    "Sputum Eosinophil Count",
  ];

  // Use passed labExamOptions if available; otherwise, fallback to the default list.
  const options =
    labExamOptions && labExamOptions.length > 0
      ? labExamOptions
      : defaultLabExamOptions;

  // Filter options based on the search term.
  const filteredLabOptions = options.filter((exam) =>
    exam.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // When saving, combine selected exams with any custom labs (comma separated).
  const handleSave = async () => {
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
    const customLabsArray = customLabs
      .split(",")
      .map((lab) => lab.trim())
      .filter((lab) => lab !== "");
    // Combine and remove duplicates.
    const combinedExams = Array.from(new Set([...selectedExams, ...customLabsArray]));

    const todayDate = formatDate(new Date());

    try {
      const response = await fetch(
        `${apiHost}/registerDiabRequestedLab`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone_number: patientPhone,
            requestLabsDates: todayDate,
            requestLab: combinedExams,
          }),
        }
      );
      const result = await response.json();
      if (result.status === "ok") {
        setIsSuccess(true);
        setNotificationTitle("Success");
        setNotificationMessage("Lab request registered successfully.");
        setNotificationOpen(true);
      } else {
        setIsSuccess(false);
        setNotificationTitle("Error");
        setNotificationMessage("Error registering requested labs: " + result.error);
        setNotificationOpen(true);
      }
    } catch (error) {
      setIsSuccess(false);
      setNotificationTitle("Error");
      setNotificationMessage("Error registering requested labs: " + error.message);
      setNotificationOpen(true);
    }
  };

  // When cancel is clicked, clear all selections and inputs.
  const handleCancel = () => {
    setSelectedExams([]);
    setCustomLabs("");
    setSearchTerm("");
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={modalTextColor}>Lab Exams Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Search input for lab exam options */}
            <Input
              placeholder="Search lab exam..."
              mb="4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CheckboxGroup
              colorScheme="purple"
              value={selectedExams}
              onChange={setSelectedExams}
            >
              <Flex direction="column" gap="8px" maxH="200px" overflowY="auto">
                {filteredLabOptions.map((exam, index) => (
                  <Checkbox key={index} value={exam}>
                    {exam}
                  </Checkbox>
                ))}
              </Flex>
            </CheckboxGroup>
            {/* Input for custom lab tests (comma separated) */}
            <Input
              mt="4"
              placeholder="Other Lab Tests (comma separated)"
              value={customLabs}
              onChange={(e) => setCustomLabs(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button variant="outline" colorScheme="red" onClick={handleCancel}>
              Cancel
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
                  // Clear selections and close LabExamModal on success.
                  setSelectedExams([]);
                  setCustomLabs("");
                  setSearchTerm("");
                  onClose();
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

export function RequestLabTests({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Action Required</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            A corresponding vitals session is required before requesting lab tests.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="purple" onClick={onClose}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
