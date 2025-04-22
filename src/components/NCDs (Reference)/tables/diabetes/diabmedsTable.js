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

export default function DiabMedsTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" rowSpan={3}>STEP</StyledTableCell>
            <StyledTableCell align="center" colSpan={2}>
              METFORMIN
            </StyledTableCell>
            <StyledTableCell align="center" colSpan={2}>
              GLIBENCLAMIDE
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell>7 AM</StyledTableCell>
            <StyledTableCell>7 AM</StyledTableCell>
            <StyledTableCell>7 AM</StyledTableCell>
            <StyledTableCell>7 AM</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>1</StyledTableCell>
            <StyledTableCell>500 mg</StyledTableCell>
            <StyledTableCell>---</StyledTableCell>
            <StyledTableCell>5 mg</StyledTableCell>
            <StyledTableCell>---</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>2</StyledTableCell>
            <StyledTableCell>500 mg</StyledTableCell>
            <StyledTableCell>500 mg</StyledTableCell>
            <StyledTableCell>5 mg</StyledTableCell>
            <StyledTableCell>5 mg</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>3</StyledTableCell>
            <StyledTableCell>1000 mg</StyledTableCell>
            <StyledTableCell>500 mg</StyledTableCell>
            <StyledTableCell>10 mg</StyledTableCell>
            <StyledTableCell>5 mg</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>4</StyledTableCell>
            <StyledTableCell>1000 mg</StyledTableCell>
            <StyledTableCell>1000 mg</StyledTableCell>
            <StyledTableCell>10 mg</StyledTableCell>
            <StyledTableCell>10 mg</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>5</StyledTableCell>
            <StyledTableCell align="center" colSpan={2}>Add Glibenclamide</StyledTableCell>
            <StyledTableCell align="center" colSpan={2}>Add Metformin</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
