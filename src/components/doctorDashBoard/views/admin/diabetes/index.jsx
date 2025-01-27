// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import { columnsDataDevelopment } from "../../../views/admin/diabetes/variables/columnsData";
import React from "react";
import DiabetesRetrieval from "../../../views/admin/diabetes/components/diabetesRetrieval";
import DiabetesConsult from "./components/diabetesConsult";
import { DiabetesPatients } from "../../../../../DBConnection/DiabetesPatients";
import PatientsTable from "../default/components/patientsTable";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <DiabetesRetrieval />
        <DiabetesConsult
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          // minH={{ base: "auto", lg: "420px", "2xl": "365px" }}
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
          tableData={DiabetesPatients()}
        />
      </SimpleGrid>
    </Box>
  );
}
