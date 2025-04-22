import React, { useEffect, useState, useRef } from "react";
import UserNavbar from "../../userNavbar";
import HyperResult1 from "./hyperResults/hyperResult1";
import HyperResult2 from "./hyperResults/hyperResult2";
import HyperResult3 from "./hyperResults/hyperResult3";
import HyperResult4 from "./hyperResults/hyperResult4";
import HyperResult5 from "./hyperResults/hyperResult5";
import HyperResult6 from "./hyperResults/hyperResult6";
import ProfileCard from "../../cards/profileCard";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import HyperPlan from "../../tables/hypertension/hyperPlan";
import HyperAssCom from "./hyperResults/hyperAssCom";

export default function HyperResults() {
  //setting state
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(100);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();

  useEffect(() => {
    currentPage.current = 1;
    // getAllHyperPatient();
    getPaginatedHyperPatients();
  }, []);

  //fetching all Hyper patient
  const getAllHyperPatient = () => {
    fetch("https://mediqo-api.onrender.com/getAllHyperPatient", {
      // fetch("http://localhost:5000/getAllHyperPatient", {
        // fetch("https://fantastic-python.cyclic.app/getAllHyperPatient", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "HyperpatientData");
        setData(data.data);
      });
  };

  //pagination
  function handlePageClick(e) {
    console.log(e);
    currentPage.current = e.selected + 1;
    getPaginatedHyperPatients();
  }
  function changeLimit() {
    currentPage.current = 1;
    getPaginatedHyperPatients();
  }

  function getPaginatedHyperPatients() {
    fetch(
      `https://mediqo-api.onrender.com/paginatedHyperPatients?page=${currentPage.current}&limit=${limit}`,
      // `http://localhost:5000/paginatedHyperPatients?page=${currentPage.current}&limit=${limit}`,
      // `https://fantastic-python.cyclic.app/paginatedHyperPatients?page=${currentPage.current}&limit=${limit}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "HyperpatientData");
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
            const b = i.consultations - 1 ?? 0;
            const current_name = i.lname + " " + i.fname;

            if (
              i.systobp[b] >= 140 &&
              i.diastobp[b] >= 90 &&
              i.systobp[b] <= 159 &&
              i.diastobp[b] <= 110
            ) {
              if (
                (i.age > 50 &&
                  (i.bmi[b] > 25 ||
                    i.smoke[b] === true ||
                    i.diabetes[b] === true ||
                    i.proteinuria[b] === true ||
                    i.creatinine[b] > 150)) ||
                (i.bmi[b] > 25 &&
                  (i.age > 50 ||
                    i.smoke[b] === true ||
                    i.diabetes[b] === true ||
                    i.proteinuria[b] === true ||
                    i.creatinine[b] > 150)) ||
                (i.smoke[b] === true &&
                  (i.age > 50 ||
                    i.bmi[b] > 25 ||
                    i.diabetes[b] === true ||
                    i.proteinuria[b] === true ||
                    i.creatinine[b] > 150)) ||
                (i.diabetes[b] === true &&
                  (i.age > 50 ||
                    i.bmi[b] > 25 ||
                    i.smoke[b] === true ||
                    i.proteinuria[b] === true ||
                    i.creatinine[b] > 150)) ||
                (i.proteinuria[b] === true &&
                  (i.age > 50 ||
                    i.bmi[b] > 25 ||
                    i.diabetes[b] === true ||
                    i.smoke[b] === true ||
                    i.creatinine[b] > 150)) ||
                (i.creatinine[b] > 150 &&
                  (i.age > 50 ||
                    i.bmi[b] > 25 ||
                    i.diabetes[b] === true ||
                    i.proteinuria[b] === true ||
                    i.smoke[b] === true))
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

                      <HyperResult4 i={i} />
                    </MDBRow>
                    <HyperAssCom />
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

                    <HyperResult5 i={i} />
                  </MDBRow>
                  <HyperAssCom />
                </div>
              );
            }
            if (i.systobp[b] >= 160 && i.diastobp[b] >= 90) {
              if (i.systobp[b] >= 180 && i.diastobp[b] >= 90) {
                if (
                  i.confusion[b] === true ||
                  i.vision[b] === true ||
                  i.sighing[b] === true ||
                  i.chest_pain[b] === true
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

                        <HyperResult1 i={i} />
                      </MDBRow>
                      <HyperAssCom />
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

                      <HyperResult2 i={i} />
                    </MDBRow>
                    <HyperAssCom />
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

                    <HyperResult3 i={i} />
                  </MDBRow>
                  <HyperAssCom />
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

                  <HyperResult6 i={i} />
                </MDBRow>
                <HyperAssCom />
              </div>
            );
          }
        })}
      </MDBContainer>
    </div>
  );
}
