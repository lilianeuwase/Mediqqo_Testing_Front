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
import Card from "../../../../common/components/card/Card";
import { SearchBar } from "../../../../common/components/navbar/searchBar/SearchBar";
import PatientVitalSigns from "../../new/patientVitalSigns"; // Modal component for adding new vitals
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
// VitalsRestrictionAlertModal: Alert shown if patient needs to complete doctor/lab before adding new vitals.
function VitalsRestrictionAlertModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Action Required</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            The patient must complete the doctor consultation and lab tests for
            the previous vitals session before a new vitals session can be
            taken.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="orange" onClick={onClose}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// ------------------------------------------------------------------
// DeleteConfirmationModal: A modal to confirm deletion of a record.
function DeleteConfirmationModal({ isOpen, onClose, onConfirm, recordDate }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete the record for{" "}
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
// EditVitalsModal: A modal for editing a vitals record.
function EditVitalsModal({ isOpen, onClose, initialData, onSave }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [formData, setFormData] = React.useState(initialData || {});
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const calculateBmi = () => {
    const height = parseFloat(formData.height);
    const weight = parseFloat(formData.weight);
    if (!isNaN(height) && height > 0 && !isNaN(weight)) {
      return (weight / (height / 100) ** 2).toFixed(1);
    }
    return "";
  };

  const handleSave = () => {
    let newErrors = {};
    const { height, weight, temp, BP, HR, RR, O2 } = formData;

    if (!height) newErrors.height = "Height is required";
    else if (!/^\d+(\.\d{1,2})?$/.test(height))
      newErrors.height =
        "Height must be a valid number with up to 2 decimal places";
    else if (parseFloat(height) < 54 || parseFloat(height) > 280)
      newErrors.height = "Height must be between 54 and 280";

    if (!weight) newErrors.weight = "Weight is required";
    else if (!/^\d+(\.\d{1,2})?$/.test(weight))
      newErrors.weight =
        "Weight must be a valid number with up to 2 decimal places";
    else if (parseFloat(weight) <= 0)
      newErrors.weight = "Weight must be greater than 0";
    else if (parseFloat(weight) > 999)
      newErrors.weight = "Weight can only be 3 digits";

    if (!temp) newErrors.temp = "Temperature is required";
    else if (isNaN(temp) || temp < 35 || temp > 42)
      newErrors.temp = "Temperature must be between 35.0°C and 42.0°C";
    else if (!/^\d+(\.\d{1})?$/.test(temp))
      newErrors.temp = "Temperature must have at most one decimal place";

    if (!BP) newErrors.BP = "Blood Pressure is required";
    else if (!/^\d{2,3}\/\d{2,3}$/.test(BP))
      newErrors.BP = "Enter BP in format Systolic/Diastolic (e.g., 120/80)";
    else {
      const [systolic, diastolic] = BP.split("/").map(Number);
      if (systolic < 90 || systolic > 180)
        newErrors.BP = "Systolic BP must be between 90 and 180 mmHg";
      if (diastolic < 60 || diastolic > 120)
        newErrors.BP = "Diastolic BP must be between 60 and 120 mmHg";
    }

    if (!HR) newErrors.HR = "Heart Rate is required";
    else if (isNaN(HR) || HR < 40 || HR > 200)
      newErrors.HR = "Heart Rate must be between 40 and 200 bpm";

    if (!RR) newErrors.RR = "Respiratory Rate is required";
    else if (isNaN(RR) || RR < 10 || RR > 40)
      newErrors.RR = "Respiratory Rate must be between 10 and 40 breaths/min";

    if (!O2) newErrors.O2 = "Oxygen Saturation is required";
    else if (isNaN(O2) || O2 < 70 || O2 > 100)
      newErrors.O2 = "Oxygen Saturation must be between 70% and 100%";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const bmi = calculateBmi();
    const updatedData = { ...formData, bmi };
    onSave(updatedData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Vital Signs</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap="4">
            <Box>
              <Text fontWeight="bold">Date of Vitals:</Text>
              <Text>{formData.vitalsDates}</Text>
            </Box>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <FormControl isInvalid={errors.height}>
                  <FormLabel fontSize="sm" fontWeight="500" mb="0px">
                    Height (cm){" "}
                    <Text as="span" color="red">
                      *
                    </Text>
                  </FormLabel>
                  <Input
                    value={formData.height || ""}
                    isRequired
                    fontSize="sm"
                    type="text"
                    size="lg"
                    variant="flushed"
                    backgroundColor="orange.100"
                    onChange={(e) =>
                      setFormData({ ...formData, height: e.target.value })
                    }
                  />
                  {errors.height && (
                    <FormErrorMessage>{errors.height}</FormErrorMessage>
                  )}
                </FormControl>
                <Box mt={4}>
                  <FormControl isInvalid={errors.temp}>
                    <FormLabel fontSize="sm" fontWeight="500" mb="0px">
                      Temp{" "}
                      <Text as="span" color="red">
                        *
                      </Text>
                    </FormLabel>
                    <Input
                      value={formData.temp || ""}
                      isRequired
                      fontSize="sm"
                      type="text"
                      size="lg"
                      variant="flushed"
                      backgroundColor="orange.100"
                      onChange={(e) =>
                        setFormData({ ...formData, temp: e.target.value })
                      }
                    />
                    {errors.temp && (
                      <FormErrorMessage>{errors.temp}</FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
                <Box mt={4}>
                  <FormControl isInvalid={errors.BP}>
                    <FormLabel fontSize="sm" fontWeight="500" mb="0px">
                      BP{" "}
                      <Text as="span" color="red">
                        *
                      </Text>
                    </FormLabel>
                    <Input
                      value={formData.BP || ""}
                      isRequired
                      fontSize="sm"
                      type="text"
                      size="lg"
                      variant="flushed"
                      backgroundColor="orange.100"
                      onChange={(e) =>
                        setFormData({ ...formData, BP: e.target.value })
                      }
                    />
                    {errors.BP && (
                      <FormErrorMessage>{errors.BP}</FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
              </GridItem>
              <GridItem>
                <FormControl isInvalid={errors.weight}>
                  <FormLabel fontSize="sm" fontWeight="500" mb="0px">
                    Weight (kg){" "}
                    <Text as="span" color="red">
                      *
                    </Text>
                  </FormLabel>
                  <Input
                    value={formData.weight || ""}
                    isRequired
                    fontSize="sm"
                    type="text"
                    size="lg"
                    variant="flushed"
                    backgroundColor="orange.100"
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                  />
                  {errors.weight && (
                    <FormErrorMessage>{errors.weight}</FormErrorMessage>
                  )}
                </FormControl>
                <Box mt={4}>
                  <FormControl isInvalid={errors.HR}>
                    <FormLabel fontSize="sm" fontWeight="500" mb="0px">
                      HR{" "}
                      <Text as="span" color="red">
                        *
                      </Text>
                    </FormLabel>
                    <Input
                      value={formData.HR || ""}
                      isRequired
                      fontSize="sm"
                      type="text"
                      size="lg"
                      variant="flushed"
                      backgroundColor="orange.100"
                      onChange={(e) =>
                        setFormData({ ...formData, HR: e.target.value })
                      }
                    />
                    {errors.HR && (
                      <FormErrorMessage>{errors.HR}</FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
                <Box mt={4}>
                  <FormControl isInvalid={errors.RR}>
                    <FormLabel fontSize="sm" fontWeight="500" mb="0px">
                      RR{" "}
                      <Text as="span" color="red">
                        *
                      </Text>
                    </FormLabel>
                    <Input
                      value={formData.RR || ""}
                      isRequired
                      fontSize="sm"
                      type="text"
                      size="lg"
                      variant="flushed"
                      backgroundColor="orange.100"
                      onChange={(e) =>
                        setFormData({ ...formData, RR: e.target.value })
                      }
                    />
                    {errors.RR && (
                      <FormErrorMessage>{errors.RR}</FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
              </GridItem>
              <GridItem colSpan={2}>
                <Flex gap="4">
                  <Box flex="1">
                    <FormControl isInvalid={errors.O2}>
                      <FormLabel fontSize="sm" fontWeight="500" mb="0px">
                        O₂{" "}
                        <Text as="span" color="red">
                          *
                        </Text>
                      </FormLabel>
                      <Input
                        value={formData.O2 || ""}
                        isRequired
                        fontSize="sm"
                        type="text"
                        size="lg"
                        variant="flushed"
                        backgroundColor="orange.100"
                        onChange={(e) =>
                          setFormData({ ...formData, O2: e.target.value })
                        }
                      />
                      {errors.O2 && (
                        <FormErrorMessage>{errors.O2}</FormErrorMessage>
                      )}
                    </FormControl>
                  </Box>
                  <Box flex="1">
                    <FormControl isReadOnly>
                      <FormLabel fontSize="sm" fontWeight="500" mb="0px">
                        BMI
                      </FormLabel>
                      <Input
                        value={calculateBmi()}
                        fontSize="sm"
                        type="text"
                        size="lg"
                        variant="flushed"
                        readOnly
                      />
                    </FormControl>
                  </Box>
                </Flex>
              </GridItem>
            </Grid>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button variant="orange" size="lg" mr={3} onClick={handleSave}>
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
// VitalsTable Component
export default function VitalsTable({ patient }) {
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const { isOpen, onOpen, onClose } = useDisclosure(); // For the Add Vitals modal

  //API
  const [apiHost, setApiHost] = useState("");

  // New state for vitals restriction alert modal.
  const [isVitalsRestrictionAlertOpen, setIsVitalsRestrictionAlertOpen] =
    React.useState(false);

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

  const getBmiColor = (bmiValue) => {
    const bmi = parseFloat(bmiValue);
    if (isNaN(bmi)) return textColor;
    if (bmi < 18.5) return "blue.500";
    if (bmi < 25) return "green.500";
    if (bmi < 30) return "orange.500";
    return "red.500";
  };

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("vitalsDates", {
        id: "vitalsDates",
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Date of Vitals
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
      columnHelper.accessor("height", {
        id: "height",
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              height
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
      columnHelper.accessor("weight", {
        id: "weight",
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              weight
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
      columnHelper.accessor("bmi", {
        id: "bmi",
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              BMI
            </Text>
            {column.getIsSorted() === "asc"
              ? " ⬆"
              : column.getIsSorted() === "desc"
              ? " ⬇"
              : null}
          </Flex>
        ),
        cell: (info) => {
          const bmiValue = info.getValue();
          return (
            <Text fontSize="sm" color={getBmiColor(bmiValue)}>
              {bmiValue}
            </Text>
          );
        },
      }),
      columnHelper.accessor("temp", {
        id: "temp",
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              Temp
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
      columnHelper.accessor("BP", {
        id: "BP",
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              BP
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
      columnHelper.accessor("HR", {
        id: "HR",
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              HR
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
      columnHelper.accessor("RR", {
        id: "RR",
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              RR
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
      columnHelper.accessor("O2", {
        id: "O2",
        header: ({ column }) => (
          <Flex
            cursor="pointer"
            onClick={column.getToggleSortingHandler()}
            align="center"
            px="3px"
          >
            <Text fontSize="sm" color="gray.400">
              SaO₂
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
              variant="orange"
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
    if (patient && Array.isArray(patient.vitalsDates)) {
      return patient.vitalsDates.map((date, index) => ({
        vitalsDates: date,
        height: patient.height ? patient.height[index] : "",
        weight: patient.weight ? patient.weight[index] : "",
        bmi: patient.bmi ? patient.bmi[index] : "",
        temp: patient.temp ? patient.temp[index] : "",
        BP: patient.BP ? patient.BP[index] : "",
        HR: patient.HR ? patient.HR[index] : "",
        RR: patient.RR ? patient.RR[index] : "",
        O2: patient.O2 ? patient.O2[index] : "",
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

  // Function to handle Add Vitals click.
  const handleAddVitalsClick = () => {
    if (!patient?.vitalsDates || patient.vitalsDates.length === 0) {
      // No vitals recorded yet – open the add vitals modal.
      onOpen();
    } else {
      // There is at least one vitals session.
      const currentCycle = patient.vitalsDates.length - 1;
      const doctorOk =
        patient?.doctorDates &&
        patient.doctorDates.length > currentCycle &&
        patient.doctorDates[currentCycle];
      const labOk =
        patient?.labDates &&
        patient.labDates.length > currentCycle &&
        patient.labDates[currentCycle];

      if (doctorOk && labOk) {
        // The previous vitals session has corresponding doctor and lab results – allow new vitals.
        onOpen();
      } else {
        // Show alert: previous vitals session incomplete.
        setIsVitalsRestrictionAlertOpen(true);
      }
    }
  };
  // Load the host URL from a text file (placed in your public folder as apiHost.txt)
  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);
  // Update record using the edit API.
  const handleModalSave = async (updatedData) => {
    const payload = {
      phone_number: patient.phone_number,
      recordIndex: selectedRowIndex,
      vitalsDates: updatedData.vitalsDates, // Date remains unchanged.
      height: updatedData.height,
      weight: updatedData.weight,
      bmi: updatedData.bmi,
      temp: updatedData.temp,
      BP: updatedData.BP,
      HR: updatedData.HR,
      RR: updatedData.RR,
      O2: updatedData.O2,
    };

    try {
      if (!apiHost) return;
      const response = await fetch(
        apiHost + "/editDiabPatientVitalSigns",
        // "http://localhost:3001/editDiabPatientVitalSigns",
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

  // Delete record using the delete API.
  const handleDelete = async () => {
    const payload = {
      phone_number: patient.phone_number,
      recordIndex: selectedDeleteRowIndex,
    };

    try {
      if (!apiHost) return;
      const response = await fetch(
        apiHost + "/deleteDiabPatientVitalSigns",
        // "http://localhost:3001/deleteDiabPatientVitalSigns",
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

  return (
    <Card p="0px">
      <Flex px="25px" py="15px" justifyContent="space-between" align="center">
        <Text fontSize="22px" fontWeight="700" color={textColor}>
          Vitals
        </Text>
        <Flex align="center" gap="8px">
          <SearchBar
            onSearch={(value) => {
              setSearchQuery(value);
              setCurrentPage(0);
            }}
          />
          <Button colorScheme="orange" size="md" onClick={handleAddVitalsClick}>
            + Add Vitals
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
          )} Vitals of ${filteredData.length} Vitals`}
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
      <PatientVitalSigns isOpen={isOpen} onClose={onClose} />
      {isEditModalOpen && (
        <EditVitalsModal
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
          recordDate={selectedDeleteData ? selectedDeleteData.vitalsDates : ""}
        />
      )}
      <VitalsRestrictionAlertModal
        isOpen={isVitalsRestrictionAlertOpen}
        onClose={() => setIsVitalsRestrictionAlertOpen(false)}
      />
    </Card>
  );
}
