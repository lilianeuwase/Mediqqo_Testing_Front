import React, { useEffect, useState } from "react";
import HyperConsTable from "./hyperConsTable";

export default function OldHyperPatientDetails2() {
  const [HyperpatientData, setHyperPatientData] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("https://mediqo-api.onrender.com/HyperpatientData", {
      // fetch("http://localhost:5000/hyperpatientData", {
        // fetch("https://fantastic-python.cyclic.app/hyperpatientData", {
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

        setHyperPatientData(data.data);

        if (data.data == "token expired") {
          alert("Token expired Retrieve again");
          window.localStorage.clear();
          window.location.href = "./";
        }
      });
  }, []);


  return <HyperConsTable HyperpatientData={HyperpatientData} />;
}
