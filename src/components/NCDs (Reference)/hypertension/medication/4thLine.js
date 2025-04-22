import { useState } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MDBInput } from "mdb-react-ui-kit";
import TextArea from "@atlaskit/textarea";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  red: {
    color: "red",
  },

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

let medication;

export default function FourLine() {
  const [medication1, setMedication1] = useState("N/A");
  const [medication2, setMedication2] = useState("N/A");
  const [medication3, setMedication3] = useState("N/A");

  medication = medication1 + ", " + medication2 + ", " + medication3;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Medication</StyledTableCell>
            <StyledTableCell align="center">Starting Dose</StyledTableCell>
            <StyledTableCell align="center">Notes</StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell align="center" colSpan={3}>
              Prescribe one 2nd Line + one 3rd Line + One 4th Line Drugs
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row" rowSpan={2}>
              2nd Line (Calcium channel Blockers)
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold", m: 1 }}>
              <Box className="box">
                <FormControl size="small" fullWidth className="mb-0">
                  <InputLabel id="demo-simple-select-label">
                    Medication
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={medication1}
                    label="medication1"
                    onChange={(e) => setMedication1(e.target.value)}
                    required
                  >
                    <MenuItem value="Amlodipine - 5mg oral 1x/day">
                      CCB: Amlodipine - 5mg oral 1x/day
                    </MenuItem>
                    <MenuItem value="Nifedipine - 20mg oral 2x/day">
                      Nifedipine (Sustained Release) - 20mg oral 2x/day
                    </MenuItem>
                    <MenuItem value="Losartan - 50mg oral 2x/day">
                      ARB: Losartan - 50mg oral 2x/day
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </StyledTableCell>

            <StyledTableCell align="left" rowSpan={2}>
              Can cause lower extremity edema and worsen volume overload. Can
              cause dizziness/lightheadedness. Safe in pregnancy.
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold", m: 1 }}>
              Other Calcium Channel Blockers + Dose:
              <MDBInput
                size="sm"
                wrapperClass="mb-2"
                label="Medication"
                id="typeText"
                type="text"
                onChange={(e) => setMedication1(e.target.value)}
              />
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row" rowSpan={2}>
              3rd Line (ACEInhibitors)
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold", m: 1 }}>
              <Box className="box">
                <FormControl size="small" fullWidth className="mb-0">
                  <InputLabel id="demo-simple-select-label">
                    Medication
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={medication2}
                    label="medication2"
                    onChange={(e) => setMedication2(e.target.value)}
                    required
                  >
                    <MenuItem value="Lisinopril - 10mg oral 1x/day">
                      Lisinopril - 10mg oral 1x/day
                    </MenuItem>
                    <MenuItem value="Nifedipine - 20mg oral 2x/day">
                      captopril - 12.5mg oral 2x/day
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </StyledTableCell>

            <StyledTableCell align="left" rowSpan={2}>
              Can cause acute kidney injury, hyperkalemia, angioedema, cough
              Contraindicated in pregnancy!
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold", m: 1 }}>
              Other Ace-I + Dose:
              <MDBInput
                size="sm"
                wrapperClass="mb-2"
                label="Medication"
                id="typeText"
                type="text"
                onChange={(e) => setMedication2(e.target.value)}
              />
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row" rowSpan={2}>
              4th Line (Betablockers)
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold", m: 1 }}>
              <Box className="box">
                <FormControl size="small" fullWidth className="mb-0">
                  <InputLabel id="demo-simple-select-label">
                    Medication
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={medication3}
                    label="medication3"
                    onChange={(e) => setMedication3(e.target.value)}
                    required
                  >
                    <MenuItem value="Spironolactone 25-50mg oral 2x/day">
                      Spironolactone 25-50mg oral 2x/day
                    </MenuItem>
                    <MenuItem value="Atenolol - 12.5mg oral 1x/day">
                      Atenolol - 12.5mg oral 1x/day
                    </MenuItem>
                    <MenuItem value="Carvedilol - 6.25mg oral 2x/day">
                      Carvedilol - 6.25mg oral 2x/day
                    </MenuItem>
                    <MenuItem value="Hydralazine - 25mg oral 3x/day">
                      Hydralazine - 25mg oral 3x/day
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </StyledTableCell>

            <StyledTableCell align="left" rowSpan={2}>
              Contraindicated if HR less than 60 bpm Atenolol should not be used
              in pregnancy. Carvedilol is safe in pregnancy!
              <br />
              <br />
              Headaches are common.
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold", m: 1 }}>
              Other Diuretics, Alpha brocker or beta-brockerAce-I + Dose:
              <MDBInput
                size="sm"
                wrapperClass="mb-2"
                label="Medication"
                id="typeText"
                type="text"
                onChange={(e) => setMedication3(e.target.value)}
              />
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
        <TableHead>
          <TableRow>
            <StyledTableCell
              align="center"
              colSpan={3}
              className="red"
              sx={{ fontWeight: "bold", m: 2 }}
            >
              Prescribed Medication: {medication}
            </StyledTableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}
export { medication };
