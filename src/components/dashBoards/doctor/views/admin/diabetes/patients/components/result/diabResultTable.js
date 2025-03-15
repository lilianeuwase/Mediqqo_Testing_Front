import React from "react";
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
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  createColumnHelper,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { SearchBar } from "../../../../../../components/navbar/searchBar/SearchBar";

const columnHelper = createColumnHelper();

export default function DiabResultTable({ patient }) {
  // Style variables matching AdditionalInfoTable.
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const bgColor = useColorModeValue("white", "gray.800"); // background for the table container

  // Local state for table data (allows row-level editing).
  const [tableData, setTableData] = React.useState([]);
  React.useEffect(() => {
    if (!patient || !patient.diagnosis) {
      setTableData([]);
      return;
    }
    const len = patient.diagnosis.length;
    const res = [];
    for (let i = 0; i < len; i++) {
      res.push({
        consultations: i + 1,
        diagnosis: patient.diagnosis[i],
        patient_manage: patient.patient_manage ? patient.patient_manage[i] : "",
        medication: patient.medication ? patient.medication[i] : "",
        comment: patient.doctor_comment ? patient.doctor_comment[i] : "",
        dosage: patient.dosage ? patient.dosage[i] : [], // dosage is an array of 3 strings
        control: patient.control ? patient.control[i] : "",
        resultComment: patient.resultComment ? patient.resultComment[i] : [],
      });
    }
    setTableData(res);
  }, [patient]);

  // Search state and filtering.
  const [searchQuery, setSearchQuery] = React.useState("");
  const filteredData = React.useMemo(() => {
    if (!searchQuery) return tableData;
    return tableData.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [tableData, searchQuery]);

  // Sorting state.
  const [sorting, setSorting] = React.useState([]);

  // Row-level editing state.
  const [editingRowId, setEditingRowId] = React.useState(null);
  const [editingRowData, setEditingRowData] = React.useState({});

  // When "Edit" is clicked for a row, populate editingRowData.
  const handleEdit = (row) => {
    setEditingRowId(row.consultations);
    setEditingRowData({
      patient_manage: row.patient_manage,
      medication: row.medication,
      comment: row.comment,
      // For editing, join arrays into comma-separated strings.
      dosage: Array.isArray(row.dosage) ? row.dosage.join(", ") : "",
      resultComment: Array.isArray(row.resultComment)
        ? row.resultComment.join(", ")
        : "",
    });
  };

  // Save changes via API and update tableData.
  const handleSave = async (consultationNumber) => {
    const rowIndex = consultationNumber - 1; // assuming consultations are 1-indexed
    // Prepare updated data; split dosage and resultComment by comma.
    const updatedData = {
      patient_manage: editingRowData.patient_manage,
      medication: editingRowData.medication,
      comment: editingRowData.comment,
      dosage: editingRowData.dosage
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      resultComment: editingRowData.resultComment
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const payload = {
      phone_number: patient.phone_number,
      recordIndex: rowIndex,
      ...updatedData,
    };

    try {
      const response = await fetch("/editDiabResult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status === "ok") {
        // Update local tableData state.
        const newTableData = [...tableData];
        newTableData[rowIndex] = {
          ...newTableData[rowIndex],
          ...updatedData,
        };
        setTableData(newTableData);
        setEditingRowId(null);
        setEditingRowData({});
      } else {
        alert("Error updating record: " + result.error);
      }
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  // Define columns.
  const columns = React.useMemo(
    () => [
      // Consultation # (not editable)
      columnHelper.accessor("consultations", {
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Consult #
            </Text>
            {column.getIsSorted() === "asc"
              ? " ⬆"
              : column.getIsSorted() === "desc"
              ? " ⬇"
              : null}
          </Flex>
        ),
        cell: (info) => (
          <Text fontSize="sm" color={textColor}>
            {info.getValue()}
          </Text>
        ),
      }),
      // Diagnosis (not editable)
      columnHelper.accessor("diagnosis", {
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Diagnosis
            </Text>
            {column.getIsSorted() === "asc"
              ? " ⬆"
              : column.getIsSorted() === "desc"
              ? " ⬇"
              : null}
          </Flex>
        ),
        cell: (info) => (
          <Text fontSize="sm" color={textColor}>
            {info.getValue()}
          </Text>
        ),
      }),
      // Management (editable)
      columnHelper.accessor("patient_manage", {
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Management
            </Text>
            {column.getIsSorted() === "asc"
              ? " ⬆"
              : column.getIsSorted() === "desc"
              ? " ⬇"
              : null}
          </Flex>
        ),
        cell: (info) => {
          const row = info.row.original;
          if (editingRowId === row.consultations) {
            return (
              <Input
                value={editingRowData.patient_manage || ""}
                onChange={(e) =>
                  setEditingRowData({
                    ...editingRowData,
                    patient_manage: e.target.value,
                  })
                }
              />
            );
          }
          return <Text fontSize="sm" color={textColor}>{info.getValue()}</Text>;
        },
      }),
      // Medication (editable)
      columnHelper.accessor("medication", {
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Medication
            </Text>
            {column.getIsSorted() === "asc"
              ? " ⬆"
              : column.getIsSorted() === "desc"
              ? " ⬇"
              : null}
          </Flex>
        ),
        cell: (info) => {
          const row = info.row.original;
          if (editingRowId === row.consultations) {
            return (
              <Input
                value={editingRowData.medication || ""}
                onChange={(e) =>
                  setEditingRowData({
                    ...editingRowData,
                    medication: e.target.value,
                  })
                }
              />
            );
          }
          return <Text fontSize="sm" color={textColor}>{info.getValue() || "N/A"}</Text>;
        },
      }),
      // Dosage (editable)
      columnHelper.accessor("dosage", {
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Dosage
            </Text>
            {column.getIsSorted() === "asc"
              ? " ⬆"
              : column.getIsSorted() === "desc"
              ? " ⬇"
              : null}
          </Flex>
        ),
        cell: (info) => {
          const row = info.row.original;
          if (editingRowId === row.consultations) {
            return (
              <Input
                value={editingRowData.dosage || ""}
                onChange={(e) =>
                  setEditingRowData({
                    ...editingRowData,
                    dosage: e.target.value,
                  })
                }
              />
            );
          }
          const dosage = info.getValue();
          return (
            <Box>
              {Array.isArray(dosage)
                ? dosage.map((d, i) => <Text key={i}>{d}</Text>)
                : <Text>{dosage}</Text>}
            </Box>
          );
        },
      }),
      // Control (not editable)
      columnHelper.accessor("control", {
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Control
            </Text>
            {column.getIsSorted() === "asc"
              ? " ⬆"
              : column.getIsSorted() === "desc"
              ? " ⬇"
              : null}
          </Flex>
        ),
        cell: (info) => <Text fontSize="sm" color={textColor}>{info.getValue()}</Text>,
      }),
      // Result Comment (editable)
      columnHelper.accessor("resultComment", {
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Result Comment
            </Text>
            {column.getIsSorted() === "asc"
              ? " ⬆"
              : column.getIsSorted() === "desc"
              ? " ⬇"
              : null}
          </Flex>
        ),
        cell: (info) => {
          const row = info.row.original;
          if (editingRowId === row.consultations) {
            return (
              <Input
                value={editingRowData.resultComment || ""}
                onChange={(e) =>
                  setEditingRowData({
                    ...editingRowData,
                    resultComment: e.target.value,
                  })
                }
              />
            );
          }
          const rc = info.getValue();
          return (
            <Box>
              {Array.isArray(rc)
                ? rc.map((r, i) => <Text key={i}>{r}</Text>)
                : <Text>{rc}</Text>}
            </Box>
          );
        },
      }),
      // Doctor Comment (editable) moved to be the last column before Action.
      columnHelper.accessor("comment", {
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Doctor Comment
            </Text>
            {column.getIsSorted() === "asc"
              ? " ⬆"
              : column.getIsSorted() === "desc"
              ? " ⬇"
              : null}
          </Flex>
        ),
        cell: (info) => {
          const row = info.row.original;
          if (editingRowId === row.consultations) {
            return (
              <Input
                value={editingRowData.comment || ""}
                onChange={(e) =>
                  setEditingRowData({
                    ...editingRowData,
                    comment: e.target.value,
                  })
                }
              />
            );
          }
          return <Text fontSize="sm" color={textColor}>{info.getValue()}</Text>;
        },
      }),
      // Action column remains last.
      columnHelper.display({
        id: "action",
        header: "Action",
        cell: (info) => {
          const row = info.row.original;
          if (editingRowId === row.consultations) {
            return (
              <Flex gap="2">
                <Button
                  colorScheme="green"
                  size="xs"
                  onClick={() => handleSave(row.consultations)}
                >
                  Save
                </Button>
                <Button
                  colorScheme="red"
                  size="xs"
                  onClick={() => {
                    setEditingRowId(null);
                    setEditingRowData({});
                  }}
                >
                  Cancel
                </Button>
              </Flex>
            );
          }
          return (
            <Button
              colorScheme="red"
              size="xs"
              onClick={() => handleEdit(row)}
            >
              Edit
            </Button>
          );
        },
      }),
    ],
    [textColor, editingRowId, editingRowData, tableData]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Pagination controls.
  const [pageSize, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(0);
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedRows = table
    .getRowModel()
    .rows.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  return (
    <Box p="4" bg={bgColor} borderRadius="md" boxShadow="sm">
      <Flex justifyContent="space-between" alignItems="center" mb="4" px="25px">
        <Text fontSize="xl" fontWeight="bold" color={textColor}>
          Patient Consultation Results
        </Text>
        <SearchBar
          onSearch={(value) => {
            setSearchQuery(value);
            setCurrentPage(0);
          }}
        />
      </Flex>
      {/* Table container */}
      <Box overflowX={{ sm: "scroll", lg: "hidden" }} px="25px" pb="16px">
        <Table variant="simple" color="gray.500">
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
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {paginatedRows.map((row) => (
              <Tr key={row.id} _hover={{ bg: hoverBg }}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id} borderColor={borderColor} py="5px" px="3px">
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
          {filteredData.length > 0
            ? `${currentPage * pageSize + 1}-${Math.min(
                (currentPage + 1) * pageSize,
                filteredData.length
              )} of ${filteredData.length} Rows`
            : "0 Rows"}
        </Text>
        <Flex align="center" gap="2">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            variant="light"
            size="sm"
            disabled={currentPage === 0}
          >
            {"<"}
          </Button>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            variant="light"
            size="sm"
            disabled={currentPage >= totalPages - 1}
          >
            {">"}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}