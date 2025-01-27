import React from "react";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";

import InfoCard from "../../../cards/infoCard";

export default function Result4({ phone_number }) {
  //Store Results
  const diagnosis = "No Diabetes";
  const patient_manage =
    "No Management Needed";
  const medication = "None";

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

  return (
    <MDBCol>
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol sm="6">
            <InfoCard
              color="light"
              class="text-dark mb-4"
              header="Findings"
              textClass="fw-bold text-dark"
              text="No Diabetes"
            />
          </MDBCol>
          <MDBCol sm="6">
            <InfoCard
              color="light"
              class="text-dark mb-4"
              header="Patient Management"
              textClass="fw-bold text-dark"
              text="No Further Comment"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol sm="6">
            <InfoCard
              color="light"
              class="text-dark mb-4"
              header="Recommended Lifestyle"
              textClass="fw-bold text-dark"
              text="lifestyle list"
            />
          </MDBCol>
          <MDBCol sm="6">
            <InfoCard
              color="light"
              class="text-dark mb-4"
              header="Next Step"
              textClass="fw-bold text-dark"
              text="Stop Diabetes Workup If Present"
            />
          </MDBCol>
        </MDBRow>
        <div className="d-grid">
          <button type="submit" className="button-1">
            FINISH & SAVE
          </button>
        </div>
      </form>
    </MDBCol>
  );
}
