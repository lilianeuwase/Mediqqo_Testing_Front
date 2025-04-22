import React, { useEffect, useState, useRef } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import InfoCard from "../../../cards/infoCard";
import AssComTable from "../../../tables/diabetes/asscomTable";
import DiabPlan from "../../../tables/diabetes/diabPlan";
import HyperPlan from "../../../tables/hypertension/hyperPlan";

export default function HyperAssCom({ HyperpatientInfo }) {
  //setting state
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(100);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();

  useEffect(() => {
    currentPage.current = 1;
    // getAll Hyper Patient();
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
      // `https://mediqo-api.onrender.com/paginatedHyperPatients?page=${currentPage.current}&limit=${limit}`,
      // `http://localhost:5000/paginatedHyperPatients?page=${currentPage.current}&limit=${limit}`,
      `https://fantastic-python.cyclic.app/paginatedHyperPatients?page=${currentPage.current}&limit=${limit}`,
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
      <MDBContainer className="my-4">
        {data.map((i, a) => {
          if (data.length === a + 1) {
            const b = i.consultations - 1 ?? 0;
            if (
              i.creatinine[b] > 150 ||
              i.prego[b] === true ||
          //    i.liver[b] === true ||
              i.hiv[b] === true ||
              i.bradycardia[b] === true ||
              i.hyperkalemia[b] === true
            ) {
              return (
                <div>
                  <HyperPlan />
                </div>
              );
            }
            return (
              <InfoCard
                color="light"
                class="text-dark mb-4"
                header="Complications & Co-morbidity"
                textClass="fw-bold text-danger"
                text="Patient has NO Complications nor Co-morbidity"
              />
            );
          }
        })}
      </MDBContainer>
    </div>
  );
}
