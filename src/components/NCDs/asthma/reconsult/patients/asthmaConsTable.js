import React, { useEffect, useState } from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import UserNavbar from "../../../../userNavbar";
import ProfileCard from "../../../../cards/profileCard";
import PatientVitals2 from "../../../../cards/patientVitals2";
import AsthmaReconsult from "../asthmaReconsult";

export default function AsthmaConsTable({ AsthmapatientData }) {
  const fname = AsthmapatientData.fname;
  const lname = AsthmapatientData.lname;
  const name = lname + " " + fname;
  let a = AsthmapatientData.consultations - 1 ?? 0;

    //Avoid Undefined Errors

    //Lab Results
    let RR = AsthmapatientData.RR ?? [];
    let hypoxia = AsthmapatientData.hypoxia ?? [];

    //Emergency Signs
    let acute_dyspnea = AsthmapatientData.acute_dyspnea ?? [];
    let sighing = AsthmapatientData.sighing ?? [];
    let broken = AsthmapatientData.broken ?? [];
    let tachy_brady = AsthmapatientData.tachy_brady ?? [];
    let confusion = AsthmapatientData.confusion ?? [];
    let tachycardia = AsthmapatientData.tachycardia ?? [];
    let bradycardia = AsthmapatientData.bradycardia ?? [];
  
        //Co-morbidities
    let hiv = AsthmapatientData.hiv ?? [];
    let reflux = AsthmapatientData.reflux ?? [];
    let hist = AsthmapatientData.hist ?? [];
    let allergies = AsthmapatientData.allergies ?? [];
    let heart = AsthmapatientData.heart ?? [];
    let weight = AsthmapatientData.weight ?? [];
    let height = AsthmapatientData.height ?? [];
    let medication = AsthmapatientData.medication ?? [];
    let chronic_cough = AsthmapatientData.chronic_cough ?? [];
    let dyspnea = AsthmapatientData.dyspnea ?? [];
    let creatinine = AsthmapatientData.creatinine ?? [];
    let diagnosis = AsthmapatientData.diagnosis ?? [];
    let patient_manage = AsthmapatientData.patient_manage ?? [];
  
    let dates = AsthmapatientData.dates ??[];
    let comment = AsthmapatientData.doctor_comment ?? [];

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
              gender={AsthmapatientData.gender}
              age={AsthmapatientData.age}
              weight={weight[b]}
              height={height[b]}
              // bmi={bmi[b]}
              lab2={" Cough :" + chronic_cough[a]}
              // lab1 ={hiv[b] === true ? "HIV" : ""}
              medication={" Dyspnea :" + dyspnea[a]}
              // lab3= {htn[b] === true ? "Hypertension" : ""}
            />
            <PatientVitals2
              // title1="Doctor Comment"
              // subtitle11="FBG (mg/dL)"
              // subtitle12="RBG (mg/dL)"
              // subtitle13="Creatinine (µmol/L)"
              // subtitle14="HbA1c (%)"
              title2="Emergency Signs & Co-Morbidities"
              // title3="Co-Morbidities"
              // fbg={fastglucose[a]}
              // rbg={glucose[a]}
              // creatinine={creatinine[a]}
              // hb={hb[a]}
              hydra={ acute_dyspnea[b] === true ? "Confusion" : ""}
              abspain={sighing[b] === true ? "Blurry Vision" : ""}
              hypo={broken[b] === true ? "Slow or/and Deep breathing" : ""}
              sighing={tachy_brady[b] === true ? "Chest Pain" : ""}
              confusion={confusion[b] === true ? "Diabetes" : ""}
              prego={tachycardia[b] === true ? "Proteinuria" : ""}
              retino={bradycardia[b] === true ? "Bradycardia" : ""}
              nephro={hiv[b] === true ? "Hyperkalemia" : ""}
              neuro={hist[b] === true ? "Pregnant" : ""}
              footulc={hiv[b] === true ? "HIV" : ""}
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
                <th scope="col">RR</th>
                <th scope="col">Hypoxia</th>
                <th scope="col">Cr</th>
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
                    <td>
                      {RR[i]}
                    </td>
                    <td>{hypoxia[i]}</td>
                    <td>{creatinine[i]}</td>
                    <td>{diagnosis[i]}</td>
                    <td>{medication[i]}</td>
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
        <AsthmaReconsult AsthmapatientData={AsthmapatientData} />
      </div>
    </div>
  );
}
