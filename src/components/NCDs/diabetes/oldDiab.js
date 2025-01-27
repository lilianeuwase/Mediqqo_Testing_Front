import React, { useState } from "react";

import { MDBContainer, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
import "../../../pages/login";
import "../../buttons/button.css";
import UserNavbar from "../../userNavbar";

export default function OldDiab() {
  const [phone_number, setPhone] = useState("");
  const [lname, setLname] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log(phone_number, lname);
    fetch("https://mediqo-api.onrender.com/login-patient", {
      // fetch("http://localhost:5000/login-patient", {
        // fetch("https://fantastic-python.cyclic.app/login-patient", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        phone_number,
        lname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "patientRegister");
        if (data.status == "ok") {
          alert("Retrieval is  successful");
          window.localStorage.setItem("patienttoken", data.data);
          window.localStorage.setItem("Retrieved", true);

          window.location.href = "/userDetails/oldconsult/olddiabetes/oldpatientdetails";
        }
       else {
        alert("Diabetes Patient Not found");
        // window.location.href = "/userDetails/oldconsult/olddiabetes";
      }
        
      });
  }

  return (
    <div className="centered">
      <UserNavbar />
      <MDBContainer className="my-4 d-flex justify-content-center">
        <MDBCard className="sm-6 w-50">
          <MDBCardBody className="d-flex flex-column">
            <form onSubmit={handleSubmit}>
              <h6
                className="text-center fw-normal my-4 pb-3 fw-bold"
                style={{ letterSpacing: "1px" }}
              >
                DIABETES PATIENTS RETRIAVAL SYSTEM
              </h6>

              <MDBInput
                wrapperClass="mb-4"
                label="Phone Number"
                id="typeNumber"
                type="number"
                size="lg"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Last Name"
                id="typeText"
                type="text"
                size="lg"
                onChange={(e) => setLname(e.target.value)}
                required
              />

              <div className="d-grid">
                <button type="submit" className="button-3">
                  RETRIEVE
                </button>
              </div>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

// import React, { useState } from "react";

// import { MDBContainer, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
// import "./login.css";
// import "../components/buttons/button.css";
// import UserNavbar from "../components/userNavbar";

// export default function OldConsult() {
//   const [phone_number, setPhone] = useState("");
//   const [lname, setLname] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();

//     console.log(phone_number, lname);
//     fetch("https://mediqo-api.onrender.com/login-patient", {
//       method: "POST",
//       crossDomain: true,
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//       body: JSON.stringify({
//         phone_number,
//         lname,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data, "patientRegister");
//         if (data.status === "ok") {
//           alert("login successful");
//           window.localStorage.setItem("token", data.data);
//           window.localStorage.setItem("loggedIn", true);

//           window.location.href = "./oldpatientdetails";
//         }
//       });
//   }

//   return (
//     <div class="centered">
//       <UserNavbar />
//       <MDBContainer className="my-4">
//         <MDBCard className="sm-6 w-50 ">
//           <MDBCardBody className="d-flex flex-column">
//             <form onSubmit={handleSubmit}>
//               <h4
//                 className="text-center fw-normal my-4 pb-3 fw-bold"
//                 style={{ letterSpacing: "1px" }}
//               >
//                 Retrieve the Patient
//               </h4>

//               <MDBInput
//                 wrapperClass="mb-4"
//                 label="Patient Phone Number"
//                 id="typeText"
//                 type="phone"
//                 size="lg"
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//               <MDBInput
//                 wrapperClass="mb-4"
//                 label="Patient Last Name"
//                 id="typeText"
//                 type="text"
//                 size="lg"
//                 onChange={(e) => setLname(e.target.value)}
//               />
//               <div className="d-grid">
//                 <button type="submit" className="button-3">
//                   RETRIEVE
//                 </button>
//               </div>
//             </form>
//           </MDBCardBody>
//         </MDBCard>
//       </MDBContainer>
//     </div>
//   );
// }
