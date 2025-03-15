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
import Card from "../../../../../../components/card/Card";
import { SearchBar } from "../../../../../../components/navbar/searchBar/SearchBar";
import PatientLabResults from "../../../new/patientLabResults"; // Modal component for adding new lab results
import {
  createColumnHelper,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const columnHelper = createColumnHelper();

// ------------------------------------------------------------------
// VitalsAlertModal: A centered popup alert for missing vital signs.
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
// DeleteConfirmationModal: A modal to confirm deletion of a lab record.
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
// EditLabResultsModal: A modal for editing a lab record.
// The date field is read-only while Glucose, FastGlucose, Hb, and Creatinine are editable.
function EditLabResultsModal({ isOpen, onClose, initialData, onSave }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [formData, setFormData] = React.useState(initialData || {});
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleSave = () => {
    let newErrors = {};
    const { labDates, glucose, fastglucose, hb, creatinine } = formData;

    if (!labDates) newErrors.labDates = "Date is required";

    if (!glucose) newErrors.glucose = "Glucose is required";
    else if (isNaN(glucose)) newErrors.glucose = "Glucose must be a number";

    // if (!fastglucose) newErrors.fastglucose = "Fast Glucose is required";
    // else
    if (isNaN(fastglucose))
      newErrors.fastglucose = "Fast Glucose must be a number";

    if (!hb) newErrors.hb = "Hb is required";
    else if (isNaN(hb)) newErrors.hb = "Hb must be a number";

    if (!creatinine) newErrors.creatinine = "Creatinine is required";
    else if (isNaN(creatinine))
      newErrors.creatinine = "Creatinine must be a number";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSave(formData);
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
                    Glucose{" "}
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
                      Fast Glucose{" "}
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
                    Hb{" "}
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
// LabTable Component
export default function LabResultTable({ patient }) {
  // patient is expected to have fields like: labDates, glucose, fastglucose, hb, creatinine,
  // and an identifier such as patient.phone_number for API calls.

  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const { isOpen, onOpen, onClose } = useDisclosure(); // For the Add Lab Results modal

  // State for vitals alert modal
  const [isVitalsAlertOpen, setIsVitalsAlertOpen] = React.useState(false);

  // Table states
  const [sorting, setSorting] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [pageSize, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(0);

  // States for the Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [selectedEditData, setSelectedEditData] = React.useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = React.useState(null);

  // States for the Delete Confirmation Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedDeleteData, setSelectedDeleteData] = React.useState(null);
  const [selectedDeleteRowIndex, setSelectedDeleteRowIndex] =
    React.useState(null);

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
            glucose
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
            fastglucose
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
              Hb
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
            creatinine
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
    if (patient && Array.isArray(patient.labDates)) {
      return patient.labDates.map((date, index) => ({
        labDates: date,
        glucose: patient.glucose ? patient.glucose[index] : "",
        fastglucose: patient.fastglucose ? patient.fastglucose[index] : "",
        hb: patient.hb ? patient.hb[index] : "",
        creatinine: patient.creatinine ? patient.creatinine[index] : "",
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
    const payload = {
      phone_number: patient.phone_number, // Ensure patient includes a unique identifier
      recordIndex: selectedRowIndex,
      labDates: updatedData.labDates, // Date remains unchanged.
      glucose: updatedData.glucose,
      fastglucose: updatedData.fastglucose,
      hb: updatedData.hb,
      creatinine: updatedData.creatinine,
    };

    try {
      const response = await fetch(
        "https://mediqo-api.onrender.com/editDiabPatientLabResults",
        // "http://localhost:3001/editDiabPatientLabResults",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
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
      const response = await fetch(
        "https://mediqo-api.onrender.com/deleteDiabPatientLabResults",
        // "http://localhost:3001/deleteDiabPatientLabResults",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
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
              // Allow adding lab results only if there are more vitals entries than lab results entries.
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
            width="80px" // increased width to accommodate larger numbers
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
          )} Lab Results of ${filteredData.length} Lab Results`}
        </Text>
        <Flex align="center" gap="2">
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            variant="light"
            size="sm"
            disabled={currentPage === 0}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            variant="light"
            size="sm"
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
