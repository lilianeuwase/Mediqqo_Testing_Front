import React, { useEffect, useState } from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import UserNavbar from "../../../../userNavbar";
import ProfileCard from "../../../../cards/profileCard";
import Reconsult from "../reconsult";
import PatientVitals2 from "../../../../cards/patientVitals2";

export default function DiabConsTable({ patientData }) {
  const fname = patientData.fname;
  const lname = patientData.lname;
  const name = lname + " " + fname;
  let a = patientData.consultations - 1 ?? 0;
  let glucose = patientData.glucose ?? [];

  //Avoid Undesfined Errors
  let footulcer = patientData.footulcer ?? [];
  let hydra = patientData.hydra ?? [];
  let abspain = patientData.abspain ?? [];
  let hypo = patientData.hypo ?? [];
  let sighing = patientData.sighing ?? [];
  let confusion = patientData.confusion ?? [];
  let prego = patientData.prego ?? [];
  let retino = patientData.retino ?? [];
  let nephro = patientData.nephro ?? [];
  let neuro = patientData.neuro ?? [];
  let comment = patientData.doctor_comment ?? [];
  let weight = patientData.weight ?? [];
  let height = patientData.height ?? [];
  let bmi = patientData.bmi ?? [];
  let fastglucose = patientData.fastglucose ?? [];
  let creatinine = patientData.creatinine ?? [];
  let hb = patientData.hb ?? [];
  let diagnosis = patientData.diagnosis ?? [];
  let medication = patientData.medication ?? [];
  let patient_manage = patientData.patient_manage ?? [];
  let dates = patientData.dates ?? [];
  let hiv = patientData.hiv ?? [];
  let liver = patientData.liver ?? [];
  let htn = patientData.htn ?? [];

  //Consultation Array
  const consult = [];
  const [b, setB] = useState(0);
  let d = 0;
  for (d = 0; d <= a; d++) {
    consult.push(d);
  }

  function handleClick(c) {
    console.log(c);
    setB(c);
  }

  return (
    <div>
      <UserNavbar />
      <MDBRow className="mt-5">
        <MDBCol md="4">
          <MDBRow>
            <ProfileCard
              name={name}
              gender={patientData.gender}
              age={patientData.age}
              weight={weight[b]}
              height={height[b]}
              bmi={bmi[b]}
              phone={patientData.phone_number}
              lab1 ={hiv[b] === true ? "HIV" : ""}
              lab2 ={liver[b] === true ? "Liver failure" : ""}
              lab3= {htn[b] === true ? "Hypertension" : ""}
           
            />
            <PatientVitals2
              // title1="Doctor Comment"
              // subtitle11="FBG (mg/dL)"
              // subtitle12="RBG (mg/dL)"
              // subtitle13="Creatinine (µmol/L)"
              // subtitle14="HbA1c (%)"
              title2="Danger Signs"
              title3="Complications"
              // fbg={fastglucose[a]}
              // rbg={glucose[a]}
              // creatinine={creatinine[a]}
              // hb={hb[a]}
              hydra={hydra[b] === true ? "Dehydration" : ""}
              abspain={
                abspain[b] === true
                  ? "Abdominal Pain with nausea and vomiting"
                  : ""
              }
              hypo={hypo[b] === true ? "Hypotension" : ""}
              sighing={sighing[b] === true ? "Slow or/and Deep breathing" : ""}
              confusion={confusion[b] === true ? "Confusion" : ""}
              prego={prego[b] === true ? "Pregnant" : ""}
              retino={retino[b] === true ? "Retinopathy" : ""}
              nephro={nephro[b] === true ? "Nephropathy" : ""}
              neuro={neuro[b] === true ? "Neuropathy" : ""}
              footulc={footulcer[b] === true ? "Foot Ulcer" : ""}
            />
          </MDBRow>
          {/* <MDBRow>
          <PatientVitals
              title1="Previous Diagnosis"
              title2="Previous Medication(s)"
              title3="Previous Management"
              fbg={diagnosis[a]}
              abspain={medication[a]}
              retino={patient_manage[a]}
            />
          </MDBRow> */}
          <a href="#reconsult" className="page-scroll d-grid mt-2 button-small">
            Reconsult
          </a>
        </MDBCol>
        <MDBCol md="8" className="">
          {/* <h5
              className="text-center fw-normal my-4 fw-bold"
              style={{ letterSpacing: "1px" }}
            >
              All Consultations Details
            </h5> */}
          <MDBTable responsive hover small align="middle">
            <MDBTableHead>
              <tr>
                <th scope="col">Cons.</th>
                <th scope="col">Date</th>
                <th scope="col">FBG</th>
                <th scope="col">RBG</th>
                <th scope="col">Cr</th>
                <th scope="col">hbA1c</th>
                <th scope="col">Diagnosis</th>
                <th scope="col">Meds</th>
                <th scope="col">Management</th>
                <th scope="col">Comment</th>
              </tr>
            </MDBTableHead>
            {consult.map((i) => {
              return (
                <MDBTableBody onClick={() => handleClick(i)}>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{dates[i]}</td>
                    <td>{fastglucose[i]}</td>
                    <td>{glucose[i]}</td>
                    <td>{creatinine[i]}</td>
                    <td>{hb[i]}</td>
                    <td>{diagnosis[i]}</td>
                    <td>{medication[i]}</td>
                    <td>{patient_manage[i]}</td>
                    <td>{comment[i]}</td>
                  </tr>
                </MDBTableBody>
              );
            })}
          </MDBTable>
        </MDBCol>
      </MDBRow>
      <div id="reconsult">
        <Reconsult patientData={patientData} />
      </div>
    </div>
  );
}
