import React, { useEffect, useState, useRef } from "react";
import UserNavbar from "../../userNavbar";

import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

import ProfileCard from "../../cards/profileCard";
import Result4 from "../diabetes/diabResults/result4";
import Result3 from "../diabetes/diabResults/result3";
import Result1 from "../diabetes/diabResults/result1";
import Result2 from "../diabetes/diabResults/result2";
import AssCom from "../diabetes/diabResults/assCom";
import DiabDietTable from "../../tables/diabetes/diabDietTable";

export default function DiabResults({ patientInfo }) {
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
    fetch("https://mediqo-api.onrender.com/getAllPatient", {
      // fetch("http://localhost:5000/getAllPatient", {
        // fetch("https://fantastic-python.cyclic.app/getAllPatient", {
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
            const b = i.consultations - 1 ?? 0;

            if (
              i.fastglucose[b] >= 126 ||
              i.hb[b] >= 6.5 ||
              i.glucose[b] >= 126
            ) {
              if (
                i.fastglucose[b] >= 200 ||
                i.glucose[b] >= 200 ||
                i.hb[b] >= 7.5
              ) {
                if (
                  i.fastglucose[b] > 400 ||
                  i.glucose[b] > 400 ||
                  i.hb[b] > 8 ||
                  i.hydra[b] === true ||
                  i.abspain[b] === true ||
                  i.hypo[b] === true ||
                  i.sighing[b] === true ||
                  i.confusion[b] === true
                ) {
                  return (
                    <div>
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
                            weight={i.weight[b]}
                            height={i.height[b]}
                            bmi={i.bmi[b]}
                            phone={i.phone_number}
                            lab1={"RBG: " + i.glucose[b] + " mg/dL"}
                            lab2={"FBG: " + i.fastglucose[b] + " mg/dL"}
                            lab3={"HbA1c: " + i.hb[b] + "%"}
                          />
                        </MDBCol>

                        <Result1 phone_number={i.phone_number} />
                      </MDBRow>
                      <AssCom />
                    </div>
                  );
                }
                return (
                  <div>
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
                          weight={i.weight[b]}
                          height={i.height[b]}
                          bmi={i.bmi[b]}
                          phone={i.phone_number}
                          lab1={"RBG: " + i.glucose[b] + " mg/dL"}
                          lab2={"FBG: " + i.fastglucose[b] + " mg/dL"}
                          lab3={"HbA1c: " + i.hb[b] + "%"}
                        />
                      </MDBCol>

                      <Result2 phone_number={i.phone_number} />
                    </MDBRow>
                    <AssCom />
                  </div>
                );
              }
              return (
                <div>
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
                        weight={i.weight[b]}
                        height={i.height[b]}
                        bmi={i.bmi[b]}
                        phone={i.phone_number}
                        lab1={"RBG: " + i.glucose[b] + " mg/dL"}
                        lab2={"FBG: " + i.fastglucose[b] + " mg/dL"}
                        lab3={"HbA1c: " + i.hb[b] + "%"}
                      />
                    </MDBCol>

                    <Result3 phone_number={i.phone_number} />
                  </MDBRow>
                  <AssCom />
                </div>
              );
            }
            return (
              <div>
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
                      weight={i.weight[b]}
                      height={i.height[b]}
                      bmi={i.bmi[b]}
                      phone={i.phone_number}
                      lab1={"RBG: " + i.glucose[b] + " mg/dL"}
                      lab2={"FBG: " + i.fastglucose[b] + " mg/dL"}
                      lab3={"HbA1c: " + i.hb[b] + "%"}
                    />
                  </MDBCol>

                  <Result4 phone_number={i.phone_number} />
                </MDBRow>
                <AssCom />
              </div>
            );
          }
        })}
        <DiabDietTable/>
      </MDBContainer>
    </div>
  );
}
