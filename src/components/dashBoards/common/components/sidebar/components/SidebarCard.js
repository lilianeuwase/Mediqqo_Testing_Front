import {
  Button,
  Flex,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { MDBIcon } from "mdb-react-ui-kit";

export default function SidebarDocs() {
  const bgColor = "linear-gradient(135deg, #12c9bb 0%, #4ca8a1 100%)";
  const borderColor = useColorModeValue("white", "navy.800");

  return (
    <Flex
      justify="center"
      direction="column"
      align="center"
      bg={bgColor}
      borderRadius="30px"
      position="relative"
    >
      <Flex
        border="5px solid"
        borderColor={borderColor}
        bg="linear-gradient(135deg, #12c9bb 0%, #12c9bb 100%)"
        borderRadius="50%"
        w="94px"
        h="94px"
        align="center"
        justify="center"
        mx="auto"
        position="absolute"
        left="50%"
        top="-47px"
        transform="translate(-50%, 0%)"
      >
        <div className="logo">
          <h1 style={{ color: "#ffff" }}>
            <MDBIcon
              fas
              icon="fa-duotone fa-capsules"
              // style={{ color: "#18b9ab" }}
              size="1/2x"
            />
          </h1>
        </div>
      </Flex>
      <Flex
        direction="column"
        mb="12px"
        align="center"
        justify="center"
        px="15px"
        pt="55px"
      >
        <Text
          fontSize={{ base: "lg", xl: "18px" }}
          color="white"
          fontWeight="bold"
          lineHeight="150%"
          textAlign="center"
          px="10px"
          mt="10px"
          mb="6px"
        >
          NCD National Database
        </Text>
        <Text
          fontSize="14px"
          color={"white"}
          fontWeight="500"
          px="10px"
          mb="6px"
          textAlign="center"
        >
          We’re excited to announce the upcoming launch of a nationwide
          connected database, uniting records of all NCD (Non-Communicable
          Disease) patients consulted through Mediqqo.
        </Text>
      </Flex>
      <Link href="https://horizon-ui.com/pro?ref=horizon-chakra-free">
        <Button
          bg="whiteAlpha.300"
          _hover={{ bg: "whiteAlpha.200" }}
          _active={{ bg: "whiteAlpha.100" }}
          mb={{ sm: "16px", xl: "24px" }}
          color={"white"}
          fontWeight="bold"
          fontSize="sm"
          minW="185px"
          mx="auto"
        >
          Coming SOON
        </Button>
      </Link>
    </Flex>
  );
}
