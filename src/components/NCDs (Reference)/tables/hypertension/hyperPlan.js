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

export default function HyperPlan() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" colSpan={2}>
              CONDITIONS THAT REQURE DIFFERENT MANAGEMENT
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>
              <strong>Pregnancy</strong>
            </StyledTableCell>
            <StyledTableCell>
              Ace-Inhibitors, Atenolol, and HCTZ should not be used in pregnant
              women. <br />
              Refer all pregnant women to the pre-natal visit.
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>
              <strong>Renal Failure</strong>
            </StyledTableCell>
            <StyledTableCell>
              Remember that acute kidney injury and chronic kidney disease are
              managed differently! ACE-Inhibitors (Ace-I) <br />
              o If Cr greater than 200umol/L, then ACE-I are contraindicated{" "}
              <br />o If Cr increases by 50% hold ACE-I. Recheck Cr within 1
              month.
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>
              <strong>Bradycardia – Hr less than 60</strong>
            </StyledTableCell>
            <StyledTableCell>
              Do not start a beta-blocker. This will induce heart block. <br />
              Consider admission to District Hospital. If referral is not
              necessary, continue with outpatient management.
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>
              <strong>Hyperkalemia</strong>
            </StyledTableCell>
            <StyledTableCell>
              If potassium greater than 5.5 mEq/L, stop ACE-Inhibitors and
              spironolactone and treat hyperkalemia. <br />
              Consider admission to District Hospital. If referral is not
              necessary, continue with outpatient management.
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>
              <strong>Hypokalemia</strong>
            </StyledTableCell>
            <StyledTableCell>
              Hold furosemide if KCl is less than 3.0. Consider admission to
              hospital for potassium repletion.
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>
              <strong>HIV Positive</strong>
            </StyledTableCell>
            <StyledTableCell>
              Be sure to refer to ID clinic because patient may need ARVs
              changed.
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
