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
function createData(cond1, dose1, cond2, dose2) {
  return { cond1, dose1, cond2, dose2 };
}

const rows = [
  createData("<=120", "Give no insulin", "<=140", "Give no insulin"),
  createData("121-180", "Give 0.05 units/kg", "141-180", "Give 0.05 units/kg"),
  createData("181-250", "Give 0.1 units/kg", "181-215", "Give 0.1 units/kg"),
  createData("251-300", "Give 0.15 units/kg", "216-250", "Give 0.15 units/kg"),
  createData(">300", "Give 0.2 units/kg", "251-300", "Give 0.2 units/kg"),
  createData("", "", ">300", "Give 0.25 units/kg"),
];

export default function InsulinTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" colSpan={2}>
              Morning Dose
            </StyledTableCell>
            <StyledTableCell align="center" colSpan={3}>
              Evening Dose
            </StyledTableCell>
          </TableRow>
          <TableRow>
          <StyledTableCell align="center">0700 glucose (mg/dL)</StyledTableCell>
            <StyledTableCell align="center">Dose</StyledTableCell>
            <StyledTableCell align="center">1600 glucose (mg/dL)</StyledTableCell>
            <StyledTableCell align="center">Dose</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.cond1}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell align="center" component="th" scope="row">
                {row.cond1}
              </StyledTableCell>
              <StyledTableCell align="center">{row.dose1}</StyledTableCell>
              <StyledTableCell align="center">{row.cond2}</StyledTableCell>
              <StyledTableCell align="center">{row.dose2}</StyledTableCell>
      
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
