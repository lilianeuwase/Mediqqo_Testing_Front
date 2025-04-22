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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import Card from "../../../../../common/components/card/Card";
import { SearchBar } from "../../../../../common/components/navbar/searchBar/SearchBar";
import PatientLabResults from "../../../new/patientLabResults"; // Modal for adding new lab results
import {
  createColumnHelper,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

// ------------------------------------------------------------------
// VitalsAlertModal
function VitalsAlertModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Vitals are Missing</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Lab results cannot be added for a patient without first recording
            and registering their vital signs.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// ------------------------------------------------------------------
// DeleteConfirmationModal
function DeleteConfirmationModal({ isOpen, onClose, onConfirm, recordDate }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete the lab record for{" "}
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
// EditLabResultsModal
function EditLabResultsModal({ isOpen, onClose, initialData, onSave }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState({});

  // When the modal opens, ensure that moreLab is a 2D array.
  useEffect(() => {
    let newData = initialData || {};
    // If moreLab is not an array, default to empty.
    if (!Array.isArray(newData.moreLab)) {
      newData.moreLab = [];
    }
    // If it's a flat array (first element is a string), wrap it.
    if (newData.moreLab.length > 0 && typeof newData.moreLab[0] === "string") {
      newData.moreLab = [newData.moreLab];
    }
    if (newData.moreLab.length === 0) {
      newData = { ...newData, moreLab: [["", ""]] };
    } else {
      // Ensure there's an extra blank row at the end.
      const lastRow = newData.moreLab[newData.moreLab.length - 1];
      if (
        (lastRow[0] || "").trim() !== "" ||
        (lastRow[1] || "").trim() !== ""
      ) {
        newData = { ...newData, moreLab: [...newData.moreLab, ["", ""]] };
      }
    }
    setFormData(newData);
  }, [initialData]);

  // Helper: Ensure that the last row is blank; if not, add a new blank row.
  const ensureEmptyRow = (rows) => {
    if (rows.length === 0) return [["", ""]];
    const lastRow = rows[rows.length - 1];
    if ((lastRow[0] || "").trim() === "" && (lastRow[1] || "").trim() === "") {
      return rows;
    } else {
      return [...rows, ["", ""]];
    }
  };

  const handleSave = () => {
    let newErrors = {};
    const numberRegex = /^\d+(\.\d{1,2})?$/;
    const { labDates, glucose, fastglucose, hb, creatinine } = formData;

    if (!labDates) newErrors.labDates = "Date is required";
    if (!glucose) newErrors.glucose = "Random Blood Glucose is required";
    else if (!numberRegex.test(glucose))
      newErrors.glucose =
        "Random Blood Glucose must be a number with up to 2 decimals";
    if (!fastglucose)
      newErrors.fastglucose = "Fasting Blood Glucose is required";
    else if (!numberRegex.test(fastglucose))
      newErrors.fastglucose =
        "Fasting Blood Glucose must be a number with up to 2 decimals";
    if (!hb) newErrors.hb = "HbA1c is required";
    else if (!numberRegex.test(hb))
      newErrors.hb = "HbA1c must be a number with up to 2 decimals";
    if (!creatinine) newErrors.creatinine = "Creatinine is required";
    else if (!numberRegex.test(creatinine))
      newErrors.creatinine =
        "Creatinine must be a number with up to 2 decimals";

    // Validate moreLab.
    const currentMoreLab = Array.isArray(formData.moreLab)
      ? formData.moreLab
      : [];
    const validMoreLab = currentMoreLab.filter(
      ([test, result]) =>
        (test || "").trim() !== "" || (result || "").trim() !== ""
    );
    for (const [test, result] of validMoreLab) {
      if (
        ((test || "").trim() !== "" && (result || "").trim() === "") ||
        ((test || "").trim() === "" && (result || "").trim() !== "")
      ) {
        newErrors.moreLab =
          "Each lab test must have a corresponding lab result.";
        break;
      }
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const cleanedMoreLab = validMoreLab.map(([test, result]) => [
      (test || "").trim(),
      (result || "").trim(),
    ]);
    const finalMoreLab = cleanedMoreLab.length > 0 ? cleanedMoreLab : [];
    const cleanedData = { ...formData, moreLab: finalMoreLab };
    onSave(cleanedData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Lab Results</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap="4">
            <Box>
              <Text fontWeight="bold">Date of Results:</Text>
              <Text>{formData.labDates}</Text>
            </Box>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <FormControl isInvalid={errors.glucose}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    mb="0px"
                  >
                    Random Blood Glucose{" "}
                    <Text as="span" color="red">
                      *
                    </Text>
                  </FormLabel>
                  <Input
                    value={formData.glucose || ""}
                    isRequired
                    fontSize="sm"
                    type="text"
                    size="lg"
                    variant="flushed"
                    backgroundColor="orange.100"
                    onChange={(e) =>
                      setFormData({ ...formData, glucose: e.target.value })
                    }
                  />
                  {errors.glucose && (
                    <FormErrorMessage>{errors.glucose}</FormErrorMessage>
                  )}
                </FormControl>
                <Box mt={4}>
                  <FormControl isInvalid={errors.fastglucose}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="500"
                      color={textColor}
                      mb="0px"
                    >
                      Fasting Blood Glucose{" "}
                      <Text as="span" color="red">
                        *
                      </Text>
                    </FormLabel>
                    <Input
                      value={formData.fastglucose || ""}
                      isRequired
                      fontSize="sm"
                      type="text"
                      size="lg"
                      variant="flushed"
                      backgroundColor="orange.100"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fastglucose: e.target.value,
                        })
                      }
                    />
                    {errors.fastglucose && (
                      <FormErrorMessage>{errors.fastglucose}</FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
              </GridItem>
              <GridItem>
                <FormControl isInvalid={errors.hb}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    mb="0px"
                  >
                    HbA1c{" "}
                    <Text as="span" color="red">
                      *
                    </Text>
                  </FormLabel>
                  <Input
                    value={formData.hb || ""}
                    isRequired
                    fontSize="sm"
                    type="text"
                    size="lg"
                    variant="flushed"
                    backgroundColor="orange.100"
                    onChange={(e) =>
                      setFormData({ ...formData, hb: e.target.value })
                    }
                  />
                  {errors.hb && (
                    <FormErrorMessage>{errors.hb}</FormErrorMessage>
                  )}
                </FormControl>
                <Box mt={4}>
                  <FormControl isInvalid={errors.creatinine}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="500"
                      color={textColor}
                      mb="0px"
                    >
                      Creatinine{" "}
                      <Text as="span" color="red">
                        *
                      </Text>
                    </FormLabel>
                    <Input
                      value={formData.creatinine || ""}
                      isRequired
                      fontSize="sm"
                      type="text"
                      size="lg"
                      variant="flushed"
                      backgroundColor="orange.100"
                      onChange={(e) =>
                        setFormData({ ...formData, creatinine: e.target.value })
                      }
                    />
                    {errors.creatinine && (
                      <FormErrorMessage>{errors.creatinine}</FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
              </GridItem>
            </Grid>
            {/* Other Labs Section */}
            <Box mt="4">
              <Text fontWeight="bold" mb="2">
                Other Labs
              </Text>
              {/* Header */}
              <Grid templateColumns="repeat(2, 1fr)" gap={4} mb="2">
                <GridItem>
                  <Text fontWeight="bold">Lab Test</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold">Lab Result</Text>
                </GridItem>
              </Grid>
              {(formData.moreLab || []).map((pair, index) => (
                <Grid
                  templateColumns="repeat(2, 1fr)"
                  gap={4}
                  key={index}
                  mb="2"
                >
                  <GridItem>
                    <FormControl>
                      <Input
                        value={pair[0] || ""}
                        fontSize="sm"
                        type="text"
                        size="lg"
                        variant="flushed"
                        backgroundColor="orange.100"
                        placeholder="Lab Test"
                        onChange={(e) => {
                          const newMoreLab = [
                            ...(formData.moreLab || [["", ""]]),
                          ];
                          newMoreLab[index] = [
                            e.target.value,
                            newMoreLab[index] ? newMoreLab[index][1] : "",
                          ];
                          const updatedMoreLab = ensureEmptyRow(newMoreLab);
                          setFormData({ ...formData, moreLab: updatedMoreLab });
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <FormControl>
                      <Input
                        value={pair[1] || ""}
                        fontSize="sm"
                        type="text"
                        size="lg"
                        variant="flushed"
                        backgroundColor="orange.100"
                        placeholder="Lab Result"
                        onChange={(e) => {
                          const newMoreLab = [
                            ...(formData.moreLab || [["", ""]]),
                          ];
                          newMoreLab[index] = [
                            newMoreLab[index] ? newMoreLab[index][0] : "",
                            e.target.value,
                          ];
                          const updatedMoreLab = ensureEmptyRow(newMoreLab);
                          setFormData({ ...formData, moreLab: updatedMoreLab });
                        }}
                      />
                    </FormControl>
                  </GridItem>
                </Grid>
              ))}
              {errors.moreLab && (
                <Text color="red.500" fontSize="sm" mt="1">
                  {errors.moreLab}
                </Text>
              )}
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button variant="blue" size="lg" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button
            variant="outline"
            colorScheme="red"
            size="lg"
            onClick={onClose}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// ------------------------------------------------------------------
// LabResultTable Component
export default function LabResultTable({ patient }) {
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isVitalsAlertOpen, setIsVitalsAlertOpen] = useState(false);
  const [sorting, setSorting] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteData, setSelectedDeleteData] = useState(null);
  const [selectedDeleteRowIndex, setSelectedDeleteRowIndex] = useState(null);

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
      columnHelper.accessor("labDates", {
        id: "labDates",
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Date of Results
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
      columnHelper.accessor("glucose", {
        id: "glucose",
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Random Blood Glucose
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
      columnHelper.accessor("fastglucose", {
        id: "fastglucose",
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Fasting Blood Glucose
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
      columnHelper.accessor("hb", {
        id: "hb",
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              HbA1c
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
      columnHelper.accessor("creatinine", {
        id: "creatinine",
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Creatinine
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
      // Other Labs column with conditional rendering
      columnHelper.accessor("moreLab", {
        id: "moreLab",
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Other Labs
            </Text>
            {column.getIsSorted() === "asc"
              ? " ⬆"
              : column.getIsSorted() === "desc"
              ? " ⬇"
              : null}
          </Flex>
        ),
        cell: (info) => {
          const val = info.getValue();
          // If the stored value is flat (first element is a string), wrap it.
          if (
            Array.isArray(val) &&
            val.length > 0 &&
            typeof val[0] === "string"
          ) {
            return (
              <Text fontSize="sm" color={textColor}>
                {val[0]}: {val[1]}
              </Text>
            );
          }
          // Otherwise, assume it's already a 2D array.
          return (
            <Box fontSize="sm" color={textColor}>
              {Array.isArray(val) &&
                val.map((pair, index) => (
                  <Text key={index}>
                    {pair[0]}: {pair[1]}
                  </Text>
                ))}
            </Box>
          );
        },
      }),
      // Action column
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

  const allData = React.useMemo(() => {
    if (patient && Array.isArray(patient.labDates)) {
      return patient.labDates.map((date, index) => ({
        labDates: date,
        glucose: patient.glucose ? patient.glucose[index] : "",
        fastglucose: patient.fastglucose ? patient.fastglucose[index] : "",
        hb: patient.hb ? patient.hb[index] : "",
        creatinine: patient.creatinine ? patient.creatinine[index] : "",
        moreLab: patient.moreLab ? patient.moreLab[index] : [],
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

  // API call to edit a lab record.
  const handleModalSave = async (updatedData) => {
    console.log("morelab:", updatedData.moreLab);
    const payload = {
      phone_number: patient.phone_number,
      recordIndex: selectedRowIndex,
      labDates: updatedData.labDates,
      glucose: updatedData.glucose,
      fastglucose: updatedData.fastglucose,
      hb: updatedData.hb,
      creatinine: updatedData.creatinine,
      moreLab: updatedData.moreLab,
    };

    try {
      const response = await fetch(`${apiHost}/editDiabPatientLabResults`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status === "ok") {
        window.location.reload();
      } else {
        alert("Error updating lab record: " + result.error);
      }
    } catch (error) {
      console.error("Error updating lab record:", error);
    }
  };

  // API call to delete a lab record.
  const handleDelete = async () => {
    const payload = {
      phone_number: patient.phone_number,
      recordIndex: selectedDeleteRowIndex,
    };

    try {
      const response = await fetch(`${apiHost}/deleteDiabPatientLabResults`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status === "ok") {
        window.location.reload();
      } else {
        alert("Error deleting lab record: " + result.error);
      }
    } catch (error) {
      console.error("Error deleting lab record:", error);
    }
  };

  return (
    <Card p="0px">
      <Flex px="25px" py="15px" justifyContent="space-between" align="center">
        <Text fontSize="22px" fontWeight="700" color={textColor}>
          Laboratory Results
        </Text>
        <Flex align="center" gap="8px">
          <SearchBar
            onSearch={(value) => {
              setSearchQuery(value);
              setCurrentPage(0);
            }}
          />
          <Button
            colorScheme="blue"
            variant="blue"
            size="md"
            onClick={() => {
              if (
                patient &&
                patient.vitalsDates &&
                patient.vitalsDates.length >
                  (patient.labDates ? patient.labDates.length : 0)
              ) {
                onOpen();
              } else {
                setIsVitalsAlertOpen(true);
              }
            }}
          >
            + Add Lab Results
          </Button>
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
          {`${filteredData.length > 0 ? currentPage * pageSize + 1 : 0}-
            ${Math.min(
              (currentPage + 1) * pageSize,
              filteredData.length
            )} Lab Results of ${filteredData.length} Lab Results`}
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
      <PatientLabResults isOpen={isOpen} onClose={onClose} />
      {isEditModalOpen && (
        <EditLabResultsModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedEditData(null);
            setSelectedRowIndex(null);
          }}
          initialData={selectedEditData}
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
          recordDate={selectedDeleteData ? selectedDeleteData.labDates : ""}
        />
      )}
      <VitalsAlertModal
        isOpen={isVitalsAlertOpen}
        onClose={() => setIsVitalsAlertOpen(false)}
      />
    </Card>
  );
}
