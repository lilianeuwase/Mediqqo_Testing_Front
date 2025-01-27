import { React, useState } from "react";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import InfoCard from "../../../cards/infoCard";
import LifestyleCard from "../../../cards/lifestyleCard";
import ProfileCard from "../../../cards/profileCard";
import OneLine from "../medication/1stLine";
import {medication} from "../medication/1stLine";

export default function HyperResult5({ i }) {
  let weight = i.weight ?? [];
  let height = i.height ?? [];
  let bmi = i.bmi ?? [];
  let systobp = i.systobp ?? [];
  let diastobp = i.diastobp ?? [];

  const b = i.consultations - 1 ?? 0;
  const phone_number = i.phone_number;
  const current_name = i.lname + " " + i.fname;

  //Store Results
  const diagnosis = "Hypertension";
  const patient_manage = "Manage as Outpatient";
  const hyper_stage = "Stage I Hypertension";
  // const medication ="";

  const control = "";
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      phone_number,
      diagnosis,
      patient_manage,
      medication,
      hyper_stage,
      control
    );
    fetch("https://mediqo-api.onrender.com/updateHyperPatient1", {
    // fetch("http://localhost:5000/updateHyperPatient1", {
      // fetch("https://fantastic-python.cyclic.app/updateHyperPatient1", {
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
        hyper_stage,
        control,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "HyperpatientRegister");
        if (data.status == "ok") {
          alert("Patient Info is Updated");
          window.location.href = "/userDetails";
        }
        // else {
        //   alert("Something went wrong");
        // }
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
              lab1={"BP: " + systobp[b] + "/" + diastobp[b]}
              lab2={i.dates[b - 1]}
              // lab3={medication}
            />
          </MDBCol>

          <MDBCol>
            <MDBRow>
              <MDBCol sm="6">
                <InfoCard
                  color="light"
                  class="text-dark mb-4"
                  header="Findings"
                  textClass="fw-bold text-danger"
                  text={diagnosis}
                />
              </MDBCol>
              <MDBCol sm="6">
                <InfoCard
                  color="dark"
                  class="text-light mb-4"
                  header="Patient Management"
                  textClass="fw-bold text-light"
                  text={patient_manage + " and Monitor Every 3 Months"}
                />
              </MDBCol>
              <MDBCol sm="6">
                <InfoCard
                  color="light"
                  class="text-dark mb-4"
                  header="Hypertension Stage"
                  textClass="fw-bold text-dark"
                  text={hyper_stage}
                />
              </MDBCol>
              <MDBCol sm="6">
                <InfoCard
                  color="warning"
                  class="text-dark mb-4"
                  header="Next Step"
                  textClass="fw-bold text-dark"
                  text="If unable to achieve a blood pressure < 140/90 in 12 months, start one Antihypertensive"
                />
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
        <OneLine />
        <LifestyleCard />
        <div className="d-grid mt-4">
          <button type="submit" className="button-3">
            FINISH & SAVE
          </button>
        </div>
      </form>
    </MDBCol>
  );
}
