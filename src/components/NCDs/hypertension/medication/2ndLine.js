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

export default function TwoLine() {
  const [medication1, setMedication1] = useState("N/A");
  const [medication2, setMedication2] = useState("N/A");

  medication = medication1 + ", " + medication2;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Medication Line</StyledTableCell>
            <StyledTableCell align="center">
              Medication + Starting Dose
            </StyledTableCell>
            <StyledTableCell align="center">Notes</StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell align="center" colSpan={3}>
            Prescribe one 1st Line + One 2nd Line Drug
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row" rowSpan={2}>
              1st Line (Thiazide diuretics)
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
                    <MenuItem value="HCTZ - 5mg oral 1x/day">
                      HCTZ - 25mg oral 1x/day
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </StyledTableCell>
            {/* <StyledTableCell align="left">
              <Box className="box">
                <FormControl size="small" fullWidth className="mb-0">
                  <InputLabel id="demo-simple-select-label">Dose</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={dose}
                    label="dose"
                    onChange={(e) => setDose(e.target.value)}
                    required
                  >
                    <MenuItem value="5mg oral 1x/day">5mg oral 1x/day</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </StyledTableCell> */}
            <StyledTableCell align="left" rowSpan={2}>
              Can cause dehydration and hpokalemia <br /> Contraindicated in
              pregnancy!
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold", m: 1 }}>
              Other Thiazide Diuretics + Dose:
              <MDBInput
                size="sm"
                wrapperClass="mb-2"
                label="Medication"
                id="typeText"
                type="text"
                onChange={(e) => setMedication1(e.target.value)}
              />
            </StyledTableCell>
            {/* <StyledTableCell align="left">
              Dose:
              <MDBInput
                size="sm"
                wrapperClass="mb-2"
                label="Dose"
                id="typeText"
                type="text"
                onChange={(e) => setDose1(e.target.value)}
              />
            </StyledTableCell> */}
          </StyledTableRow>
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
                    value={medication2}
                    label="medication2"
                    onChange={(e) => setMedication2(e.target.value)}
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
            {/* <StyledTableCell align="left">
              <Box className="box">
                <FormControl size="small" fullWidth className="mb-0">
                  <InputLabel id="demo-simple-select-label">Dose</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={dose}
                    label="dose"
                    onChange={(e) => setDose(e.target.value)}
                    required
                  >
                    <MenuItem value="5mg oral 1x/day">5mg oral 1x/day</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </StyledTableCell> */}
            <StyledTableCell align="left" rowSpan={2}>
              Can cause lower extremity edema and worsen volume overload. Can
              cause dizziness/lightheadedness. Safe in pregnancy.
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold", m: 1 }}>
              Other Calcium channel Blockers + Dose:
              <MDBInput
                size="sm"
                wrapperClass="mb-2"
                label="Medication"
                id="typeText"
                type="text"
                onChange={(e) => setMedication2(e.target.value)}
              />
            </StyledTableCell>
            {/* <StyledTableCell align="left">
              Dose:
              <MDBInput
                size="sm"
                wrapperClass="mb-2"
                label="Dose"
                id="typeText"
                type="text"
                onChange={(e) => setDose2(e.target.value)}
              />
            </StyledTableCell> */}
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
