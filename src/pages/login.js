import React, { useState } from "react";

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import "./login.css";
import "../components/buttons/button.css";
import Logo from "../components/comps/logo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log(email, password);
    fetch("https://mediqo-api.onrender.com/login-user", {
      // fetch("http://localhost:5000/login-user", {
        // fetch("https://fantastic-python.cyclic.app/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);

          window.location.href = "/userDetails";
        } else {
          alert("User Not found");
          window.location.href = "/login";
        }
      });
  }

  return (
    <div className="container">
      <MDBContainer className="my-4">
        <MDBCard>
          <MDBRow className="g-0 ">
            <MDBCol md="6">
              <MDBCardImage
                src={require("../images/Niddle1.jpeg")}
                alt="login form"
                className="rounded-start w-100"
              />
            </MDBCol>
            <MDBCol md="6 modal-dialog-centered">
              <MDBCardBody className="d-flex flex-column">
                <Logo />

                <form onSubmit={handleSubmit}>
                  <h4
                    className="text-center fw-normal my-4 pb-3 fw-bold"
                    style={{ letterSpacing: "1px" }}
                  >
                    Sign into your account
                  </h4>

                  {/* <div className="mb-3">
                      <label>Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div> */}

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email address"
                    id="formControlLg"
                    type="email"
                    size="lg"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="formControlLg"
                    type="password"
                    size="lg"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {/* <div className="mb-3">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1"
                        >
                          Remember me
                        </label>
                      </div>
                    </div> */}

                  <div className="d-grid">
                    <button type="submit" className="button-1 primary-btn">
                      LOGIN
                    </button>
                  </div>
                  {/* <p className="forgot-password text-right">
                      <a href="/sign-up">Sign Up</a>
                    </p> */}

                  <div className="fw-normal my-4 pb-3">
                    <a
                      className="mt-4 small text-muted text-center fs-6"
                      href="#!"
                    >
                      Forgot password?
                    </a>
                    <p
                      className="mt-4 pb-lg-2 fw-bold fs-6"
                      style={{ color: "#393f81" }}
                    >
                      Don't have an account?{" "}
                      <a href="/contact" style={{ color: "#393f81" }}>
                        Contact the Administrator
                      </a>
                    </p>
                  </div>

                  <div className="d-flex flex-row justify-content-start">
                    <a href="#!" className="small text-muted me-1">
                      Terms of use.
                    </a>
                    <a href="#!" className="small text-muted">
                      Privacy policy
                    </a>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}
