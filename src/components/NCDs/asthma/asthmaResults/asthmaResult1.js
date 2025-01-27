import { React, useState } from "react";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import ProfileCard from "../../../cards/profileCard";

import InfoCard from "../../../cards/infoCard";

export default function AsthmaResult1({ i }) {
  let weight = i.weight ?? [];
  let height = i.height ?? [];
  let bmi = i.bmi ?? [];

  const b = i.consultations - 1 ?? 0;
  const phone_number = i.phone_number;
  const current_name = i.lname + " " + i.fname;

  //Store Results
  const diagnosis = "CRD Emergency";
  const patient_manage = "Call Physician and Initiate Transfer";

  const medication = "";

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(phone_number, diagnosis, patient_manage, medication);
    fetch("https://mediqo-api.onrender.com/updateAsthmaPatient1", {
      // fetch("http://localhost:5000/updateAsthmaPatient1", {
        // fetch("https://fantastic-python.cyclic.app/updateAsthmaPatient1", {
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
            <MDBRow>
              <MDBCol>
                <InfoCard
                  color="light"
                  class="text-dark mb-4"
                  header="Findings"
                  textClass="fw-bold text-danger"
                  text={diagnosis}
                />

                <InfoCard
                  color="dark"
                  class="text-light mb-4"
                  header="Patient Management"
                  textClass="fw-bold text-light"
                  text={patient_manage}
                />
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          {/* <MDBCol sm="8">
            <HyperComTable />
          </MDBCol>
          <MDBCol sm="4">
            <LifestyleCard />
          </MDBCol> */}
        </MDBRow>

        <div className="d-grid">
          <button type="submit" className="button-3">
            FINISH & SAVE
          </button>
        </div>
      </form>
    </MDBCol>
  );
}
