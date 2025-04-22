import React, { useEffect, useState } from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  createColumnHelper,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { SearchBar } from "../../../../../common/components/navbar/searchBar/SearchBar";
import toTitleCase from "../../../../../common/components/toTitleCase";

const columnHelper = createColumnHelper();

// Centered popup component for notifications.
const CenteredPopup = ({ message, onClose }) => (
  <Box
    position="fixed"
    top="0"
    left="0"
    width="100%"
    height="100%"
    bg="rgba(0,0,0,0.5)"
    display="flex"
    alignItems="center"
    justifyContent="center"
    zIndex="2000"
  >
    <Box
      bg="white"
      p="20px"
      borderRadius="8px"
      textAlign="center"
      boxShadow="lg"
      maxW="90%"
    >
      <Text mb="4">{message}</Text>
      <Button colorScheme="red" onClick={onClose}>
        Ok
      </Button>
    </Box>
  </Box>
);

export default function DiabResultTable({ patient }) {
  // API Host
  const [apiHost, setApiHost] = useState("");

  // Style variables
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const bgColor = useColorModeValue("white", "gray.800");

  // Notification state for centered popups.
  const [notification, setNotification] = useState("");

  // Local state for table data.
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
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
        dosage: patient.dosage ? patient.dosage[i] : [], // dosage is an array of strings
        control: patient.control ? patient.control[i] : "",
        resultComment: patient.resultComment ? patient.resultComment[i] : [],
      });
    }
    setTableData(res);
  }, [patient]);

  // Search state and filtering.
  const [searchQuery, setSearchQuery] = useState("");
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
  const [sorting, setSorting] = useState([]);

  // Editing state.
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingRowData, setEditingRowData] = useState({});

  // Modal control.
  const { isOpen, onOpen, onClose } = useDisclosure();

  // When "Edit" is clicked, populate editing state and open the modal.
  const handleEdit = (row) => {
    setEditingRowId(row.consultations);
    setEditingRowData({
      patient_manage: row.patient_manage,
      medication: row.medication,
      comment: row.comment,
      // Instead of joining, store dosage as an array.
      dosage: Array.isArray(row.dosage) ? row.dosage : ["", "", ""],
      // Remove resultComment from the editing state.
    });
    onOpen();
  };

  // Load the host URL from a text file.
  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  // Save changes via API and update tableData.
  const handleSave = async (consultationNumber) => {
    const rowIndex = consultationNumber - 1; // consultations are 1-indexed
    const updatedData = {
      patient_manage: editingRowData.patient_manage,
      medication: editingRowData.medication,
      dosage: Array.isArray(editingRowData.dosage)
        ? editingRowData.dosage
        : [editingRowData.dosage],
      doctor_comment: editingRowData.comment, // using doctor_comment as key
    };

    const payload = {
      phone_number: patient.phone_number,
      recordIndex: rowIndex,
      ...updatedData,
    };

    try {
      const response = await fetch(apiHost + "/editDiabResultFront", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status === "ok") {
        // Update the local tableData accordingly.
        const newTableData = [...tableData];
        newTableData[rowIndex] = {
          ...newTableData[rowIndex],
          patient_manage: updatedData.patient_manage,
          medication: updatedData.medication,
          dosage: updatedData.dosage,
          comment: updatedData.doctor_comment,
        };
        setTableData(newTableData);
        setEditingRowId(null);
        setEditingRowData({});
        onClose();
        setNotification("Record updated successfully!");
      } else {
        setNotification("Error updating record: " + result.error);
      }
    } catch (error) {
      console.error("Error updating record:", error);
      setNotification("Error updating record: " + error.message);
    }
  };

  // Define columns.
  const columns = React.useMemo(
    () => [
      // Consultation #
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
      // Diagnosis
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
      // Management (non-editable in table)
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
        cell: (info) => (
          <Text fontSize="sm" color={textColor}>
            {info.getValue()}
          </Text>
        ),
      }),
      // Medication (non-editable in table)
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
        cell: (info) => (
          <Text fontSize="sm" color={textColor}>
            {info.getValue() || "N/A"}
          </Text>
        ),
      }),
      // Dosage – using toTitleCase for display.
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
          const dosage = info.getValue();
          return (
            <Box>
              {Array.isArray(dosage) ? (
                dosage.map((d, i) => (
                  <Text key={i} fontSize="sm" color={textColor} >{toTitleCase(d)}</Text>
                ))
              ) : (
                <Text fontSize="sm" color={textColor}>{toTitleCase(dosage)}</Text>
              )}
            </Box>
          );
        },
      }),
      // Control
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
        cell: (info) => (
          <Text fontSize="sm" color={textColor}>
            {info.getValue()}
          </Text>
        ),
      }),
      // Result Comment
      columnHelper.accessor("resultComment", {
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Generated Comment
            </Text>
            {column.getIsSorted() === "asc"
              ? " ⬆"
              : column.getIsSorted() === "desc"
              ? " ⬇"
              : null}
          </Flex>
        ),
        cell: (info) => {
          const rc = info.getValue();
          return (
            <Box>
              {Array.isArray(rc) ? (
                rc.map((r, i) => <Text key={i} fontSize="sm" color={textColor}>{r}</Text>)
              ) : (
                <Text fontSize="sm" color={textColor}>{rc}</Text>
              )}
            </Box>
          );
        },
      }),
      // Doctor Comment
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
        cell: (info) => (
          <Text fontSize="sm" color={textColor}>
            {info.getValue()}
          </Text>
        ),
      }),
      // Action column: triggers the modal for editing.
      columnHelper.display({
        id: "action",
        header: "Action",
        cell: (info) => {
          const row = info.row.original;
          return (
            <Button colorScheme="red" size="xs" onClick={() => handleEdit(row)}>
              Edit
            </Button>
          );
        },
      }),
    ],
    [textColor, tableData]
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
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedRows = table
    .getRowModel()
    .rows.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  return (
    <Box p="4" bg={bgColor} borderRadius="md" boxShadow="sm">
      {notification && (
        <CenteredPopup message={notification} onClose={() => setNotification("")} />
      )}
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
      {/* Modal for editing */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setEditingRowId(null);
          setEditingRowData({});
          onClose();
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Consultation {editingRowId} Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb="4">
              <FormLabel>Management</FormLabel>
              <Textarea
                value={editingRowData.patient_manage || ""}
                onChange={(e) =>
                  setEditingRowData({
                    ...editingRowData,
                    patient_manage: e.target.value,
                  })
                }
                placeholder="Management"
                resize="vertical"
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Medication</FormLabel>
              <Textarea
                value={editingRowData.medication || ""}
                onChange={(e) =>
                  setEditingRowData({
                    ...editingRowData,
                    medication: e.target.value,
                  })
                }
                placeholder="Medication"
                resize="vertical"
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Medication Name</FormLabel>
              <Input
                value={
                  editingRowData.dosage && editingRowData.dosage[0]
                    ? editingRowData.dosage[0]
                    : ""
                }
                onChange={(e) => {
                  const newDosage = editingRowData.dosage
                    ? [...editingRowData.dosage]
                    : ["", "", ""];
                  newDosage[0] = e.target.value;
                  setEditingRowData({ ...editingRowData, dosage: newDosage });
                }}
                placeholder="Medication Name"
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Dose</FormLabel>
              <Input
                value={
                  editingRowData.dosage && editingRowData.dosage[1]
                    ? editingRowData.dosage[1]
                    : ""
                }
                onChange={(e) => {
                  const newDosage = editingRowData.dosage
                    ? [...editingRowData.dosage]
                    : ["", "", ""];
                  newDosage[1] = e.target.value;
                  setEditingRowData({ ...editingRowData, dosage: newDosage });
                }}
                placeholder="Dose"
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Administration</FormLabel>
              <Input
                value={
                  editingRowData.dosage && editingRowData.dosage[2]
                    ? editingRowData.dosage[2]
                    : ""
                }
                onChange={(e) => {
                  const newDosage = editingRowData.dosage
                    ? [...editingRowData.dosage]
                    : ["", "", ""];
                  newDosage[2] = e.target.value;
                  setEditingRowData({ ...editingRowData, dosage: newDosage });
                }}
                placeholder="Administration"
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Doctor Comment</FormLabel>
              <Textarea
                value={editingRowData.comment || ""}
                onChange={(e) =>
                  setEditingRowData({
                    ...editingRowData,
                    comment: e.target.value,
                  })
                }
                placeholder="Doctor Comment"
                resize="vertical"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => handleSave(editingRowId)}>
              Save
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setEditingRowId(null);
                setEditingRowData({});
                onClose();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
