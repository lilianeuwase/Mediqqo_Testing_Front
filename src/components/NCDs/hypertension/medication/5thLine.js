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

export default function FiveLine() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="left">Medication</StyledTableCell>
            <StyledTableCell align="left">Starting Dose</StyledTableCell>
            <StyledTableCell align="left">Notes</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              1st Line (Thiazide diuretics)
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold", m: 1 }}>
              HCTZ
            </StyledTableCell>
            <StyledTableCell align="left">12.5mg oral 1x/day</StyledTableCell>
            <StyledTableCell align="left">
              Can cause dehydration and hpokalemia <br /> Contraindicated in
              pregnancy!
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row" rowSpan={2}>
              2nd Line (Calcium channel Blockers)
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold", m: 1 }}>
              Amlodipine
            </StyledTableCell>
            <StyledTableCell align="left">5mg oral 1x/day</StyledTableCell>
            <StyledTableCell align="left" rowSpan={2}>
              Can cause lower extremity edema and worsen volume overload. <br />
              Can cause dizziness/lightheadedness. <br /> Safe in pregnancy.
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold", m: 1 }}>
              Nifedipine (Sustained Release)
            </StyledTableCell>
            <StyledTableCell align="left">20mg oral 2x/day</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row" rowSpan={2}>
              3rd Line (ACE-Inhibitors)
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold", m: 1 }}>
              Lisinopril
            </StyledTableCell>
            <StyledTableCell align="left">10mg oral 1x/day</StyledTableCell>
            <StyledTableCell align="left" rowSpan={2}>
              Can cause acute kidney injury, hyperkalemia, angioedema, cough{" "}
              <br />
              Contraindicated in pregnancy!
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold", m: 1 }}>
              Captopril
            </StyledTableCell>
            <StyledTableCell align="left">12.5mg oral 3x/day</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row" rowSpan={2}>
              4th Line (Betablockers)
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold", m: 1 }}>
              Atenolol
            </StyledTableCell>
            <StyledTableCell align="left">12.5mg oral 1x/day</StyledTableCell>
            <StyledTableCell align="left" rowSpan={2}>
              Contraindicated if HR less than 60 bpm Atenolol should not be used
              in pregnancy. <br />
              Carvedilol is safe in pregnancy.
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold", m: 1 }}>
              Carvedilol
            </StyledTableCell>
            <StyledTableCell align="left">6.25mg oral 2x/day</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              5th Line
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold", m: 1 }}>
              Hydralazine
            </StyledTableCell>
            <StyledTableCell align="left">25mg oral 3x/day</StyledTableCell>
            <StyledTableCell align="left">
              Headaches are common. Safe in pregnancy.
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
