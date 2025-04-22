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
import Card from "../../../../common/components/card/Card";
import { SearchBar } from "../../../../common/components/navbar/searchBar/SearchBar";
// Import the getDiabPatient function for row click
import { getDiabPatient } from "../../../../../../DBConnection/DiabetesPatients";
import PatientProfile from "../../../diabetes/new/patientProfile";

// Import the PatientProfile component to show in the drawer

const columnHelper = createColumnHelper();

export default function PatientsTable(props) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [pageSize, setPageSize] = React.useState(20);
  const [currentPage, setCurrentPage] = React.useState(0);

  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  let defaultData = tableData;

  // Columns definitions (unchanged)
  const columns = [
    columnHelper.accessor("lname", {
      id: "lname",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          LAST NAME
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor("fname", {
      id: "fname",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          FIRST NAME
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor("age", {
      id: "age",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          AGE
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor("gender", {
      id: "gender",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          GENDER
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor("phone_number", {
      id: "phone_number",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          PHONE NUMBER
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor("consultations", {
      id: "consultations",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          Visits
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor("diagnosis", {
      id: "diagnosis",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          Diagnosis
        </Text>
      ),
      cell: (info) => {
        const diagnosisArray = info.getValue();
        const lastDiagnosis =
          Array.isArray(diagnosisArray) && diagnosisArray.length > 0
            ? diagnosisArray[diagnosisArray.length - 1]
            : diagnosisArray;
        return (
          <Flex align="center">
            <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
              {lastDiagnosis}
            </Text>
          </Flex>
        );
      },
    }),
  ];

  // State for the table data (filtered based on search)
  const [data, setData] = React.useState(() => [...defaultData]);

  // Filter data when searchQuery changes.
  React.useEffect(() => {
    if (searchQuery === "") {
      setData([...defaultData]);
    } else {
      const filtered = defaultData.filter((row) => {
        return Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
      setData(filtered);
    }
    setCurrentPage(0); // Reset to first page on search
  }, [searchQuery, defaultData]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  // Pagination calculations
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedRows = table
    .getRowModel()
    .rows.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  // Drawer for PatientProfile
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
      {/* Top header: Title, SearchBar, and + Add Patient Button */}
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          My Patients
        </Text>
        <Flex align="center" gap="8px">
          <SearchBar onSearch={(value) => setSearchQuery(value)} />
          <Button variant="brand" size="md" onClick={onDrawerOpen}>
            + Add Patient
          </Button>
        </Flex>
      </Flex>
      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
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
                        {{
                          asc: "",
                          desc: "",
                        }[header.column.getIsSorted()] ?? null}
                      </Flex>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {paginatedRows.map((row) => {
              return (
                <Tr
                  key={row.id}
                  cursor="pointer"
                  _hover={{ bg: hoverBg }}
                  onClick={() => {
                    const identifier =
                      row.original.phone_number ||
                      row.original.ID ||
                      row.original.uniqueID;
                    getDiabPatient(identifier);
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td
                        key={cell.id}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor="transparent"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
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
          )} Patients of ${defaultData.length} Patients`}
        </Text>
        <Flex align="center" gap="2">
          <Button
            onClick={() => {
              if (currentPage > 0) {
                setCurrentPage(currentPage - 1);
              }
            }}
            variant="light"
            size="sm"
            disabled={currentPage === 0}
          >
            <ChevronLeftIcon />
          </Button>

          <Button
            onClick={() => {
              if (currentPage < totalPages - 1) {
                setCurrentPage(currentPage + 1);
              }
            }}
            disabled={currentPage >= totalPages - 1}
          >
            <ChevronRightIcon />
          </Button>
        </Flex>
      </Flex>

      {/* Drawer for PatientProfile */}
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
          <DrawerHeader borderBottomWidth="1px">
            Patient Registration / Diabetes
          </DrawerHeader>
          <DrawerBody>
            <PatientProfile />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Card>
  );
}
