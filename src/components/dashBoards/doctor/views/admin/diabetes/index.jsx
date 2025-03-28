// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import { columnsDataDevelopment } from "../../../views/admin/diabetes/variables/columnsData";
import React from "react";
import { DiabetesPatients } from "../../../../../../DBConnection/DiabetesPatients";
import PatientsTable from "../default/components/patientsTable";
import { UserData } from "../../../../../../DBConnection/UserData";

export default function Settings() {
  // Chakra Color Mode

  // Get the current user's hospital from UserData
  const userHospital = UserData().hospital;
  // Retrieve all diabetes patients
  const allPatients = DiabetesPatients();
  // Filter patients to include only those whose hospital array contains the user's hospital
  const filteredPatients = allPatients.filter(
    (patient) =>
      Array.isArray(patient.hospital) && patient.hospital.includes(userHospital)
  );

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <PatientsTable
          columnsData={columnsDataDevelopment}
          tableData={filteredPatients}
        />
      </SimpleGrid>
    </Box>
  );
}