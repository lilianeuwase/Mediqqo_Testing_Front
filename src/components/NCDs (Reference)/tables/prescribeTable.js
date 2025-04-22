import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function PrescribeTable(props) {
  //Store Results
  const diagnosis = "Diabetes Found";
  const patient_manage = "Manage as an Outpatient (OPD)";
  const medication = props.medication;
  const phone_number = props.phone_number;

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(phone_number, diagnosis, patient_manage, medication);
    fetch("https://mediqo-api.onrender.com/updatePatient1", {
      // fetch("http://localhost:5000/updatePatient1", {
        // fetch("https://fantastic-python.cyclic.app/updatePatient1", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        phone_number,
        diagnosis,
        patient_manage,
        medication,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "patientRegister");
        if (data.status == "ok") {
          alert("Patient Info is Updated");
          window.location.href = "/userDetails";
        } else {
          alert("Something went wrong");
        }
      });
  };

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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>{props.title1}</StyledTableCell>
                <StyledTableCell align="right">{props.title2}</StyledTableCell>
                <StyledTableCell align="right">{props.title3}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow key={props.medication1}>
                <StyledTableCell component="th" scope="row">
                  {props.medication1}
                </StyledTableCell>
                <StyledTableCell align="right">{props.dosage1}</StyledTableCell>
                <StyledTableCell align="right">
                  {props.consumption1}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
            <TableBody>
              <StyledTableRow key={props.medication2}>
                <StyledTableCell component="th" scope="row">
                  {props.medication2}
                </StyledTableCell>
                <StyledTableCell align="right">{props.dosage2}</StyledTableCell>
                <StyledTableCell align="right">
                  {props.consumption2}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
            <TableBody>
              <StyledTableRow key={props.medication3}>
                <StyledTableCell component="th" scope="row">
                  {props.medication3}
                </StyledTableCell>
                <StyledTableCell align="right">{props.dosage3}</StyledTableCell>
                <StyledTableCell align="right">
                  {props.consumption3}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
            <TableBody>
              <StyledTableRow key={props.medication4}>
                <StyledTableCell component="th" scope="row">
                  {props.medication4}
                </StyledTableCell>
                <StyledTableCell align="right">{props.dosage4}</StyledTableCell>
                <StyledTableCell align="right">
                  {props.consumption4}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
            <TableBody>
              <StyledTableRow key={props.medication5}>
                <StyledTableCell component="th" scope="row">
                  {props.medication5}
                </StyledTableCell>
                <StyledTableCell align="right">{props.dosage5}</StyledTableCell>
                <StyledTableCell align="right">
                  {props.consumption5}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div className="d-grid">
          <button type="submit" className="button-3">
            FINISH & SAVE
          </button>
        </div>
      </form>
    </div>
  );
}
