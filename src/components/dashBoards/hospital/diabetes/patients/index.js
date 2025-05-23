import React, { useState, useEffect } from "react";
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
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { DiabPatientData } from "../../../../../DBConnection/DiabetesPatients";

// Import your components
import ProfileCard from "./components/profileCard";
import VitalsTable from "./components/vitalsTable";
import ConsultTable from "./components/consultTable.js";
import ManagePatient from "./components/managePatient";
import LabPanel from "./components/labPanel";
import DiabResultTable from "./components/result/diabResultTable";
import DiabPatientAppointment from "./components/actions/diabAppointment";
import DiabResultCalculate from "./components/result/diabResultCalculate";
import PatientAllInfo from "./components/patientAllInfo";
import ExitInfoTable from "./components/exitInfoTable";

export default function DaibPatientInfo() {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const bgHeader = useColorModeValue("white", "gray.700");
  const patient = DiabPatientData();

  // Retrieve the active tab index from localStorage on component mount
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab !== null) {
      setTabIndex(Number(savedTab));
    }
  }, []);

  // Handler for tab changes: update state and localStorage
  const handleTabsChange = (index) => {
    setTabIndex(index);
    localStorage.setItem("activeTab", index);
  };

  if (!patient) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box mt="40px" pt={{ base: "130px", md: "80px", xl: "80px" }} px="20px">
      {/* Header with Title and Menu */}
      <Flex
        align="center"
        justify="space-between"
        mb="20px"
        p="20px"
        borderRadius="md"
        boxShadow="sm"
        bg={bgHeader}
      >
        <Heading fontSize={{ base: "2xl", md: "2xl" }}>
          {`${patient.fname} ${patient.lname}`}
        </Heading>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant="outline"
            colorScheme="brand"
            width="200px"
          >
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setIsAppointmentOpen(true)}>
              Schedule Appointment
            </MenuItem>
            <MenuItem>Edit Patient</MenuItem>
            <MenuItem>More</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* Tabs with controlled state */}
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList>
          <Tab
            _selected={{
              color: "brand.500",
              fontWeight: "bold",
              borderBottomColor: "brand.500",
            }}
          >
            Patient
          </Tab>
          <Tab
            _selected={{
              color: "orange.500",
              fontWeight: "bold",
              borderBottomColor: "orange.500",
            }}
          >
            Vitals
          </Tab>
          <Tab
            _selected={{
              color: "purple.500",
              fontWeight: "bold",
              borderBottomColor: "purple.500",
            }}
          >
            Consultation
          </Tab>
          <Tab
            _selected={{
              color: "blue.500",
              fontWeight: "bold",
              borderBottomColor: "blue.500",
            }}
          >
            Laboratory
          </Tab>
          <Tab
            _selected={{
              color: "yellow.400",
              fontWeight: "bold",
              borderBottomColor: "yellow.400",
            }}
          >
            Results & Medication
          </Tab>
          <Tab
            _selected={{
              color: "gray.700",
              fontWeight: "bold",
              borderBottomColor: "gray.700",
            }}
          >
            Full History
          </Tab>
          <Tab
            _selected={{
              color: "red.600",
              fontWeight: "bold",
              borderBottomColor: "red.600",
            }}
          >
            Exit Info
          </Tab>
        </TabList>
        <TabPanels>
          {/* Tab 1: Patient – ProfileCard & ManagePatient side-by-side */}
          <TabPanel p="20px" borderRadius="md" boxShadow="sm">
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing="20px"
              alignItems="stretch"
            >
              <Box display="flex" flexDirection="column" h="100%">
                <ProfileCard patient={patient} />
              </Box>
              <Box display="flex" flexDirection="column" h="100%">
                <ManagePatient patient={patient} />
              </Box>
            </SimpleGrid>
          </TabPanel>

          {/* Tab 2: Vitals */}
          <TabPanel p="20px" borderRadius="md" boxShadow="sm">
            <VitalsTable patient={patient} />
          </TabPanel>

          {/* Tab 3: Consultation */}
          <TabPanel p="20px" borderRadius="md" boxShadow="sm">
            <ConsultTable patient={patient} />
          </TabPanel>

          {/* Tab 4: Laboratory */}
          <TabPanel p="20px" borderRadius="md" boxShadow="sm">
            <LabPanel />
          </TabPanel>

          {/* Tab 5: Results */}
          <TabPanel p="20px" borderRadius="md" boxShadow="sm">
            {/* <DiabResultCard patient={patient} /> */}
            <Box mt="20px">
              <DiabResultTable patient={patient} />
            </Box>
            <DiabResultCalculate patient={patient} />
          </TabPanel>

          {/* Tab 6: Full History */}
          <TabPanel p="20px" borderRadius="md" boxShadow="sm">
            <PatientAllInfo patient={patient} />
          </TabPanel>

          {/* Tab 7: Exit Information */}
          <TabPanel p="20px" borderRadius="md" boxShadow="sm">
            <ExitInfoTable patient={patient} />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Render the PatientAppointment modal */}
      <DiabPatientAppointment
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
      />
    </Box>
  );
}
