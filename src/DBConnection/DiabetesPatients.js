import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Swal from "sweetalert2";

// ---------------------------
// DiabetesPatients Function
// ---------------------------
var diabTable = [];
export function DiabetesPatients() {
  //Diabetes
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(100);
  const [pageCount, setPageCount] = useState(1);
  const [apiHost, setApiHost] = useState("");
  const currentPage = useRef();

  // Load the host URL from a text file (placed in your public folder as apiHost.txt)
  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  useEffect(() => {
    currentPage.current = 1;
    if (apiHost) {
      getPaginatedPatients();
    }
  }, [apiHost]);

  function getPaginatedPatients() {
    fetch(
      `${apiHost}/paginatedDiabPatients?page=${currentPage.current}&limit=${limit}`,
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

// ---------------------------
// getDiabPatient Function
// ---------------------------
export function getDiabPatient(identifier) {
  console.log("Searching for patient with identifier:", identifier);
  fetch("/apiHost.txt")
    .then((res) => res.text())
    .then((host) => {
      const apiHost = host.trim();
      fetch(
        `${apiHost}/getDiabPatient`,
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
        }
      )
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
    })
    .catch((err) => console.error("Error loading API host:", err));
}

// ---------------------------
// DiabPatientData Function
// ---------------------------
export function DiabPatientData() {
  const [diabpatient, setDiabPatient] = useState(null);
  const [apiHost, setApiHost] = useState("");

  // Load the host URL from a text file (placed in your public folder as apiHost.txt)
  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem("patienttoken");
    if (token && apiHost) {
      fetch(
        `${apiHost}/diabPatientData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      )
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
  }, [apiHost]);

  return diabpatient;
}
