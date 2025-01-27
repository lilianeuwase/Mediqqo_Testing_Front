import React from "react";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import PrescribeTable from "../../../../tables/prescribeTable";
import InfoCard from "../../../../cards/infoCard";
import InsulinTable from "../../../../tables/diabetes/insulinTable";

export default function InsulinTherapy({ phone_number }) {
  //Store Results
  const diagnosis = "Diabetes Found";
  const patient_manage = "Manage as an Outpatient (OPD)";
  const medication = "Insulin Therapy";

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
        <InfoCard
          color="light"
          class="text-dark mb-4"
          header="Prescription"
          textClass="fw-bold text-danger"
          text="The patient is prescribed Insulin Therapy, use the recommended chart below for the right dosage"
        />

        <InsulinTable />

        <div className="d-grid">
          <button type="submit" className="button-3">
            FINISH & SAVE
          </button>
        </div>
      </form>
    </MDBCol>
  );
}
