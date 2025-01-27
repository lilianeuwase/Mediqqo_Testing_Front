import React, { useEffect, useState, useRef } from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import InfoCard from "../../../cards/infoCard";
import AsthmaPlan from "../../../tables/asthma/asthmaPlan";

export default function AsthmaAssCom() {
  //setting state
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(100);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();

  useEffect(() => {
    currentPage.current = 1;
    // getAllAsthmaPatient();
    getPaginatedAsthmaPatients();
  }, []);

  //fetching all Asthma patient
  const getAllAsthmaPatient = () => {
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

  //pagination
  function handlePageClick(e) {
    console.log(e);
    currentPage.current = e.selected + 1;
    getPaginatedAsthmaPatients();
  }
  function changeLimit() {
    currentPage.current = 1;
    getPaginatedAsthmaPatients();
  }

  function getPaginatedAsthmaPatients() {
    fetch(
      // `https://mediqo-api.onrender.com/paginatedAsthmaPatients?page=${currentPage.current}&limit=${limit}`,
      // `http://localhost:5000/paginatedAsthmaPatients?page=${currentPage.current}&limit=${limit}`,
      `https://fantastic-python.cyclic.app/paginatedAsthmaPatients?page=${currentPage.current}&limit=${limit}`,
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

  return (
    <div>
      <MDBRow className="my-4">
        {data.map((i, a) => {
          if (data.length === a + 1) {
            const b = i.consultations - 1 ?? 0;
            if (
              i.hiv[b] === true ||
              i.heart[b] === true ||
              i.chronic_cough[b] === true
            ) {
              return (
                <div>
                  <AsthmaPlan />
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
      </MDBRow>
    </div>
  );
}
