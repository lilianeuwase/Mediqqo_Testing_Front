// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import {
  columnsDataDevelopment,
} from "../../../views/admin/hypertension/variables/columnsData";
import React from "react";
import HypertensionRetrieval from "../../../views/admin/hypertension/components/hypertensionRetrieval";
import HypertensionConsult from "./components/hypertensionConsult";
import PatientsTable from "../default/components/patientsTable";
import { HypertensionPatients } from "../../../../../DBConnection/HypertensionPatients";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
     <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <HypertensionRetrieval />
        <HypertensionConsult
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          pe="20px"
          pb={{ base: "100px", lg: "20px" }}
        />
      </SimpleGrid>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <PatientsTable
          columnsData={columnsDataDevelopment}
          tableData={HypertensionPatients()}
        />
      </SimpleGrid>
    </Box>
  );
}
