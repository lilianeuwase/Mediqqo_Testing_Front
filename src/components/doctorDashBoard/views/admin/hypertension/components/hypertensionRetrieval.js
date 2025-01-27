import React, { useState } from "react";

// Chakra imports
import { Button, Flex, Text, Input } from "@chakra-ui/react";

export default function HypertensionRetrieval() {
  //DB Connection
  const [phone_number, setPhone] = useState("");
  const [lname, setLname] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log(phone_number, lname);
    fetch("https://mediqo-api.onrender.com/login-Hyperpatient", {
      // fetch("http://localhost:5000/login-Hyperpatient", {
        // fetch("https://fantastic-python.cyclic.app/login-Hyperpatient", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        phone_number,
        lname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "HyperpatientRegister");
        if (data.status == "ok") {
          alert("Retrieval is  successful");
          window.localStorage.setItem("Hyperpatienttoken", data.data);
          window.localStorage.setItem("Retrieved", true);

          window.location.href = "/userDetails/oldconsult/oldhypertension/oldhyperpatientdetails";
        }
        else {
          alert("Hyper Patient Not found");
          // window.location.href = "/userDetails/oldconsult/oldhypertension";
        }
      });
  }
  return (
    <Flex
      direction="column"
      bgColor={"brand.500"}
      bgSize="cover"
      py={{ base: "30px", md: "56px" }}
      px={{ base: "30px", md: "64px" }}
      borderRadius="30px"
    >
      <Text
        fontSize={{ base: "24px", md: "24px" }}
        color="white"
        mb="10px"
        fontWeight="700"
        lineHeight={{ base: "32px", md: "42px" }}
      >
        Hypertension Patients Retriaval System
      </Text>
      <Text
        fontSize="md"
        color="#E3DAFF"
        fontWeight="500"
        mb="20px"
        lineHeight="28px"
      >
        Find or Reconsult Existing Patient
      </Text>
      <form onSubmit={handleSubmit}>
        <Input
          isRequired={true}
          variant="auth"
          fontSize="sm"
          ms={{ base: "0px", md: "0px" }}
          type="number"
          placeholder="Registered ID"
          _placeholder={{ color: "white" }}
          color="white"
          mb="24px"
          fontWeight="500"
          size="lg"
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          isRequired={true}
          variant="auth"
          fontSize="sm"
          ms={{ base: "0px", md: "0px" }}
          type="text"
          placeholder="Last Name"
          _placeholder={{ color: "white" }}
          color="white"
          mb="24px"
          fontWeight="500"
          size="lg"
          onChange={(e) => setLname(e.target.value)}
        />
        <Flex align="center">
          <Button
            bg="white"
            color="black"
            _hover={{ bg: "whiteAlpha.900" }}
            _active={{ bg: "white" }}
            _focus={{ bg: "white" }}
            fontWeight="500"
            fontSize="14px"
            py="20px"
            px="27"
            me="38px"
            type="submit"
          >
            Retrieve
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
