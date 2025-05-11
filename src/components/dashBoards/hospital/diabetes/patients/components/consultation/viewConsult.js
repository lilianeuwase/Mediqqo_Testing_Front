import React from "react";
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
  Text,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
  Flex,
  Divider,
} from "@chakra-ui/react";

export default function ViewConsult({ isOpen, onClose, data }) {
  if (!data) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent p="6">
        <ModalHeader>Consultation Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* 🔹 Consultation Date */}
          <Box mb="6">
            <Text fontWeight="bold" mb="1">Consultation Date:</Text>
            <Text>{data.consultDate || "N/A"}</Text>
          </Box>

          <Accordion allowMultiple defaultIndex={[0]}>
            {/* 🔹 Clinical + Danger + Complications + Co-morbidities */}
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Clinical Overview
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                {/* Clinical Symptoms */}
                <Box mb="4">
                  <Text fontWeight="semibold" mb="2">Clinical Symptoms</Text>
                  <Flex wrap="wrap" gap="2">
                    {data.clinicalSymp?.length ? (
                      data.clinicalSymp.map((symp, idx) => (
                        <Badge key={idx} colorScheme="purple">{symp}</Badge>
                      ))
                    ) : (
                      <Text>No symptoms recorded.</Text>
                    )}
                  </Flex>
                </Box>

                {/* Danger Signs */}
                <Box mb="4">
                  <Text fontWeight="semibold" mb="2">Danger Signs</Text>
                  <Flex wrap="wrap" gap="2">
                    {data.dangerSigns?.length ? (
                      data.dangerSigns.map((danger, idx) => (
                        <Badge key={idx} colorScheme="red">{danger}</Badge>
                      ))
                    ) : (
                      <Text>No danger signs recorded.</Text>
                    )}
                  </Flex>
                </Box>

                {/* Complications */}
                <Box mb="4">
                  <Text fontWeight="semibold" mb="2">Complications</Text>
                  <Flex wrap="wrap" gap="2">
                    {data.complications?.length ? (
                      data.complications.map((comp, idx) => (
                        <Badge key={idx} colorScheme="orange">{comp}</Badge>
                      ))
                    ) : (
                      <Text>No complications recorded.</Text>
                    )}
                  </Flex>
                </Box>

                {/* Co-morbidities */}
                <Box>
                  <Text fontWeight="semibold" mb="2">Co-morbidities</Text>
                  <Flex wrap="wrap" gap="2">
                    {data.comorbidities?.length ? (
                      data.comorbidities.map((morb, idx) => (
                        <Badge key={idx} colorScheme="green">{morb}</Badge>
                      ))
                    ) : (
                      <Text>No co-morbidities recorded.</Text>
                    )}
                  </Flex>
                </Box>
              </AccordionPanel>
            </AccordionItem>

            {/* 🔹 Past Medical History */}
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Past Medical History
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <VStack align="start" spacing="3">
                  <Box>
                    <Text fontWeight="semibold">Patient Medical History</Text>
                    {(data.pastHistorySummary?.patientMedicalHistory || []).map((item, idx) => (
                      <Text key={idx}>• {item}</Text>
                    ))}
                  </Box>

                  <Box>
                    <Text fontWeight="semibold">Surgical History</Text>
                    <Text>{data.pastHistorySummary?.surgicalHistory || "—"}</Text>
                  </Box>

                  <Box>
                    <Text fontWeight="semibold">Obstetrical History</Text>
                    <Text>{data.pastHistorySummary?.obstetricalHistory || "—"}</Text>
                  </Box>

                  <Box>
                    <Text fontWeight="semibold">Family History</Text>
                    <Text>{data.pastHistorySummary?.familyHistory?.summary || "—"}</Text>
                    <Text>Ubudehe Class: {data.pastHistorySummary?.familyHistory?.ubudeheClass || "—"}</Text>
                  </Box>

                  <Box>
                    <Text fontWeight="semibold">Medications</Text>
                    {(data.pastHistorySummary?.medications?.checklist || []).map((item, idx) => (
                      <Text key={idx}>• {item}</Text>
                    ))}
                    <Text>Other: {data.pastHistorySummary?.medications?.others || "—"}</Text>
                  </Box>

                  <Box>
                    <Text fontWeight="semibold">Allergy</Text>
                    <Text>
                      {data.pastHistorySummary?.allergies?.hasAllergy
                        ? `Yes: ${data.pastHistorySummary?.allergies?.details || "Not specified"}`
                        : "No"}
                    </Text>
                  </Box>

                  <Box>
                    <Text fontWeight="semibold">Other Relevant History</Text>
                    <Text>{data.pastHistorySummary?.otherRelevantHistory || "—"}</Text>
                  </Box>
                </VStack>
              </AccordionPanel>
            </AccordionItem>

            {/* 🔹 Physical Exam */}
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Physical Examination
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <VStack align="start" spacing="4">
                  <Box>
                    <Text fontWeight="semibold">Pain Evaluation</Text>
                    <Text>Physical: {data.physicalExam?.painEvaluation?.physical || "N/A"}</Text>
                    <Text>Psychological: {data.physicalExam?.painEvaluation?.psychological || "N/A"}</Text>
                    <Text>Spiritual: {data.physicalExam?.painEvaluation?.spiritual || "N/A"}</Text>
                    <Text>Comment: {data.physicalExam?.painEvaluation?.comment || "N/A"}</Text>
                  </Box>

                  <Box>
                    <Text fontWeight="semibold">Systematic Exam</Text>
                    {data.physicalExam?.systematicExam &&
                    Object.keys(data.physicalExam.systematicExam).length > 0 ? (
                      Object.entries(data.physicalExam.systematicExam).map(([section, findings], idx) => (
                        <Box key={idx}>
                          <Text fontWeight="bold">{section}:</Text>
                          <Flex wrap="wrap" gap="2">
                            {findings.normal?.map((item, i) => (
                              <Badge key={`n-${i}`} colorScheme="green">
                                {item}
                              </Badge>
                            ))}
                            {findings.abnormal?.map((item, i) => (
                              <Badge key={`a-${i}`} colorScheme="red">
                                {item}
                              </Badge>
                            ))}
                          </Flex>
                        </Box>
                      ))
                    ) : (
                      <Text>No systematic exam findings recorded.</Text>
                    )}
                  </Box>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} colorScheme="purple">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}