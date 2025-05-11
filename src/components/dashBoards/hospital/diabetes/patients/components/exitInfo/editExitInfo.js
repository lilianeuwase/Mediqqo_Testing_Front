// EditExitInfo.js
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
  Box,
  SimpleGrid,
  Input,
  Select,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useColorModeValue,
} from "@chakra-ui/react";
import { DiabPatientData } from "../../../../../../../DBConnection/DiabetesPatients";

function EditExitInfo({ isOpen, onClose, initialData, recordIndex, onSaved }) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColor = useColorModeValue("navy.700", "white");

  const [exitDate, setExitDate] = useState("");
  const [exitReason, setExitReason] = useState("");
  const [exitTransfer, setExitTransfer] = useState("");
  const [reAdmissionDate, setReAdmissionDate] = useState("");
  const [reAdmissionReason, setReAdmissionReason] = useState("");

  const [errors, setErrors] = useState({});

  const patient = DiabPatientData();

  const [apiHost, setApiHost] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  //Date
  const formatDateForDB = (dateString) => {
    if (!dateString) return "";
    const parts = dateString.split("-");
    if (parts.length !== 3) return dateString;
    return `${parts[2]}-${parts[1]}-${parts[0]}`; // DD-MM-YYYY
  };

  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  useEffect(() => {
    if (initialData) {
      setExitDate(initialData.exitDate || "");
      setExitReason(initialData.exitReason || "");
      setExitTransfer(initialData.exitTransfer || "");
      setReAdmissionDate(initialData.reAdmissionDate || "");
      setReAdmissionReason(initialData.reAdmissionReason || "");
    }
  }, [initialData]);

  const validateExit = () => {
    let newErrors = {};

    if (!exitDate) newErrors.exitDate = "Exit Date is required";
    if (!exitReason) newErrors.exitReason = "Exit Reason is required";

    if (exitReason === "Transfer" && !exitTransfer.trim()) {
      newErrors.exitTransfer = "Transfer Destination is required";
    }

    // ✅ Add Re-Admission Validation
    if (reAdmissionDate && !reAdmissionReason.trim()) {
      newErrors.reAdmissionReason =
        "Re-Admission Reason is required if Re-Admission Date is provided";
    }
    if (reAdmissionReason && !reAdmissionDate.trim()) {
      newErrors.reAdmissionDate =
        "Re-Admission Date is required if Re-Admission Reason is provided";
    }
    // ✅ Validate Re-Admission Date is not earlier than Exit Date
    if (reAdmissionDate && exitDate) {
      const exitParts = exitDate.split("-");
      const reAdmitParts = reAdmissionDate.split("-");

      // Convert to YYYYMMDD for easy comparison
      const exitNumeric = exitParts[2] + exitParts[1] + exitParts[0];
      const reAdmitNumeric =
        reAdmitParts[2] + reAdmitParts[1] + reAdmitParts[0];

      if (parseInt(reAdmitNumeric) < parseInt(exitNumeric)) {
        newErrors.reAdmissionDate =
          "Re-Admission Date cannot be before Exit Date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateExit = () => {
    if (!validateExit()) return;

    const patientPhone = patient?.phone_number;
    if (!patientPhone) {
      setIsSuccess(false);
      setModalTitle("Error");
      setModalMessage(
        "Patient profile not found. Please register profile first."
      );
      setModalOpen(true);
      return;
    }

    fetch(`${apiHost}/editExitInfo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone_number: patientPhone,
        recordIndex,
        exitDate: formatDateForDB(exitDate), // ✅ already formatted DD-MM-YYYY
        exitReason,
        exitTransfer,
        reAdmissionDate: reAdmissionDate
          ? formatDateForDB(reAdmissionDate)
          : "",
        reAdmissionReason,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setIsSuccess(true);
          setModalTitle("Success");
          setModalMessage("Exit Information Updated Successfully");
          setModalOpen(true);
        } else {
          setIsSuccess(false);
          setModalTitle("Error");
          setModalMessage("Error updating exit information");
          setModalOpen(true);
        }
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Exit Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns="1" gap="20px">
              <FormControl isInvalid={errors.exitDate}>
                <FormLabel
                  fontSize="sm"
                  fontWeight="500"
                  color={textColorPrimary}
                >
                  Exit Date{" "}
                  <Text as="span" color="red">
                    *
                  </Text>
                </FormLabel>
                <Input
                  value={exitDate}
                  type="date"
                  fontSize="sm"
                  size="lg"
                  variant="flushed"
                  onChange={(e) => setExitDate(e.target.value)}
                />
                {errors.exitDate && (
                  <FormErrorMessage>{errors.exitDate}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={errors.exitReason}>
                <FormLabel
                  fontSize="sm"
                  fontWeight="500"
                  color={textColorPrimary}
                >
                  Exit Reason{" "}
                  <Text as="span" color="red">
                    *
                  </Text>
                </FormLabel>
                <Select
                  value={exitReason}
                  placeholder="Select Reason"
                  fontSize="sm"
                  size="lg"
                  variant="flushed"
                  onChange={(e) => setExitReason(e.target.value)}
                >
                  <option value="Death">Death</option>
                  <option value="Failed To Follow Up">
                    Failed To Follow Up
                  </option>
                  <option value="Transfer">Transfer</option>
                  <option value="Declined">Declined</option>
                </Select>
                {errors.exitReason && (
                  <FormErrorMessage>{errors.exitReason}</FormErrorMessage>
                )}
              </FormControl>

              {exitReason === "Transfer" && (
                <FormControl isInvalid={errors.exitTransfer}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="500"
                    color={textColorPrimary}
                  >
                    Transfer Destination{" "}
                    <Text as="span" color="red">
                      *
                    </Text>
                  </FormLabel>
                  <Input
                    value={exitTransfer}
                    fontSize="sm"
                    type="text"
                    size="lg"
                    variant="flushed"
                    onChange={(e) => {
                      const value = e.target.value;
                      setExitReason(value);
                      if (value !== "Transfer") {
                        setExitTransfer(""); // Clear transfer destination if changing away from Transfer
                      }
                    }}
                  />
                  {errors.exitTransfer && (
                    <FormErrorMessage>{errors.exitTransfer}</FormErrorMessage>
                  )}
                </FormControl>
              )}
              <FormControl>
                <FormLabel
                  fontSize="sm"
                  fontWeight="500"
                  color={textColorPrimary}
                >
                  Re-Admission Date
                </FormLabel>
                <Input
                  value={reAdmissionDate}
                  type="date"
                  fontSize="sm"
                  size="lg"
                  variant="flushed"
                  onChange={(e) => setReAdmissionDate(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel
                  fontSize="sm"
                  fontWeight="500"
                  color={textColorPrimary}
                >
                  Re-Admission Reason
                </FormLabel>
                <Input
                  value={reAdmissionReason}
                  type="text"
                  fontSize="sm"
                  size="lg"
                  variant="flushed"
                  onChange={(e) => setReAdmissionReason(e.target.value)}
                />
              </FormControl>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="orange" onClick={handleUpdateExit}>
              Update Exit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Notification Modal */}
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
                  if (onSaved) onSaved();
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

export default EditExitInfo;
