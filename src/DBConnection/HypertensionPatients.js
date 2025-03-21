import { useEffect, useState } from "react";
import { useRef } from "react";

var hyperTable = [];
export function HypertensionPatients() {
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
      `${apiHost}/paginatedHyperPatients?page=${currentPage.current}&limit=${limit}`,
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
