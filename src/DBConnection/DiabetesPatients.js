import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Swal from "sweetalert2";

var diabTable = [];
export function DiabetesPatients() {
  //Diabetes
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(100);
  const [pageCount, setPageCount] = useState(1);

  const currentPage = useRef();

  useEffect(() => {
    currentPage.current = 1;
    getPaginatedPatients();
  }, []);

  function getPaginatedPatients() {
    fetch(
      `https://mediqo-api.onrender.com/paginatedDiabPatients?page=${currentPage.current}&limit=${limit}`,
      // `http://localhost:3001/paginatedDiabPatients?page=${currentPage.current}&limit=${limit}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setPageCount(data.pageCount);
        setData(data.result);
        diabTable = data.result;
      });
  }
  return diabTable;
}

// Retrieval function using a centered SweetAlert2 pop-up
export function getDiabPatient(identifier) {
  console.log("Searching for patient with identifier:", identifier);
  fetch(
    "https://mediqo-api.onrender.com/getDiabPatient",
    // "http://localhost:3001/getDiabPatient",
    {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      identifier,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "patientRegister");
      if (data.status === "ok") {
        Swal.fire({
          title: "Success",
          text: "Retrieval is successful",
          icon: "success",
          confirmButtonText: "OK",
          allowOutsideClick: false,
          background: "#ffff", // using secondaryGray.300
          confirmButtonColor: "#12c9bb", // using brand.500
          iconColor: "#12c9bb", // matching brand color for success icon
        }).then(() => {
          window.localStorage.setItem("patienttoken", data.data);
          window.localStorage.setItem("Retrieved", true);
          window.location.href = "diabetes/diabprofilecard";
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Diabetes Patient Not found",
          icon: "error",
          confirmButtonText: "OK",
          allowOutsideClick: false,
          background: "#E0E5F2", // using secondaryGray.300
          confirmButtonColor: "#EE5D50", // using red.500
          iconColor: "#EE5D50", // matching red color for error icon
        });
      }
    });
}

// usePatientData.js
export function DiabPatientData() {
  const [diabpatient, setDiabPatient] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("patienttoken");
    if (token) {
      fetch(
        "https://mediqo-api.onrender.com/diabPatientData",
        // "http://localhost:3001/diabPatientData",
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            setDiabPatient(data.data);
          } else {
            console.error("Error retrieving patient data:", data.data);
          }
        })
        .catch((error) => console.error("Fetch error:", error));
    }
  }, []);

  return diabpatient;
}
