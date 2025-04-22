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

export default function HyperComTable() {
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
            <StyledTableCell align="left" colSpan={2}>
              Hypertension with Complications
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <StyledTableCell align="left" component="th" scope="row">
              Diabetes:
            </StyledTableCell>
            <StyledTableCell align="left">ACE-Inhibitors are first line.</StyledTableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <StyledTableCell align="left" component="th" scope="row">
              Proteinuria:
            </StyledTableCell>
            <StyledTableCell align="left">ACE-Inhibitors are first line.</StyledTableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <StyledTableCell align="left" component="th" scope="row">
              Cardiomyopathy:
            </StyledTableCell>
            <StyledTableCell align="left">
              Ace-Inhibitors, Beta-blockers, Spironolactone are preferred.
            </StyledTableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <StyledTableCell align="left" component="th" scope="row">
              Chronic Renal Failure:
            </StyledTableCell>
            <StyledTableCell align="left">
              1st Line: Furosemide, Amlodipine or Nifedipine <br />
              2nd Line: Beta-blockers and hydralazine
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
