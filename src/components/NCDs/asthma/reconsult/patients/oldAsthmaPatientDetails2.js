import React, { useEffect, useState } from "react";
import AsthmaConsTable from "./asthmaConsTable";

export default function OldAsthmaPatientDetails2() {
  const [AsthmapatientData, setAsthmaPatientData] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("https://mediqo-api.onrender.com/AsthmapatientData", {
      // fetch("http://localhost:5000/asthmapatientData", {
        // fetch("https://fantastic-python.cyclic.app/asthmapatientData", {
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

        setAsthmaPatientData(data.data);

        if (data.data == "token expired") {
          alert("Token expired Retrieve again");
          window.localStorage.clear();
          window.location.href = "./";
        }
      });
  }, []);


  return <AsthmaConsTable AsthmapatientData={AsthmapatientData} />;
}
