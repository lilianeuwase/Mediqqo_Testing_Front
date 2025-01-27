import React, { Component, useEffect, useState } from "react";
import PatientHome from "./patientHome";

export default function OldPatientDetails() {
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
          window.location.href = "./";
        }
      });
  }, []);

  return <PatientHome patientData={patientData} />;
}
