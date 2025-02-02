// LabAndVitals.js
import React from "react";
import {
  Text,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Flex,
  Button
} from "@chakra-ui/react";
import Card from "../../../../components/card/Card";
import { HSeparator } from "../../../../components/separator/Separator";

const LabAndVitals = ({
  glucose, setGlucose,
  hb, setHb,
  fastglucose, setFastGlucose,
  creatinine, setCreatinine,
  temp, setTemp,
  BP, setBP,
  HR, setHR,
  O2, setO2,
  errors,
  handleNext,
  handlePrevious,
}) => {
  return (
    <Card
      mb={{ base: "0px", "2xl": "20px" }}
      pe="20px"
      pt={{ base: "130px", md: "80px", xl: "50px" }}
      pb={{ base: "130px", md: "80px", xl: "50px" }}
      pr={{ base: "130px", md: "80px", xl: "80px" }}
      pl={{ base: "130px", md: "80px", xl: "80px" }}
    >
      <Text color="inherit" fontWeight="bold" fontSize="2xl" mt="10px" mb="4px">
        Patient Registration / Diabetes
      </Text>
      <Flex align="center" mb="10px" mt="10px">
        <HSeparator />
      </Flex>
      <Text color="inherit" fontWeight="bold" fontSize="xl" mt="10px" mb="20px">
        Lab Results & Vital Signs
      </Text>
      <SimpleGrid columns="2" gap="20px">
        <Text gridColumn="span 2" color="inherit" fontWeight="bold" fontSize="lg" mt="10px" mb="4px">
          Lab Results
        </Text>
        <FormControl isInvalid={errors.glucose} mb="12px">
          <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="inherit" mb="4px">
            Random Blood glucose (mg/dL)<Text color="red">*</Text>
          </FormLabel>
          <Input
            value={glucose}
            isRequired
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="number"
            mb="12px"
            fontWeight="500"
            size="lg"
            maxW="450px"
            variant="flushed"
            onChange={(e) => setGlucose(e.target.value)}
          />
          {errors.glucose && <FormErrorMessage>{errors.glucose}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={errors.hb} mb="12px">
          <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="inherit" mb="4px">
            HbA1c (%)<Text color="red">*</Text>
          </FormLabel>
          <Input
            value={hb}
            isRequired
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="number"
            mb="12px"
            fontWeight="500"
            size="lg"
            maxW="450px"
            variant="flushed"
            onChange={(e) => setHb(e.target.value)}
          />
          {errors.hb && <FormErrorMessage>{errors.hb}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={errors.fastglucose} mb="12px">
          <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="inherit" mb="4px">
            Fasting Blood glucose (mg/dL)<Text color="red">*</Text>
          </FormLabel>
          <Input
            value={fastglucose}
            isRequired
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="number"
            mb="12px"
            fontWeight="500"
            size="lg"
            maxW="450px"
            variant="flushed"
            onChange={(e) => setFastGlucose(e.target.value)}
          />
          {errors.fastglucose && <FormErrorMessage>{errors.fastglucose}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={errors.creatinine} mb="12px">
          <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="inherit" mb="4px">
            Creatinine (µmol/L)<Text color="red">*</Text>
          </FormLabel>
          <Input
            value={creatinine}
            isRequired
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="number"
            mb="12px"
            fontWeight="500"
            size="lg"
            maxW="450px"
            variant="flushed"
            onChange={(e) => setCreatinine(e.target.value)}
          />
          {errors.creatinine && <FormErrorMessage>{errors.creatinine}</FormErrorMessage>}
        </FormControl>

        <Text gridColumn="span 2" color="inherit" fontWeight="bold" fontSize="lg" mt="10px" mb="4px">
          Vital Signs
        </Text>
        <FormControl isInvalid={errors.temp} mb="12px">
          <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="inherit" mb="4px">
            Temperature (C°)<Text color="red">*</Text>
          </FormLabel>
          <Input
            value={temp}
            isRequired
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="number"
            mb="12px"
            fontWeight="500"
            size="lg"
            maxW="450px"
            variant="flushed"
            onChange={(e) => setTemp(e.target.value)}
          />
          {errors.temp && <FormErrorMessage>{errors.temp}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={errors.BP} mb="12px">
          <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="inherit" mb="4px">
            Blood Pressure<Text color="red">*</Text>
          </FormLabel>
          <Input
            value={BP}
            isRequired
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="number"
            mb="12px"
            fontWeight="500"
            size="lg"
            maxW="450px"
            variant="flushed"
            onChange={(e) => setBP(e.target.value)}
          />
          {errors.BP && <FormErrorMessage>{errors.BP}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={errors.HR} mb="12px">
          <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="inherit" mb="4px">
            Heart Rate<Text color="red">*</Text>
          </FormLabel>
          <Input
            value={HR}
            isRequired
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="number"
            mb="12px"
            fontWeight="500"
            size="lg"
            maxW="450px"
            variant="flushed"
            onChange={(e) => setHR(e.target.value)}
          />
          {errors.HR && <FormErrorMessage>{errors.HR}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={errors.O2} mb="12px">
          <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="inherit" mb="4px">
            Respiratory Rate<Text color="red">*</Text>
          </FormLabel>
          <Input
            value={O2}
            isRequired
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="number"
            mb="12px"
            fontWeight="500"
            size="lg"
            maxW="450px"
            variant="flushed"
            onChange={(e) => setO2(e.target.value)}
          />
          {errors.O2 && <FormErrorMessage>{errors.O2}</FormErrorMessage>}
        </FormControl>
      </SimpleGrid>
      <Flex align="center" justify="space-between">
        <Button variant="brand" fontWeight="500" fontSize="16px" py="20px" px="27" onClick={handlePrevious}>
          Previous
        </Button>
        <Button variant="brand" fontWeight="500" fontSize="16px" py="20px" px="27" onClick={handleNext}>
          Next
        </Button>
      </Flex>
    </Card>
  );
};

export default LabAndVitals;