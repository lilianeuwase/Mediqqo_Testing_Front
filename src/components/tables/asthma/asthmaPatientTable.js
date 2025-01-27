import React, { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import ReactPaginate from "react-paginate";
import { useRef } from "react";

import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBCard,
} from "mdb-react-ui-kit";

export default function AsthmaPatientTable({}) {
  //setting state
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(100);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();

  useEffect(() => {
    currentPage.current = 1;
    // getAllPatient();
    getPaginatedPatients();
  }, []);

  //fetching all patient
  const getAllPatient = () => {
    fetch("https://mediqo-api.onrender.com/getAllAsthmaPatient", {
    // fetch("http://localhost:5000/getAllAsthmaPatient", {
      // fetch("https://fantastic-python.cyclic.app/getAllAsthmaPatient", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "AsthmapatientData");
        setData(data.data);
      });
  };

  //logout
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  //deleting patient
  const deletePatient = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch("https://mediqo-api.onrender.com/deleteAsthmaPatient", {
      // fetch("http://localhost:5000/deleteAsthmaPatient", {
        // fetch("https://fantastic-python.cyclic.app/deleteAsthmaPatient", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          Asthmapatientid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllPatient();
        });
    } else {
    }
  };

  //pagination
  function handlePageClick(e) {
    console.log(e);
    currentPage.current = e.selected + 1;
    getPaginatedPatients();
  }
  function changeLimit() {
    currentPage.current = 1;
    getPaginatedPatients();
  }

  function getPaginatedPatients() {
    fetch(
      `https://mediqo-api.onrender.com/paginatedAsthmaPatients?page=${currentPage.current}&limit=${limit}`,
      // `http://localhost:5000/paginatedAsthmaPatients?page=${currentPage.current}&limit=${limit}`,
      // `https://fantastic-python.cyclic.app/paginatedAsthmaPatients?page=${currentPage.current}&limit=${limit}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "AsthmapatientData");
        setPageCount(data.pageCount);
        setData(data.result);
      });
  }

  //Asthma Retrieval
  function handleSubmit(phone_number, lname) {
    // e.preventDefault();

    console.log(phone_number, lname);
    fetch("https://mediqo-api.onrender.com/login-patient", {
    // fetch("http://localhost:5000/login-asthmapatient", {
      // fetch("https://fantastic-python.cyclic.app/login-asthmapatient", {
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
          window.localStorage.setItem("Asthmapatienttoken", data.data);
          window.localStorage.setItem("Retrieved", true);

          window.location.href =
            "/userDetails/oldconsult/oldasthma/oldasthmapatientdetails2";
        } else {
          alert("Diabetes Patient Not found");
          // window.location.href = "/userDetails/oldconsult/olddiabetes";
        }
      });
  }

  return (
    <div className="table">
      <hr class="hr hr-blurry" />
      <div className="table-container">
        <h5
          className="text-center fw-normal my-5 fw-bold"
          style={{ letterSpacing: "1px" }}
        >
          Asthma Patients
        </h5>
        <MDBTable responsive hover small align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Patients</th>
              <th scope="col">Age</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Gender</th>
              <th scope="col">Consultations</th>
              <th scope="col">First Consultation</th>
            </tr>
          </MDBTableHead>
          {data.map((i) => {
            return (
              <MDBTableBody
                onClick={() => handleSubmit(i.phone_number, i.lname)}
              >
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{i.fname}</p>
                        <p className="text-muted mb-0">{i.lname}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <MDBBadge color="success" pill>
                      {i.age}
                    </MDBBadge>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{i.phone_number}</p>
                  </td>
                  <td>
                    <p className="mb-0">{i.gender}</p>
                  </td>
                  <td>
                    <p className="mb-0">{i.consultations}</p>
                  </td>
                  <td>
                    <p className="mb-0">{i.dates[0]}</p>
                  </td>
                </tr>
              </MDBTableBody>
            );
          })}
        </MDBTable>
      </div>
      <hr class="hr hr-blurry" />
    </div>
  );
}
