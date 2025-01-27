import React, { useEffect, useState, useRef } from "react";
import UserNavbar from "../../userNavbar";

import { MDBContainer, MDBRow } from "mdb-react-ui-kit";

import AsthmaResult1 from "./asthmaResults/asthmaResult1";
import AsthmaResult2 from "./asthmaResults/asthmaResult2";
import AsthmaResult3 from "./asthmaResults/asthmaResult3";
import AsthmaAssCom from "./asthmaResults/asthmaAssCom";
import Asthma2ndVisit from "../../tables/asthma/asthma2ndVisit";

export default function NAsthmaResults() {
  const [AsthmapatientData, setAsthmapatientData] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("https://mediqo-api.onrender.com/AsthmapatientData", {
      // fetch("http://localhost:5000/AsthmapatientData", {
        // fetch("https://fantastic-python.cyclic.app/AsthmapatientData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("Asthmapatienttoken"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "AsthmapatientData");

        setAsthmapatientData(data.data);

        if (data.data == "token expired") {
          alert("Token expired Retrieve again");
          window.localStorage.clear();
          window.location.href = "/userDetails/oldconsult/oldasthma";
        }
      });
  }, []);

  const b = AsthmapatientData.consultations - 1 ?? 0;

  //Avoid Undefined Errors
  let acute_dyspnea = AsthmapatientData.acute_dyspnea ?? [];
  let sighing = AsthmapatientData.sighing ?? [];
  let broken = AsthmapatientData.broken ?? [];
  let tachy_brady = AsthmapatientData.tachy_brady ?? [];
  let confusion = AsthmapatientData.confusion ?? [];
  let tachycardia = AsthmapatientData.tachycardia ?? [];
  let bradycardia = AsthmapatientData.bradycardia ?? [];
  let hypoxia = AsthmapatientData.hypoxia ?? [];
  let chronic_cough = AsthmapatientData.chronic_cough ?? [];
  let dyspnea = AsthmapatientData.dyspnea ?? [];

  return (
    <div>
      <UserNavbar />
      <MDBContainer className="my-4">
        {acute_dyspnea[b] === "true" ||
        sighing[b] === "true" ||
        broken[b] === "true" ||
        tachy_brady[b] === "true" ||
        confusion[b] === "true" ||
        tachycardia[b] === "true" ||
        bradycardia[b] === "true" ||
        hypoxia[b] < 92 ? (
          <div>
            <MDBRow>
              <h4
                className="text-center fw-normal my-4 pb-3 fw-bold"
                style={{ letterSpacing: "1px" }}
              >
                Medical Results
              </h4>

              <AsthmaResult1 i={AsthmapatientData} />
            </MDBRow>
            <AsthmaAssCom />
          </div>
        ) : chronic_cough[b] === "Episodicdry" || dyspnea[b] === "Episodic" ? (
          <div>
            <MDBRow className="mb-3">
              <h4
                className="text-center fw-normal my-4 pb-3 fw-bold"
                style={{ letterSpacing: "1px" }}
              >
                Medical Results
              </h4>

              <AsthmaResult2 i={AsthmapatientData} />
            </MDBRow>
            <Asthma2ndVisit />
            <AsthmaAssCom />
          </div>
        ) : (
          <div>
            <MDBRow>
              <h4
                className="text-center fw-normal my-4 pb-3 fw-bold"
                style={{ letterSpacing: "1px" }}
              >
                Medical Results
              </h4>

              <AsthmaResult3 i={AsthmapatientData} />
            </MDBRow>
            <AsthmaAssCom />
          </div>
        )}
      </MDBContainer>
    </div>
  );
}
