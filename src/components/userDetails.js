import React, { useEffect, useState } from "react";
import AdminHome from "../pages/adminHome";
import UserHome from "../pages/userHome";
import { Navigate } from "react-router-dom";

export default function UserDetails() {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("https://mediqo-api.onrender.com/userData", {
      // fetch("http://localhost:5000/userData", {
        // fetch("https://fantastic-python.cyclic.app/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.data.userType == "Admin") {
          setAdmin(true);
          window.localStorage.setItem("Admin", true);
        }

        setUserData(data.data);

        if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "/sign-in";
        }
      });
  }, []);

  return admin ? <AdminHome /> : <UserHome userData={userData} />;
    // return admin ? <AdminHome /> : <MainDashboard userData={userData} />;

    // return admin ? <AdminHome /> : <Navigate to="/admin/default" />;
    
}
