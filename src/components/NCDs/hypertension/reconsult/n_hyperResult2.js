import { React, useState } from "react";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import InfoCard from "../../../cards/infoCard";
import LifestyleCard from "../../../cards/lifestyleCard";
import ProfileCard from "../../../cards/profileCard";
import HyperMedsTable from "../../../tables/hypertension/hypermedsTable";

export default function NHyperResult2({ i, contro, titra }) {
  let weight = i.weight ?? [];
  let height = i.height ?? [];
  let bmi = i.bmi ?? [];
  let med = i.medication ?? [];
  let diagnosis_list = i.diagnosis ?? [];
  let patient_manage_list = i.patient_manage ?? [];
  let hyper_stage_list = i.hyper_stage ?? [];

  const b = i.consultations - 1 ?? 0;
  const phone_number = i.phone_number;
  const current_name = i.lname + " " + i.fname;
  //Store Results
  const diagnosis = diagnosis_list[b];
  const patient_manage = patient_manage_list[b];
  const hyper_stage = hyper_stage_list[b];
  const medication = med[b];
  const control = contro;
  const titration = titra;

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
              <MDBCol>
                <InfoCard
                  color="dark"
                  class="text-light mb-4"
                  header="Medication"
                  textClass="fw-bold text-light"
                  text={medication}
                />
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol sm="4">
            <LifestyleCard />
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
