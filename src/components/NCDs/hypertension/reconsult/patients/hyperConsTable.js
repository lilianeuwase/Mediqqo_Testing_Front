import React, { useEffect, useState } from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import UserNavbar from "../../../../userNavbar";
import ProfileCard from "../../../../cards/profileCard";
import PatientVitals2 from "../../../../cards/patientVitals2";
import HyperReconsult from "../hyperReconsult";

export default function HyperConsTable({ HyperpatientData }) {
  const fname = HyperpatientData.fname;
  const lname = HyperpatientData.lname;
  const name = lname + " " + fname;
  let a = HyperpatientData.consultations - 1 ?? 0;

  //Avoid Undesfined Errors
  let vision = HyperpatientData.vision ?? [];
  let chest_pain = HyperpatientData.chest_pain ?? [];
  let smoke = HyperpatientData.smoke ?? [];
  let sighing = HyperpatientData.sighing ?? [];
  let confusion = HyperpatientData.confusion ?? [];
  let prego = HyperpatientData.prego ?? [];
  let diabetes = HyperpatientData.diabetes ?? [];
  let proteinuria = HyperpatientData.proteinuria ?? [];
  let bradycardia = HyperpatientData.bradycardia ?? [];
  let hyperkalemia = HyperpatientData.hyperkalemia ?? [];
  let weight = HyperpatientData.weight ?? [];
  let height = HyperpatientData.height ?? [];
  let bmi = HyperpatientData.bmi ?? [];
  let systobp = HyperpatientData.systobp ?? [];
  let diastobp = HyperpatientData.diastobp ?? [];
  let creatinine = HyperpatientData.creatinine ?? [];
  let hiv = HyperpatientData.hiv ?? [];
  let hyper_stage = HyperpatientData.hyper_stage ?? [];
  let medication = HyperpatientData.medication ?? [];
  let patient_manage = HyperpatientData.patient_manage ?? [];
  let dates = HyperpatientData.dates ?? [];
  let hyperkalemia_reslts = HyperpatientData.hyperkalemia_reslts ?? [];
  let comment = HyperpatientData.doctor_comment ?? [];
  let control = HyperpatientData.control ?? [];

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
              gender={HyperpatientData.gender}
              age={HyperpatientData.age}
              weight={weight[b]}
              height={height[b]}
              bmi={bmi[b]}
              phone={HyperpatientData.phone_number}
              lab2={" Hyperkalemia :" + hyperkalemia_reslts[a]}
              // lab1 ={hiv[b] === true ? "HIV" : ""}
              medication={smoke[b] === true ? "Smokes" : ""}
              // lab3= {htn[b] === true ? "Hypertension" : ""}
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
              hydra={confusion[b] === true ? "Confusion" : ""}
              abspain={vision[b] === true ? "Blurry Vision" : ""}
              hypo={sighing[b] === true ? "Slow or/and Deep breathing" : ""}
              sighing={chest_pain[b] === true ? "Chest Pain" : ""}
              confusion={diabetes[b] === true ? "Diabetes" : ""}
              prego={proteinuria[b] === true ? "Proteinuria" : ""}
              retino={bradycardia[b] === true ? "Bradycardia" : ""}
              nephro={hyperkalemia[b] === true ? "Hyperkalemia" : ""}
              neuro={prego[b] === true ? "Pregnant" : ""}
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
                <th scope="col">BP</th>

                <th scope="col">Cr</th>
                <th scope="col">HK</th>
                <th scope="col">Diagnosis</th>
                <th scope="col">Control</th>
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
                      {systobp[i]}/{diastobp[i]}
                    </td>
                    <td>{creatinine[i]}</td>
                    <td>{hyperkalemia_reslts[i]}</td>
                    <td>{hyper_stage[i]}</td>
                    <td>{control[i]}</td>
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
        <HyperReconsult HyperpatientData={HyperpatientData} />
      </div>
    </div>
  );
}
