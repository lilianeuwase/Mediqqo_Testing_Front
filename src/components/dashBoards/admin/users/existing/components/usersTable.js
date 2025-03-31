"use client";
/* eslint-disable */

import React from "react";
import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  Select,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

// Custom components
import Card from "../../../../doctor/components/card/Card";
import { SearchBar } from "../../../../doctor/components/navbar/searchBar/SearchBar";
// Import the getUser function for row click
import { getUser } from "../../../../../../DBConnection/UserData";
// Import the UserProfile component to show in the drawer
import UserProfile from "../../new/userProfile";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("lname", {
    id: "lname",
    header: () => (
      <Text
        fontSize={{ sm: "10px", lg: "12px" }}
        color="gray.400"
        textTransform="uppercase"
      >
        Last Name
      </Text>
    ),
    cell: (info) => (
      <Flex align="center">
        <Text
          color={useColorModeValue("secondaryGray.900", "white")}
          fontSize="sm"
          fontWeight="700"
        >
          {info.getValue()}
        </Text>
      </Flex>
    ),
  }),
  columnHelper.accessor("fname", {
    id: "fname",
    header: () => (
      <Text
        fontSize={{ sm: "10px", lg: "12px" }}
        color="gray.400"
        textTransform="uppercase"
      >
        First Name
      </Text>
    ),
    cell: (info) => (
      <Flex align="center">
        <Text
          color={useColorModeValue("secondaryGray.900", "white")}
          fontSize="sm"
          fontWeight="700"
        >
          {info.getValue()}
        </Text>
      </Flex>
    ),
  }),
  columnHelper.accessor("email", {
    id: "email",
    header: () => (
      <Text
        fontSize={{ sm: "10px", lg: "12px" }}
        color="gray.400"
        textTransform="uppercase"
      >
        Email
      </Text>
    ),
    cell: (info) => (
      <Flex align="center">
        <Text
          color={useColorModeValue("secondaryGray.900", "white")}
          fontSize="sm"
          fontWeight="700"
        >
          {info.getValue()}
        </Text>
      </Flex>
    ),
  }),
  columnHelper.accessor("phone_number", {
    id: "phone_number",
    header: () => (
      <Text
        fontSize={{ sm: "10px", lg: "12px" }}
        color="gray.400"
        textTransform="uppercase"
      >
        Phone Number
      </Text>
    ),
    cell: (info) => (
      <Flex align="center">
        <Text
          color={useColorModeValue("secondaryGray.900", "white")}
          fontSize="sm"
          fontWeight="700"
        >
          {info.getValue()}
        </Text>
      </Flex>
    ),
  }),
  columnHelper.accessor("userType", {
    id: "userType",
    header: () => (
      <Text
        fontSize={{ sm: "10px", lg: "12px" }}
        color="gray.400"
        textTransform="uppercase"
      >
        User Type
      </Text>
    ),
    cell: (info) => (
      <Flex align="center">
        <Text
          color={useColorModeValue("secondaryGray.900", "white")}
          fontSize="sm"
          fontWeight="700"
        >
          {info.getValue()}
        </Text>
      </Flex>
    ),
  }),
  columnHelper.accessor("hospital", {
    id: "hospital",
    header: () => (
      <Text
        fontSize={{ sm: "10px", lg: "12px" }}
        color="gray.400"
        textTransform="uppercase"
      >
        Hospital
      </Text>
    ),
    cell: (info) => (
      <Flex align="center">
        <Text
          color={useColorModeValue("secondaryGray.900", "white")}
          fontSize="sm"
          fontWeight="700"
        >
          {info.getValue()}
        </Text>
      </Flex>
    ),
  }),
];

export default function UsersTable(props) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [pageSize, setPageSize] = React.useState(20);
  const [currentPage, setCurrentPage] = React.useState(0);

  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  // Ensure tableData is iterable by checking if it's an array.
  const defaultData = Array.isArray(tableData) ? tableData : [];

  // Initialize local state once using a functional initializer.
  const [data, setData] = React.useState(() => [...defaultData]);

  // Filter data based on searchQuery.
  React.useEffect(() => {
    if (searchQuery === "") {
      setData([...defaultData]);
    } else {
      const filtered = defaultData.filter((row) =>
        Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setData(filtered);
    }
    setCurrentPage(0);
  }, [searchQuery, defaultData]);

  // Create the table instance.
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: false,
  });

  // Pagination calculations.
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedRows = table
    .getRowModel()
    .rows.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  // Drawer for UserProfile.
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const firstFieldRef = React.useRef();

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      {/* Header: Title, SearchBar, and + Add User Button */}
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Users
        </Text>
        <Flex align="center" gap="8px">
          <SearchBar onSearch={setSearchQuery} />
          <Button variant="brand" size="md" onClick={onDrawerOpen}>
            + Add User
          </Button>
        </Flex>
      </Flex>
      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    pe="10px"
                    borderColor={borderColor}
                    cursor="pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Flex
                      justifyContent="space-between"
                      align="center"
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color="gray.400"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {paginatedRows.map((row) => (
              <Tr
                key={row.id}
                cursor="pointer"
                _hover={{ bg: hoverBg }}
                onClick={() => {
                  const identifier =
                    row.original.phone_number ||
                    row.original.ID ||
                    row.original.uniqueID;
                  getUser(identifier);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <Td
                    key={cell.id}
                    fontSize={{ sm: "14px" }}
                    minW={{ sm: "150px", md: "200px", lg: "auto" }}
                    borderColor="transparent"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      {/* Pagination Controls */}
      <Flex justify="space-between" align="center" px="25px" pb="16px">
        <Flex align="center" gap="2">
          <Text fontSize="sm" color={textColor}>
            Rows Per Page:
          </Text>
          <Select
            width="80px"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(0);
            }}
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Select>
        </Flex>
        <Text fontSize="sm" color={textColor}>
          {`${
            defaultData.length > 0 ? currentPage * pageSize + 1 : 0
          }-${Math.min(
            (currentPage + 1) * pageSize,
            defaultData.length
          )} Users of ${defaultData.length} Users`}
        </Text>
        <Flex align="center" gap="2">
          <Button
            onClick={() => {
              if (currentPage > 0) setCurrentPage(currentPage - 1);
            }}
            variant="light"
            size="sm"
            disabled={currentPage === 0}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            onClick={() => {
              if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
            }}
            disabled={currentPage >= totalPages - 1}
          >
            <ChevronRightIcon />
          </Button>
        </Flex>
      </Flex>

      {/* Drawer for UserProfile */}
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        initialFocusRef={firstFieldRef}
        onClose={onDrawerClose}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">User Details</DrawerHeader>
          <DrawerBody>
            <UserProfile />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Card>
  );
}
