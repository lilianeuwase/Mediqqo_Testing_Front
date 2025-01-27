import { useEffect, useState } from "react";

var userTable =[];
export function UserData() {
  //DB Connection
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
        // console.log(data, "userData");
        if (data.data.userType == "Admin") {
          setAdmin(true);
        }

        setUserData(data.data);
        userTable = data.data;

        if (data.data == "token expired" || data.data == null) {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "/auth/sign-in";
        }
      });
  }, []);

  return userTable;
}
