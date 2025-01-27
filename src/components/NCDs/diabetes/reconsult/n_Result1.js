import { React, useState } from "react";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import InfoCard from "../../../cards/infoCard";
import ProfileCard from "../../../cards/profileCard";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DiabMedsTable from "../../../tables/diabetes/diabmedsTable";

export default function NResult1({ i, contro, titra }) {
  let weight = i.weight ?? [];
  let height = i.height ?? [];
  let bmi = i.bmi ?? [];

  const b = i.consultations - 1 ?? 0;
  const phone_number = i.phone_number;
  const current_name = i.lname + " " + i.fname;
  //Store Results
  const diagnosis = contro + " Control";
  const patient_manage = titra;
  const [medication, setMedication] = useState("");
  const control = contro;
  const titration = titra;

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(phone_number, diagnosis, patient_manage, medication, control);
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
        control,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "patientRegister");
        if (data.status == "ok") {
          alert("Patient Info is Updated");
          window.location.href = "/userDetails";
        }
        else {
          alert("Something went wrong");
        }
      });
  };

  return (
    <MDBCol>
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol md="5" className="mb-4">
            <ProfileCard
              name={current_name}
              gender={i.gender}
              age={i.age}
              weight={weight[b]}
              height={height[b]}
              bmi={bmi[b]}
              phone={i.phone_number}
            />
          </MDBCol>
          <MDBCol>
           
              <MDBCol>
                <InfoCard
                  color="light"
                  class="text-dark mb-4"
                  header="Findings"
                  textClass="fw-bold text-danger"
                  text={control + " Control"}
                />
              </MDBCol>
              <MDBCol>
                <InfoCard
                  color="dark"
                  class="text-light mb-4"
                  header="Patient Management"
                  textClass="fw-bold text-light"
                  text={titration}
                />
              </MDBCol>
            
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <DiabMedsTable />
          </MDBCol>
          <MDBCol sm="8">
            <Box className="box">
              <FormControl size="small" fullWidth className="mt-4">
                <InputLabel id="demo-simple-select-label">
                  Prescribed Medicine
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={medication}
                  label="Medication"
                  onChange={(e) => setMedication(e.target.value)}
                  required
                >
                  <MenuItem value="Step 1">Step 1</MenuItem>
                  <MenuItem value="Step 2">Step 2</MenuItem>
                  <MenuItem value="Step 3">Step 3</MenuItem>
                  <MenuItem value="Step 4">Step 4</MenuItem>
                  <MenuItem value="Step 5">Step 5</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </MDBCol>
          <MDBCol sm="2">
            <div className="d-grid mt-4">
              <button type="submit" className="button-3">
                FINISH & SAVE
              </button>
            </div>
          </MDBCol>
        </MDBRow>
      </form>
    </MDBCol>
  );
}
