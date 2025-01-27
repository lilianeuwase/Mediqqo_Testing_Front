import React, { useEffect, useState, useRef } from "react";
import UserNavbar from "../../../../userNavbar";

import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

import ProfileCard from "../../../../cards/profileCard";
import PrescribeTable from "../../../../tables/prescribeTable";
import InsulinTherapy from "./insulinTherapy";
import EducationTable from "../../../../tables/diabetes/educationtable";

export default function DiabMeds({ patientInfo }) {
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
    // fetch("https://mediqo-api.onrender.com/getAllPatient", {
      // fetch("http://localhost:5000/getAllPatient", {
        fetch("https://fantastic-python.cyclic.app/getAllPatient", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "patientData");
        setData(data.data);
      });
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
      `https://mediqo-api.onrender.com/paginatedPatients?page=${currentPage.current}&limit=${limit}`,
      // `http://localhost:5000/paginatedPatients?page=${currentPage.current}&limit=${limit}`,
      // `https://fantastic-python.cyclic.app/paginatedPatients?page=${currentPage.current}&limit=${limit}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "patientData");
        setPageCount(data.pageCount);
        setData(data.result);
      });
  }

  return (
    <div>
      <UserNavbar />
      <MDBContainer className="my-4">
        {data.map((i, a) => {
          if (data.length === a + 1) {
            const current_name = i.lname + " " + i.fname;

            if (i.prego[0] === "true" || i.creatinine >= 150 || i.age < 18) {
              return (
                <MDBRow>
                  <h4
                    className="text-center fw-normal my-4 pb-3 fw-bold"
                    style={{ letterSpacing: "1px" }}
                  >
                    Medical Results
                  </h4>
                  <MDBCol md="5">
                    <ProfileCard
                      name={current_name}
                      gender={i.gender}
                      age={i.age}
                      weight={i.weight}
                      height={i.height}
                      bmi={i.bmi}
                      phone={i.phone_number}
                    />
                  </MDBCol>

                  <InsulinTherapy phone_number={i.phone_number} />
                  <EducationTable />
                </MDBRow>
              );
            }
            if (i.bmi >= 25) {
              return (
                <MDBRow>
                  <h4
                    className="text-center fw-normal my-4 pb-3 fw-bold"
                    style={{ letterSpacing: "1px" }}
                  >
                    Recommended Prescription
                  </h4>
                  <MDBRow>
                    <MDBCol>
                      <ProfileCard
                        name={current_name}
                        gender={i.gender}
                        age={i.age}
                        weight={i.weight}
                        height={i.height}
                        bmi={i.bmi}
                        phone={i.phone_number}
                      />
                    </MDBCol>
                    <MDBCol>
                      <PrescribeTable
                        title1="Medication(s)"
                        title2="Dosage"
                        title3="Consumption"
                        medication1="Metformin"
                        dosage1="500mg"
                        consumption1="Daily"
                        phone_number={i.phone_number}
                        medication="Once Daily Metformin 500mg"
                      />
                    </MDBCol>
                    <EducationTable />
                  </MDBRow>
                </MDBRow>
              );
            }
            return (
              <MDBRow>
                <h4
                  className="text-center fw-normal my-4 pb-3 fw-bold"
                  style={{ letterSpacing: "1px" }}
                >
                  Recommended Prescription
                </h4>
                <MDBRow>
                  <MDBCol>
                    <ProfileCard
                      name={current_name}
                      gender={i.gender}
                      age={i.age}
                      weight={i.weight}
                      height={i.height}
                      bmi={i.bmi}
                      phone={i.phone_number}
                    />
                  </MDBCol>
                  <MDBCol>
                    <PrescribeTable
                      title1="Medication(s)"
                      title2="Dosage"
                      title3="Consumption"
                      medication1="Glybenclamide (GBC)"
                      dosage1="5mg"
                      consumption1="Each Morning"
                      phone_number={i.phone_number}
                      medication="Once Each Morning Glybenclamide 5mg"
                    />
                  </MDBCol>
                  <EducationTable />
                </MDBRow>
              </MDBRow>
            );
          }
        })}
      </MDBContainer>
    </div>
  );
}
