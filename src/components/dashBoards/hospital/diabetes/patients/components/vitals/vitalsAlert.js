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
  } from "@chakra-ui/react";
  
  export default function VitalsRestrictionAlert({ isOpen, onClose }) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Action Required</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              The patient must complete the doctor consultation and lab tests before a new vitals session can be taken.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" onClick={onClose}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }