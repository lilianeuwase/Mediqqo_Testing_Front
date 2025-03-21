import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";

export default function AddUser() {
  // State variables for input fields
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [hospital, setHospital] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");

  // State for error messages
  const [errors, setErrors] = useState({});

  // State for modal popup
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Host URL state
  const [apiHost, setApiHost] = useState("");

  // Allowed user types
  const allowedUserTypes = [
    "Physician",
    "Doctor",
    "Super Admin",
    "Admin",
    "Lab Technician",
    "Nurse",
    "Pharmacist",
  ];

  // Client-side validation function
  const validateForm = () => {
    const newErrors = {};

    if (!fname.trim()) newErrors.fname = "First name is required";
    if (/\d/.test(fname)) newErrors.fname = "First name cannot contain numbers";
    if (!lname.trim()) newErrors.lname = "Last name is required";
    if (/\d/.test(lname)) newErrors.lname = "Last name cannot contain numbers";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!/^\d{10,}$/.test(phone))
      newErrors.phone = "Phone number must have at least 10 digits";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!userType) {
      newErrors.userType = "User type is required";
    } else if (!allowedUserTypes.includes(userType)) {
      newErrors.userType = "Invalid user type selected";
    }

    // For Admin user type, require a valid secret key
    if (userType === "Admin" && secretKey !== "Mediqo") {
      newErrors.secretKey = "Invalid Admin Secret Key";
    }

    // For specific user types, Speciality and hospital are required
    if (["Physician", "Doctor", "Lab Technician", "Nurse"].includes(userType)) {
      if (!speciality.trim()) newErrors.speciality = "Speciality is required";
      if (!hospital.trim()) newErrors.hospital = "Hospital is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});

    // Log the values for debugging
    console.log(
      fname,
      lname,
      email,
      phone,
      speciality,
      hospital,
      password,
      userType
    );

    // Send the form data to the backend
    fetch(`${apiHost}/register`, 
      {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          phone,
          speciality,
          hospital,
          password,
          userType,
        }),
        mode: "cors", // Ensure CORS mode is set
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          setModalMessage("Registration Successful");
        } else {
          setModalMessage("Something went wrong");
        }
        setModalVisible(true);
      })
      .catch((err) => {
        console.error("Error:", err);
        setModalMessage("Something went wrong");
        setModalVisible(true);
      });
  };

  // Styles for modal overlay and container
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
  };

  // Function to close the modal
  const closeModal = () => setModalVisible(false);

  // Load the host URL from a text file (placed in your public folder as apiHost.txt)
  useEffect(() => {
    fetch("/apiHost.txt")
      .then((res) => res.text())
      .then((text) => setApiHost(text.trim()))
      .catch((err) => console.error("Error loading API host:", err));
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <div>
              <label>Register As:</label>
              {allowedUserTypes.map((type) => (
                <label key={type}>
                  <input
                    type="radio"
                    name="UserType"
                    value={type}
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  {type}
                </label>
              ))}
              {errors.userType && (
                <div style={{ color: "red" }}>{errors.userType}</div>
              )}
            </div>

            {userType === "Admin" || userType === "Super Admin" ? (
              <div className="mb-3">
                <label>Secret Key</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Secret Key"
                  onChange={(e) => setSecretKey(e.target.value)}
                />
                {errors.secretKey && (
                  <div style={{ color: "red" }}>{errors.secretKey}</div>
                )}
              </div>
            ) : null}

            {["Physician", "Doctor", "Lab Technician", "Nurse", "Pharmacist"].includes(
              userType
            ) && (
              <div className="mb-3">
                <label>Speciality</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="speciality"
                  onChange={(e) => setSpeciality(e.target.value)}
                />
                {errors.speciality && (
                  <div style={{ color: "red" }}>{errors.speciality}</div>
                )}

                <label>Hospital</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Hospital"
                  onChange={(e) => setHospital(e.target.value)}
                />
                {errors.hospital && (
                  <div style={{ color: "red" }}>{errors.hospital}</div>
                )}
              </div>
            )}

            <div className="mb-3">
              <label>First name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                onChange={(e) => setFname(e.target.value)}
              />
              {errors.fname && (
                <div style={{ color: "red" }}>{errors.fname}</div>
              )}
            </div>

            <div className="mb-3">
              <label>Last name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                onChange={(e) => setLname(e.target.value)}
              />
              {errors.lname && (
                <div style={{ color: "red" }}>{errors.lname}</div>
              )}
            </div>

            <div className="mb-3">
              <label>Phone Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && (
                <div style={{ color: "red" }}>{errors.phone}</div>
              )}
            </div>

            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div style={{ color: "red" }}>{errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div style={{ color: "red" }}>{errors.password}</div>
              )}
            </div>

            <div className="mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <div style={{ color: "red" }}>{errors.confirmPassword}</div>
              )}
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <a href="/sign-in">sign in?</a>
            </p>
          </form>
        </div>

        {/* Modal Popup */}
        {modalVisible && (
          <div style={overlayStyle}>
            <div style={modalStyle}>
              <p>{modalMessage}</p>
              <button onClick={closeModal}>OK</button>
            </div>
          </div>
        )}
      </div>
    </Box>
  );
}
