import { useEffect, useState } from "react";
import { useRef } from "react";

var hyperTable = [];
export function HypertensionPatients() {
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
      `https://mediqo-api.onrender.com/paginatedHyperPatients?page=${currentPage.current}&limit=${limit}`,
      // `http://localhost:3001/paginatedHyperPatients?page=${currentPage.current}&limit=${limit}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setPageCount(data.pageCount);
        setData(data.result);
        hyperTable = data.result;
      });
  }
  return hyperTable;
}
