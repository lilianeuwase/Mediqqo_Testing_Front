import React, { useState, useEffect } from "react";
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
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import Card from "../../../../../common/components/card/Card";
import { SearchBar } from "../../../../../common/components/navbar/searchBar/SearchBar";
import {
  createColumnHelper,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

// ------------------------------------------------------------------
// DeleteConfirmationModal: A modal to confirm deletion of a lab request.
function DeleteConfirmationModal({ isOpen, onClose, onConfirm, recordDate }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete the lab request for{" "}
            <strong>{recordDate}</strong>?
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onConfirm}>
            Confirm
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// ------------------------------------------------------------------
// EditLabExamModal: A modal for editing a lab request using a centered pop-up layout similar to LabExamModal.
function EditLabExamModal({ isOpen, onClose, initialData, labExamOptions, onSave }) {
  const modalTextColor = useColorModeValue("secondaryGray.900", "white");
  const [searchTerm, setSearchTerm] = useState("");

  // Default options if none provided.
  const defaultLabExamOptions = [
    "Fasting Blood Glucose",
    "HbA1c",
    "Oral Glucose Tolerance Test",
    "Random Blood Glucose",
    "Serum Insulin Levels",
    "Fructosamine",
    "Serum Creatinine",
    "Blood Urea Nitrogen (BUN)",
    "Electrolyte Panel",
    "Lipid Profile",
    "Urinalysis",
    "Urine Albumin-Creatinine Ratio",
    "Complete Blood Count (CBC)",
    "Eosinophil Count",
    "Sputum Eosinophils",
    "IgE Levels",
    "Allergy Panel",
  ];
  const options = labExamOptions && labExamOptions.length > 0 ? labExamOptions : defaultLabExamOptions;

  // These states will store the selected checklist items and custom lab tests.
  const [selectedExams, setSelectedExams] = useState([]);
  // customLabs is an array of strings; we always add an empty string at the end for a new entry.
  const [customLabs, setCustomLabs] = useState([""]);

  // Initialize state only when the modal is opened.
  useEffect(() => {
    if (isOpen && initialData && initialData.requestLab) {
      const labs = Array.isArray(initialData.requestLab)
        ? initialData.requestLab
        : initialData.requestLab.split(",").map((lab) => lab.trim());
      const initialSelectedExams = labs.filter((lab) => options.includes(lab));
      const initialCustomLabs = labs.filter((lab) => !options.includes(lab));
      setSelectedExams(initialSelectedExams);
      // Always ensure there’s a free empty cell at the end.
      setCustomLabs([...initialCustomLabs, ""]);
    }
  }, [isOpen, initialData]);

  // Filter the available lab options by the search term.
  const filteredLabOptions = options.filter((exam) =>
    exam.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update the custom lab at a given index.
  const handleCustomLabChange = (index, value) => {
    setCustomLabs((prev) => {
      const newLabs = [...prev];
      newLabs[index] = value;
      // If typing in the free cell and it becomes non-empty, add a new empty cell.
      if (index === newLabs.length - 1 && value.trim() !== "") {
        newLabs.push("");
      }
      // Remove extra trailing empty cells.
      while (newLabs.length > 1 && newLabs[newLabs.length - 2] === "" && newLabs[newLabs.length - 1] === "") {
        newLabs.pop();
      }
      return newLabs;
    });
  };

  // Remove a custom lab cell at the given index.
  const handleDeleteCustomLab = (index) => {
    setCustomLabs((prev) => {
      const newLabs = prev.filter((_, i) => i !== index);
      // Always leave at least one empty cell.
      if (newLabs.length === 0 || newLabs[newLabs.length - 1] !== "") {
        newLabs.push("");
      }
      return newLabs;
    });
  };

  // On save, combine checklist items with non-empty custom labs.
  const handleSave = () => {
    const nonEmptyCustomLabs = customLabs.filter((lab) => lab.trim() !== "");
    const combinedExams = Array.from(new Set([...selectedExams, ...nonEmptyCustomLabs]));
    onSave({ ...initialData, requestLab: combinedExams });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={modalTextColor}>Edit Lab Request</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Search lab exam..."
            mb="4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CheckboxGroup
            colorScheme="purple"
            value={selectedExams}
            onChange={(values) => setSelectedExams(values)}
          >
            <Flex direction="column" gap="8px" maxH="200px" overflowY="auto">
              {filteredLabOptions.map((exam, index) => (
                <Checkbox key={index} value={exam}>
                  {exam}
                </Checkbox>
              ))}
            </Flex>
          </CheckboxGroup>
          <Text mt="4" mb="2">
            Other Lab Tests:
          </Text>
          {customLabs.map((lab, index) => (
            <Flex key={index} align="center" mb="2">
              <Input
                placeholder="Other Lab Test"
                value={lab}
                onChange={(e) => handleCustomLabChange(index, e.target.value)}
              />
              {lab.trim() !== "" && index !== customLabs.length - 1 && (
                <Button
                  ml="2"
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDeleteCustomLab(index)}
                >
                  Delete
                </Button>
              )}
            </Flex>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="purple" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="outline" colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// ------------------------------------------------------------------
// RequestLabTable Component
export default function RequestLabTable({ patient }) {
  // patient is expected to have fields: requestLabsDates and requestLab,
  // and an identifier such as patient.phone_number for API calls.
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  // Table states
  const [sorting, setSorting] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  // States for the Edit Modal (using the new EditLabExamModal).
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  // States for the Delete Confirmation Modal.
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteData, setSelectedDeleteData] = useState(null);
  const [selectedDeleteRowIndex, setSelectedDeleteRowIndex] = useState(null);

  // Load API host state.
  const [apiHost, setApiHost] = useState("");
  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  const columnHelper = createColumnHelper();

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("requestLabsDates", {
        id: "requestLabsDates",
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Date of Request
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
      columnHelper.accessor("requestLab", {
        id: "requestLab",
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Requested Lab Tests
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
          const testsArray = Array.isArray(value) ? value : [value];
          return (
            <Text fontSize="sm" color={textColor}>
              {testsArray.map((test, idx) => {
                const formatted =
                  typeof test === "string" && test.length > 0
                    ? test.charAt(0).toUpperCase() + test.slice(1)
                    : test;
                return (
                  <React.Fragment key={idx}>
                    {formatted}
                    {idx !== testsArray.length - 1 && <br />}
                  </React.Fragment>
                );
              })}
            </Text>
          );
        },
      }),
      // Action column: includes Edit and Delete buttons.
      columnHelper.display({
        id: "action",
        header: () => (
          <Text fontSize="sm" color="gray.400" px="3px">
            Action
          </Text>
        ),
        cell: (info) => (
          <Flex gap="4" px="3px">
            <Button
              variant="blue"
              size="xs"
              onClick={() => {
                setSelectedEditData(info.row.original);
                setSelectedRowIndex(info.row.index);
                setIsEditModalOpen(true);
              }}
            >
              Edit
            </Button>
            <Button
              variant="outline"
              colorScheme="red"
              size="xs"
              onClick={() => {
                setSelectedDeleteData(info.row.original);
                setSelectedDeleteRowIndex(info.row.index);
                setIsDeleteModalOpen(true);
              }}
            >
              Delete
            </Button>
          </Flex>
        ),
      }),
    ],
    [textColor]
  );

  // Prepare data and activate search filtering.
  const allData = React.useMemo(() => {
    if (patient && Array.isArray(patient.requestLabsDates)) {
      return patient.requestLabsDates.map((date, index) => ({
        requestLabsDates: date,
        requestLab: patient.requestLab ? patient.requestLab[index] : "",
      }));
    }
    return [];
  }, [patient]);

  const filteredData = React.useMemo(() => {
    if (!searchQuery) return allData;
    return allData.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [allData, searchQuery]);

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

  // API call to edit a lab request.
  const handleModalSave = async (updatedData) => {
    const payload = {
      phone_number: patient.phone_number, // Unique identifier
      recordIndex: selectedRowIndex,
      requestLabsDates: updatedData.requestLabsDates, // Date remains unchanged.
      requestLab: updatedData.requestLab,
    };

    try {
      const response = await fetch(`${apiHost}/editDiabRequestedLab`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status === "ok") {
        window.location.reload();
      } else {
        alert("Error updating lab request: " + result.error);
      }
    } catch (error) {
      console.error("Error updating lab request:", error);
    }
  };

  // API call to delete a lab request.
  const handleDelete = async () => {
    const payload = {
      phone_number: patient.phone_number,
      recordIndex: selectedDeleteRowIndex,
    };

    try {
      const response = await fetch(`${apiHost}/deleteDiabRequestedLab`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status === "ok") {
        window.location.reload();
      } else {
        alert("Error deleting lab request: " + result.error);
      }
    } catch (error) {
      console.error("Error deleting lab request:", error);
    }
  };

  return (
    <Card p="0px">
      <Flex px="25px" py="15px" justifyContent="space-between" align="center">
        <Text fontSize="22px" fontWeight="700" color={textColor}>
          Lab Requests
        </Text>
        <Flex align="center" gap="8px">
          <SearchBar
            onSearch={(value) => {
              setSearchQuery(value);
              setCurrentPage(0);
            }}
          />
        </Flex>
      </Flex>
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
                <Tr key={row.id} _hover={{ bg: hoverBg }}>
                  {row.getVisibleCells().map((cell) => (
                    <Td
                      key={cell.id}
                      borderColor={borderColor}
                      py="5px"
                      px="3px"
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
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Select>
        </Flex>
        <Text fontSize="sm" color={textColor}>
          {`${
            filteredData.length > 0 ? currentPage * pageSize + 1 : 0
          }-${Math.min(
            (currentPage + 1) * pageSize,
            filteredData.length
          )} Lab Requests of ${filteredData.length} Lab Requests`}
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
      {isEditModalOpen && (
        <EditLabExamModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedEditData(null);
            setSelectedRowIndex(null);
          }}
          initialData={selectedEditData}
          labExamOptions={[]} // Optionally pass a custom lab exam options array here.
          onSave={handleModalSave}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedDeleteData(null);
            setSelectedDeleteRowIndex(null);
          }}
          onConfirm={handleDelete}
          recordDate={
            selectedDeleteData ? selectedDeleteData.requestLabsDates : ""
          }
        />
      )}
    </Card>
  );
}