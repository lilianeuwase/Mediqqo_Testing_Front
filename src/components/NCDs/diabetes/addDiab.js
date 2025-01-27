import React, { useState } from "react";

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import "./addDiab.css";
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

export default function AddDiab() {
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

  //Classical symptoms

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

  const [state, setState] = React.useState({
    //Classical Symptoms
    polyuria: false,
    polydipsia: false,
    polyphagia: false,

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
    //Classical Symptoms
    polyuria,
    polydipsia,
    polyphagia,

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
      //Classical Symptoms
      polyuria,
      polydipsia,
      polyphagia,

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

  // // //Danger signs
  // const hydra = String(hydra);
  // const abspain = String(abspain);
  // const hypo = String(hypo);
  // const sighing = String(sighing);
  // const confusion = String(confusion);

  // //Complications
  // const retino = String(retino);
  // const nephro = String(nephro);
  // const neuro = String(neuro);
  // const footulcer = String(footulcer);

  // //Co-mobidity
  // const hiv = String(hiv);
  // const htn = String(htn);
  // const liver = String(liver);
  // const prego = String(prego);

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
      bmi,
      phone_number,

      //Classical Symptoms
      polyuria,
      polydipsia,
      polyphagia,

      //Danger signs
      hydra,
      abspain,
      hypo,
      sighing,
      confusion,

      //Lab results
      glucose,
      fastglucose,
      hb,
      creatinine,

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
    fetch("https://mediqo-api.onrender.com/registerPatient", {
    // fetch("http://localhost:5000/registerPatient", {
      // fetch("https://fantastic-python.cyclic.app/registerPatient", {
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
        bmi,
        phone_number,

        //Classical Symptoms
        polyuria,
        polydipsia,
        polyphagia,

        //Danger signs
        hydra,
        abspain,
        hypo,
        sighing,
        confusion,

        //Lab results
        glucose,
        fastglucose,
        hb,
        creatinine,

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
          alert("Registration Successful");
          window.location.href = "/userDetails/diabetes/diabresults";
        } else {
          alert("Something went wrong, Number already exist!");
          window.location.href = "/userDetails/diabetes";
        }
      });
  };

  return (
    <div className="container">
      <MDBContainer className="my-4">
        <MDBCard>
          <form onSubmit={handleSubmit}>
            <MDBCol md="8 modal-dialog-centered">
              <MDBCol md="7 modal-dialog-centered">
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
                  <Box className="box">
                    <FormControl size="small" fullWidth className="mb-0">
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
                  </Box>
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

                  {/* Classical symptoms */}
                  <Box sx={{ display: "flex" }}>
                    <FormControl
                      sx={{ m: 3 }}
                      component="fieldset"
                      variant="standard"
                    >
                      <FormLabel component="legend">
                        <h5
                          className="text-center text-dark fw-normal my-0 pb-1 fw-bold"
                          style={{ letterSpacing: "1px" }}
                        >
                          Clinical Symptoms
                        </h5>
                        <FormHelperText>
                          Tick symptoms accordingly
                        </FormHelperText>
                      </FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={polyuria}
                              onChange={handleChange}
                              name="polyuria"
                            />
                          }
                          label="Polyuria"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={polydipsia}
                              onChange={handleChange}
                              name="polydipsia"
                            />
                          }
                          label="Polydipsia"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={polyphagia}
                              onChange={handleChange}
                              name="polyphagia"
                            />
                          }
                          label="Polyphagia"
                        />
                      </FormGroup>
                    </FormControl>
                  </Box>
                </MDBCardBody>
              </MDBCol>

              <MDBCol md="6 modal-dialog-centered">
                <MDBCardBody className="d-flex flex-column">
                  {/* Danger Signs */}
                  <Box sx={{ display: "flex" }}>
                    <FormControl
                      sx={{ m: 3 }}
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
                              checked={hydra}
                              onChange={handleChange}
                              name="hydra"
                            />
                          }
                          label="Signs of dehydration"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={abspain}
                              onChange={handleChange}
                              name="abspain"
                            />
                          }
                          label="Abdominal pain with nasea & vomiting"
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
                          label="Slow or deep breathing"
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
                  <h5
                    className="text-center fw-normal my-0 pb-1 fw-bold"
                    style={{ letterSpacing: "1px" }}
                  >
                    Lab Results
                  </h5>
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

              {/* Complications*/}
              <MDBCol md="5 modal-dialog-centered">
                <MDBCardBody className="d-flex flex-column">
                  <Box sx={{ display: "flex" }}>
                    <FormControl
                      sx={{ m: 3 }}
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
                  <Box sx={{ display: "flex" }}>
                    <FormControl
                      sx={{ m: 3 }}
                      component="fieldset"
                      variant="standard"
                    >
                      <FormLabel component="legend">
                        <h5
                          className="text-center text-dark fw-normal my-2 pb-1 fw-bold"
                          style={{ letterSpacing: "1px" }}
                        >
                          Co-morbidity
                        </h5>
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

      {/* <DiabResults phone_number={phone_number} /> */}
    </div>
  );
}
