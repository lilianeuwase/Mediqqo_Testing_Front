import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useColorModeValue,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { SearchBar } from "../../../../common/components/navbar/searchBar/SearchBar";
import Card from "../../../../common/components/card/Card";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import AddExitInfo from "./exitInfo/addExitInfo";
import EditExitInfo from "./exitInfo/editExitInfo";
import ReAdmissionExit from "./exitInfo/reAdmissionExit";

const columnHelper = createColumnHelper();

function DeleteExitConfirmation({ isOpen, onClose, onConfirm, recordDate }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete the exit record for{" "}
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

export default function ExitInfoTable({ patient }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const [sorting, setSorting] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  //Add & Edit
  const [isExitModalOpen, setIsExitModalOpen] = useState(false); // For ADD
  const [isEditExitOpen, setIsEditExitOpen] = useState(false); // For EDIT
  const [exitInitialData, setExitInitialData] = useState(null);
  const [exitRecordIndex, setExitRecordIndex] = useState(null);

  //Delete
  const [isDeleteExitOpen, setIsDeleteExitOpen] = useState(false);
  const [deleteExitData, setDeleteExitData] = useState(null);
  const [deleteExitIndex, setDeleteExitIndex] = useState(null);

  //API
  const [apiHost, setApiHost] = useState("");

  // Re-Admit Modal state
  const [isReAdmitModalOpen, setIsReAdmitModalOpen] = useState(false);

  // Load API Host
  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  const handleAddExit = () => {
    if (!patient || !patient.exitDates) {
      setIsExitModalOpen(true);
      return;
    }

    const lastExitIndex = patient.exitDates.length - 1;

    if (patient.reAdmissionDates && patient.reAdmissionDates[lastExitIndex]) {
      // Last exit was re-admitted => OK to exit again
      setIsExitModalOpen(true);
    } else {
      // Last exit not re-admitted yet
      alert(
        "Cannot exit again! Patient must be re-admitted after last exit first."
      );
    }
  };

  // Table Data
  const allData = React.useMemo(() => {
    if (patient && Array.isArray(patient.exitDates)) {
      return patient.exitDates.map((date, index) => ({
        exitDate: date,
        exitReason: patient.exitReasons ? patient.exitReasons[index] : "",
        exitTransfer: patient.exitTransfers ? patient.exitTransfers[index] : "",
        reAdmissionDate: patient.reAdmissionDates
          ? patient.reAdmissionDates[index]
          : "",
        reAdmissionReason: patient.reAdmissionReasons
          ? patient.reAdmissionReasons[index]
          : "",
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

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("exitDate", {
        id: "exitDate",
        header: "Exit Date",
        cell: (info) => (
          <Text fontSize="sm" color={textColor}>
            {info.getValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("exitReason", {
        id: "exitReason",
        header: "Exit Reason",
        cell: (info) => (
          <Text fontSize="sm" color={textColor}>
            {info.getValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("exitTransfer", {
        id: "exitTransfer",
        header: "Referred Facility",
        cell: (info) => (
          <Text fontSize="sm" color={textColor}>
            {info.getValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("reAdmissionDate", {
        id: "reAdmissionDate",
        header: "Re-Admission Date",
        cell: (info) => (
          <Text fontSize="sm" color={textColor}>
            {info.getValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("reAdmissionReason", {
        id: "reAdmissionReason",
        header: "Re-Admission Reason",
        cell: (info) => (
          <Text fontSize="sm" color={textColor}>
            {info.getValue()}
          </Text>
        ),
      }),
      columnHelper.display({
        id: "action",
        header: () => (
          <Text fontSize="sm" color="gray.400">
            Action
          </Text>
        ),
        cell: (info) => {
          const exitRow = info.row.original;

          const canReadmit =
            exitRow.exitReason !== "Death" && !exitRow.reAdmissionDate;

          return (
            <Flex gap="4">
              <Button
                variant="orange"
                size="xs"
                onClick={() => {
                  const rowData = info.row.original;
                  setExitInitialData(rowData);
                  setExitRecordIndex(info.row.index);
                  setIsEditExitOpen(true);
                }}
              >
                Edit
              </Button>

              <Button
                variant="outline"
                colorScheme="red"
                size="xs"
                onClick={() => {
                  setDeleteExitData(info.row.original);
                  setDeleteExitIndex(info.row.index);
                  setIsDeleteExitOpen(true);
                }}
              >
                Delete
              </Button>

              <Button
                variant="purple"
                size="xs"
                isDisabled={!canReadmit}
                onClick={() => {
                  setExitInitialData(exitRow); // we reuse initialData
                  setExitRecordIndex(info.row.index);
                  setIsReAdmitModalOpen(true); // this new state we'll create
                }}
              >
                Re-Admit
              </Button>
            </Flex>
          );
        },
      }),
    ],
    [textColor]
  );

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

  //Delete
  const handleDeleteExit = async () => {
    const patientPhone = patient?.phone_number;
    if (!patientPhone) {
      alert("Patient profile not found!");
      return;
    }

    try {
      const response = await fetch(`${apiHost}/deleteExitInfo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: patientPhone,
          recordIndex: deleteExitIndex,
        }),
      });

      const result = await response.json();
      if (result.status === "ok") {
        window.location.reload(); // Refresh exits
      } else {
        alert("Error deleting exit: " + result.error);
      }
    } catch (error) {
      console.error("Error deleting exit:", error);
    }
  };

  return (
    <Card p="0px">
      <Flex px="25px" py="15px" justifyContent="space-between" align="center">
        <Text fontSize="22px" fontWeight="700" color={textColor}>
          Exit Information
        </Text>
        <Flex align="center" gap="8px">
          <SearchBar
            onSearch={(value) => {
              setSearchQuery(value);
              setCurrentPage(0);
            }}
          />
          <Button colorScheme="red" size="md" onClick={() => handleAddExit()}>
            + Add Exit Info
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
                >
                  No exit records available.
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
      {/* Pagination Controls */}
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
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </Select>
        </Flex>
        <Text fontSize="sm" color={textColor}>
          {`${
            filteredData.length > 0 ? currentPage * pageSize + 1 : 0
          }-${Math.min((currentPage + 1) * pageSize, filteredData.length)} of ${
            filteredData.length
          }`}
        </Text>
        <Flex align="center" gap="2">
          <Button
            onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
            size="sm"
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            onClick={() =>
              currentPage < totalPages - 1 && setCurrentPage(currentPage + 1)
            }
            disabled={currentPage >= totalPages - 1}
            size="sm"
          >
            <ChevronRightIcon />
          </Button>
        </Flex>
      </Flex>
      <AddExitInfo
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
      />

      <EditExitInfo
        isOpen={isEditExitOpen}
        onClose={() => setIsEditExitOpen(false)}
        initialData={exitInitialData}
        recordIndex={exitRecordIndex}
        onSaved={() => window.location.reload()} // Reload after update
      />
      <DeleteExitConfirmation
        isOpen={isDeleteExitOpen}
        onClose={() => {
          setIsDeleteExitOpen(false);
          setDeleteExitData(null);
          setDeleteExitIndex(null);
        }}
        onConfirm={() => {
          setIsDeleteExitOpen(false);
          handleDeleteExit();
        }}
        recordDate={deleteExitData ? deleteExitData.exitDate : ""}
      />
      <ReAdmissionExit
        isOpen={isReAdmitModalOpen}
        onClose={() => setIsReAdmitModalOpen(false)}
        initialData={exitInitialData}
        recordIndex={exitRecordIndex}
        onSaved={() => window.location.reload()} // reload table after saving
      />
    </Card>
  );
}
