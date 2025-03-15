import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  Heading,
  Text,
  Stack,
  Box,
  Divider,
} from "@chakra-ui/react";

export default function DiabResultCard({ patient }) {
  if (!patient || !patient.diagnosis || patient.diagnosis.length === 0) {
    return <Text>No recent result to display.</Text>;
  }

  const latestIndex = patient.diagnosis.length - 1;
  const latestResult = {
    consultations: latestIndex + 1,
    diagnosis: patient.diagnosis[latestIndex],
    patient_manage: patient.patient_manage
      ? patient.patient_manage[latestIndex]
      : "",
    medication: patient.medication ? patient.medication[latestIndex] : "",
    dosage: patient.dosage ? patient.dosage[latestIndex] : "",
    control: patient.control ? patient.control[latestIndex] : "",
    doctor_comment: patient.doctor_comment
      ? patient.doctor_comment[latestIndex]
      : "",
    resultComment: patient.resultComment
      ? patient.resultComment[latestIndex]
      : "",
      appointment: patient.appointment
      ? patient.appointment[latestIndex]
      : "",
  };

  let cardBgColor;
  if (latestResult.diagnosis === "No Diabetes") {
    cardBgColor = "green.100";
  } else if (latestResult.diagnosis === "Diabetes") {
    cardBgColor = "red.100";
  } else if (
    latestResult.diagnosis === "Second Consultation is Needed to Confirm"
  ) {
    cardBgColor = undefined; // use the default background color
  }

  return (
    <Card bg={cardBgColor}>
      <CardHeader>
        <Heading size="md">Recent Results</Heading>
      </CardHeader>
      <Divider />
      <CardBody>
        <SimpleGrid columns={4} spacing={4}>
          {/* Column 1: Diagnosis and Management */}
          <Stack spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Diagnosis
              </Heading>
              <Text pt="2" fontSize="sm">
                Consultation #{latestResult.consultations}: {latestResult.diagnosis}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Management
              </Heading>
              <Text pt="2" fontSize="sm">
                {latestResult.patient_manage}
              </Text>
            </Box>
          </Stack>
          {/* Column 2: Medication and Dosage */}
          <Stack spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Medication
              </Heading>
              <Text pt="2" fontSize="sm">
                {latestResult.medication}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Dosage
              </Heading>
              <Text pt="2" fontSize="sm">
                {latestResult.dosage}
              </Text>
            </Box>
          </Stack>
          {/* Column 3: Control and Result Comment */}
          <Stack spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Control
              </Heading>
              <Text pt="2" fontSize="sm">
                {latestResult.control}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Result Comment
              </Heading>
              <Text pt="2" fontSize="sm">
                {latestResult.resultComment}
              </Text>
            </Box>
          </Stack>
          {/* Column 4: Doctor Comment */}
          <Stack spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Doctor Comment
              </Heading>
              <Text pt="2" fontSize="sm">
                {latestResult.doctor_comment}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Appointment
              </Heading>
              <Text pt="2" fontSize="sm">
                {latestResult.appointment}
              </Text>
            </Box>
          </Stack>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
}