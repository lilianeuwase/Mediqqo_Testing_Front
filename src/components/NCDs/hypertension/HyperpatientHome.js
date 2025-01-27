import ProfileCard from "../../cards/profileCard";
import UserNavbar from "../../userNavbar";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import PatientVitals from "../../cards/patientVitals";
import { Link } from "react-router-dom";
import { React } from "react";
import HyperReconsult from "./reconsult/hyperReconsult";

export default function HyperPatientHome({ HyperpatientData }) {
  const fname = HyperpatientData.fname;
  const lname = HyperpatientData.lname;
  const name = lname + " " + fname;

  //Avoid Undefined Errors
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
  let hyperkalemia_reslts = HyperpatientData.hyperkalemia_reslts ??[];

  let a = HyperpatientData.consultations - 1 ?? 0;
  let dates = HyperpatientData.dates ??[];

  // const a = cons - 1;
  return (
    <div classNme="container">
      <UserNavbar />
      <MDBContainer className="my-4">
        <MDBRow>
          <MDBCol md="4">
            <ProfileCard
              name={name}
              gender={HyperpatientData.gender}
              age={HyperpatientData.age}
              weight={weight[a]}
              height={height[a]}
              bmi={bmi[a]}
              phone={HyperpatientData.phone_number}
              medication= {medication[a-1]}
              lab1={"Last Cons. :" + dates[a]}
              lab2={" Hyperkalemia :" +  hyperkalemia_reslts[a]}
            />
          </MDBCol>
          <MDBCol md="4">
            <PatientVitals
              title1="Lab Investigations"
              subtitle11="Systolic BP (mmHg)"
              subtitle12="Diastolic BP (mmHg)"
              subtitle13="Creatinine (µmol/L)"
              fbg={systobp[a]}
              rbg={diastobp[a]}
              creatinine={creatinine[a]}
              title2="Danger Signs"
              confusion={
                confusion[a] === true
                  ? "Sudden Confusion/weakness/Difficultyspeaking"
                  : ""
              }
              hydra={vision[a] === true ? "Blurry Vision" : ""}
              sighing={sighing[a] === true ? "Difficult Breathing" : ""}
              abspain={
                chest_pain[a] === true
                  ? "Abdominal Pain with nausea and vomiting"
                  : ""
              }
              title3="Risk Factors"
              hypo={smoke[a] === true ? "Smoking" : ""}
              prego={prego[a] === true ? "Pregnant" : ""}
              retino={diabetes[a] === true ? "Diabetes" : ""}
              nephro={proteinuria[a] === true ? "Proteinuria" : ""}
              neuro={bradycardia[a] === true ? "Bradycardia" : ""}
              footulc={hyperkalemia[a] === true ? "Hyperkalemia" : ""}
              hiv={hiv[a] === true ? "H I V" : ""}
            />
          </MDBCol>
          <MDBCol md="4">
            <PatientVitals
              title1="Previous Diagnosis"
              title2="Previous Medication(s)"
              title3="Previous Management"
              fbg={hyper_stage[a]}
              abspain={medication[a]}
              retino={patient_manage[a]}
            />
          </MDBCol>
          <MDBCol md="12">
            <HyperReconsult HyperpatientData={HyperpatientData} />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
