// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
// Custom components
import Card from "../../../../components/card/Card.js";
import React from "react";
// Assets
import diabetes from "../../../../../../images/sugar.jpeg";
import Consult from "./Consult.js";

export default function DiabetesConsult(props) {
  const { used, total, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const textColorSecondary = "gray.400";
  return (
    <Card {...rest} mb="0px" align="center" p="20px">
      <Flex h="100%" direction={{ base: "column", "2xl": "row" }}>
        <Consult
          w={{ base: "100%", "2xl": "268px" }}
          me="36px"
          maxH={{ base: "60%", lg: "50%", "2xl": "100%" }}
          minH={{ base: "60%", lg: "50%", "2xl": "100%" }}
          content={
            // <Box>
            //   <Icon as={MdUpload} w='80px' h='80px' color={brandColor} />
            //   <Flex justify='center' mx='auto' mb='12px'>
            //     <Text fontSize='xl' fontWeight='700' color={brandColor}>
            //       Upload Files
            //     </Text>
            //   </Flex>
            //   <Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
            //     PNG, JPG and GIF files are allowed
            //   </Text>
            // </Box>
            <Box
              bg={`url(${diabetes})`}
              bgSize="cover"
              borderRadius="16px"
              h="200px"
              w="250px"
            />
          }
        />

        <Flex direction="column" pe="44px">
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            textAlign="start"
            fontSize="2xl"
            mt={{ base: "20px", "2xl": "50px" }}
          >
            Consultation for New Patients
          </Text>
          <Text
            color={textColorSecondary}
            fontSize="md"
            my={{ base: "auto", "2xl": "10px" }}
            mx="auto"
            textAlign="start"
          >
            {/* This section is designed for individuals suspected of having Type I
            or Type II Diabetes. */}
          </Text>
          <Flex w="100%">
            <Link
              href="/admin/diabetes/newconsult"
              mt={{
                base: "0px",
                md: "10px",
                lg: "0px",
                xl: "10px",
                "2xl": "0px",
              }}
            >
              <Button
                me="100%"
                mb="50px"
                w="140px"
                minW="140px"
                mt={{ base: "20px", "3xl": "auto" }}
                variant="brand"
                fontWeight="500"
              >
                Consult
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
