import React, { useState } from "react";

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import "../addHyper.css";
import "../../../buttons/button.css";
import TextArea from "@atlaskit/textarea";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

export default function HyperReconsult({ HyperpatientData }) {
  //Update Patient Details

  const consultations = HyperpatientData.consultations + 1;
  const dates = new Date().toLocaleString();
  const phone_number = HyperpatientData.phone_number;
  //Profile
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  //Lab Results
  const [systobp, setSystobp] = useState("");
  const [diastobp, setDiastobp] = useState("");
  const [creatinine, setCreatinine] = useState("");
  const [hyperkalemia_reslts, setHyperkalemiaReslts] = useState("");

  //Vital Signs
  const [temp, setTemp] = useState("");
  const [HR, setHR] = useState("");
  const [O2, setO2] = useState("");
  const [RR, setRR] = useState("");

  //Comment
  const [doctor_comment, setDoctorComment] = useState("");

  const [state, setState] = React.useState({
    //Danger Signs
    confusion: false,
    vision: false,
    sighing: false,
    chest_pain: false,
    smoke: false,
    diabetes: false,
    proteinuria: false,

    //Complications
    bradycardia: false,
    hyperkalemia: false,
    prego: false,
    hiv: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const {
    //Danger Signs
    confusion,
    vision,
    sighing,
    chest_pain,
    smoke,
    diabetes,
    proteinuria,

    //Complications
    bradycardia,
    hyperkalemia,
    prego,
    hiv,
  } = state;

  const error =
    [
      //Danger Signs
      confusion,
      vision,
      sighing,
      chest_pain,
      smoke,
      diabetes,
      proteinuria,

      //Complications
      bradycardia,
      hyperkalemia,
      prego,
      hiv,
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

      //Lab results
      systobp,
      diastobp,
      creatinine,
      hyperkalemia_reslts,

      //Danger Signs
      confusion,
      vision,
      sighing,
      chest_pain,
      smoke,
      diabetes,
      proteinuria,

      //Complications
      bradycardia,
      hyperkalemia,
      prego,
      hiv,

      //Comment
      doctor_comment,

      //Vital Signs
      temp,
      HR,
      O2,
      RR
    );
    fetch("https://mediqo-api.onrender.com/updateHyperPatient", {
    // fetch("http://localhost:5000/updateHyperPatient", {
      // fetch("https://fantastic-python.cyclic.app/updateHyperPatient", {
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

        //Lab results
        systobp,
        diastobp,
        creatinine,
        hyperkalemia_reslts,

        //Danger Signs
        confusion,
        vision,
        sighing,
        chest_pain,
        smoke,
        diabetes,
        proteinuria,

        //Complications
        bradycardia,
        hyperkalemia,
        prego,
        hiv,

        //Comment
        doctor_comment,

        //Vital Signs
        temp,
        HR,
        O2,
        RR,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "patientRegister");
        if (data.status == "ok") {
          alert("Patient Info is Updated");
          window.location.href =
            "/userDetails/oldconsult/oldhypertension/nhyperresults";
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
                    className="text-center fw-normal my-1 pb-3 fw-bold"
                    style={{ letterSpacing: "1px" }}
                  >
                    Lab Results
                  </h6>
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Systolic blood pressure (mmHg)"
                    id="typeText"
                    type="text"
                    size="sm"
                    onChange={(e) => setSystobp(e.target.value)}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Diastolic blood pressure (mmHg)"
                    id="typeText"
                    type="text"
                    size="sm"
                    onChange={(e) => setDiastobp(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Creatinine (umo/L)"
                    id="typeText"
                    type="text"
                    size="sm"
                    onChange={(e) => setCreatinine(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Hyperkalemia"
                    id="typeText"
                    type="text"
                    size="sm"
                    onChange={(e) => setHyperkalemiaReslts(e.target.value)}
                  />
                  <h6
                    className="text-center fw-normal my-2 pb-3 fw-bold mt-4"
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
                      sx={{ m: 0 }}
                      component="fieldset"
                      variant="standard"
                    >
                      <FormLabel component="legend">
                        <h5
                          className="text-center text-dark fw-normal my-0 pb-1 fw-bold"
                          style={{ letterSpacing: "1px" }}
                        >
                          Danger Signs
                        </h5>
                        <FormHelperText>
                          Tick the signsaccordingly
                        </FormHelperText>
                      </FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={confusion}
                              onChange={handleChange}
                              name="confusion"
                            />
                          }
                          label="Sudden Confusion/Weakness/Difficulty Speaking"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={vision}
                              onChange={handleChange}
                              name="vision"
                            />
                          }
                          label="Blurry vision"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={sighing}
                              onChange={handleChange}
                              name="sighing"
                            />
                          }
                          label="Difficult breathing"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={chest_pain}
                              onChange={handleChange}
                              name="chest_pain"
                            />
                          }
                          label="Chest pain"
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
                      sx={{ m: 0 }}
                      component="fieldset"
                      variant="standard"
                    >
                      <FormLabel component="legend">
                        <h5
                          className="text-center text-dark fw-normal my-2 pb-1 fw-bold"
                          style={{ letterSpacing: "1px" }}
                        >
                          Complications
                        </h5>
                        <FormHelperText>
                          Tick complications accordingly
                        </FormHelperText>
                      </FormLabel>
                      <FormGroup>
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
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={hyperkalemia}
                              onChange={handleChange}
                              name="hyperkalemia"
                            />
                          }
                          label="Hyperkalemia"
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
                      </FormGroup>
                    </FormControl>
                  </Box>
                </MDBCardBody>
              </MDBCol>
              {/* Risk Factors*/}
              <MDBCol className="my-4" md="3">
                <MDBCardBody className="d-flex flex-column">
                  <Box sx={{ display: "flex" }}>
                    <FormControl
                      sx={{ m: 0 }}
                      component="fieldset"
                      variant="standard"
                    >
                      <FormLabel component="legend">
                        <h5
                          className="text-center text-dark fw-normal my-0 pb-1 fw-bold"
                          style={{ letterSpacing: "1px" }}
                        >
                          Risk Factors
                        </h5>
                        <FormHelperText>
                          Tick symptoms accordingly
                        </FormHelperText>
                      </FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={smoke}
                              onChange={handleChange}
                              name="smoke"
                            />
                          }
                          label="Smoking"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={diabetes}
                              onChange={handleChange}
                              name="diabetes"
                            />
                          }
                          label="Diabetes"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={proteinuria}
                              onChange={handleChange}
                              name="proteinuria"
                            />
                          }
                          label="Proteinuria"
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
