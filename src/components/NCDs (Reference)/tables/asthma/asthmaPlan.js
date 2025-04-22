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

export default function AsthmaPlan() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" colSpan={2}>
              Identify and Treat Conditions that Mimic Asthma
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>
              <strong>HIV</strong>
            </StyledTableCell>
            <StyledTableCell>
              Check HIV if patient has never been tested.
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>
              <strong>
                Pneumonia (HIV+, Productive Cough, Fever, Sweats, Weight loss)
              </strong>
            </StyledTableCell>
            <StyledTableCell>
              Treat for pneumonia. <br />
              If patient has danger signs (speaking in broken sentences,
              confusion, RR greater than 30): <br />
              o Refer to district hospital for IV antibiotics.
              <br />
              o Do a sputum smear for TB x 3.
              <br />
              o Do a CXR
              <br />
              If patient has risk factors for TB (without danger signs).
              <br />
              o Do a sputum smear for TB x 3.
              <br />
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>
              <strong>Anemia</strong>
            </StyledTableCell>
            <StyledTableCell>
              Check HB/HCT and Treat with Iron and Albendazole.
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>
              <strong>Heart Failure</strong>
            </StyledTableCell>
            <StyledTableCell>
              Refer to heart failure clinic for further evaluation.
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>
              <strong>Chronic Cough Without Other Symptoms</strong>
            </StyledTableCell>
            <StyledTableCell>
              Treat patient for:
              <br />
              o Gastroesophageal reflux disease GERD:
              <br />
              Omeprazole or cimetidine for 2-4 weeks. If no response, treat
              triple therapy for H. pylori.
              <br />
              o Allergies: Nasal steroids or anti-histamines (chlorpheniramine).
              <br />
              o Helminths (Strongyloides): Anti-helminthic (albendazole)
              <br />
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
