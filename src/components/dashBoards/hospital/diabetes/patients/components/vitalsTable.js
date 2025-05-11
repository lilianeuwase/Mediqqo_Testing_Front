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
  useToast,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Card from "../../../../common/components/card/Card";
import { SearchBar } from "../../../../common/components/navbar/searchBar/SearchBar";
import {
  createColumnHelper,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import AddVitals from "./vitals/addVital";
import EditVitals from "./vitals/editVitals";
import DeleteConfirmation from "./vitals/deleteConfirmation";
import VitalsRestrictionAlert from "./vitals/vitalsAlert";

const columnHelper = createColumnHelper();

export default function VitalsTable({ patient }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [sorting, setSorting] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [apiHost, setApiHost] = useState("");
  const [isVitalsRestrictionAlertOpen, setIsVitalsRestrictionAlertOpen] =
    useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteData, setSelectedDeleteData] = useState(null);
  const [selectedConsultationID, setSelectedConsultationID] = useState(null);

  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  const allData = React.useMemo(() => {
    if (patient && Array.isArray(patient.vitals)) {
      return patient.vitals.map((vital) => ({
        consultationID: vital.consultationID,
        vitalsDates: vital.date,
        height: vital.height,
        weight: vital.weight,
        bmi: vital.bmi,
        temp: vital.temp,
        BP: vital.BP,
        HR: vital.HR,
        RR: vital.RR,
        O2: vital.O2,
        moreVitals: vital.moreVitals || [],
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
    columns: [
      columnHelper.accessor("vitalsDates", { header: "Date of Vitals" }),
      columnHelper.accessor("height", { header: "Height (cm)" }),
      columnHelper.accessor("weight", { header: "Weight (kg)" }),
      columnHelper.accessor("bmi", { header: "BMI" }),
      columnHelper.accessor("temp", { header: "Temp (C)" }),
      columnHelper.accessor("BP", { header: "BP (mmHg)" }),
      columnHelper.accessor("HR", { header: "HR (bpm)" }),
      columnHelper.accessor("RR", { header: "RR" }),
      columnHelper.accessor("O2", { header: "SaO2 (%)" }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <Flex gap="2">
            <Button
              size="xs"
              colorScheme="orange"
              onClick={() => {
                setSelectedEditData(info.row.original);
                setSelectedRowIndex(info.row.index);
                setIsEditModalOpen(true);
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
      consultationID: updatedData.consultationID,
      updatedVitals: {
        consultationID: updatedData.consultationID, // ✅
        date: updatedData.vitalsDates,
        height: updatedData.height,
        weight: updatedData.weight,
        bmi: updatedData.bmi,
        temp: updatedData.temp,
        BP: updatedData.BP,
        HR: updatedData.HR,
        RR: updatedData.RR,
        O2: updatedData.O2,
        moreVitals: updatedData.moreVitals || [],
      },
    };

    try {
      const response = await fetch(`${apiHost}/editDiabVitals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status === "ok") {
        toast({
          title: "Vitals Updated",
          description: "Patient's vital signs were successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        window.location.reload(); // ✅ After showing toast
      } else {
        console.error("Error updating record:", result.error);
      }
    } catch (error) {
      console.error("Error updating vitals:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedConsultationID) return;
    try {
      const response = await fetch(`${apiHost}/deleteDiabVitals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: patient.phone_number,
          consultationID: selectedConsultationID,
        }),
      });
      const result = await response.json();
      if (result.status === "ok") {
        toast({
          title: "Vitals Deleted",
          description: "Patient's vital signs record was successfully deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        window.location.reload();
      } else {
        console.error("Delete failed:", result.error);
      }
    } catch (error) {
      console.error("Error deleting vitals record:", error);
    }
  };

  return (
    <Card p="0px">
      <Flex px="25px" py="15px" justifyContent="space-between" align="center">
        <Text fontSize="22px" fontWeight="700" color={textColor}>
          Vitals
        </Text>
        <Flex gap="8px">
          <SearchBar
            onSearch={(value) => {
              setSearchQuery(value);
              setCurrentPage(0);
            }}
          />
          <Button colorScheme="orange" onClick={onOpen}>
            + Add Vitals
          </Button>
        </Flex>
      </Flex>

      {/* TABLE */}
      <Box overflowX={{ sm: "scroll", lg: "hidden" }} px="25px">
        <Table variant="simple" color={textColor}>
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
            {paginatedRows.length === 0 ? (
              <Tr>
                <Td colSpan={table.getAllColumns().length}>
                  No data available
                </Td>
              </Tr>
            ) : (
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
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </Select>
        </Flex>
        <Flex align="center" gap="2">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
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
      <AddVitals isOpen={isOpen} onClose={onClose} />
      {isEditModalOpen && (
        <EditVitals
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
        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedDeleteData(null);
          }}
          onConfirm={handleDelete}
          recordDate={selectedDeleteData?.vitalsDates}
        />
      )}
      <VitalsRestrictionAlert
        isOpen={isVitalsRestrictionAlertOpen}
        onClose={() => setIsVitalsRestrictionAlertOpen(false)}
      />
    </Card>
  );
}
