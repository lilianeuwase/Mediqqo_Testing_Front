// PatientProfile.js
import React from "react";
import {
  Text,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  Flex,
  Button,
} from "@chakra-ui/react";
import Card from "../../../../components/card/Card";
import { HSeparator } from "../../../../components/separator/Separator";

const PatientProfile = ({
  fname, setFname,
  lname, setLname,
  dob, setDOB,
  gender, setGender,
  height, setHeight,
  weight, setWeight,
  id, setID,
  phone_number, setPhone,
  province, setProvince,
  selectedProvince, setSelectedProvince,
  district, setDistrict,
  sector, setSector,
  cell, setCell,
  errors,
  handleNext,
}) => {
  return (
    <Card
      mb={{ base: "0px", "2xl": "20px" }}
      gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
      pe="20px"
      pt={{ base: "130px", md: "80px", xl: "50px" }}
      pb={{ base: "130px", md: "80px", xl: "50px" }}
      pr={{ base: "130px", md: "80px", xl: "80px" }}
      pl={{ base: "130px", md: "80px", xl: "80px" }}
    >
      {/* Big title remains constant */}
      <Text color="inherit" fontWeight="bold" fontSize="2xl" mt="10px" mb="4px">
        Patient Registration / Diabetes
      </Text>
      <Flex align="center" mb="10px" mt="10px">
        <HSeparator />
      </Flex>
      {/* Subtitle */}
      <Text color="inherit" fontWeight="bold" fontSize="xl" mt="10px" mb="20px">
        Patient Profile
      </Text>

      <SimpleGrid columns="2" gap="20px">
        <FormControl isInvalid={errors.fname} mb="12px">
          <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="inherit" mb="4px">
            First Name<Text color="red">*</Text>
          </FormLabel>
          <Input
            value={fname}
            isRequired
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            mb="12px"
            fontWeight="500"
            size="lg"
            maxW="450px"
            variant="flushed"
            onChange={(e) => setFname(e.target.value)}
          />
          {errors.fname && <FormErrorMessage>{errors.fname}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={errors.lname} mb="12px">
          <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="inherit" mb="4px">
            Last Name<Text color="red">*</Text>
          </FormLabel>
          <Input
            value={lname}
            isRequired
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            mb="12px"
            fontWeight="500"
            size="lg"
            maxW="450px"
            variant="flushed"
            onChange={(e) => setLname(e.target.value)}
          />
          {errors.lname && <FormErrorMessage>{errors.lname}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={errors.dob} mb="12px">
          <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="inherit" mb="4px">
            Date of Birth (DD/MM/YYYY)<Text color="red">*</Text>
          </FormLabel>
          <Input
            value={dob}
            isRequired
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="date"
            mb="12px"
            fontWeight="500"
            size="lg"
            maxW="450px"
            variant="flushed"
            onChange={(e) => setDOB(e.target.value)}
          />
          {errors.dob && <FormErrorMessage>{errors.dob}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={errors.gender} mb="12px">
          <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="inherit" mb="4px">
            Gender<Text color="red">*</Text>
          </FormLabel>
          <Select
            value={gender}
            placeholder="Patient Gender"
            isRequired
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            mb="12px"
            fontWeight="500"
            size="lg"
            maxW="450px"
            variant="flushed"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
          {errors.gender && <FormErrorMessage>{errors.gender}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={errors.height} mb="12px">
          <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="inherit" mb="4px">
            Height (Cm)<Text color="red">*</Text>
          </FormLabel>
          <Input
            value={height}
            isRequired
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            mb="12px"
            fontWeight="500"
            size="lg"
            maxW="450px"
            variant="flushed"
            onChange={(e) => setHeight(e.target.value)}
          />
          {errors.height && <FormErrorMessage>{errors.height}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={errors.weight} mb="12px">
          <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="inherit" mb="4px">
            Weight (Kg)<Text color="red">*</Text>
          </FormLabel>
          <Input
            value={weight}
            isRequired
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            mb="12px"
            fontWeight="500"
            size="lg"
            maxW="450px"
            variant="flushed"
            onChange={(e) => setWeight(e.target.value)}
          />
          {errors.weight && <FormErrorMessage>{errors.weight}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={errors.id} mb="12px">
          <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="inherit" mb="4px">
            National Identification Number (ID)<Text as="span" color="red">*</Text>
          </FormLabel>
          <Input
            value={id}
            isRequired
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            mb="12px"
            fontWeight="500"
            size="lg"
            maxW="450px"
            variant="flushed"
            onChange={(e) => setID(e.target.value)}
          />
          {errors.id && <FormErrorMessage>{errors.id}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={errors.phone_number} mb="12px">
          <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="inherit" mb="4px">
            Phone Number<Text color="red">*</Text>
          </FormLabel>
          <Input
            value={phone_number}
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            mb="12px"
            fontWeight="500"
            size="lg"
            maxW="450px"
            variant="flushed"
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone_number && <FormErrorMessage>{errors.phone_number}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={errors.province} mb="12px">
          <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="inherit" mb="4px">
            Province<Text color="red">*</Text>
          </FormLabel>
          <Select
            value={province}
            placeholder="Choose Province"
            isRequired
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            mb="12px"
            fontWeight="500"
            size="lg"
            maxW="450px"
            variant="flushed"
            onChange={(e) => {
              const value = e.target.value;
              setSelectedProvince(value);
              setProvince(value);
            }}
          >
            <option value="kigalicity">Kigali City</option>
            <option value="northern">Northern</option>
            <option value="southern">Southern</option>
            <option value="western">Western</option>
            <option value="eastern">Eastern</option>
          </Select>
          {errors.province && <FormErrorMessage>{errors.province}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={errors.district} mb="12px">
          <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="inherit" mb="4px">
            District<Text color="red">*</Text>
          </FormLabel>
          <Select
            value={district}
            placeholder="Choose District"
            isRequired
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            mb="12px"
            fontWeight="500"
            size="lg"
            maxW="450px"
            variant="flushed"
            isDisabled={!selectedProvince}
            onChange={(e) => setDistrict(e.target.value)}
          >
            {selectedProvince &&
              // Map the districts for the selected province
              selectedProvince && 
              district[selectedProvince].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
          </Select>
          {errors.district && <FormErrorMessage>{errors.district}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={errors.sector} mb="12px">
          <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="inherit" mb="4px">
            Sector<Text color="red">*</Text>
          </FormLabel>
          <Input
            value={sector}
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            mb="12px"
            fontWeight="500"
            size="lg"
            maxW="450px"
            variant="flushed"
            onChange={(e) => setSector(e.target.value)}
          />
          {errors.sector && <FormErrorMessage>{errors.sector}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={errors.cell} mb="12px">
          <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color="inherit" mb="4px">
            Cell<Text color="red">*</Text>
          </FormLabel>
          <Input
            value={cell}
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            mb="12px"
            fontWeight="500"
            size="lg"
            maxW="450px"
            variant="flushed"
            onChange={(e) => setCell(e.target.value)}
          />
          {errors.cell && <FormErrorMessage>{errors.cell}</FormErrorMessage>}
        </FormControl>
      </SimpleGrid>

      <Flex align="center" justify="flex-end">
        <Button
          variant="brand"
          fontWeight="500"
          fontSize="16px"
          py="20px"
          px="27"
          me="38px"
          onClick={handleNext}
        >
          Next
        </Button>
      </Flex>
    </Card>
  );
};

export default PatientProfile;