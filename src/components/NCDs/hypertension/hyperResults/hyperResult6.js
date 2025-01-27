import { React, useState } from "react";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import InfoCard from "../../../cards/infoCard";
import LifestyleCard from "../../../cards/lifestyleCard";
import ProfileCard from "../../../cards/profileCard";

export default function HyperResult6({ i }) {
  let weight = i.weight ?? [];
  let height = i.height ?? [];
  let bmi = i.bmi ?? [];
  let systobp =i.systobp ?? [];
  let diastobp =i.diastobp ?? [];

  const b = i.consultations - 1 ?? 0;
  const phone_number = i.phone_number;
  const current_name = i.lname + " " + i.fname;
  //Store Results
  const diagnosis = "No Hypertension";
  const patient_manage = "None";
  const hyper_stage = "None";
  const medication = "None";
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
              lab1={"BP: " +systobp[b] + "/"+i.diastobp[b]}
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
                  text="No Management"
                />
              </MDBCol>
              <MDBCol sm="6">
                <InfoCard
                  color="light"
                  class="text-dark mb-4"
                  header="Hypertension Stage"
                  textClass="fw-bold text-dark"
                  text={diagnosis}
                />
              </MDBCol>
              <MDBCol sm="6">
                <InfoCard
                  color="dark"
                  class="text-light mb-4"
                  header="Next Step"
                  textClass="fw-bold text-light"
                  text="Stop Hypertension Workup"
                />
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <LifestyleCard />
          </MDBCol>
          <div className="d-grid mt-4">
            <button type="submit" className="button-3">
              FINISH & SAVE
            </button>
          </div>
        </MDBRow>
      </form>
    </MDBCol>
  );
}
