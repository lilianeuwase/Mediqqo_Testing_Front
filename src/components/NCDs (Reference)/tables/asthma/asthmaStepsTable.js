import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AsthmaStepsTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell colSpan={2} align="center">
              Use the Step Method to Treat Asthma
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell align="center">
              STEP #5 ASTHMA ATTACK
            </StyledTableCell>
            <StyledTableCell align="center">
              STEP #4 Persistent – Severe
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell align="center">
              1. Revert to Respiratory emergency
            </StyledTableCell>
            <StyledTableCell align="center">
              1. Salbutamol Inh 2 puffs every 4 hr PRN <br />
              2. Beclamethasone 1500mcg 2 puff BD <br />
              3. Aminophylline 100mg PO 3x/day <br />
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
        <TableHead>
          <TableRow></TableRow>
          <TableRow>
            <StyledTableCell align="center">
              STEP #3 Persistent – Moderate
            </StyledTableCell>
            <StyledTableCell align="center">
              STEP #2 Persistent –Mild
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell align="center">
              1. Salbutamol Inh 2 puffs every 6 hrs <br />
              2. Beclamethasone 1000mcg <br />
              1puff BD
            </StyledTableCell>
            <StyledTableCell align="center">
              1. Salbutamol Inh 2 puffs every 6 hrs PRN <br />
              2. Beclamethasone 500mcg 1puff BD
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
        <TableHead>
          <TableRow></TableRow>
          <TableRow>
            <StyledTableCell align="center">
              STEP #1 Intermittent
            </StyledTableCell>
            <StyledTableCell align="center" style={{ backgroundColor: "red" }}>
              Step-Up Therapy When Patient’s Asthma Severity Worsen
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell align="center">
              1. Salbutamol Inh 2 puffs every 6 hrs PRN
            </StyledTableCell>
            <StyledTableCell
              align="center"
              style={{ backgroundColor: "green" }}
            >
              Step-Down Therapy When the Patient Achieves 3 months of Symptom
              Relief
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
