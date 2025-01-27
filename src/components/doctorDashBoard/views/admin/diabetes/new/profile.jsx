import React from "react";

// Chakra imports
import {
  Box,
  Text,
  SimpleGrid,
  useColorModeValue,
  Button,
  Flex,
  Select,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
// Custom components
import Card from "../../../../components/card/Card";
import { HSeparator } from "../../../../components/separator/Separator";

function Profile() {
  // Chakra color mode
  const textColorSecondary = "gray.400";
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColor = useColorModeValue("navy.700", "white");
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card
        mb={{ base: "0px", "2xl": "20px" }}
        gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
        // maxWidth="640px"
        pe="20px"
        pt={{ base: "130px", md: "80px", xl: "50px" }}
        pb={{ base: "130px", md: "80px", xl: "50px" }}
        pr={{ base: "130px", md: "80px", xl: "80px" }}
        pl={{ base: "130px", md: "80px", xl: "80px" }}
      >
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mt="10px"
          mb="4px"
        >
          New Diabetes Patient
        </Text>
        <Flex align="center" mb="10px" mt="10px">
          <HSeparator />
        </Flex>
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="xl"
          mt="10px"
          mb="20px"
        >
          Patient Profile
        </Text>

        <SimpleGrid columns="2" gap="20px">
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              First Name<Text color="red">*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              mb="24px"
              fontWeight="500"
              size="lg"
              maxW="450px"
              variant="flushed"
            />
          </FormControl>
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Last Name<Text color="red">*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              mb="24px"
              fontWeight="500"
              size="lg"
              maxW="450px"
              variant="flushed"
            />
          </FormControl>
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Date of Birth<Text color="red">*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="date"
              mb="24px"
              fontWeight="500"
              size="lg"
              maxW="450px"
              variant="flushed"
            />
          </FormControl>
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Gender<Text color="red">*</Text>
            </FormLabel>
            <Select
              placeholder="Patient Gender"
              isRequired={true}
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              mb="24px"
              fontWeight="500"
              size="lg"
              maxW="450px"
              variant="flushed"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Height (Cm)<Text color="red">*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              mb="24px"
              fontWeight="500"
              size="lg"
              maxW="450px"
              variant="flushed"
            />
          </FormControl>
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Weight (Kg)<Text color="red">*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              mb="24px"
              fontWeight="500"
              size="lg"
              maxW="450px"
              variant="flushed"
            />
          </FormControl>
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Identification Number (ID)<Text color="red">*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              mb="24px"
              fontWeight="500"
              size="lg"
              maxW="450px"
              variant="flushed"
            />
          </FormControl>
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Phone Number
            </FormLabel>
            <Input
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              mb="24px"
              fontWeight="500"
              size="lg"
              maxW="450px"
              variant="flushed"
            />
          </FormControl>
        </SimpleGrid>

        <Flex align="center" justify="flex-end">
          <Button
            variant="brand"
            _hover={{ bg: "brand.900" }}
            _active={{ bg: "white" }}
            _focus={{ bg: "white" }}
            fontWeight="500"
            fontSize="16px"
            py="20px"
            px="27"
            me="38px"
          >
            Next
          </Button>
        </Flex>
      </Card>
    </Box>
  );
}

export default Profile;
