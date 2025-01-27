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

export default function Asthma2ndVisit() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center">ASTHMA Step 1 or 2</StyledTableCell>
            <StyledTableCell align="center">
              ASTHMA Step 3 or Above
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell align="center">
              <strong>Medication Change</strong>
            </StyledTableCell>
            <StyledTableCell align="center">
              Return in 4-6 weeks
            </StyledTableCell>
            <StyledTableCell align="center">
              Return in 1-2 weeks
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>

        <TableBody>
          {" "}
          <TableRow>
            <StyledTableCell align="center">
              <strong>Medication Change</strong>
            </StyledTableCell>
            <StyledTableCell align="center">
              Return in 3-4 months
            </StyledTableCell>
            <StyledTableCell align="center">NA</StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
