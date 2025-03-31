// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { useAllUsers } from "../../../../DBConnection/UserData";
import UsersTable from "./existing/components/usersTable";

export default function UserSettings() {
  const { usersTable: allUsers, error } = useAllUsers();

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <UsersTable tableData={allUsers} />
      </SimpleGrid>
    </Box>
  );
}
