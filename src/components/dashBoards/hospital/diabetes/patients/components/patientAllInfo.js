import React, { useState, useMemo } from "react";
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
  Select,
  Checkbox,
  CheckboxGroup,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "../../../../common/components/card/Card";
import { SearchBar } from "../../../../common/components/navbar/searchBar/SearchBar";
import {
  createColumnHelper,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";

const columnHelper = createColumnHelper();

// Helper to format field values.
function formatField(value) {
  if (Array.isArray(value)) {
    // Process each element of the array:
    return value
      .map((item) => {
        if (typeof item === "string" && item.includes(",")) {
          // Split by comma, trim each part, and join with newline
          return item
            .split(",")
            .map((s) => s.trim())
            .join("\n");
        }
        return item;
      })
      .join("\n");
  }
  if (typeof value === "string" && value.includes(",")) {
    // For strings that include a comma, split and join with newline
    return value
      .split(",")
      .map((s) => s.trim())
      .join("\n");
  }
  return value;
}

// Helper to get BMI color based on the value.
function getBmiColor(bmi) {
  const numericBmi = parseFloat(bmi);
  if (isNaN(numericBmi)) return "inherit"; // default if value is not a number
  if (numericBmi < 18.5) return "blue.400";
  if (numericBmi < 25) return "green.400";
  if (numericBmi < 30) return "yellow.400";
  return "red.300";
}

// List of fields from your schema.
const allFields = [
  { key: "consultations", label: "Visit" },
  { key: "doctor_name", label: "Doctor Name" },
  { key: "hospital", label: "Hospital" },
  { key: "height", label: "Height" },
  { key: "weight", label: "Weight" },
  { key: "bmi", label: "BMI" },
  { key: "phone_number", label: "Phone Number" },
  { key: "full_address", label: "Full Address" },
  { key: "vitalsDates", label: "Vitals Date" },
  { key: "temp", label: "Temp" },
  { key: "HR", label: "HR" },
  { key: "BP", label: "BP" },
  { key: "O2", label: "O2" },
  { key: "RR", label: "RR" },
  { key: "moreVitals", label: "More Vitals" },
  { key: "labDates", label: "Lab Date" },
  { key: "glucose", label: "Random Glucose" },
  { key: "fastglucose", label: "Fast Glucose" },
  { key: "hb", label: "Hb" },
  { key: "creatinine", label: "Creatinine" },
  { key: "requestLab", label: "Request Lab" },
  { key: "requestLabsDates", label: "Request Labs Date" },
  { key: "moreLab", label: "More Lab" },
  { key: "doctorDates", label: "Consultation Date" },
  { key: "doctor_comment", label: "Doctor Comment" },
  { key: "clinicalSymp", label: "Clinical Symptoms" },
  { key: "dangerSigns", label: "Danger Signs" },
  { key: "complications", label: "Complications" },
  { key: "comorbidities", label: "Comorbidities" },
  { key: "diagnosis", label: "Diagnosis" },
  { key: "medication", label: "Medication" },
  { key: "dosage", label: "Dosage" },
  { key: "patient_manage", label: "Patient Manage" },
  { key: "control", label: "Control" },
  { key: "resultComment", label: "System Comment" },
  { key: "appointment", label: "Appointment" },
  { key: "status", label: "Status" },
];

// Generate columns based on selected (visible) fields.
const generateColumns = (visibleColumns) => {
  return allFields
    .filter((field) => visibleColumns.includes(field.key))
    .map((field) => {
      // Special handling for the BMI column.
      if (field.key === "bmi") {
        return columnHelper.accessor(field.key, {
          id: field.key,
          header: ({ column }) => (
            <Flex
              cursor="pointer"
              onClick={column.getToggleSortingHandler()}
              align="center"
              px="3px"
            >
              <Text fontSize="sm" color="gray.400">
                {field.label}
              </Text>
              {column.getIsSorted() === "asc"
                ? " ⬆"
                : column.getIsSorted() === "desc"
                ? " ⬇"
                : null}
            </Flex>
          ),
          cell: (info) => {
            const value = info.getValue();
            const bmiColor = getBmiColor(value);
            return (
              <Text
                fontSize="sm"
                whiteSpace="pre-line"
                overflowWrap="break-word"
                minWidth="max-content"
                color={bmiColor} // sets the text color instead of background color
                fontWeight="bold"
              >
                {formatField(value)}
              </Text>
            );
          },
        });
      }
      // Default cell renderer for all other columns.
      return columnHelper.accessor(field.key, {
        id: field.key,
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              {field.label}
            </Text>
            {column.getIsSorted() === "asc"
              ? " ⬆"
              : column.getIsSorted() === "desc"
              ? " ⬇"
              : null}
          </Flex>
        ),
        cell: (info) => (
          <Text
           fontSize="sm"
           color="gray.900"
            whiteSpace="pre-line"
            overflowWrap="break-word"
            minWidth="max-content"
          >
            {formatField(info.getValue())}
          </Text>
        ),
      });
    });
};

