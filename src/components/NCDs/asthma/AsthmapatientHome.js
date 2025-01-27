import ProfileCard from "../../cards/profileCard";
import UserNavbar from "../../userNavbar";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import PatientVitals from "../../cards/patientVitals";
import { React } from "react";
import AsthmaReconsult from "./reconsult/asthmaReconsult";

export default function AsthmaPatientHome({ AsthmapatientData }) {
  const fname = AsthmapatientData.fname;
  const lname = AsthmapatientData.lname;
  const name = lname + " " + fname;

  //Avoid Undefined Errors

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

  let a = AsthmapatientData.consultations - 1 ?? 0;
  let dates = AsthmapatientData.dates ??[];
  let dat = dates[a] ?? "2023";
  let dat1 = dat.slice(0, 8) ?? "2023";

  // const a = cons - 1;
  return (
    <div classNme="container">
      <UserNavbar />
      <MDBContainer className="my-4">
        <MDBRow>
          <MDBCol md="4">
            <ProfileCard
              name={name}
              gender={AsthmapatientData.gender}
              age={AsthmapatientData.age}
              weight={weight[a]}
              height={height[a]}
              // bmi={bmi[a]}
              phone={AsthmapatientData.phone_number}
              medication= {medication[a-1]}
              lab1={dat1}
         
            />
          </MDBCol>
          <MDBCol md="4">
            <PatientVitals
              title1="Lab Investigations"
              subtitle11="Cough"
              subtitle12="Dyspnea"
              subtitle13="Creatinine (µmol/L)"
              fbg={chronic_cough[a]}
              rbg={dyspnea[a]}
              creatinine={creatinine[a]}
              title2="Emergency Signs"
              confusion={
                acute_dyspnea[a] === true
                  ? "Sudden Confusion/weakness/Difficultyspeaking"
                  : ""
              }
              hydra={sighing[a] === true ? "Shortness of Breath not Relieved with Salbutamol" : ""}
              sighing={broken[a] === true ? "Unable to Speak in Full sentences" : ""}
              abspain={
                tachy_brady[a] === true
                  ? "Tachypnea (Rapid Breathing)or Bradypnea"
                  : ""
              }
              prego={
                confusion[a] === true
                  ? "Restless or Confused"
                  : ""
              }
              prego1={
                tachycardia[a] === true
                  ? "Tachycardia"
                  : ""
              }
              prego2={
                bradycardia[a] === true
                  ? "Bradycardia"
                  : ""
              }
              title3="Co-morbidities"
              hypo={hiv[a] === true ? "H I V" : ""}
              retino={reflux[a] === true ? "Reflux" : ""}
              nephro={hist[a] === true ? "History of TB" : ""}
              neuro={allergies[a] === true ? "Allergies" : ""}
              footulc={heart[a] === true ? "Heart Failure" : ""}
            
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
            <AsthmaReconsult AsthmapatientData={AsthmapatientData} />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
