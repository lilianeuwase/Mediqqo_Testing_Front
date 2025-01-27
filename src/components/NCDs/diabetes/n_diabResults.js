import React, { useEffect, useState, useRef } from "react";
import UserNavbar from "../../userNavbar";

import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

import Result4 from "../diabetes/diabResults/result4";
import Result1 from "../diabetes/diabResults/result1";
import NResult1 from "./reconsult/n_Result1";
import NResult2 from "./reconsult/n_Result2";
import Result2 from "./diabResults/result2";
import ProfileCard from "../../cards/profileCard";

export default function NDiabResults() {
  const [patientData, setPatientData] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("https://mediqo-api.onrender.com/patientData", {
      // fetch("http://localhost:5000/patientData", {
        // fetch("https://fantastic-python.cyclic.app/patientData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("patienttoken"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "patientData");

        setPatientData(data.data);

        if (data.data == "token expired") {
          alert("Token expired Retrieve again");
          window.localStorage.clear();
          window.location.href = "/userDetails/oldconsult/olddiabetes";
        }
      });
  }, []);

  const current_name = patientData.lname + " " + patientData.fname;
  const b = patientData.consultations - 1 ?? 0;

  let fastglucose = patientData.fastglucose ?? [];
  let glucose = patientData.glucose ?? [];
  let hb = patientData.hb ?? [];
  let diagnosis = patientData.diagnosis ?? [];

  let weight = patientData.weight ?? [];
  let height = patientData.height ?? [];
  let bmi = patientData.bmi ?? [];
  let hydra = patientData.hydra ?? [];
  let abspain = patientData.abspain ?? [];
  let hypo = patientData.hypo ?? [];
  let sighing = patientData.sighing ?? [];
  let confusion = patientData.confusion ?? [];

  return (
    <div>
      <UserNavbar />
      <MDBContainer className="my-4">
        {diagnosis[b - 1] === "Second Consultation is Needed to Confirm" ? (
          fastglucose[b] >= 126 || glucose[b] >= 126 || hb[b] >= 6.5 ? (
            <div>
              <ProfileCard
                name={current_name}
                gender={patientData.gender}
                age={patientData.age}
                weight={weight[b]}
                height={height[b]}
                bmi={bmi[b]}
                phone={patientData.phone_number}
                lab1={"RBG: " + glucose[b] + " mg/dL"}
                lab2={"FBG: " + fastglucose[b] + " mg/dL"}
                lab3={"HbA1c: " + hb[b] + "%"}
              />
              <Result2 />
            </div>
          ) : (
            <Result4 phone_number={patientData.phone_number} />
          )
        ) : fastglucose[b] <= 50 ? (
          <NResult1
            i={patientData}
            contro="Poor"
            titra="The Patient is Hypoglycemia"
          />
        ) : (fastglucose[b] > 50 && fastglucose[b] <= 185) ||
          (hb >= 7.5 && hb[b] <= 8) ||
          (glucose[b] >= 150 && glucose[b] <= 185) ? (
          <NResult2
            i={patientData}
            contro="Good"
            titra="No medication/Insulin changes required"
          />
        ) : fastglucose[b] > 400 ||
          glucose[b] > 400 ||
          hb[b] > 9 ||
          hydra[b] === true ||
          abspain[b] === true ||
          hypo[b] === true ||
          sighing[b] === true ||
          confusion[b] === true ? (
          <div>
            <ProfileCard
              name={current_name}
              gender={patientData.gender}
              age={patientData.age}
              weight={weight[b]}
              height={height[b]}
              bmi={bmi[b]}
              phone={patientData.phone_number}
              lab1={"RBG: " + glucose[b] + " mg/dL"}
              lab2={"FBG: " + fastglucose[b] + " mg/dL"}
              lab3={"HbA1c: " + hb[b] + "%"}
            />
            <Result1 phone_number={patientData.phone_number} />
          </div>
        ) : (
          <NResult1
            i={patientData}
            contro="Poor"
            titra="Medication/Insulin Titrations Required"
          />
        )}
      </MDBContainer>
    </div>
  );
}
