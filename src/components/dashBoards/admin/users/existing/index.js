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
import { UserDataAdmin } from "../../../../../DBConnection/UserData"; // Adjust path as needed

// Import your components for user details and permissions
import UserProfileCard from "./components/userProfileCard";

export default function UserInfo() {
  const [tabIndex, setTabIndex] = useState(0);
  const bgHeader = useColorModeValue("white", "gray.700");
  const user = UserDataAdmin();

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

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box mt="40px" pt={{ base: "130px", md: "80px", xl: "80px" }} px="20px">
      {/* Header with Title and Actions Menu */}
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
          {`${user.fname} ${user.lname}`}
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
            <MenuItem>Edit User</MenuItem>
            <MenuItem>More</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* Two Tabs: User and Permissions */}
      <Tabs
        index={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList>
          <Tab
            _selected={{
              color: "brand.500",
              fontWeight: "bold",
              borderBottomColor: "brand.500",
            }}
          >
            User Info
          </Tab>
          <Tab
            _selected={{
              color: "orange.500",
              fontWeight: "bold",
              borderBottomColor: "orange.500",
            }}
          >
            Permissions
          </Tab>
        </TabList>
        <TabPanels>
          {/* Tab 1: User Details */}
          <TabPanel p="20px" borderRadius="md" boxShadow="sm">
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing="20px"
              alignItems="stretch"
            >
              <Box display="flex" flexDirection="column" h="100%">
                <UserProfileCard user={user} />
              </Box>
              <Box display="flex" flexDirection="column" h="100%">
                {/* You can add additional user management components here */}
                <Text fontSize="md" color="gray.500">
                  Additional user info or settings can go here.
                </Text>
              </Box>
            </SimpleGrid>
          </TabPanel>
          {/* Tab 2: Permissions */}
          <TabPanel p="20px" borderRadius="md" boxShadow="sm">
            {/* <UserPermissions user={user} /> */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
