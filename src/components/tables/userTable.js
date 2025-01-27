import React, { Component, useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import {
  MDBBadge,
  MDBInput,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import './Table.css';
import "../buttons/button.css";

export default function UserTable({ userData }) {
  //setting state
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();

  useEffect(() => {
    currentPage.current = 1;
    // getAllUser();
    getPaginatedUsers();
  }, []);

  //fetching all user
  const getAllUser = () => {
    fetch("https://mediqo-api.onrender.com/getAllUser", {
      // fetch("http://localhost:5000/getAllUser", {
        // fetch("https://fantastic-python.cyclic.app/getAllUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  };

  //logout
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  //deleting user
  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch("https://mediqo-api.onrender.com/deleteUser", {
        // fetch("http://localhost:5000/deleteUser", {
          // fetch("https://fantastic-python.cyclic.app/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllUser();
        });
    } else {
    }
  };

  //pagination
  function handlePageClick(e) {
    console.log(e);
    currentPage.current = e.selected + 1;
    getPaginatedUsers();
  }
  function changeLimit() {
    currentPage.current = 1;
    getPaginatedUsers();
  }

  function getPaginatedUsers() {
    fetch(
      `https://mediqo-api.onrender.com/paginatedUsers?page=${currentPage.current}&limit=${limit}`,
      // `http://localhost:5000/paginatedUsers?page=${currentPage.current}&limit=${limit}`,
      // `https://fantastic-python.cyclic.app/paginatedUsers?page=${currentPage.current}&limit=${limit}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setPageCount(data.pageCount);
        setData(data.result);
      });
  }

  return (
    <div className="table">
      <div className="table-container">
        {/* <h3>Welcom Admin</h3>
        <table style={{ width: 500 }}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Delete</th>
          </tr>
          {data.map((i) => {
            return (
              <tr>
                <td>{i.fname}</td>
                <td>{i.email}</td>
                <td>{i.userType}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteUser(i._id, i.fname)}
                  />
                </td>
              </tr>
            );
          })}
        </table> */}

        <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">User</th>
              <th scope="col">User Type</th>
              <th scope="col">Edit/Delete</th>
            </tr>
          </MDBTableHead>
          {data.map((i) => {
            return (
              <MDBTableBody>
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
                        <p className="text-muted mb-0">{i.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <MDBBadge color="success" pill>
                      {i.userType}
                    </MDBBadge>
                  </td>
                  <td>
                    <p className="text-muted mb-0">
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => deleteUser(i._id, i.fname)}
                      />
                    </p>
                  </td>
                </tr>
              </MDBTableBody>
            );
          })}
        </MDBTable>

        {/* <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
          forcePage={currentPage.current - 1}
        /> */}
        {/* <input placeholder="Limit" onChange={(e) => setLimit(e.target.value)} /> */}

        {/* <MDBInput
                    wrapperClass="mb-4"
                    label="Limit"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    onChange={(e) => setLimit(e.target.value)}
                  /> */}
{/* 
        <button onClick={changeLimit} type="submit" className="button-1">
                      SET LIMIT
                    </button> */}
        {/* <button onClick={logOut} className="btn btn-primary">
          Log Out
        </button> */}
      </div>
    </div>
  );
}
