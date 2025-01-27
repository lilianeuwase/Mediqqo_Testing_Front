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

export default function EducationTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left" colSpan={2}>
              SYMPTOM MONITORING
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <StyledTableCell align="left" component="th" scope="row">
              Hypoglycemia:
            </StyledTableCell>
            <StyledTableCell align="left">
              Teach patients to recognize symptoms and routinely carry
              containing snacks or drinks with them.
            </StyledTableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <StyledTableCell align="left" component="th" scope="row">
              Hyperglycemia:
            </StyledTableCell>
            <StyledTableCell align="left">
              Instruct patient to return to the hospital with worsening
              symptoms.
            </StyledTableCell>
          </TableRow>
        </TableBody>

        <TableHead>
          <TableRow>
            <StyledTableCell align="left" colSpan={2}>
              INSULIN
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <StyledTableCell align="left" component="th" scope="row">
              Storage:
            </StyledTableCell>
            <StyledTableCell align="left">
              Make sure that patients have a way to safely store insulin.
            </StyledTableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <StyledTableCell align="left" component="th" scope="row">
              Administration:
            </StyledTableCell>
            <StyledTableCell align="left">Review proper technique.</StyledTableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <StyledTableCell align="left" component="th" scope="row">
              Timing:
            </StyledTableCell>
            <StyledTableCell align="left">
              1. Fingerstick, 2. Insulin, 3. Eat
            </StyledTableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <StyledTableCell align="left" component="th" scope="row">
              Monitoring:
            </StyledTableCell>
            <StyledTableCell align="left">
              Two to three weeks after initiation or insulin adjustment <br />
              Alternate pre-breakfast & pre-dinner FBG with pre-lunch and
              prebedtime FBG. <br />
              Remind patient to bring glucose monitoring chart to clinic. <br />
              Explain that good control is established when the patient is
              monitoring urine glucose twice a day. <br />
              If 2 positive urine glucose measurements, then revert back to FBG.
            </StyledTableCell>
          </TableRow>
        </TableBody>

        <TableHead>
          <TableRow>
            <StyledTableCell align="left" colSpan={2}>
              DIET
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <StyledTableCell align="left" component="th" scope="row">
              Diet Counseling:
            </StyledTableCell>
            <StyledTableCell align="left">
              Help patient obtain social services if needed.
              <br />
              REVIEW WHAT FOODS THE PATIENT SHOULD EAT TO MAINTAIN A HEALTHY
              DIET
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
