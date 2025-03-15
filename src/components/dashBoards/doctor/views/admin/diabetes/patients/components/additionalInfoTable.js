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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
  CheckboxGroup,
  Icon,
} from "@chakra-ui/react";
import {
  MdOutlineMoreHoriz,
  MdOutlinePerson,
  MdOutlineLightbulb,
} from "react-icons/md";
import { SearchBar } from "../../../../../components/navbar/searchBar/SearchBar";
import Card from "../../../../../components/card/Card";
import PatientAdditionalInfo from "../../new/patientAdditionalInfo"; // Modal for adding new additional info
import {
  createColumnHelper,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from "@chakra-ui/icons";

// Import the lab test modals from the separate file.
import { LabExamModal, RequestLabTests } from "../../new/requestLabTests";

const columnHelper = createColumnHelper();

// ------------------------------------------------------------------
// AdditionalInfoAlertModal: A centered popup alert for missing vital signs.
function AdditionalInfoAlertModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Vitals are Missing</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Additional Information cannot be added for a patient without first
            recording and registering their vital signs.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="purple" onClick={onClose}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// ------------------------------------------------------------------
// DeleteConfirmationModal: A modal to confirm deletion of an additional info record.
function DeleteConfirmationModal({ isOpen, onClose, onConfirm, recordDate }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete the additional info record for{" "}
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
// EditAdditionalInfoModal: A modal for editing an additional info record.
function EditAdditionalInfoModal({ isOpen, onClose, initialData, onSave }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [formData, setFormData] = React.useState(initialData || {});
  const [errors, setErrors] = React.useState({});

  // When initialData changes, transform array fields into comma-separated strings.
  React.useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        complications: Array.isArray(initialData.complications)
          ? initialData.complications.join(", ")
          : initialData.complications || "",
        comorbidities: Array.isArray(initialData.comorbidities)
          ? initialData.comorbidities.join(", ")
          : initialData.comorbidities || "",
        dangerSigns: Array.isArray(initialData.dangerSigns)
          ? initialData.dangerSigns.join(", ")
          : initialData.dangerSigns || "",
        clinicalSymp: Array.isArray(initialData.clinicalSymp)
          ? initialData.clinicalSymp.join(", ")
          : initialData.clinicalSymp || "",
      });
    } else {
      setFormData({});
    }
  }, [initialData]);

  const handleSave = () => {
    let newErrors = {};
    const {
      doctorDates,
      complications,
      comorbidities,
      dangerSigns,
      clinicalSymp,
    } = formData;

    if (!doctorDates) newErrors.doctorDates = "Consultation Date is required";
    if (!complications) newErrors.complications = "Complications are required";
    if (!comorbidities) newErrors.comorbidities = "Co-morbidity is required";
    if (!dangerSigns) newErrors.dangerSigns = "Danger Signs are required";
    if (!clinicalSymp)
      newErrors.clinicalSymp = "Clinical Symptoms are required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Transform comma-separated strings back into arrays.
    const transformedData = {
      ...formData,
      complications: complications
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      comorbidities: comorbidities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      dangerSigns: dangerSigns
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      clinicalSymp: clinicalSymp
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    onSave(transformedData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Additional Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap="4">
            <Box>
              <Text fontWeight="bold">Consultation Date:</Text>
              <Text>{formData.doctorDates}</Text>
            </Box>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <FormControl isInvalid={errors.complications}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    mb="0px"
                  >
                    Complications{" "}
                    <Text as="span" color="red">
                      *
                    </Text>
                  </FormLabel>
                  <Input
                    value={formData.complications || ""}
                    isRequired
                    fontSize="sm"
                    type="text"
                    size="lg"
                    variant="flushed"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        complications: e.target.value,
                      })
                    }
                  />
                  {errors.complications && (
                    <FormErrorMessage>{errors.complications}</FormErrorMessage>
                  )}
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isInvalid={errors.comorbidities}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    mb="0px"
                  >
                    Co-morbidity{" "}
                    <Text as="span" color="red">
                      *
                    </Text>
                  </FormLabel>
                  <Input
                    value={formData.comorbidities || ""}
                    isRequired
                    fontSize="sm"
                    type="text"
                    size="lg"
                    variant="flushed"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        comorbidities: e.target.value,
                      })
                    }
                  />
                  {errors.comorbidities && (
                    <FormErrorMessage>{errors.comorbidities}</FormErrorMessage>
                  )}
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isInvalid={errors.dangerSigns}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    mb="0px"
                  >
                    Danger Signs{" "}
                    <Text as="span" color="red">
                      *
                    </Text>
                  </FormLabel>
                  <Input
                    value={formData.dangerSigns || ""}
                    isRequired
                    fontSize="sm"
                    type="text"
                    size="lg"
                    variant="flushed"
                    onChange={(e) =>
                      setFormData({ ...formData, dangerSigns: e.target.value })
                    }
                  />
                  {errors.dangerSigns && (
                    <FormErrorMessage>{errors.dangerSigns}</FormErrorMessage>
                  )}
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isInvalid={errors.clinicalSymp}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    mb="0px"
                  >
                    Clinical Symptoms{" "}
                    <Text as="span" color="red">
                      *
                    </Text>
                  </FormLabel>
                  <Input
                    value={formData.clinicalSymp || ""}
                    isRequired
                    fontSize="sm"
                    type="text"
                    size="lg"
                    variant="flushed"
                    onChange={(e) =>
                      setFormData({ ...formData, clinicalSymp: e.target.value })
                    }
                  />
                  {errors.clinicalSymp && (
                    <FormErrorMessage>{errors.clinicalSymp}</FormErrorMessage>
                  )}
                </FormControl>
              </GridItem>
            </Grid>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button variant="purple" size="lg" mr={3} onClick={handleSave}>
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
// AdditionalInfoTable Component
export default function AdditionalInfoTable({ patient }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  // Disclosures for modals.
  const {
    isOpen: isAddMoreInfoOpen,
    onOpen: onAddMoreInfoOpen,
    onClose: onAddMoreInfoClose,
  } = useDisclosure();
  const {
    isOpen: isLabExamOpen,
    onOpen: onLabExamOpen,
    onClose: onLabExamClose,
  } = useDisclosure();

  // State for alert modals.
  const [isAlertModalOpen, setIsAlertModalOpen] = React.useState(false);
  const [isLabTestRestrictionAlertOpen, setIsLabTestRestrictionAlertOpen] =
    React.useState(false);

  // State for lab exam selection.
  const [selectedExams, setSelectedExams] = React.useState([]);
  // Updated extended list of lab exam options for diagnosing diabetes, hypertension, and asthma.
  const labExamOptions = [
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

  // Table states.
  const [sorting, setSorting] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [pageSize, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(0);

  // States for Edit and Delete Modals.
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [selectedEditData, setSelectedEditData] = React.useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = React.useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedDeleteData, setSelectedDeleteData] = React.useState(null);
  const [selectedDeleteRowIndex, setSelectedDeleteRowIndex] =
    React.useState(null);

  // Additional menu styling variables.
  const menuTextColor = useColorModeValue("secondaryGray.500", "white");
  const menuTextHover = useColorModeValue(
    { color: "purple.900", bg: "unset" },
    { color: "purple.500", bg: "unset" }
  );
  const menuIconColor = useColorModeValue("purple.500", "white");
  const menuBgList = useColorModeValue("white", "whiteAlpha.100");
  const menuBgShadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  const menuBgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const menuBgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const menuBgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  // Disclosure for the actions menu.
  const {
    isOpen: isActionMenuOpen,
    onOpen: onActionMenuOpen,
    onClose: onActionMenuClose,
  } = useDisclosure();

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("doctorDates", {
        id: "doctorDates",
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Consultation Date
            </Text>
            {column.getIsSorted() === "asc"
              ? " ⬆"
              : column.getIsSorted() === "desc"
              ? " ⬇"
              : null}
          </Flex>
        ),
        cell: (info) => (
          <Text fontSize="sm" color={textColor} isTruncated>
            {info.getValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("complications", {
        id: "complications",
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Complications
            </Text>
            {column.getIsSorted() === "asc"
              ? " ⬆"
              : column.getIsSorted() === "desc"
              ? " ⬇"
              : null}
          </Flex>
        ),
        cell: (info) => (
          <Box>
            {Array.isArray(info.getValue()) ? (
              info.getValue().map((item, index) => (
                <Text key={index} fontSize="sm" color={textColor}>
                  {item}
                </Text>
              ))
            ) : (
              <Text fontSize="sm" color={textColor}>
                {info.getValue()}
              </Text>
            )}
          </Box>
        ),
      }),
      columnHelper.accessor("comorbidities", {
        id: "comorbidities",
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Co-morbidity
            </Text>
            {column.getIsSorted() === "asc"
              ? " ⬆"
              : column.getIsSorted() === "desc"
              ? " ⬇"
              : null}
          </Flex>
        ),
        cell: (info) => (
          <Box>
            {Array.isArray(info.getValue()) ? (
              info.getValue().map((item, index) => (
                <Text key={index} fontSize="sm" color={textColor}>
                  {item}
                </Text>
              ))
            ) : (
              <Text fontSize="sm" color={textColor}>
                {info.getValue()}
              </Text>
            )}
          </Box>
        ),
      }),
      columnHelper.accessor("dangerSigns", {
        id: "dangerSigns",
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Danger Signs
            </Text>
            {column.getIsSorted() === "asc"
              ? " ⬆"
              : column.getIsSorted() === "desc"
              ? " ⬇"
              : null}
          </Flex>
        ),
        cell: (info) => (
          <Box>
            {Array.isArray(info.getValue()) ? (
              info.getValue().map((item, index) => (
                <Text key={index} fontSize="sm" color={textColor}>
                  {item}
                </Text>
              ))
            ) : (
              <Text fontSize="sm" color={textColor}>
                {info.getValue()}
              </Text>
            )}
          </Box>
        ),
      }),
      columnHelper.accessor("clinicalSymp", {
        id: "clinicalSymp",
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Clinical Symptoms
            </Text>
            {column.getIsSorted() === "asc"
              ? " ⬆"
              : column.getIsSorted() === "desc"
              ? " ⬇"
              : null}
          </Flex>
        ),
        cell: (info) => (
          <Box>
            {Array.isArray(info.getValue()) ? (
              info.getValue().map((item, index) => (
                <Text key={index} fontSize="sm" color={textColor}>
                  {item}
                </Text>
              ))
            ) : (
              <Text fontSize="sm" color={textColor}>
                {info.getValue()}
              </Text>
            )}
          </Box>
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
              variant="purple"
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
    if (patient && Array.isArray(patient.doctorDates)) {
      return patient.doctorDates.map((date, index) => ({
        doctorDates: date,
        complications: patient.complications
          ? patient.complications[index]
          : [],
        comorbidities: patient.comorbidities
          ? patient.comorbidities[index]
          : [],
        dangerSigns: patient.dangerSigns ? patient.dangerSigns[index] : [],
        clinicalSymp: patient.clinicalSymp ? patient.clinicalSymp[index] : [],
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

  const handleModalSave = async (updatedData) => {
    const payload = {
      phone_number: patient.phone_number,
      recordIndex: selectedRowIndex,
      doctorDates: updatedData.doctorDates,
      complications: updatedData.complications,
      comorbidities: updatedData.comorbidities,
      dangerSigns: updatedData.dangerSigns,
      clinicalSymp: updatedData.clinicalSymp,
    };

    try {
      const response = await fetch(
        "https://mediqo-api.onrender.com/editDiabPatientAdditionalInfo",
        // "http://localhost:3001/editDiabPatientAdditionalInfo",
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
        alert("Error updating record: " + result.error);
      }
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  const handleDelete = async () => {
    const payload = {
      phone_number: patient.phone_number,
      recordIndex: selectedDeleteRowIndex,
    };

    try {
      const response = await fetch(
        "https://mediqo-api.onrender.com/deleteDiabPatientAdditionalInfo",
        // "http://localhost:3001/deleteDiabPatientAdditionalInfo",
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
        alert("Error deleting record: " + result.error);
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  // Handler for "Add More Info" action.
  const handleAddMoreInfoClick = () => {
    if (
      patient &&
      patient.vitalsDates &&
      patient.vitalsDates.length >
        (patient.doctorDates ? patient.doctorDates.length : 0)
    ) {
      onAddMoreInfoOpen();
    } else {
      setIsAlertModalOpen(true);
    }
  };

  // Handler for "Request Lab Test" action.
  const handleRequestLabTestClick = () => {
    const vitalsCount = patient?.vitalsDates ? patient.vitalsDates.length : 0;
    const labCount = patient?.labDates ? patient.labDates.length : 0;
    if (vitalsCount === 0 || labCount >= vitalsCount) {
      setIsLabTestRestrictionAlertOpen(true);
    } else {
      onLabExamOpen();
    }
  };

  return (
    <Card p="0px">
      <Flex px="25px" py="15px" justifyContent="space-between" align="center">
        <Text fontSize="22px" fontWeight="700" color={textColor}>
          Additional Information
        </Text>
        <Flex align="center" gap="8px">
          <SearchBar
            onSearch={(value) => {
              setSearchQuery(value);
              setCurrentPage(0);
            }}
          />
          {/* Custom Styled Actions Menu */}
          <Menu isOpen={isActionMenuOpen} onClose={onActionMenuClose}>
            <MenuButton
              align="center"
              justifyContent="center"
              w="110px"
              h="37px"
              lineHeight="100%"
              onClick={onActionMenuOpen}
              borderRadius="10px"
              as={Button}
              leftIcon={<ChevronDownIcon />}
              colorScheme="purple"
            >
              Consult
            </MenuButton>
            <MenuList
              w="150px"
              minW="unset"
              maxW="150px !important"
              border="transparent"
              backdropFilter="blur(63px)"
              bg={menuBgList}
              boxShadow={menuBgShadow}
              borderRadius="20px"
              p="15px"
            >
              <MenuItem
                transition="none"
                color={menuTextColor}
                _hover={menuTextHover}
                p="0px"
                borderRadius="8px"
                _active={{ bg: "transparent" }}
                _focus={{ bg: "transparent" }}
                mb="10px"
                onClick={() => {
                  onActionMenuClose();
                  handleAddMoreInfoClick();
                }}
              >
                <Flex align="center">
                  <Icon as={MdOutlinePerson} h="16px" w="16px" me="8px" />
                  <Text fontSize="sm" fontWeight="400">
                    Add More Info
                  </Text>
                </Flex>
              </MenuItem>
              <MenuItem
                transition="none"
                p="0px"
                borderRadius="8px"
                color={menuTextColor}
                _hover={menuTextHover}
                _active={{ bg: "transparent" }}
                _focus={{ bg: "transparent" }}
                onClick={() => {
                  onActionMenuClose();
                  handleRequestLabTestClick();
                }}
              >
                <Flex align="center">
                  <Icon as={MdOutlineLightbulb} h="16px" w="16px" me="8px" />
                  <Text fontSize="sm" fontWeight="400">
                    Request Lab Test
                  </Text>
                </Flex>
              </MenuItem>
            </MenuList>
          </Menu>
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
          )} Consultations of ${filteredData.length} Consultation`}
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
      {/* Modals */}
      <PatientAdditionalInfo
        isOpen={isAddMoreInfoOpen}
        onClose={onAddMoreInfoClose}
      />
      {isEditModalOpen && (
        <EditAdditionalInfoModal
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
          recordDate={selectedDeleteData ? selectedDeleteData.doctorDates : ""}
        />
      )}
      <AdditionalInfoAlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
      />
      {/* Lab Test Modals imported from requestLabTests */}
      <LabExamModal
        isOpen={isLabExamOpen}
        onClose={onLabExamClose}
        selectedExams={selectedExams}
        setSelectedExams={setSelectedExams}
        labExamOptions={labExamOptions}
      />
      <RequestLabTests
        isOpen={isLabTestRestrictionAlertOpen}
        onClose={() => setIsLabTestRestrictionAlertOpen(false)}
      />
    </Card>
  );
}