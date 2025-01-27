import React, { useState } from "react";

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import "../addDiab.css";
import "../../../buttons/button.css";
import TextArea from "@atlaskit/textarea";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

export default function Reconsult({ patientData }) {
  //Update Patient Details
  const consultations = patientData.consultations + 1;
  const dates = new Date().toLocaleString();
  const phone_number = patientData.phone_number;
  //Profile
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  //Lab Resultd
  const [glucose, setGlucose] = useState("");
  const [hb, setHb] = useState("");
  const [fastglucose, setFastGlucose] = useState("");
  const [creatinine, setCreatinine] = useState("");

  //Vital Signs
  const [temp, setTemp] = useState("");
  const [BP, setBP] = useState("");
  const [HR, setHR] = useState("");
  const [O2, setO2] = useState("");
  const [RR, setRR] = useState("");

  //Comment
  const [doctor_comment, setDoctorComment] = useState("");

  const [state, setState] = React.useState({
    //Danger signs
    hydra: false,
    abspain: false,
    hypo: false,
    sighing: false,
    confusion: false,

    //Complications
    retino: false,
    nephro: false,
    neuro: false,
    footulcer: false,

    //Co-mobidity
    hiv: false,
    htn: false,
    liver: false,
    prego: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const {
    //Danger signs
    hydra,
    abspain,
    hypo,
    sighing,
    confusion,

    //Complications
    retino,
    nephro,
    neuro,
    footulcer,

    //Co-mobidity
    hiv,
    htn,
    liver,
    prego,
  } = state;

  const error =
    [
      //Danger signs
      hydra,
      abspain,
      hypo,
      sighing,
      confusion,

      //Complications
      retino,
      nephro,
      neuro,
      footulcer,

      //Co-mobidity
      hiv,
      htn,
      liver,
      prego,
    ].filter((v) => v).length !== 2;

  const bmi = (weight / (height * height)).toFixed(2);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      phone_number,

      consultations,
      dates,
      //Profile
      height,
      weight,
      bmi,

      //Lab Resultd
      glucose,
      hb,
      fastglucose,
      creatinine,
      //Danger signs
      hydra,
      abspain,
      hypo,
      sighing,
      confusion,

      //Complications
      retino,
      nephro,
      neuro,
      footulcer,

      //Co-mobidity
      hiv,
      htn,
      liver,
      prego,

      //Comment
      doctor_comment,

      //Vital Signs
      temp,
      HR,
      O2,
      RR,
      BP
    );
    fetch("https://mediqo-api.onrender.com/updatePatient", {
    // fetch("http://localhost:5000/updatePatient", {
      // fetch("https://fantastic-python.cyclic.app/updatePatient", {
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
        //Profile
        height,
        weight,
        bmi,

        //Lab Resultd
        glucose,
        hb,
        fastglucose,
        creatinine,
        //Danger signs
        hydra,
        abspain,
        hypo,
        sighing,
        confusion,

        //Complications
        retino,
        nephro,
        neuro,
        footulcer,

        //Co-mobidity
        hiv,
        htn,
        liver,
        prego,

        //Comment
        doctor_comment,

        //Vital Signs
        temp,
        HR,
        O2,
        RR,
        BP,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "patientRegister");
        if (data.status == "ok") {
          alert("Patient Info is Updated");
          window.location.href =
            "/userDetails/oldconsult/olddiabetes/ndiabresults";
        }
        // else {
        //   alert("Something went wrong");
        // }
      });
  };
  return (
    <div>
      <MDBContainer className="my-4">
        <MDBCard>
          <form onSubmit={handleSubmit}>
            <MDBRow center>
              <MDBCol className="my-5" md="3">
                <MDBCardBody className="d-flex flex-column">
                  <h6
                    className="text-center fw-normal my-2 pb-2 fw-bold"
                    style={{ letterSpacing: "1px" }}
                  >
                    Updated Patient Profile
                  </h6>

                  <MDBInput
                    wrapperClass="mb-1"
                    label="Height(Meters)"
                    id="typeNumber"
                    type="number"
                    size="sm"
                    step=".01"
                    onChange={(e) => setHeight(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-3"
                    label="Weight(Kgs)"
                    id="typeNumber"
                    type="number"
                    size="sm"
                    onChange={(e) => setWeight(e.target.value)}
                    required
                  />
                  <h6
                    className="text-center fw-normal my-2 pb-1 fw-bold"
                    style={{ letterSpacing: "1px" }}
                  >
                    Lab Results
                  </h6>
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Random Blood glucose (mg/dL)"
                    id="typeText"
                    type="text"
                    size="sm"
                    onChange={(e) => setGlucose(e.target.value)}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    label="HbA1c (%)"
                    id="typeText"
                    type="text"
                    size="sm"
                    onChange={(e) => setHb(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Fasting Blood glucose (mg/dL)"
                    id="typeText"
                    type="text"
                    size="sm"
                    onChange={(e) => setFastGlucose(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Creatinine (µmol/L)"
                    id="typeText"
                    type="text"
                    size="sm"
                    onChange={(e) => setCreatinine(e.target.value)}
                  />
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
                  <MDBInput
                    size="sm"
                    wrapperClass="mb-2"
                    label="Respiratory Rate"
                    id="typeNumber"
                    type="number"
                    onChange={(e) => setRR(e.target.value)}
                  />
                </MDBCardBody>
              </MDBCol>
              <MDBCol className="my-4" md="3">
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
                          Danger Signs
                        </h6>
                        <FormHelperText>
                          Tick the signs accordingly
                        </FormHelperText>
                      </FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={hydra}
                              onChange={handleChange}
                              name="hydra"
                            />
                          }
                          label="Signs of Dehydration"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={abspain}
                              onChange={handleChange}
                              name="abspain"
                            />
                          }
                          label="Abdominal Pain"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={hypo}
                              onChange={handleChange}
                              name="hypo"
                            />
                          }
                          label="Hypotension"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={sighing}
                              onChange={handleChange}
                              name="sighing"
                            />
                          }
                          label="Slow/Deep Breathing"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={confusion}
                              onChange={handleChange}
                              name="confusion"
                            />
                          }
                          label="Confusion"
                        />
                      </FormGroup>
                    </FormControl>
                  </Box>
                </MDBCardBody>
              </MDBCol>

              {/* Complications*/}
              <MDBCol className="my-4" md="3">
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
                          Complications
                        </h6>
                        <FormHelperText>
                          Tick complications accordingly
                        </FormHelperText>
                      </FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={retino}
                              onChange={handleChange}
                              name="retino"
                            />
                          }
                          label="Retinopathy"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={nephro}
                              onChange={handleChange}
                              name="nephro"
                            />
                          }
                          label="Nephropathy"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={neuro}
                              onChange={handleChange}
                              name="neuro"
                            />
                          }
                          label="Neuropathy"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={footulcer}
                              onChange={handleChange}
                              name="footulcer"
                            />
                          }
                          label="Foot Ulcer"
                        />
                      </FormGroup>
                    </FormControl>
                  </Box>
                </MDBCardBody>
              </MDBCol>
              {/* Co-mobility*/}
              <MDBCol className="my-4" md="3">
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
                          Co-morbidity
                        </h6>
                        <FormHelperText>
                          Tick complications accordingly
                        </FormHelperText>
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
                              checked={htn}
                              onChange={handleChange}
                              name="htn"
                            />
                          }
                          label="Hypertension"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={liver}
                              onChange={handleChange}
                              name="liver"
                            />
                          }
                          label="Liver failure"
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
                  </Box>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
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
