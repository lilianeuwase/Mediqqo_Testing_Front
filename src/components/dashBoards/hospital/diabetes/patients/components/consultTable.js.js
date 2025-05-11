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
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  createColumnHelper,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import Card from "../../../../common/components/card/Card";
import { SearchBar } from "../../../../common/components/navbar/searchBar/SearchBar";

import AddConsult from "./consultation/addConsult";
import EditConsult from "./consultation/editConsult";
import DeleteConsult from "./consultation/deleteConsult";
import ConsultAlert from "./consultation/consultAlert";
import { LabExamModal, RequestLabTests } from "./consultation/requestLabTests";
import ViewConsult from "./consultation/viewConsult";

const columnHelper = createColumnHelper();

export default function ConsultTable({ patient }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  const [sorting, setSorting] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const [apiHost, setApiHost] = useState("");

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
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isLabTestRestrictionAlertOpen, setIsLabTestRestrictionAlertOpen] =
    useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEditData, setSelectedEditData] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteData, setSelectedDeleteData] = useState(null);
  const [selectedConsultationID, setSelectedConsultationID] = useState(null);

  const [selectedExams, setSelectedExams] = useState([]);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedViewData, setSelectedViewData] = useState(null);

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("consultDate", {
        id: "consultDate",
        header: "Consult Date",
        cell: (info) => (
          <Text fontSize="sm" color={textColor}>
            {info.getValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("clinicalSymp", {
        id: "clinicalSymp",
        header: "Symptoms",
        cell: (info) => {
          const value = info.getValue();
          return Array.isArray(value) ? (
            <Box>
              {value.map((item, idx) => (
                <Text key={idx} fontSize="sm" color={textColor}>
                  • {item}
                </Text>
              ))}
            </Box>
          ) : (
            <Text fontSize="sm" color={textColor}>
              {value}
            </Text>
          );
        },
      }),
      columnHelper.accessor("dangerSigns", {
        id: "dangerSigns",
        header: "Danger Signs",
        cell: (info) => {
          const value = info.getValue();
          return Array.isArray(value) ? (
            <Box>
              {value.map((item, idx) => (
                <Text key={idx} fontSize="sm" color={textColor}>
                  • {item}
                </Text>
              ))}
            </Box>
          ) : (
            <Text fontSize="sm" color={textColor}>
              {value}
            </Text>
          );
        },
      }),
      columnHelper.accessor("complications", {
        id: "complications",
        header: "Complications",
        cell: (info) => {
          const value = info.getValue();
          return Array.isArray(value) ? (
            <Box>
              {value.map((item, idx) => (
                <Text key={idx} fontSize="sm" color={textColor}>
                  • {item}
                </Text>
              ))}
            </Box>
          ) : (
            <Text fontSize="sm" color={textColor}>
              {value}
            </Text>
          );
        },
      }),
      columnHelper.accessor("comorbidities", {
        id: "comorbidities",
        header: "Co-morbidities",
        cell: (info) => {
          const value = info.getValue();
          return Array.isArray(value) ? (
            <Box>
              {value.map((item, idx) => (
                <Text key={idx} fontSize="sm" color={textColor}>
                  • {item}
                </Text>
              ))}
            </Box>
          ) : (
            <Text fontSize="sm" color={textColor}>
              {value}
            </Text>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <Flex gap="2">
            <Button
              size="xs"
              colorScheme="blue"
              variant="outline"
              onClick={() => {
                setSelectedViewData(info.row.original);
                setIsViewModalOpen(true);
              }}
            >
              View
            </Button>
            <Button
              size="xs"
              colorScheme="purple"
              onClick={() => {
                const fullConsult = (patient.consultations || []).find(
                  (c) => c.consultationID === info.row.original.consultationID
                );

                if (fullConsult) {
                  setSelectedEditData(fullConsult);
                  setSelectedConsultationID(fullConsult.consultationID);
                  setIsEditModalOpen(true);
                } else {
                  console.error("Consultation not found for editing");
                }
              }}
            >
              Edit
            </Button>
            <Button
              size="xs"
              colorScheme="red"
              variant="outline"
              onClick={() => {
                setSelectedDeleteData(info.row.original);
                setSelectedConsultationID(info.row.original.consultationID);
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
    if (patient && Array.isArray(patient.consultations)) {
      return patient.consultations.map((consult) => ({
        consultDate: consult.consultDate,
        consultationID: consult.consultationID,
        clinicalSymp: consult.clinicalSymp || [],
        dangerSigns: consult.dangerSigns || [],
        complications: consult.complications || [],
        comorbidities: consult.comorbidities || [],
        doctor_comment: consult.doctor_comment || "",
        pastHistorySummary: consult.pastHistorySummary || [],
        physicalExam: consult.physicalExam || {},
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

  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  const handleDelete = async () => {
    if (!selectedConsultationID) return;
    try {
      const response = await fetch(`${apiHost}/deleteDiabConsultation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: patient.phone_number,
          consultationID: selectedConsultationID,
        }),
      });
      const result = await response.json();
      if (result.status === "ok") {
        window.location.reload();
      } else {
        console.error("Delete failed:", result.error);
      }
    } catch (error) {
      console.error("Error deleting consultation:", error);
    }
  };

  return (
    <Card p="0px">
      {/* HEADER */}
      <Flex px="25px" py="15px" justify="space-between" align="center">
        <Text fontSize="22px" fontWeight="700" color={textColor}>
          Clinician Consultation
        </Text>
        <Flex gap="4">
          <SearchBar
            onSearch={(value) => {
              setSearchQuery(value);
              setCurrentPage(0);
            }}
          />
          <Button colorScheme="purple" onClick={onAddMoreInfoOpen}>
            + Consult
          </Button>
          <Button
            colorScheme="purple"
            variant="outline"
            onClick={onLabExamOpen}
          >
            Request Lab
          </Button>
        </Flex>
      </Flex>

      {/* TABLE */}
      <Box overflowX={{ sm: "scroll", lg: "hidden" }} px="25px">
        <Table variant="simple">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id} borderColor={borderColor}>
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
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row) => (
                <Tr key={row.id} _hover={{ bg: hoverBg }}>
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id} borderColor={borderColor}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={columns.length}>No data available</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>

      {/* PAGINATION */}
      <Flex justify="space-between" p="6">
        <Flex align="center" gap="2">
          <Text>Rows per page:</Text>
          <Select
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
        <Flex align="center" gap="2">
          <Button
            variant="ghost"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={currentPage >= totalPages - 1}
          >
            <ChevronRightIcon />
          </Button>
        </Flex>
      </Flex>

      {/* MODALS */}
      <AddConsult isOpen={isAddMoreInfoOpen} onClose={onAddMoreInfoClose} />
      {isEditModalOpen && (
        <EditConsult
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={selectedEditData}
          onSaved={() => window.location.reload()}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConsult
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          recordDate={selectedDeleteData?.consultDate || ""}
          onSaved={() => window.location.reload()}
        />
      )}

      {isViewModalOpen && (
        <ViewConsult
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedViewData(null);
          }}
          data={selectedViewData}
        />
      )}
      <ConsultAlert
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
      />
      <LabExamModal
        isOpen={isLabExamOpen}
        onClose={onLabExamClose}
        selectedExams={selectedExams}
        setSelectedExams={setSelectedExams}
      />
      <RequestLabTests
        isOpen={isLabTestRestrictionAlertOpen}
        onClose={() => setIsLabTestRestrictionAlertOpen(false)}
      />
    </Card>
  );
}
