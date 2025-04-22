import React, { useState } from "react";

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import "../diabetes/addDiab.css";
import "../../buttons/button.css";
import TextArea from "@atlaskit/textarea";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

export default function AddAsthma() {
  //Profile
  const consultations = 1;
  const dates = new Date().toLocaleString();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [phone_number, setPhone] = useState("");
  const [gender, setGender] = useState("");

  //Comment
  const [doctor_comment, setDoctorComment] = useState("");

  //Vital Signs
  const [temp, setTemp] = useState("");
  const [BP, setBP] = useState("");
  const [HR, setHR] = useState("");
  const [O2, setO2] = useState("");

  //Check-up
  const [chronic_cough, setCough] = useState("");
  const [dyspnea, setDyspnea] = useState("");

  const [hypoxia, setHypoxia] = useState("");

  //Symptoms
  const [state, setState] = React.useState({
    //Complications
    // prego: false,
    // wheez: false,
    // expiratory_time: false,
    // clubb: false,
    // cyanosis: false,

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
    hist: false,
    allergies: false,
    heart: false,
  });

  //Lab Results
  const [RR, setRr] = useState("");
  const [creatinine, setCreatinine] = useState("");

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const {
    //Complications
    // prego,
    // wheez,
    // expiratory_time,
    // clubb,
    // cyanosis,

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
    hist,
    allergies,
    heart,
  } = state;

  const error =
    [
      //Complications
      // prego,
      // wheez,
      // expiratory_time,
      // clubb,
      // cyanosis,

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
      hist,
      allergies,
      heart,
    ].filter((v) => v).length !== 2;

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      consultations,
      dates,

      //Profile
      fname,
      lname,
      age,
      gender,
      height,
      weight,
      phone_number,

      //Lab results
      RR,
      creatinine,

      chronic_cough,
      dyspnea,

      //Complications
      // prego,
      // wheez,
      // expiratory_time,
      // clubb,
      // cyanosis,

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
      hist,
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
    fetch("https://mediqo-api.onrender.com/registerAsthmaPatient", {
    // fetch("http://localhost:5000/registerAsthmaPatient", {
      // fetch("https://fantastic-python.cyclic.app/registerAsthmaPatient", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        consultations,
        dates,
        //Profile
        fname,
        lname,
        age,
        gender,
        height,
        weight,
        phone_number,

        //Lab results
        RR,
        creatinine,

        chronic_cough,
        dyspnea,

        //Complications
        // prego,
        // wheez,
        // expiratory_time,
        // clubb,
        // cyanosis,

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
        hist,
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
        console.log(data, "AsthmapatientRegister");
        if (data.status == "ok") {
          alert("Registration Successful");
          window.location.href = "/userDetails/asthma/asthmaresults";
        } else {
          alert("Something went wrong");
          window.location.href = "/userDetails/asthma";
        }
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
                  <h5
                    className="text-center fw-normal my-2 pb-3 fw-bold"
                    style={{ letterSpacing: "1px" }}
                  >
                    Patient Profile
                  </h5>

                  <MDBInput
                    wrapperClass="mb-2"
                    label="First name"
                    id="typeText"
                    type="text"
                    onChange={(e) => setFname(e.target.value)}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Last name"
                    id="typeText"
                    type="text"
                    onChange={(e) => setLname(e.target.value)}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Patient Age"
                    id="typeNumber"
                    type="number"
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />

                  <FormControl size="small" fullWidth className="mb-2">
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender}
                      label="Gender"
                      onChange={(e) => setGender(e.target.value)}
                      required
                    >
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Male">Other</MenuItem>
                    </Select>
                  </FormControl>

                  <MDBInput
                    wrapperClass="mb-2"
                    label="Height(Meters)"
                    id="typeNumber"
                    type="number"
                    step=".01"
                    onChange={(e) => setHeight(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Weight(Kgs)"
                    id="typeNumber"
                    type="number"
                    onChange={(e) => setWeight(e.target.value)}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Phone number"
                    id="typePhone"
                    type="tel"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />

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
                  {/* <Box sx={{ display: "flex" }}>
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
                          Clinical Symptoms & Danger Signs
                        </h6>
                        <FormHelperText>
                          Tick symptoms accordingly
                        </FormHelperText>
                      </FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={wheez}
                              onChange={handleChange}
                              name="wheez"
                            />
                          }
                          label="Expiratory Wheezing"
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={expiratory_time}
                              onChange={handleChange}
                              name="expiratory_time"
                            />
                          }
                          label="Increased Expiratory Time"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={clubb}
                              onChange={handleChange}
                              name="clubb"
                            />
                          }
                          label="Clubbing of Fingers or Cyanosis"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={cyanosis}
                              onChange={handleChange}
                              name="cyanosis"
                            />
                          }
                          label="Blue Extremities"
                        />
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
                              checked={prego}
                              onChange={handleChange}
                              name="prego"
                            />
                          }
                          label="Pregnant"
                        />
                      </FormGroup>
                    </FormControl>
                  </Box> */}
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
                              checked={hist}
                              onChange={handleChange}
                              name="hist"
                            />
                          }
                          label="History of TB"
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
