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
import { SearchBar } from "../../../../common/components/navbar/searchBar/SearchBar";
import Card from "../../../../common/components/card/Card";
import PatientAdditionalInfo from "../../new/patientAdditionalInfo"; // Modal for adding new additional info
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

  // Define default options for each category.
  const defaultClinical = ["Polyuria", "Polydipsia", "Polyphagia"];
  const defaultDanger = [
    "Dehydration",
    "Abdominal Pain",
    "Hypoglycemia",
    "Shortness of Breath",
    "Confusion",
  ];
  const defaultComp = [
    "Retinopathy",
    "Nephropathy",
    "Neuropathy",
    "Foot Ulcer",
  ];
  const defaultCoM = ["HIV", "Hypertension", "Liver Disease", "Pregnant"];

  const [formData, setFormData] = React.useState({
    doctorDates: "",
    clinicalSympChecked: {
      polyuria: false,
      polydipsia: false,
      polyphagia: false,
    },
    additionalClinicalSymp: "",
    dangerSignsChecked: {
      hydra: false,
      abspain: false,
      hypo: false,
      sighing: false,
      confusion: false,
    },
    additionalDangerSigns: "",
    complicationsChecked: {
      retino: false,
      nephro: false,
      neuro: false,
      footulcer: false,
    },
    additionalComplications: "",
    comorbiditiesChecked: {
      hiv: false,
      htn: false,
      liver: false,
      prego: false,
    },
    additionalComorbidities: "",
  });
  const [errors, setErrors] = React.useState({});

  // Initialize the form state based on the existing record.
  React.useEffect(() => {
    if (initialData) {
      const clinicalSymp = Array.isArray(initialData.clinicalSymp)
        ? initialData.clinicalSymp
        : [];
      const dangerSigns = Array.isArray(initialData.dangerSigns)
        ? initialData.dangerSigns
        : [];
      const complications = Array.isArray(initialData.complications)
        ? initialData.complications
        : [];
      const comorbidities = Array.isArray(initialData.comorbidities)
        ? initialData.comorbidities
        : [];

      const clinicalSympChecked = {
        polyuria: clinicalSymp.includes("Polyuria"),
        polydipsia: clinicalSymp.includes("Polydipsia"),
        polyphagia: clinicalSymp.includes("Polyphagia"),
      };
      const additionalClinicalSymp = clinicalSymp
        .filter((item) => !defaultClinical.includes(item))
        .join(", ");

      const dangerSignsChecked = {
        hydra: dangerSigns.includes("Dehydration"),
        abspain: dangerSigns.includes("Abdominal Pain"),
        hypo: dangerSigns.includes("Hypoglycemia"),
        sighing: dangerSigns.includes("Shortness of Breath"),
        confusion: dangerSigns.includes("Confusion"),
      };
      const additionalDangerSigns = dangerSigns
        .filter((item) => !defaultDanger.includes(item))
        .join(", ");

      const complicationsChecked = {
        retino: complications.includes("Retinopathy"),
        nephro: complications.includes("Nephropathy"),
        neuro: complications.includes("Neuropathy"),
        footulcer: complications.includes("Foot Ulcer"),
      };
      const additionalComplications = complications
        .filter((item) => !defaultComp.includes(item))
        .join(", ");

      const comorbiditiesChecked = {
        hiv: comorbidities.includes("HIV"),
        htn: comorbidities.includes("Hypertension"),
        liver: comorbidities.includes("Liver Disease"),
        prego: comorbidities.includes("Pregnant"),
      };
      const additionalComorbidities = comorbidities
        .filter((item) => !defaultCoM.includes(item))
        .join(", ");

      setFormData({
        doctorDates: initialData.doctorDates,
        clinicalSympChecked,
        additionalClinicalSymp,
        dangerSignsChecked,
        additionalDangerSigns,
        complicationsChecked,
        additionalComplications,
        comorbiditiesChecked,
        additionalComorbidities,
      });
    }
  }, [initialData]);

  // Handler for checkbox changes.
  const handleCheckboxChange = (category, key) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: e.target.checked,
      },
    }));
  };

  // Handler for additional text inputs.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    let newErrors = {};
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Combine the checkbox selections with any additional values.
    const clinicalSympSelected = [];
    if (formData.clinicalSympChecked.polyuria)
      clinicalSympSelected.push("Polyuria");
    if (formData.clinicalSympChecked.polydipsia)
      clinicalSympSelected.push("Polydipsia");
    if (formData.clinicalSympChecked.polyphagia)
      clinicalSympSelected.push("Polyphagia");
    if (formData.additionalClinicalSymp) {
      formData.additionalClinicalSymp
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .forEach((item) => clinicalSympSelected.push(item));
    }

    const dangerSignsSelected = [];
    if (formData.dangerSignsChecked.hydra)
      dangerSignsSelected.push("Dehydration");
    if (formData.dangerSignsChecked.abspain)
      dangerSignsSelected.push("Abdominal Pain");
    if (formData.dangerSignsChecked.hypo)
      dangerSignsSelected.push("Hypoglycemia");
    if (formData.dangerSignsChecked.sighing)
      dangerSignsSelected.push("Shortness of Breath");
    if (formData.dangerSignsChecked.confusion)
      dangerSignsSelected.push("Confusion");
    if (formData.additionalDangerSigns) {
      formData.additionalDangerSigns
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .forEach((item) => dangerSignsSelected.push(item));
    }

    const complicationsSelected = [];
    if (formData.complicationsChecked.retino)
      complicationsSelected.push("Retinopathy");
    if (formData.complicationsChecked.nephro)
      complicationsSelected.push("Nephropathy");
    if (formData.complicationsChecked.neuro)
      complicationsSelected.push("Neuropathy");
    if (formData.complicationsChecked.footulcer)
      complicationsSelected.push("Foot Ulcer");
    if (formData.additionalComplications) {
      formData.additionalComplications
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .forEach((item) => complicationsSelected.push(item));
    }

    const comorbiditiesSelected = [];
    if (formData.comorbiditiesChecked.hiv) comorbiditiesSelected.push("HIV");
    if (formData.comorbiditiesChecked.htn)
      comorbiditiesSelected.push("Hypertension");
    if (formData.comorbiditiesChecked.liver)
      comorbiditiesSelected.push("Liver Disease");
    if (formData.comorbiditiesChecked.prego)
      comorbiditiesSelected.push("Pregnant");
    if (formData.additionalComorbidities) {
      formData.additionalComorbidities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .forEach((item) => comorbiditiesSelected.push(item));
    }

    const transformedData = {
      doctorDates: formData.doctorDates,
      clinicalSymp: clinicalSympSelected,
      dangerSigns: dangerSignsSelected,
      complications: complicationsSelected,
      comorbidities: comorbiditiesSelected,
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
          <Box mb="4">
            <Text fontWeight="bold">Consultation Date:</Text>
            <Text>{formData.doctorDates}</Text>
          </Box>
          <Box mb="4">
            <Text fontWeight="bold" mb="2" color={textColor}>
              Clinical Symptoms
            </Text>
            <Flex gap="10px" wrap="wrap">
              <Checkbox
                name="polyuria"
                colorScheme="purple"
                isChecked={formData.clinicalSympChecked.polyuria}
                onChange={handleCheckboxChange(
                  "clinicalSympChecked",
                  "polyuria"
                )}
              >
                Polyuria
              </Checkbox>
              <Checkbox
                name="polydipsia"
                colorScheme="purple"
                isChecked={formData.clinicalSympChecked.polydipsia}
                onChange={handleCheckboxChange(
                  "clinicalSympChecked",
                  "polydipsia"
                )}
              >
                Polydipsia
              </Checkbox>
              <Checkbox
                name="polyphagia"
                colorScheme="purple"
                isChecked={formData.clinicalSympChecked.polyphagia}
                onChange={handleCheckboxChange(
                  "clinicalSympChecked",
                  "polyphagia"
                )}
              >
                Polyphagia
              </Checkbox>
            </Flex>
            <FormControl mt="2">
              <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                Additional Clinical Symptoms (comma separated)
              </FormLabel>
              <Input
                name="additionalClinicalSymp"
                value={formData.additionalClinicalSymp}
                onChange={handleInputChange}
                variant="flushed"
              />
            </FormControl>
          </Box>
          <Box mb="4">
            <Text fontWeight="bold" mb="2" color={textColor}>
              Danger Signs
            </Text>
            <Flex gap="10px" wrap="wrap">
              <Checkbox
                name="hydra"
                colorScheme="purple"
                isChecked={formData.dangerSignsChecked.hydra}
                onChange={handleCheckboxChange("dangerSignsChecked", "hydra")}
              >
                Dehydration
              </Checkbox>
              <Checkbox
                name="abspain"
                colorScheme="purple"
                isChecked={formData.dangerSignsChecked.abspain}
                onChange={handleCheckboxChange("dangerSignsChecked", "abspain")}
              >
                Abdominal Pain
              </Checkbox>
              <Checkbox
                name="hypo"
                colorScheme="purple"
                isChecked={formData.dangerSignsChecked.hypo}
                onChange={handleCheckboxChange("dangerSignsChecked", "hypo")}
              >
                Hypoglycemia
              </Checkbox>
              <Checkbox
                name="sighing"
                colorScheme="purple"
                isChecked={formData.dangerSignsChecked.sighing}
                onChange={handleCheckboxChange("dangerSignsChecked", "sighing")}
              >
                Shortness of Breath
              </Checkbox>
              <Checkbox
                name="confusion"
                colorScheme="purple"
                isChecked={formData.dangerSignsChecked.confusion}
                onChange={handleCheckboxChange(
                  "dangerSignsChecked",
                  "confusion"
                )}
              >
                Confusion
              </Checkbox>
            </Flex>
            <FormControl mt="2">
              <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                Additional Danger Signs (comma separated)
              </FormLabel>
              <Input
                name="additionalDangerSigns"
                value={formData.additionalDangerSigns}
                onChange={handleInputChange}
                variant="flushed"
              />
            </FormControl>
          </Box>
          <Box mb="4">
            <Text fontWeight="bold" mb="2" color={textColor}>
              Complications
            </Text>
            <Flex gap="10px" wrap="wrap">
              <Checkbox
                name="retino"
                colorScheme="purple"
                isChecked={formData.complicationsChecked.retino}
                onChange={handleCheckboxChange(
                  "complicationsChecked",
                  "retino"
                )}
              >
                Retinopathy
              </Checkbox>
              <Checkbox
                name="nephro"
                colorScheme="purple"
                isChecked={formData.complicationsChecked.nephro}
                onChange={handleCheckboxChange(
                  "complicationsChecked",
                  "nephro"
                )}
              >
                Nephropathy
              </Checkbox>
              <Checkbox
                name="neuro"
                colorScheme="purple"
                isChecked={formData.complicationsChecked.neuro}
                onChange={handleCheckboxChange("complicationsChecked", "neuro")}
              >
                Neuropathy
              </Checkbox>
              <Checkbox
                name="footulcer"
                colorScheme="purple"
                isChecked={formData.complicationsChecked.footulcer}
                onChange={handleCheckboxChange(
                  "complicationsChecked",
                  "footulcer"
                )}
              >
                Foot Ulcer
              </Checkbox>
            </Flex>
            <FormControl mt="2">
              <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                Additional Complications (comma separated)
              </FormLabel>
              <Input
                name="additionalComplications"
                value={formData.additionalComplications}
                onChange={handleInputChange}
                variant="flushed"
              />
            </FormControl>
          </Box>
          <Box mb="4">
            <Text fontWeight="bold" mb="2" color={textColor}>
              Co-morbidity
            </Text>
            <Flex gap="10px" wrap="wrap">
              <Checkbox
                name="hiv"
                colorScheme="purple"
                isChecked={formData.comorbiditiesChecked.hiv}
                onChange={handleCheckboxChange("comorbiditiesChecked", "hiv")}
              >
                HIV
              </Checkbox>
              <Checkbox
                name="htn"
                colorScheme="purple"
                isChecked={formData.comorbiditiesChecked.htn}
                onChange={handleCheckboxChange("comorbiditiesChecked", "htn")}
              >
                Hypertension
              </Checkbox>
              <Checkbox
                name="liver"
                colorScheme="purple"
                isChecked={formData.comorbiditiesChecked.liver}
                onChange={handleCheckboxChange("comorbiditiesChecked", "liver")}
              >
                Liver Disease
              </Checkbox>
              <Checkbox
                name="prego"
                colorScheme="purple"
                isChecked={formData.comorbiditiesChecked.prego}
                onChange={handleCheckboxChange("comorbiditiesChecked", "prego")}
              >
                Pregnant
              </Checkbox>
            </Flex>
            <FormControl mt="2">
              <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                Additional Co-morbidities (comma separated)
              </FormLabel>
              <Input
                name="additionalComorbidities"
                value={formData.additionalComorbidities}
                onChange={handleInputChange}
                variant="flushed"
              />
            </FormControl>
          </Box>
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

  //API
  const [apiHost, setApiHost] = useState("");

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
  // Load the host URL from a text file (placed in your public folder as apiHost.txt)
  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

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
      if (!apiHost) return;
      const response = await fetch(
        apiHost + "/editDiabPatientAdditionalInfo",
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
      if (!apiHost) return;
      const response = await fetch(
        apiHost + "/deleteDiabPatientAdditionalInfo",
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
