import React, { useEffect, useState, useRef } from "react";
import UserNavbar from "../../userNavbar";

import { MDBContainer } from "mdb-react-ui-kit";

import NHyperResult1 from "./reconsult/n_hyperResult1";
import NHyperResult2 from "./reconsult/n_hyperResult2";
import HyperResult1 from "./hyperResults/hyperResult1";


export default function NHyperResults() {
  const [HyperpatientData, setHyperpatientData] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("https://mediqo-api.onrender.com/HyperpatientData", {
      // fetch("http://localhost:5000/HyperpatientData", {
        // fetch("https://fantastic-python.cyclic.app/HyperpatientData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("Hyperpatienttoken"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "HyperpatientData");

        setHyperpatientData(data.data);

        if (data.data == "token expired") {
          alert("Token expired Retrieve again");
          window.localStorage.clear();
          window.location.href = "/userDetails/oldconsult/oldhypertension";
        }
      });
  }, []);

  const b = HyperpatientData.consultations - 1 ?? 0;

  //Avoid Undefined Errors
  let smoke = HyperpatientData.smoke ?? [];
  let diabetes = HyperpatientData.diabetes ?? [];
  let proteinuria = HyperpatientData.proteinuria ?? [];
  let bmi = HyperpatientData.bmi ?? [];
  let systobp = HyperpatientData.systobp ?? [];
  let diastobp = HyperpatientData.diastobp ?? [];
  let creatinine = HyperpatientData.creatinine ?? [];

  return (
    <div>
      <UserNavbar />
      <MDBContainer className="my-4">
        {systobp[b] < 140 && diastobp[b] < 80 ? (
          <NHyperResult2 i={HyperpatientData} 
             contro="Good"
             titra="No Titrations"
          />
        ) : systobp[b] >= 140 &&
          diastobp[b] >= 80 &&
          systobp[b] <= 159 &&
          diastobp[b] <= 99 ? (
          <NHyperResult1 i={HyperpatientData} 
             contro="Fair"
          titra="One Titrations"
          />
        ) : systobp[b] >= 160 &&
          diastobp[b] >= 100 &&
          systobp[b] <= 179 &&
          diastobp[b] <= 109 ? (
          <NHyperResult1 i={HyperpatientData} 
             contro="Poor"
          titra="Two Titrations"
          />
        ) : systobp[b] >= 180 &&
          diastobp[b] >= 110 &&
          (creatinine[b] > 150 ||
            bmi[b] > 25 ||
            smoke[b] === true ||
            diabetes[b] === true ||
            proteinuria[b] === true ||
            bmi[b] > 25) ? (
          <HyperResult1 i={HyperpatientData}/>
        ) : (
          <NHyperResult1
          i={HyperpatientData}
          contro="Very Poor"
          titra="Two Titrations"
           />
        )}
      </MDBContainer>
    </div>
  );
}
