import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export function useAllUsers() {
  const [apiHost, setApiHost] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [usersTable, setUsersTable] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [error, setError] = useState("");

  const redirectToSignIn = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("loggedIn");
    window.location.href = "/auth/sign-in";
  };

  // Load API host from /apiHost.txt
  useEffect(() => {
    fetch("/apiHost.txt")
      .then((response) => response.text())
      .then((url) => {
        const baseUrl = url.trim();
        setApiHost(baseUrl);
        localStorage.setItem("apiHost", baseUrl);
      })
      .catch((err) => {
        console.error("Error loading API host:", err);
        setError("Error loading API host");
      });
  }, []);

  // Fetch current user data
  useEffect(() => {
    if (!apiHost) return;
    fetch(`${apiHost}/userData`, {
      method: "POST",
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
          redirectToSignIn();
          return;
        }
        setCurrentUser(data.data);
        if (data.data.userType !== "Physician") {
          setError("Unauthorized: Administrator access required");
          Swal.fire({
            title: "Unauthorized",
            text: "Administrator access is required to view users.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError("Error fetching user data");
      });
  }, [apiHost]);

  // Fetch paginated users once API host and currentUser are set (and authorized)
  useEffect(() => {
    if (!apiHost || !currentUser) return;
    if (currentUser.userType !== "Physician") return;

    fetch(`${apiHost}/paginatedUsers?page=${currentPage}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        // Expecting data.result to be an array of users.
        setUsersTable(data.result || []);
      })
      .catch((err) => {
        console.error("Error fetching paginated users:", err);
        setError("Error fetching paginated users");
      });
  }, [apiHost, currentUser, currentPage, limit]);

  return { usersTable, currentPage, setCurrentPage, limit, setLimit, error };
}

// ---------------------------
// Retrieve a User Function
// ---------------------------
export function getUser(identifier) {
  console.log("Searching for user with identifier:", identifier);
  fetch("/apiHost.txt")
    .then((res) => res.text())
    .then((host) => {
      const apiHost = host.trim();
      fetch(`${apiHost}/getUser`, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          identifier,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status === "ok") {
            Swal.fire({
              title: "Success",
              text: "Retrieval is successful",
              icon: "success",
              confirmButtonText: "OK",
              allowOutsideClick: false,
              background: "#ffff", // using secondaryGray.300
              confirmButtonColor: "#12c9bb", // using brand.500
              iconColor: "#12c9bb", // matching brand color for success icon
            }).then(() => {
              window.localStorage.setItem("usertoken", data.data);
              window.localStorage.setItem("Retrieved", true);
              window.location.href = "users/userprofilecard";
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "User not found",
              icon: "error",
              confirmButtonText: "OK",
              allowOutsideClick: false,
              background: "#E0E5F2", // using secondaryGray.300
              confirmButtonColor: "#EE5D50", // using red.500
              iconColor: "#EE5D50", // matching red color for error icon
            });
          }
        });
    })
    .catch((err) => console.error("Error loading API host:", err));
}

// ---------------------------
// Retrieve any User Details Function
// ---------------------------
export function UserDataAdmin() {
  const [userDataAdmin, setUserDataAdmin] = useState(null);
  const [apiHost, setApiHost] = useState("");

  // Load the API host from /apiHost.txt on component mount
  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  // Fetch user data for admin once apiHost is loaded
  useEffect(() => {
    const token = window.localStorage.getItem("usertoken");
    if (token && apiHost) {
      fetch(`${apiHost}/userDataAdmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            setUserDataAdmin(data.data);
          } else {
            console.error("Error retrieving user data:", data.data);
          }
        })
        .catch((error) => console.error("Fetch error:", error));
    }
  }, [apiHost]);

  return userDataAdmin;
}

// ---------------------------
// Retrieve a Logged In User Details Function
// ---------------------------
var userTable = [];
export function UserData() {
  // DB Connection states
  const [userData, setUserData] = useState("");
  const [superadmin, setSuperadmin] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [doctor, setDoctor] = useState(false);
  const [nurse, setNurse] = useState(false);
  const [labtech, setLabtech] = useState(false);
  const [receptionist, setReceptionist] = useState(false);
  const [pharmacist, setPharmacist] = useState(false);
  const [apiHost, setApiHost] = useState("");

  // Instead of rendering the SignIn component via a portal, clear the token and redirect
  const redirectToSignIn = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("loggedIn");
    window.location.href = "/auth/sign-in";
  };

  // Load the host URL from a text file (placed in your public folder as apiHost.txt)
  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  // Fetch user data only after apiHost is loaded, with timeout and error handling
  useEffect(() => {
    if (!apiHost) return;

    const controller = new AbortController();
    const signal = controller.signal;
    // Set a timeout to abort the request after 10 seconds
    const timeoutId = setTimeout(() => controller.abort(), 10000);

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
      signal,
    })
      .then((res) => {
        clearTimeout(timeoutId);
        return res.json();
      })
      .then((data) => {
        if (!data.data || data.data === "token expired") {
          redirectToSignIn();
          return;
        }

        // Set user type states based on retrieved userType
        switch (data.data.userType) {
          case "Super Administrator":
            setSuperadmin(true);
            break;
          case "Administrator":
            setAdmin(true);
            break;
          case "Doctor":
          case "Physician":
          case "Clinician":
            setDoctor(true);
            break;
          case "Nurse":
            setNurse(true);
            break;
          case "Laboratory Technician":
            setLabtech(true);
            break;
          case "Receptionist":
            setReceptionist(true);
            break;
          case "Pharmacist":
            setPharmacist(true);
            break;
          default:
            break;
        }

        setUserData(data.data);
        userTable = data.data;
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        console.error("Error fetching user data", err);
        // If the error is due to a timeout or network error (server unreachable)
        if (
          err.name === "AbortError" ||
          (err.message && err.message.toLowerCase().includes("failed to fetch"))
        ) {
          Swal.fire({
            title: "Server Unreachable",
            text: "Server unreachable. Please contact your administrator.",
            icon: "error",
            confirmButtonText: "OK",
            allowOutsideClick: false,
            timer: 3000,
            background: "#E0E5F2",
            confirmButtonColor: "#EE5D50",
            iconColor: "#EE5D50",
          }).then(() => {
            redirectToSignIn();
          });
        }
      });
  }, [apiHost]);

  return userTable;
}
