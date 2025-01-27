import React, { useEffect, useState } from "react";
import { useRef } from "react";

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
      `https://mediqo-api.onrender.com/paginatedPatients?page=${currentPage.current}&limit=${limit}`,
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

//Retrieval
export function handleSubmit(phone_number, lname) {
  console.log(phone_number, lname);
  fetch("https://mediqo-api.onrender.com/login-patient", {
    // fetch("http://localhost:5000/login-patient", {
    // fetch("https://fantastic-python.cyclic.app/login-patient", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      phone_number,
      lname,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "patientRegister");
      if (data.status == "ok") {
        alert("Retrieval is  successful");
        window.localStorage.setItem("patienttoken", data.data);
        window.localStorage.setItem("Retrieved", true);

        window.location.href =
          "/userDetails/oldconsult/olddiabetes/oldpatientdetails2";
      } else {
        alert("Diabetes Patient Not found");
      }
    });
}

// //fetching all patient
// const getAllPatient = () => {
//   fetch("https://mediqo-api.onrender.com/getAllPatient", {
//     // fetch("http://localhost:5000/getAllPatient", {
//     // fetch("https://fantastic-python.cyclic.app/getAllPatient", {
//     method: "GET",
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data, "patientData");
//       setData(data.data);
//     });
// };

// //deleting patient
// const deletePatient = (id, name) => {
//   if (window.confirm(`Are you sure you want to delete ${name}`)) {
//     fetch("https://mediqo-api.onrender.com/deletePatient", {
//       // fetch("http://localhost:5000/deletePatient", {
//       // fetch("https://fantastic-python.cyclic.app/deletePatient", {
//       method: "POST",
//       crossDomain: true,
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//       body: JSON.stringify({
//         patientid: id,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         alert(data.data);
//         getAllPatient();
//       });
//   } else {
//   }
// };

// //Display user
// const displayPatient = (i) => {
//   return (
//     <div>
//       <PatientHome patientData={i} />
//     </div>
//   );

//   // window.location.href = "/userDetails/oldconsult";
// };

// //pagination
// function handlePageClick(e) {
//   console.log(e);
//   currentPage.current = e.selected + 1;
//   getPaginatedPatients();
// }
// function changeLimit() {
//   currentPage.current = 1;
//   getPaginatedPatients();
// }
