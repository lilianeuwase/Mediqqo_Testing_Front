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

export default function DiabPlan() {
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
              Pregnant women should be started on insulin immediately. They
              should NOT Pregnancy be on oral agents (glibenclamide or
              metformin) or ace-Inhibitors. All women of reproductive age should
              be referred for family planning.
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>
              <strong>Renal Failure</strong>
            </StyledTableCell>
            <StyledTableCell>
              Stop metformin and sulfonylurea if creatinine doubles or greater
              than 150 umol/L Decrease insulin by 25% if Creatinine doubles or
              greater than 150 kmol/L and patient has evidence of hypoglycemia
              ACE-Inhibitors (Ace-i) If Cr greater than 200umol/L, then ACE-I
              are contraindicated If Cr increases by 50% hold ACE-I. Re-check Cr
              within 1 month.
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>
              <strong>Liver Failure</strong>
            </StyledTableCell>
            <StyledTableCell>
              If patient has evidence of hypoglycemia, then decrease patient's
              insulin by 25%.
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
