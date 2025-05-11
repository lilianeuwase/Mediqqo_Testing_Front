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
  Text,
  useToast,
} from "@chakra-ui/react";
import { DiabPatientData } from "../../../../../../../DBConnection/DiabetesPatients";

export default function DeleteConsult({ isOpen, onClose, consultationID, consultDate, onDeleted }) {
  const toast = useToast();
  const patient = DiabPatientData();
  const [apiHost, setApiHost] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  const handleDelete = async () => {
    if (!consultationID) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`${apiHost}/deleteDiabConsultation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: patient?.phone_number,
          consultationID,
        }),
      });

      const data = await res.json();

      if (data.status === "ok") {
        toast({
          title: "Consultation deleted successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        onClose();
        if (onDeleted) onDeleted();
      } else {
        throw new Error(data.error || "Failed to delete consultation");
      }
    } catch (error) {
      console.error("Error deleting consultation:", error);
      toast({
        title: "Error deleting consultation",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="2">
            Are you sure you want to delete consultation{" "}
            <strong>{consultationID}</strong>?
          </Text>
          {consultDate && (
            <Text fontSize="sm" color="gray.500">
              Date: {consultDate}
            </Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleDelete} isLoading={isDeleting}>
            Confirm
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}