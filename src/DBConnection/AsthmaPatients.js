import React, { useEffect, useState } from "react";
import { useRef } from "react";

var asthmaTable =[];
export function AsthmaPatients() {
  //Diabetes
  const [diabdata, setDiabData] = useState([]);
  const [limit, setLimit] = useState(100);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();

  useEffect(() => {
    currentPage.current = 1;
    getPaginatedPatients();
  }, []);

  function getPaginatedPatients() {
    fetch(
      `https://mediqo-api.onrender.com/paginatedAsthmaPatients?page=${currentPage.current}&limit=${limit}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setPageCount(data.pageCount);
        setDiabData(data.result);
        asthmaTable = data.result;
      });
  }
  return asthmaTable;
}