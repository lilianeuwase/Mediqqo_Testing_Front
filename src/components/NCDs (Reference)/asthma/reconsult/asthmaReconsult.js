import React, { useState } from "react";

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import "../../diabetes/addDiab.css";
import "../../../buttons/button.css";
import TextArea from "@atlaskit/textarea";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

export default function AsthmaReconsult({ AsthmapatientData }) {
  //Update Patient Details

  const consultations = AsthmapatientData.consultations + 1;
  const dates = new Date().toLocaleString();
  const phone_number = AsthmapatientData.phone_number;

  //Check-up
  const [chronic_cough, setCough] = useState("");
  const [dyspnea, setDyspnea] = useState("");
  const [hypoxia, setHypoxia] = useState("");
  const [creatinine, setCreatinine] = useState("");
  const [RR, setRr] = useState("");

  //Comment
  const [doctor_comment, setDoctorComment] = useState("");

  //Vital Signs
  const [temp, setTemp] = useState("");
  const [BP, setBP] = useState("");
  const [HR, setHR] = useState("");
  const [O2, setO2] = useState("");

  const [state, setState] = React.useState({
    //Emergency Signs
    acute_dyspnea: false,
    sighing: false,
    broken: false,
    tachy_brady: false,
    confusion: false,
    tachycardia: false,
    bradycardia: false,

    //Co-morbidities
    hiv: false,
    reflux: false,
    allergies: false,
    heart: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const {
    //Emergency Signs
    acute_dyspnea,
    sighing,
    broken,
    tachy_brady,
    confusion,
    tachycardia,
    bradycardia,

    //Co-morbidities
    hiv,
    reflux,
    allergies,
    heart,
  } = state;

  const error =
    [
      //Emergency Signs
      acute_dyspnea,
      sighing,
      broken,
      tachy_brady,
      confusion,
      tachycardia,
      bradycardia,

      //Co-morbidities
      hiv,
      reflux,
      allergies,
      heart,
    ].filter((v) => v).length !== 2;

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      phone_number,

      consultations,
      dates,

      //Lab results
      RR,
      creatinine,

      chronic_cough,
      dyspnea,

      //Emergency Signs
      acute_dyspnea,
      sighing,
      broken,
      tachy_brady,
      confusion,
      tachycardia,
      bradycardia,
      hypoxia,

      //Co-morbidities
      hiv,
      reflux,
      allergies,
      heart,

      //Comment
      doctor_comment,

      //Vital Signs
      temp,
      HR,
      O2,
      BP
    );
    fetch("https://mediqo-api.onrender.com/updateAsthmaPatient", {
    // fetch("http://localhost:5000/updateAsthmaPatient", {
      // fetch("https://fantastic-python.cyclic.app/updateAsthmaPatient", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        phone_number,

        consultations,
        dates,

        //Lab results
        RR,
        creatinine,
        chronic_cough,
        dyspnea,

        //Emergency Signs
        acute_dyspnea,
        sighing,
        broken,
        tachy_brady,
        confusion,
        tachycardia,
        bradycardia,
        hypoxia,

        //Co-morbidities
        hiv,
        reflux,
        allergies,
        heart,

        //Comment
        doctor_comment,

        //Vital Signs
        temp,
        HR,
        O2,
        BP,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "patientRegister");
        if (data.status == "ok") {
          alert("Patient Info is Updated");
          window.location.href =
            "/userDetails/oldconsult/oldasthma/nasthmaresults";
        }
        // else {
        //   alert("Something went wrong");
        // }
      });
  };
  return (
    <div className="container">
      <MDBContainer className="my-4">
        <MDBCard>
          <form onSubmit={handleSubmit}>
            <MDBCol md="8 modal-dialog-centered">
              <MDBCol md="8 modal-dialog-centered" className="ms-5">
                <MDBCardBody className="d-flex flex-column">
                  <h6
                    className="text-center fw-normal my-1 pb-2 fw-bold mt-4"
                    style={{ letterSpacing: "1px" }}
                  >
                    Lab Results & Check-up
                  </h6>
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Respiratory Rate (Breaths per min)"
                    id="typeText"
                    type="text"
                    onChange={(e) => setRr(e.target.value)}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Hypoxia (%)"
                    id="typeNumber"
                    type="number"
                    step=".01"
                    onChange={(e) => setHypoxia(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Creatinine (μmol/L)"
                    id="typeText"
                    type="text"
                    onChange={(e) => setCreatinine(e.target.value)}
                  />
                  <FormControl size="small" fullWidth className="mb-2">
                    <InputLabel id="demo-simple-select-label">Cough</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={chronic_cough}
                      label="Cough"
                      onChange={(e) => setCough(e.target.value)}
                      required
                    >
                      <MenuItem value="Productive">
                        Productive (yellow, green sputum)
                      </MenuItem>
                      <MenuItem value="Large">
                        Large volume purulence (thick, white pus)
                      </MenuItem>
                      <MenuItem value="Hemoptysis">Hemoptysis</MenuItem>
                      <MenuItem value="Male">
                        Large volume purulence (thick, white pus)
                      </MenuItem>
                      <MenuItem value="Persistent">Persistent & dry</MenuItem>
                      <MenuItem value="Worse">Worse lying flat</MenuItem>
                      <MenuItem value="Episodicdry">Episodic & dry</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" fullWidth className="mb-2">
                    <InputLabel id="demo-simple-select-label">
                      Dyspnea
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={dyspnea}
                      label="Dyspnea"
                      onChange={(e) => setDyspnea(e.target.value)}
                      required
                    >
                      <MenuItem value="Sudden">Sudden onset</MenuItem>
                      <MenuItem value="Progressive">Progressive</MenuItem>
                      <MenuItem value="Episodic">Episodic</MenuItem>
                    </Select>
                  </FormControl>
                  <Box sx={{ display: "flex" }}>
                    <FormControl
                      sx={{ m: 3 }}
                      component="fieldset"
                      variant="standard"
                    >
                      <FormLabel component="legend">
                        <h6
                          className="text-center text-dark fw-normal my-0 pb-1 fw-bold"
                          style={{ letterSpacing: "1px" }}
                        >
                          Co-Morbidities
                        </h6>
                        <FormHelperText>Tick signs accordingly</FormHelperText>
                      </FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={hiv}
                              onChange={handleChange}
                              name="hiv"
                            />
                          }
                          label="H I V"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={reflux}
                              onChange={handleChange}
                              name="reflux"
                            />
                          }
                          label="Reflux"
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={allergies}
                              onChange={handleChange}
                              name="allergies"
                            />
                          }
                          label="Allergies"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={heart}
                              onChange={handleChange}
                              name="heart"
                            />
                          }
                          label="Heart Failure"
                        />
                      </FormGroup>
                    </FormControl>
                  </Box>
                </MDBCardBody>
              </MDBCol>

              <MDBCol md="8 modal-dialog-centered" className="ms-5">
                <MDBCardBody className="d-flex flex-column">
                  <Box sx={{ display: "flex" }}>
                    <FormControl
                      sx={{ m: 3 }}
                      component="fieldset"
                      variant="standard"
                    >
                      <FormLabel component="legend">
                        <h6
                          className="text-center text-dark fw-normal my-0 pb-1 fw-bold"
                          style={{ letterSpacing: "1px" }}
                        >
                          Emergency Signs
                        </h6>
                        <FormHelperText>Tick signs accordingly</FormHelperText>
                      </FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={acute_dyspnea}
                              onChange={handleChange}
                              name="acute_dyspnea"
                            />
                          }
                          label="Acute Dyspnea"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={sighing}
                              onChange={handleChange}
                              name="sighing"
                            />
                          }
                          label="Shortness of Breath not Relieved with Salbutamol"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={broken}
                              onChange={handleChange}
                              name="broken"
                            />
                          }
                          label="Unable to Speak in Full sentences"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={tachy_brady}
                              onChange={handleChange}
                              name="tachy_brady"
                            />
                          }
                          label="Tachypnea (Rapid Breathing)or Bradypnea"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={confusion}
                              onChange={handleChange}
                              name="confusion"
                            />
                          }
                          label="Restless or Confused"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={tachycardia}
                              onChange={handleChange}
                              name="tachycardia"
                            />
                          }
                          label="Tachycardia"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={bradycardia}
                              onChange={handleChange}
                              name="bradycardia"
                            />
                          }
                          label="Bradycardia"
                        />
                      </FormGroup>
                    </FormControl>
                  </Box>
                  <h6
                    className="text-center fw-normal my-0 pb-1 fw-bold mt-4"
                    style={{ letterSpacing: "1px" }}
                  >
                    Vital Signs
                  </h6>

                  <MDBInput
                    size="sm"
                    wrapperClass="mb-2"
                    label="Temperature (C°)"
                    id="typeNumber"
                    type="number"
                    step=".01"
                    onChange={(e) => setTemp(e.target.value)}
                  />
                  <MDBInput
                    size="sm"
                    wrapperClass="mb-2"
                    label="Heart Rate"
                    id="typeNumber"
                    type="number"
                    onChange={(e) => setHR(e.target.value)}
                  />
                  <MDBInput
                    size="sm"
                    wrapperClass="mb-2"
                    label="Blood Pressure"
                    id="typeText"
                    type="text"
                    onChange={(e) => setBP(e.target.value)}
                  />
                  <MDBInput
                    size="sm"
                    wrapperClass="mb-2"
                    label="O2 Saturation %"
                    id="typeNumber"
                    type="number"
                    onChange={(e) => setO2(e.target.value)}
                  />
                </MDBCardBody>
              </MDBCol>
              <MDBCol md="8 modal-dialog-centered" className="ms-5">
                <MDBCardBody className="d-flex flex-column">
                  {/* Classical symptoms */}
                </MDBCardBody>
              </MDBCol>
            </MDBCol>
            <TextArea
              resize="vertical"
              className="mb-6"
              appearance="standard"
              placeholder="Comment"
              onChange={(e) => setDoctorComment(e.target.value)}
            />
            <div className="d-grid">
              <button type="submit" className="button-small">
                SUBMIT
              </button>
            </div>
          </form>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}
