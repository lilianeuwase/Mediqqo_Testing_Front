import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { DiabPatientData } from "../../../../../../../../DBConnection/DiabetesPatients";
import RequestLabTable from "./labs/requestLabTable";
import LabResultTable from "./labs/labResultsTable";

export default function LabPanel() {
  const bgHeader = useColorModeValue("white", "gray.700");

  // Get patient data as in your DaibPatientInfo component.
  const patient = DiabPatientData();
  if (!patient) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box>
      {/* Tabs */}
      <Tabs>
        <TabList>
          <Tab
            _selected={{
              color: "blue.500",
              fontWeight: "bold",
              borderBottomColor: "blue.500",
            }}
          >
            Lab Requests
          </Tab>
          <Tab
            _selected={{
              color: "blue.500",
              fontWeight: "bold",
              borderBottomColor: "blue.500",
            }}
          >
            Lab Results
          </Tab>
        </TabList>
        <TabPanels>
          {/* Tab 1: Lab Results */}
          <TabPanel p="20px" borderRadius="md" boxShadow="sm">
            <RequestLabTable patient={patient} />
          </TabPanel>
          {/* Tab 2: Lab Requests (Empty) */}
          <TabPanel p="20px" borderRadius="md" boxShadow="sm">
            <LabResultTable patient={patient} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
