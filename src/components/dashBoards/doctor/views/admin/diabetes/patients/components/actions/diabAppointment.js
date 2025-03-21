import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

import { DiabPatientData } from "../../../../../../../../../DBConnection/DiabetesPatients";
import MiniCalendar from "../../../../../../components/calendar/MiniCalendar";

function DiabPatientAppointment({ isOpen, onClose }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const patient = DiabPatientData();

  // Modal state for notifications
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Load API host state
  const [apiHost, setApiHost] = useState("");

  // Load the host URL from a text file (placed in your public folder as apiHost.txt)
  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  const handleSaveAppointment = () => {
    // Validate that the selected date is in the future
    const now = new Date();
    if (selectedDate.getTime() <= now.getTime()) {
      setError("Please select a future date for the appointment.");
      return;
    }
    setError("");

    // Get the phone number from the fetched patient data
    const patientPhone = patient?.phone_number;
    if (!patientPhone) {
      setIsSuccess(false);
      setModalTitle("Error");
      setModalMessage("Patient profile not found. Please register profile first.");
      setModalOpen(true);
      return;
    }

    // Format the selected date as "DD/MM/YYYY HH:MM"
    const formatDate = (date) => {
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    };
    const appointmentDate = formatDate(selectedDate);

    // Save appointment to the database using the API host from apiHost.txt
    fetch(
      `${apiHost}/registerDiabPatientAppointment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: patientPhone,
          appointment: appointmentDate,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setIsSuccess(true);
          setModalTitle("Success");
          setModalMessage("Appointment Saved Successfully");
          setModalOpen(true);
        } else {
          setIsSuccess(false);
          setModalTitle("Error");
          setModalMessage("Error saving appointment");
          setModalOpen(true);
        }
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Patient Appointment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb="4">
              <Text mb="2">
                Select a Future Date for the Appointment{" "}
                <Text as="span" color="red">
                  *
                </Text>
              </Text>
              <MiniCalendar
                h="100%"
                minW="100%"
                selectRange={false}
                onChange={setSelectedDate}
                value={selectedDate}
              />
              {error && (
                <Text color="red.500" mt="2">
                  {error}
                </Text>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="brand" onClick={handleSaveAppointment}>
              Save Appointment
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

export default DiabPatientAppointment;
