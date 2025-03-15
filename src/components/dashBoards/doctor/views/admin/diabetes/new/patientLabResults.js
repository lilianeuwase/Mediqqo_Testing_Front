import React, { useState } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  useColorModeValue,
  Button,
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { DiabPatientData } from "../../../../../../../DBConnection/DiabetesPatients";

function PatientLabResults({ isOpen, onClose }) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColor = useColorModeValue("navy.700", "white");

  // Lab Results states
  const [glucose, setGlucose] = useState("");
  const [fastglucose, setFastGlucose] = useState("");
  const [hb, setHb] = useState("");
  const [creatinine, setCreatinine] = useState("");

  // State for additional dynamic lab results
  // Each row is an array: [lab result, value]
  const [moreLab, setMoreLab] = useState([["", ""]]);

  const [errors, setErrors] = useState({});

  // State for fetched patient data
  const patient = DiabPatientData();

  // Modal state for notifications
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const validateLabResults = () => {
    let newErrors = {};
    // Regular expression to validate numbers with at most 2 decimal places
    const numberRegex = /^\d+(\.\d{1,2})?$/;

    if (!glucose) newErrors.glucose = "Random Blood Glucose is required";
    else if (!numberRegex.test(glucose))
      newErrors.glucose = "Random Blood Glucose must be a number with up to 2 decimals";

    if (fastglucose.trim() !== "" && !numberRegex.test(fastglucose))
      newErrors.fastglucose = "Fasting Blood Glucose must be a number with up to 2 decimals";

    if (!hb) newErrors.hb = "HbA1c is required";
    else if (!numberRegex.test(hb))
      newErrors.hb = "HbA1c must be a number with up to 2 decimals";

    if (!creatinine) newErrors.creatinine = "Creatinine is required";
    else if (!numberRegex.test(creatinine))
      newErrors.creatinine = "Creatinine must be a number with up to 2 decimals";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  // Handler to update a cell in the moreLab table.
  const handleMoreLabChange = (rowIndex, colIndex, value) => {
    setMoreLab((prev) => {
      const updated = prev.map((row, idx) => {
        if (idx === rowIndex) {
          const newRow = [...row];
          newRow[colIndex] = value;
          return newRow;
        }
        return row;
      });
      // If this is the last row and at least one field is non-empty, append a new empty row.
      const lastRow = updated[updated.length - 1];
      if (lastRow[0].trim() !== "" || lastRow[1].trim() !== "") {
        updated.push(["", ""]);
      }
      return updated;
    });
  };

  const handleSaveLabResults = () => {
    if (!validateLabResults()) return;
    // Get the phone number from the fetched patient data
    const patientPhone = patient?.phone_number;
    if (!patientPhone) {
      setIsSuccess(false);
      setModalTitle("Error");
      setModalMessage("Patient profile not found. Please register profile first.");
      setModalOpen(true);
      return;
    }
    // Generate today's date (as used in vitalsDates) for lab results.
    const todayDate = formatDate(new Date());

    // Filter out any rows in moreLab that are completely empty.
    const moreLabFiltered = moreLab.filter(
      (row) => row[0].trim() !== "" || row[1].trim() !== ""
    );

    fetch(
      "https://mediqo-api.onrender.com/registerDiabPatientLabResults", 
      // "http://localhost:3001/registerDiabPatientLabResults", 
      {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone_number: patientPhone,
        labDates: todayDate, // Use todayDate as labDates
        glucose,
        fastglucose,
        hb,
        creatinine,
        moreLab: moreLabFiltered,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setIsSuccess(true);
          setModalTitle("Success");
          setModalMessage("Lab Results Saved Successfully");
          setModalOpen(true);
        } else {
          setIsSuccess(false);
          setModalTitle("Error");
          setModalMessage("Error saving lab results");
          setModalOpen(true);
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setModalTitle("Error");
        setModalMessage("Error saving lab results");
        setModalOpen(true);
      });
  };

  return (
    <>
      {/* Main Modal for Lab Results Form */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Patient Lab Results</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns="2" gap="20px">
              <FormControl isInvalid={errors.glucose} mb="12px">
                <FormLabel fontSize="sm" fontWeight="500" color={textColor} mb="4px">
                  Random Blood Glucose (mg/dL)
                  <Text as="span" color="red">*</Text>
                </FormLabel>
                <Input
                  value={glucose}
                  isRequired
                  fontSize="sm"
                  type="number"
                  variant="flushed"
                  onChange={(e) => setGlucose(e.target.value)}
                />
                {errors.glucose && <FormErrorMessage>{errors.glucose}</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={errors.fastglucose} mb="12px">
                <FormLabel fontSize="sm" fontWeight="500" color={textColor} mb="4px">
                  Fasting Blood Glucose (mg/dL)
                </FormLabel>
                <Input
                  value={fastglucose}
                  isRequired
                  fontSize="sm"
                  type="number"
                  variant="flushed"
                  onChange={(e) => setFastGlucose(e.target.value)}
                />
                {errors.fastglucose && <FormErrorMessage>{errors.fastglucose}</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={errors.hb} mb="12px">
                <FormLabel fontSize="sm" fontWeight="500" color={textColor} mb="4px">
                  HbA1c (%)
                  <Text as="span" color="red">*</Text>
                </FormLabel>
                <Input
                  value={hb}
                  isRequired
                  fontSize="sm"
                  type="number"
                  variant="flushed"
                  onChange={(e) => setHb(e.target.value)}
                />
                {errors.hb && <FormErrorMessage>{errors.hb}</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={errors.creatinine} mb="12px">
                <FormLabel fontSize="sm" fontWeight="500" color={textColor} mb="4px">
                  Creatinine (µmol/L)
                  <Text as="span" color="red">*</Text>
                </FormLabel>
                <Input
                  value={creatinine}
                  isRequired
                  fontSize="sm"
                  type="number"
                  variant="flushed"
                  onChange={(e) => setCreatinine(e.target.value)}
                />
                {errors.creatinine && <FormErrorMessage>{errors.creatinine}</FormErrorMessage>}
              </FormControl>
            </SimpleGrid>

            {/* More Lab Results Table */}
            <Box mt="20px">
              <Text fontWeight="bold" mb="8px" color={textColorPrimary}>
                More Lab Results
              </Text>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th fontSize="sm" color="gray.500">
                      Lab Result
                    </Th>
                    <Th fontSize="sm" color="gray.500">
                      Value
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {moreLab.map((row, rowIndex) => (
                    <Tr key={rowIndex}>
                      <Td>
                        <Input
                          value={row[0]}
                          fontSize="sm"
                          variant="flushed"
                          placeholder="e.g. Cholesterol"
                          onChange={(e) =>
                            handleMoreLabChange(rowIndex, 0, e.target.value)
                          }
                        />
                      </Td>
                      <Td>
                        <Input
                          value={row[1]}
                          fontSize="sm"
                          variant="flushed"
                          placeholder="e.g. 180 mg/dL"
                          onChange={(e) =>
                            handleMoreLabChange(rowIndex, 1, e.target.value)
                          }
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSaveLabResults}>
              Save Lab Results
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

export default PatientLabResults;