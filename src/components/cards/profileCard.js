import React from "react";
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import "./profileCard.css";

export default function ProfileCard(props) {
  return (
    <section className="vh-80 h-100" style={{ backgroundColor: "#f4f5f7" }}>
      <MDBCard className="mb-3 h-100" style={{ borderRadius: ".5rem" }}>
        <MDBRow className="g-0 h-100">
          <MDBCol
            md="4"
            className="gradient-custom text-center text-white"
            style={{
              borderTopLeftRadius: ".5rem",
              borderBottomLeftRadius: ".5rem",
            }}
          >
            <MDBCardImage
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
              alt="Avatar"
              className="my-5"
              style={{ width: "80px" }}
              fluid
            />
            <MDBTypography tag="h5">{props.name}</MDBTypography>
            <MDBTypography tag="h6">
              <mark>{props.gender}</mark>
            </MDBTypography>
            {props.phone}
            <MDBCardText>Age: {props.age}</MDBCardText>
            {/* <MDBIcon far icon="edit mb-5" /> */}
          </MDBCol>
          <MDBCol md="8">
            <MDBCardBody className="p-4">
              <MDBTypography tag="h6">Information</MDBTypography>
              <hr className="mt-0 mb-4" />
              <MDBRow className="pt-1">
                <MDBCol size="6" className="mb-3">
                  <MDBTypography tag="h6">Weight</MDBTypography>
                  <MDBCardText className="text-muted">
                    {props.weight} kgs
                  </MDBCardText>
                </MDBCol>
                <MDBCol size="6" className="mb-3">
                  <MDBTypography tag="h6">Height</MDBTypography>
                  <MDBCardText className="text-muted">
                    {props.height}{" "}
                  </MDBCardText>
                </MDBCol>
                <MDBCol size="6" className="mb-3">
                  <MDBTypography tag="h6">BMI</MDBTypography>
                  <MDBCardText className="text-muted">{props.bmi} </MDBCardText>
                </MDBCol>
                {/* <MDBCol size="6" className="mb-3">
                  <MDBTypography tag="h6">Phone</MDBTypography>
                  <MDBCardText className="text-muted">
                    {props.phone}
                  </MDBCardText>
                </MDBCol> */}
              </MDBRow>

              <hr className="mt-0 mb-4" />
              <MDBRow className="pt-1">
                <MDBCol size="6" className="mb-0">
                  <MDBCardText className="text-muted">{props.lab1}</MDBCardText>
                  <MDBCardText className="text-muted">{props.lab2}</MDBCardText>
                </MDBCol>
                <MDBCol size="6" className="mb-0">
                  <MDBCardText className="small text-muted">
                    {props.lab3}
                  </MDBCardText>
                  <MDBCardText className="text-bold">
                    {props.medication}
                  </MDBCardText>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </section>
  );
}
