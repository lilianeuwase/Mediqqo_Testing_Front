import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import SignIn from "../components/dashBoards/doctor/views/auth/signIn"; // Import your SignIn component

var userTable = [];
export function UserData() {
  // DB Connection states
  const [userData, setUserData] = useState("");
  const [superadmin, setSuperadmin] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [doctor, setDoctor] = useState(false);
  const [nurse, setNurse] = useState(false);
  const [labtech, setLabtech] = useState(false);
  const [pharmacist, setPharmacist] = useState(false);

  // Function to render the SignIn component via a portal when token is expired
  const showSignInComponent = () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(
      <SignIn />,
      container
    );
  };

  useEffect(() => {
    fetch(
      "https://mediqo-api.onrender.com/userData", 
      // "http://localhost:3001/userData", 
      {
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
        if (!data.data || data.data === "token expired") {
          showSignInComponent();
          return;
        }

        // Set the user type states based on retrieved userType
        switch (data.data.userType) {
          case "Super Admin":
            setSuperadmin(true);
            break;
          case "Admin":
            setAdmin(true);
            break;
          case "Doctor":
          case "Physician":
            setDoctor(true);
            break;
          case "Nurse":
            setNurse(true);
            break;
          case "Lab Technician":
            setLabtech(true);
            break;
          case "Pharmacist":
            setPharmacist(true);
            break;
          default:
            break;
        }

        setUserData(data.data);
        userTable = data.data;
      });
  }, []);

  return userTable;
}