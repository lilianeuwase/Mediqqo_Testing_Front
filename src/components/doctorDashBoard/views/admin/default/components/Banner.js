// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import React from "react";

export default function Banner(props) {
  const { banner, avatar, name, job, patients, dbpatients, htpatients, asmpatients, email, phone } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} align='center'>
      <Box
        bg={`url(${banner})`}
        bgSize='cover'
        borderRadius='16px'
        h='131px'
        w='100%'
      />
      <Avatar
        mx='auto'
        src={avatar}
        h='87px'
        w='87px'
        mt='-43px'
        border='4px solid'
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
        {name}
      </Text>
      <Text color={textColorSecondary} fontSize='sm'>
        {job}
      </Text>
      <Text color={textColorSecondary} fontSize='sm'>
        {email}
      </Text>
      <Text color={textColorSecondary} fontSize='sm'>
        {phone}
      </Text>
      <Flex w='max-content' mx='auto' mt='26px'>
        <Flex mx='auto' me='60px' align='center' direction='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {patients}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Patients
          </Text>
        </Flex>
        <Flex mx='auto' me='60px' align='center' direction='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {dbpatients}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Diabetes<br/>Patients
          </Text>
        </Flex>
        <Flex mx='auto' me='60px' align='center' direction='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {htpatients}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Hypertension<br/>Patients
          </Text>
        </Flex>
        <Flex mx='auto' align='center' direction='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {asmpatients}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Asthma<br/>Patients
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
