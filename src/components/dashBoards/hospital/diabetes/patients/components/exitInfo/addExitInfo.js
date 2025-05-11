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
import SaveButton from "../../../../../../common/buttons/saveButton";

function AddExitInfo({ isOpen, onClose }) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColor = useColorModeValue("navy.700", "white");

  const [exitDate, setExitDate] = useState("");
  const [exitReason, setExitReason] = useState("");
  const [exitTransfer, setExitTransfer] = useState("");

  const [errors, setErrors] = useState({});

  const patient = DiabPatientData();

  const [apiHost, setApiHost] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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

  const validateExit = () => {
    let newErrors = {};

    if (!exitDate) newErrors.exitDate = "Exit Date is required";
    if (!exitReason) newErrors.exitReason = "Exit Reason is required";

    if (exitReason === "Transfer" && !exitTransfer.trim()) {
      newErrors.exitTransfer = "Referred Facility is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveExit = () => {
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
    setIsSaving(true);

    fetch(`${apiHost}/registerExitInfo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone_number: patientPhone,
        exitDate: formatDateForDB(exitDate),
        exitReason,
        exitTransfer,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setIsSuccess(true);
          setModalTitle("Success");
          setModalMessage("Exit Information Saved Successfully");
          setModalOpen(true);
        } else {
          setIsSuccess(false);
          setModalTitle("Error");
          setModalMessage("Error saving exit information");
          setModalOpen(true);
        }
      })
      .catch((err) => {
        console.error("Error saving exit:", err);
        setIsSuccess(false);
        setModalTitle("Error");
        setModalMessage("Server error saving exit");
        setModalOpen(true);
      })
      .finally(() => {
        setIsSaving(false); // ✅ Stop spinner
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Patient Exit Information</ModalHeader>
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
                    Referred Facility{" "}
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
                    onChange={(e) => setExitTransfer(e.target.value)}
                  />
                  {errors.exitTransfer && (
                    <FormErrorMessage>{errors.exitTransfer}</FormErrorMessage>
                  )}
                </FormControl>
              )}
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <SaveButton
              colorScheme="orange"
              onClick={handleSaveExit}
              isSaving={isSaving}
              text=" Save Exit"
              loadingText="Updating Exit..."
            />
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
                  window.location.reload();
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

export default AddExitInfo;
