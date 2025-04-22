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
import Card from "../../../common/components/card/Card.js";
import React from "react";
// Assets
import hypertension from "../../../../../images/Hyper1.png";
import Consult from "../../diabetes/components/Consult.js";

export default function HypertensionConsult(props) {
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
            <Box
              bg={`url(${hypertension})`}
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
            {/* This section is designed for individuals suspected of having Hyper or Hypo tension. */}
          </Text>
          <Flex w="100%">
            <Link
              href="/userDetails/hypertension"
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
