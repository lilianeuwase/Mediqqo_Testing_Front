import React from "react";
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Step,
  StepDescription,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from "@chakra-ui/react";
import Card from "../../../../../components/card/Card";

const steps = [
  { title: "Registration", description: "Patient registration completed" },
  { title: "Vitals Taken", description: "Vitals have been recorded" },
  { title: "Doctor Consultation", description: "Consultation completed" },
  { title: "Lab Results", description: "Lab tests completed" },
  { title: "Diagnosis", description: "Final diagnosis given" },
];

function ManagePatient({ patient }) {
  const currentCycle =
    patient?.vitalsDates && patient.vitalsDates.length > 0
      ? patient.vitalsDates.length - 1
      : 0;

  // Compute active step cumulatively:
  let computedActiveStep = 0;
  if (patient?.registerDate) computedActiveStep += 1;
  if (patient?.vitalsDates && patient.vitalsDates.length > 0) computedActiveStep += 1;
  if (
    patient?.doctorDates &&
    patient.doctorDates.length > currentCycle &&
    patient.doctorDates[currentCycle]
  )
    computedActiveStep += 1;
  if (
    patient?.labDates &&
    patient.labDates.length > currentCycle &&
    patient.labDates[currentCycle]
  )
    computedActiveStep += 1;
  if (
    patient?.diagnosis &&
    patient.diagnosis.length > currentCycle &&
    patient.diagnosis[currentCycle]
  )
    computedActiveStep += 1;

  // Retrieve the latest dates for each step.
  const registrationDate = patient.registerDate;
  const vitalsDate =
    patient.vitalsDates && patient.vitalsDates.length > 0
      ? patient.vitalsDates[patient.vitalsDates.length - 1]
      : null;
  const consultationDate =
    patient.doctorDates && patient.doctorDates.length > 0
      ? patient.doctorDates[patient.doctorDates.length - 1]
      : null;
  const laboratoryDate =
    patient.labDates && patient.labDates.length > 0
      ? patient.labDates[patient.labDates.length - 1]
      : null;
  const diagnosisDate =
    patient.diagnosis && patient.diagnosis.length > 0
      ? patient.diagnosis[patient.diagnosis.length - 1]
      : null;

  const dates = [
    registrationDate,
    vitalsDate,
    consultationDate,
    laboratoryDate,
    diagnosisDate,
  ];

  return (
    <Card
      p="20px"
      variant="brand"
      mb={{ base: "0px", "2xl": "20px" }}
      borderRadius="16px"
      h="full"
      display="flex"
      flexDirection="column"
    >
      <Flex direction="column" gap="20px">
        {/* Header section with title */}
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="22px" fontWeight="700" >
            Patient Management
          </Text>
        </Flex>
        {/* Progress Stepper */}
        <Box mt="10px">
          <Stepper
            index={computedActiveStep}
            orientation="vertical"
            height="320px"
            gap="0px"
            colorScheme="brand"
          >
            {steps.map((step, index) => {
              const isComplete = index < computedActiveStep;
              return (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={
                        <StepNumber
        
                          fontWeight="bold"
                          borderColor="gray.400"
                        />
                      }
                      incomplete={
                        <StepNumber borderColor="gray.400"/>
                      }
                      active={
                        <StepNumber borderColor="gray.400" />
                      }
                    />
                  </StepIndicator>
                  <Box flexShrink="0" ml="10px">
                    <StepTitle
                   
                      fontWeight={isComplete ? "bold" : "normal"}
                    >
                      {step.title}
                    </StepTitle>
                    {isComplete && (
                      <>
                        <StepDescription  fontWeight="bold">
                          {step.description}
                        </StepDescription>
                        {dates[index] && (
                          <Text fontSize="xs" color="orange.400">
                            {dates[index]}
                          </Text>
                        )}
                      </>
                    )}
                  </Box>
                  <StepSeparator borderColor="gray.400" />
                </Step>
              );
            })}
          </Stepper>
        </Box>
      </Flex>
    </Card>
  );
}

export default ManagePatient;