import ProfileCard from "../../cards/profileCard";
import UserNavbar from "../../userNavbar";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import PatientVitals from "../../cards/patientVitals";
import { Link } from "react-router-dom";
import { React, useState, useEffect } from "react";
import Reconsult from "./reconsult/reconsult";

export default function PatientHome({ patientData }) {
  const fname = patientData.fname;
  const lname = patientData.lname;
  const name =lname + " " + fname;

  //Avoid Undesfined Errors
  let hydra = patientData.hydra ?? [];
  let abspain = patientData.abspain ?? [];
  let hypo = patientData.hypo ?? [];
  let sighing = patientData.sighing ?? [];
  let confusion = patientData.confusion ?? [];
  let prego = patientData.prego ?? [];
  let retino = patientData.retino ?? [];
  let nephro = patientData.nephro ?? [];
  let neuro = patientData.neuro ?? [];
  let footulcer = patientData.footulcer ?? [];
  let weight = patientData.weight ?? [];
  let height = patientData.height ?? [];
  let bmi = patientData.bmi ?? [];
  let fastglucose = patientData.fastglucose ?? [];
  let glucose = patientData.glucose ?? [];
  let creatinine = patientData.creatinine ?? [];
  let hb = patientData.hb ?? [];
  let diagnosis=patientData.diagnosis?? [];
  let medication=patientData.medication?? [];
  let patient_manage=patientData.patient_manage?? [];
  

  let a = patientData.consultations - 1 ?? 0;
  let dates = patientData.dates ??[];

  // const a = cons - 1;
  return (
    <div classNme="container">
      <UserNavbar />
      <MDBContainer className="my-4">
        <MDBRow>
          <MDBCol md="4">
            <ProfileCard
              name={name}
              gender={patientData.gender}
              age={patientData.age}
              weight={weight[a]}
              height={height[a]}
              bmi={bmi[a]}
              phone={patientData.phone_number}
              medication= {medication[a-1]}
              lab1={"Last Cons. :" + dates[a]}
            />
          </MDBCol>
          <MDBCol md="4">
            <PatientVitals
              title1="Lab Investigations"
              subtitle11="FBG (mg/dL)"
              subtitle12="RBG (mg/dL)"
              subtitle13="Creatinine (µmol/L)"
              subtitle14="HbA1c (%)"
              title2="Danger Signs"
              title3="Complications"
              fbg={fastglucose[a]}
              rbg={glucose[a]}
              creatinine={creatinine[a]}
              hb={hb[a]}
              hydra={hydra[a] === true ? "Dehydration" : ""}
              abspain={
                abspain[a] === true
                  ? "Abdominal Pain with nausea and vomiting"
                  : ""
              }
              hypo={hypo[a] === true ? "Hypotension" : ""}
              sighing={sighing[a] === true ? "Slow or/and Deep breathing" : ""}
              confusion={confusion[a] === true ? "Confusion" : ""}
              prego={prego[a] === true ? "Pregnant" : ""}
              retino={retino[a] === true ? "Retinopathy" : ""}
              nephro={nephro[a] === true ? "Nephropathy" : ""}
              neuro={neuro[a] === true ? "Neuropathy" : ""}
              footulc={footulcer[a] === true ? "Foot Ulcer" : ""}
            />
          </MDBCol>
          <MDBCol md="4">
            <PatientVitals
              title1="Previous Diagnosis"
              title2="Previous Medication(s)"
              title3="Previous Management"
              fbg={diagnosis[a]}
              abspain={medication[a]}
              retino={patient_manage[a]}
            />
          </MDBCol>
          <MDBCol md="12">
            <Reconsult
              patientData={patientData}
              // consults={patientData.consultations}
            />
            {/* <Link to="./reconsult">
              <div className="d-grid">
                <button className="button-3">Re-Consult</button>
              </div>
            </Link> */}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
