import React from "react";
import InfoCard from "../../../cards/infoCard";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import CardButton from "../../../cards/cardButton";

export default function Result2({ phone_number }) {
  //Store Results
  // const diagnosis = "Diabetes Found";
  // const patient_manage =
  //   "Manage as an Outpatient (OPD)";

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   console.log(phone_number, diagnosis, patient_manage);
  //   fetch("https://mediqo-api.onrender.com/updatePatient1", {
  //     method: "POST",
  //     crossDomain: true,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     body: JSON.stringify({
  //       phone_number,
  //       diagnosis,
  //       patient_manage,
        
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data, "patientRegister");
  //       if (data.status == "ok") {
  //         alert("Patient Info is Updated");
  //         window.location.href = "/userDetails";
  //       } else {
  //         alert("Something went wrong");
  //       }
  //     });
  // };

  return (
    <MDBCol>
      {/* <form onSubmit={handleSubmit}> */}
        <MDBRow>
          <MDBCol sm="6">
            <InfoCard
              color="light"
              class="text-dark mb-4"
              header="Findings"
              textClass="fw-bold text-danger"
              text="Diabetes"
            />
          </MDBCol>
          <MDBCol sm="6">
            <InfoCard
              color="dark"
              class="text-light mb-4"
              header="Patient Management"
              textClass="fw-bold text-light"
              text="Manage as an Outpatient (OPD)"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol sm="6">
            <InfoCard
              color="light"
              class="text-dark mb-4"
              header="Recommended Lifestyle"
              textClass="text-dark"
              text="
              Avoid Processed Foods & Fried Foods
              Try Sugar Alternatives like Honey
              Eat more Fruits & Vegetables
              Eat less of Fatty Foods & Red Meat
              (Table Below)"
            />
          </MDBCol>
          <MDBCol sm="6">
            <CardButton
              color="dark"
              class="text-light mb-4"
              header="Next Step"
              textClass="fw-bold text-light"
              text="Click on prescribe for the complete prescription of the patient"
              buttonText="Prescribe"
              link={"/userDetails/diabetes/diabresults/diabmeds"}
            />
          </MDBCol>
        </MDBRow>
        {/* <div className="d-grid">
          <button type="submit" className="button-1">
            FINISH & SAVE
          </button>
        </div> */}
      {/* </form> */}
    </MDBCol>
  );
}
