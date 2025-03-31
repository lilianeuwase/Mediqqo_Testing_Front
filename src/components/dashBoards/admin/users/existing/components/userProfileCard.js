import React from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../../doctor/components/card/Card";

export default function UserProfileCard({ user }) {
  // Color settings
  const headerBg = useColorModeValue("brand.500", "brand.400");
  const textColorHeader = "white";
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";

  // If user data isn’t loaded yet, show a loading message.
  if (!user) {
    return (
      <Card p="20px" borderRadius="16px">
        <Text>Loading user data...</Text>
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
        {(user.fname || user.lname) && (
          <Text fontSize="2xl" fontWeight="bold" color={textColorHeader}>
            {user.fname} {user.lname}
          </Text>
        )}
      </Box>

      {/* Additional User Details */}
      <Box p="20px">
        <Flex direction="column" gap="10px">
          {user.registerDate && (
            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight="500" color={textColorSecondary}>
                Registration Date:
              </Text>
              <Text fontSize="sm" color={textColorPrimary}>
                {user.registerDate}
              </Text>
            </Flex>
          )}
          {user.email && (
            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight="500" color={textColorSecondary}>
                Email:
              </Text>
              <Text fontSize="sm" color={textColorPrimary}>
                {user.email}
              </Text>
            </Flex>
          )}
          {user.phone_number && (
            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight="500" color={textColorSecondary}>
                Phone Number:
              </Text>
              <Text fontSize="sm" color={textColorPrimary}>
                {user.phone_number}
              </Text>
            </Flex>
          )}
          {user.speciality && (
            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight="500" color={textColorSecondary}>
                Speciality:
              </Text>
              <Text fontSize="sm" color={textColorPrimary}>
                {user.speciality}
              </Text>
            </Flex>
          )}
          {user.userType && (
            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight="500" color={textColorSecondary}>
                User Type:
              </Text>
              <Text fontSize="sm" color={textColorPrimary}>
                {user.userType}
              </Text>
            </Flex>
          )}
          {user.hospital && (
            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight="500" color={textColorSecondary}>
                Hospital:
              </Text>
              <Text fontSize="sm" color={textColorPrimary}>
                {user.hospital}
              </Text>
            </Flex>
          )}
          {user.uniqueID && (
            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight="500" color={textColorSecondary}>
                Unique ID:
              </Text>
              <Text fontSize="sm" color={textColorPrimary}>
                {user.uniqueID}
              </Text>
            </Flex>
          )}
        </Flex>
      </Box>
    </Card>
  );
}
