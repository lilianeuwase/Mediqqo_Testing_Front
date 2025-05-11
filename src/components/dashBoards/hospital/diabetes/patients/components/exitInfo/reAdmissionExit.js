import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import { DiabPatientData } from "../../../../../../../DBConnection/DiabetesPatients";

function ReAdmissionExit({
  isOpen,
  onClose,
  initialData,
  recordIndex,
  onSaved,
}) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColor = useColorModeValue("navy.700", "white");

  const [reAdmissionDate, setReAdmissionDate] = useState("");
  const [reAdmissionReason, setReAdmissionReason] = useState("");

  const [errors, setErrors] = useState({});
  const [apiHost, setApiHost] = useState("");

  const patient = DiabPatientData();

  //Date
  const formatDateForDB = (dateString) => {
    if (!dateString) return "";
    const parts = dateString.split("-");
    if (parts.length !== 3) return dateString;
    return `${parts[2]}-${parts[1]}-${parts[0]}`; // DD-MM-YYYY
  };

  // Load API Host
  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  const validateReAdmission = () => {
    let errors = {};

    if (!reAdmissionDate) {
      errors.reAdmissionDate = "Re-Admission Date is required";
    }
    if (!reAdmissionReason.trim()) {
      errors.reAdmissionReason = "Re-Admission Reason is required";
    }

    // Validate date after exit date
    if (reAdmissionDate && initialData?.exitDate) {
      const exitParts = initialData.exitDate.split("-");
      const reAdmitParts = reAdmissionDate.split("-");

      const exitNumeric = exitParts[2] + exitParts[1] + exitParts[0];
      const reAdmitNumeric =
        reAdmitParts[2] + reAdmitParts[1] + reAdmitParts[0];

      if (parseInt(reAdmitNumeric) < parseInt(exitNumeric)) {
        errors.reAdmissionDate = "Re-Admission Date cannot be before Exit Date";
      }
    }

    return errors;
  };
  const handleSaveReAdmission = async () => {
    const errors = validateReAdmission();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    const patientPhone = patient?.phone_number;
    if (!patientPhone) {
      alert("Patient profile not found!");
      return;
    }

    try {
      const response = await fetch(`${apiHost}/saveReAdmissionExit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: patientPhone,
          recordIndex,
          reAdmissionDate: formatDateForDB(reAdmissionDate),
          reAdmissionReason,
        }),
      });

      const result = await response.json();
      if (result.status === "ok") {
        if (onSaved) onSaved();
        onClose();
      } else {
        alert("Error saving re-admission: " + result.error);
      }
    } catch (error) {
      console.error("Error saving re-admission:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Patient Re-Admission</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns="1" gap="20px">
            <FormControl isInvalid={errors.reAdmissionDate}>
              <FormLabel
                fontSize="sm"
                fontWeight="500"
                color={textColorPrimary}
              >
                Re-Admission Date{" "}
                <Text as="span" color="red">
                  *
                </Text>
              </FormLabel>
              <Input
                value={reAdmissionDate}
                type="date"
                fontSize="sm"
                size="lg"
                variant="flushed"
                onChange={(e) => setReAdmissionDate(e.target.value)}
              />
              {errors.reAdmissionDate && (
                <FormErrorMessage>{errors.reAdmissionDate}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={errors.reAdmissionReason}>
              <FormLabel
                fontSize="sm"
                fontWeight="500"
                color={textColorPrimary}
              >
                Re-Admission Reason{" "}
                <Text as="span" color="red">
                  *
                </Text>
              </FormLabel>
              <Input
                value={reAdmissionReason}
                fontSize="sm"
                type="text"
                size="lg"
                variant="flushed"
                placeholder="Enter reason for re-admission"
                onChange={(e) => setReAdmissionReason(e.target.value)}
              />
              {errors.reAdmissionReason && (
                <FormErrorMessage>{errors.reAdmissionReason}</FormErrorMessage>
              )}
            </FormControl>
          </SimpleGrid>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="purple" onClick={handleSaveReAdmission}>
            Save Re-Admission
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ReAdmissionExit;
