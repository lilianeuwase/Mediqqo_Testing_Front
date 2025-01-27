import { React, useState } from "react";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import InfoCard from "../../../cards/infoCard";
import LifestyleCard from "../../../cards/lifestyleCard";
import ProfileCard from "../../../cards/profileCard";

export default function NResult2({ i, contro, titra }) {
  let weight = i.weight ?? [];
  let height = i.height ?? [];
  let bmi = i.bmi ?? [];
  let med = i.medication ?? [];

  const b = i.consultations - 1 ?? 0;
  const phone_number = i.phone_number;
  const current_name = i.lname + " " + i.fname;
  //Store Results
  const diagnosis = contro + " Control";
  const patient_manage = titra;

  const medication = med[b];
  const control = contro;
  const titration = titra;

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(phone_number, diagnosis, patient_manage, medication, control);
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
        control,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "patientRegister");
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
