import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
} from "@chakra-ui/react";
import { DiabPatientData } from "../../../../../../../../DBConnection/DiabetesPatients";
import RequestLabTable from "./labs/requestLabTable";
import LabResultTable from "./labs/labResultsTable";

export default function LabPanel() {
  const bgHeader = useColorModeValue("white", "gray.700");
  const patient = DiabPatientData();

  // State for active tab index; using a unique key for LabPanel
  const [labTabIndex, setLabTabIndex] = useState(0);

  // Retrieve the active tab index from localStorage on mount
  useEffect(() => {
    const savedTab = localStorage.getItem("labActiveTab");
    if (savedTab !== null) {
      setLabTabIndex(Number(savedTab));
    }
  }, []);

  // Update the active tab index and save it to localStorage when changed
  const handleLabTabsChange = (index) => {
    setLabTabIndex(index);
    localStorage.setItem("labActiveTab", index);
  };

  if (!patient) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box>
      {/* Tabs with controlled state */}
      <Tabs index={labTabIndex} onChange={handleLabTabsChange}>
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
          <TabPanel p="20px" borderRadius="md" boxShadow="sm">
            <RequestLabTable patient={patient} />
          </TabPanel>
          <TabPanel p="20px" borderRadius="md" boxShadow="sm">
            <LabResultTable patient={patient} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
