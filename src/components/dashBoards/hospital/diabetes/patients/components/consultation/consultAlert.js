// ClinicianConsultAlert.js
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Button,
} from "@chakra-ui/react";

export default function ConsultAlert({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Vitals are Missing</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Clinician Consultation cannot be added for a patient without first
            recording and registering their vital signs.
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