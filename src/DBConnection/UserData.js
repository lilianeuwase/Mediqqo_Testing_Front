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
  const [apiHost, setApiHost] = useState("");

  // Function to render the SignIn component via a portal when token is expired
  const showSignInComponent = () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(<SignIn />, container);
  };

  // Load the host URL from a text file (placed in your public folder as apiHost.txt)
  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  // Fetch user data only after apiHost is loaded
  useEffect(() => {
    if (!apiHost) return;

    fetch(apiHost + "/userData", {
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
  }, [apiHost]);

  return userTable;
}