export default function PatientAllInfo({ patient }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  // State for visible columns, initially all columns are visible.
  const [visibleColumns, setVisibleColumns] = useState(
    allFields.map((f) => f.key)
  );

  // Transform patient data to have one row per consultation using vitalsDates.
  const data = useMemo(() => {
    if (!patient) return [];
    const patientRecords = Array.isArray(patient) ? patient : [patient];
    const rows = [];
    patientRecords.forEach((p) => {
      // Use the length of vitalsDates array as the number of rows,
      // or fallback to one row if it doesn't exist.
      const numRows =
        Array.isArray(p.vitalsDates) && p.vitalsDates.length
          ? p.vitalsDates.length
          : 1;
      for (let i = 0; i < numRows; i++) {
        const row = {};
        allFields.forEach((field) => {
          if (field.key === "consultations") {
            // Instead of displaying the value from patient, assign the consultation number (1, 2, 3, ...)
            row[field.key] = i + 1;
          } else {
            const fieldValue = p[field.key];
            if (Array.isArray(fieldValue)) {
              row[field.key] =
                fieldValue[i] !== undefined ? fieldValue[i] : null;
            } else {
              row[field.key] = fieldValue;
            }
          }
        });
        rows.push(row);
      }
    });
    return rows;
  }, [patient]);

  const [sorting, setSorting] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const columns = useMemo(
    () => generateColumns(visibleColumns),
    [visibleColumns]
  );
  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedRows = table
    .getRowModel()
    .rows.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  if (!patient) {
    return <Text>Loading...</Text>;
  }

  return (
    <Card p="0px">
      {/* Header */}
      <Flex
        direction="column"
        px="25px"
        py="15px"
        justifyContent="space-between"
        align="center"
        gap="15px"
      >
        <Flex w="100%" justifyContent="space-between" align="center">
          <Text fontSize="22px" fontWeight="700" color={textColor}>
            All Patient Information
          </Text>
          <Flex align="center" gap="10px">
            <SearchBar
              onSearch={(value) => {
                setSearchQuery(value);
                setCurrentPage(0);
              }}
            />
            {/* Dropdown for column selection */}
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="secondaryGray">
                Select Columns
              </MenuButton>
              <MenuList>
                <CheckboxGroup
                  colorScheme="blue"
                  value={visibleColumns}
                  onChange={(values) => {
                    setVisibleColumns(values);
                  }}
                >
                  <Stack p="4" spacing="2">
                    {allFields.map((field) => (
                      <Checkbox key={field.key} value={field.key}>
                        {field.label}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Flex>
      {/* Scrollable table */}
      <Box overflowX="auto" px="25px" pb="16px">
        <Table variant="simple" color="gray.500" tableLayout="auto">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    borderColor={borderColor}
                    cursor="pointer"
                    onClick={header.column.getToggleSortingHandler()}
                    px="3px"
                    py="6px"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {paginatedRows.length === 0 ? (
              <Tr>
                <Td
                  colSpan={columns.length}
                  textAlign="center"
                  color={textColor}
                  px="3px"
                  py="6px"
                >
                  No data available.
                </Td>
              </Tr>
            ) : (
              paginatedRows.map((row) => (
                <Tr key={row.id} _hover={{ bg: "gray.100" }}>
                  {row.getVisibleCells().map((cell) => (
                    <Td
                      key={cell.id}
                      borderColor={borderColor}
                      py="5px"
                      px="3px"
                      textAlign="center"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>
      {/* Pagination controls */}
      <Flex justify="space-between" align="center" px="25px" pb="16px">
        <Flex align="center" gap="2">
          <Text fontSize="sm" color={textColor}>
            Rows Per Page:
          </Text>
          <Select
            width="80px"
            height="35px"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(0);
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Select>
        </Flex>
        <Text fontSize="sm" color={textColor}>
          {`Showing ${
            filteredData.length > 0 ? currentPage * pageSize + 1 : 0
          } - ${Math.min(
            (currentPage + 1) * pageSize,
            filteredData.length
          )} of ${filteredData.length} entries`}
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
    </Card>
  );
}
