// ProfileCard.js
import React from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../../common/components/card/Card";

export default function ProfileCard({ patient }) {
  // Color settings
  const headerBg = useColorModeValue("brand.500", "brand.400");
  const textColorHeader = "white";
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";

  // If patient data isn’t loaded yet, show a loading message.
  if (!patient) {
    return (
      <Card p="20px" borderRadius="16px">
        <Text>Loading patient data...</Text>
      </Card>
    );
  }

  return (
    <Card
      p="0px"
      mb={{ base: "0px", "2xl": "20px" }}
      borderRadius="16px"
      h="full" // Ensures it takes full height
      display="flex"
      flexDirection="column"
    >
      {/* Colorful Header Section */}
      <Box bg={headerBg} borderTopRadius="16px" p="20px" textAlign="center">
        {(patient.fname || patient.lname) && (
          <Text fontSize="2xl" fontWeight="bold" color={textColorHeader}>
            {patient.fname} {patient.lname}
          </Text>
        )}
        <Flex justify="center" mt="10px" wrap="wrap">
          {patient.DOB && (
            <Box mx="10px" my="5px">
              <Text fontSize="md" fontWeight="bold" color={textColorHeader}>
                DOB
              </Text>
              <Text fontSize="sm" color={textColorHeader}>
                {patient.DOB}
              </Text>
            </Box>
          )}
          {patient.bmi && patient.bmi.length > 0 && (
            <Box mx="10px" my="5px">
              <Text fontSize="md" fontWeight="bold" color={textColorHeader}>
                BMI
              </Text>
              <Text fontSize="sm" color={textColorHeader}>
                {patient.bmi[patient.bmi.length - 1]}
              </Text>
            </Box>
          )}
          {patient.gender && (
            <Box mx="10px" my="5px">
              <Text fontSize="md" fontWeight="bold" color={textColorHeader}>
                Gender
              </Text>
              <Text fontSize="sm" color={textColorHeader}>
                {patient.gender.charAt(0).toUpperCase() +
                  patient.gender.slice(1)}
              </Text>
            </Box>
          )}
          {patient.diagnosis && patient.diagnosis.length > 0 && (
            <Box mx="10px" my="5px">
              <Text fontSize="md" fontWeight="bold" color={textColorHeader}>
                Diagnosis
              </Text>
              <Text fontSize="sm" color={textColorHeader}>
                {patient.diagnosis[patient.diagnosis.length - 1]}
              </Text>
            </Box>
          )}
          {patient.appointment && patient.appointment.length > 0 && (
            <Box mx="10px" my="5px">
              <Text fontSize="md" fontWeight="bold" color={textColorHeader}>
                Appointment
              </Text>
              <Text fontSize="sm" color={textColorHeader}>
                {patient.appointment[patient.appointment.length - 1]}
              </Text>
            </Box>
          )}
        </Flex>
      </Box>

      {/* Additional Patient Details */}
      <Box p="20px">
        <Flex direction="column" gap="10px">
          {patient.registerDate && (
            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight="500" color={textColorSecondary}>
                Registration Date:
              </Text>
              <Text fontSize="sm" color={textColorPrimary}>
                {patient.registerDate}
              </Text>
            </Flex>
          )}
          {patient.age !== undefined && (
            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight="500" color={textColorSecondary}>
                Age:
              </Text>
              <Text fontSize="sm" color={textColorPrimary}>
                {patient.age + " Years"}
              </Text>
            </Flex>
          )}
          {patient.height && patient.height.length > 0 && (
            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight="500" color={textColorSecondary}>
                Height:
              </Text>
              <Text fontSize="sm" color={textColorPrimary}>
                {patient.height[patient.height.length - 1] + " Cm"}
              </Text>
            </Flex>
          )}
          {patient.weight && patient.weight.length > 0 && (
            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight="500" color={textColorSecondary}>
                Weight:
              </Text>
              <Text fontSize="sm" color={textColorPrimary}>
                {patient.weight[patient.weight.length - 1] + " Kgs"}
              </Text>
            </Flex>
          )}
          {patient.ID && (
            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight="500" color={textColorSecondary}>
                Patient ID:
              </Text>
              <Text fontSize="sm" color={textColorPrimary}>
                {patient.ID}
              </Text>
            </Flex>
          )}
          {patient.full_address && (
            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight="500" color={textColorSecondary}>
                Address:
              </Text>
              <Text fontSize="sm" color={textColorPrimary} textAlign="right">
                {patient.full_address}
              </Text>
            </Flex>
          )}
          {patient.consCount !== undefined && (
            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight="500" color={textColorSecondary}>
                Visits:
              </Text>
              <Text fontSize="sm" color={textColorPrimary} textAlign="right">
                {patient.consCount}
              </Text>
            </Flex>
          )}
          {patient.uniqueID && (
            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight="500" color={textColorSecondary}>
                Unique ID:
              </Text>
              <Text fontSize="sm" color={textColorPrimary}>
                {patient.uniqueID}
              </Text>
            </Flex>
          )}
          {patient.exitDates && patient.exitDates.length > 0 && (
            <Box
              borderTop="1px solid"
              borderColor="gray.200"
              pt="10px"
              mt="10px"
            >
              <Text
                fontSize="md"
                fontWeight="bold"
                mb="8px"
                color={textColorPrimary}
              >
                Exit & Re-Admission
              </Text>
              <Flex direction="column" gap="4px">
                <Flex justify="space-between">
                  <Text
                    fontSize="sm"
                    fontWeight="500"
                    color={textColorSecondary}
                  >
                    Exit Status:
                  </Text>
                  <Text fontSize="sm" color={textColorPrimary}>
                    {patient.exitDates[patient.exitDates.length - 1]} -{" "}
                    {patient.exitReasons
                      ? patient.exitReasons[patient.exitReasons.length - 1]
                      : ""}
                  </Text>
                </Flex>
                {patient.reAdmissionDates &&
                  patient.reAdmissionDates.length > 0 &&
                  patient.reAdmissionDates[
                    patient.reAdmissionDates.length - 1
                  ] && (
                    <Flex justify="space-between">
                      <Text
                        fontSize="sm"
                        fontWeight="500"
                        color={textColorSecondary}
                      >
                        Re-Admission Date:
                      </Text>
                      <Text fontSize="sm" color={textColorPrimary}>
                        {
                          patient.reAdmissionDates[
                            patient.reAdmissionDates.length - 1
                          ]
                        }
                      </Text>
                    </Flex>
                  )}
              </Flex>
            </Box>
          )}
          {(patient.phone_number || patient.phone_raw) && (
            <Box
              borderTop="1px solid"
              borderColor="gray.200"
              pt="10px"
              mt="10px"
            >
              <Text
                fontSize="md"
                fontWeight="bold"
                mb="8px"
                color={textColorPrimary}
              >
                Phone Information
              </Text>
              {patient.phone_number && (
                <Flex justify="space-between">
                  <Text
                    fontSize="sm"
                    fontWeight="500"
                    color={textColorSecondary}
                  >
                    Phone:
                  </Text>
                  <Text fontSize="sm" color={textColorPrimary}>
                    {patient.phone_number}
                  </Text>
                </Flex>
              )}
              {patient.phone_raw && Array.isArray(patient.phone_raw) && (
                <Flex justify="space-between" mt="5px">
                  <Text
                    fontSize="sm"
                    fontWeight="500"
                    color={textColorSecondary}
                  >
                    Ownership:
                  </Text>
                  <Text fontSize="sm" color={textColorPrimary}>
                    {patient.phone_raw[0] === "yes"
                      ? "Does not belong to Patient"
                      : "Belongs to Patient"}
                  </Text>
                </Flex>
              )}
            </Box>
          )}
          {patient.caregiver && patient.caregiver.length > 0 && (
            <Box
              borderTop="1px solid"
              borderColor="gray.200"
              pt="10px"
              mt="10px"
            >
              <Text
                fontSize="md"
                fontWeight="bold"
                mb="8px"
                color={textColorPrimary}
              >
                Caregiver Information
              </Text>
              <Flex justify="space-between">
                <Text fontSize="sm" fontWeight="500" color={textColorSecondary}>
                  Caregiver Name:
                </Text>
                <Text fontSize="sm" color={textColorPrimary}>
                  {patient.caregiver[0]}
                </Text>
              </Flex>
              {patient.caregiver[1] && (
                <Flex justify="space-between" mt="5px">
                  <Text
                    fontSize="sm"
                    fontWeight="500"
                    color={textColorSecondary}
                  >
                    Caregiver Phone:
                  </Text>
                  <Text fontSize="sm" color={textColorPrimary}>
                    {patient.caregiver[1]}
                  </Text>
                </Flex>
              )}
            </Box>
          )}

          {patient.hbcp && patient.hbcp.length > 0 && (
            <Box
              borderTop="1px solid"
              borderColor="gray.200"
              pt="10px"
              mt="10px"
            >
              <Text
                fontSize="md"
                fontWeight="bold"
                mb="8px"
                color={textColorPrimary}
              >
                Home Based Care Practitioner
              </Text>
              <Flex justify="space-between">
                <Text fontSize="sm" fontWeight="500" color={textColorSecondary}>
                  HBCP Name:
                </Text>
                <Text fontSize="sm" color={textColorPrimary}>
                  {patient.hbcp[0]}
                </Text>
              </Flex>
              {patient.hbcp[1] && (
                <Flex justify="space-between" mt="5px">
                  <Text
                    fontSize="sm"
                    fontWeight="500"
                    color={textColorSecondary}
                  >
                    HBCP Phone:
                  </Text>
                  <Text fontSize="sm" color={textColorPrimary}>
                    {patient.hbcp[1]}
                  </Text>
                </Flex>
              )}
            </Box>
          )}
        </Flex>
      </Box>
    </Card>
  );
}
