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

export default function PatientVitals(props) {
  return (
    <section className="vh-80 h-100" style={{ backgroundColor: "#f4f5f7" }}>
      <MDBCard className="mb-3 h-100" style={{ borderRadius: ".5rem" }}>
        <MDBRow className="g-0">
          <MDBCol md="8">
            <MDBCardBody className="p-4">
              <MDBTypography tag="h6">{props.title1}</MDBTypography>
              <hr className="mt-0 mb-3" />
              <MDBRow className="pt-1">
                <MDBCol size="6" className="mb-1">
                  <MDBTypography className="small fw-bold" tag="h6">
                  {props.subtitle11}
                  </MDBTypography>
                  <MDBCardText className="text-muted">{props.fbg}</MDBCardText>
                </MDBCol>
                <MDBCol size="6" className="mb-1">
                  <MDBTypography className="small fw-bold" tag="h6">
                  {props.subtitle12}
                  </MDBTypography>
                  <MDBCardText className="text-muted">{props.rbg} </MDBCardText>
                </MDBCol>
                <MDBCol size="6" className="mb-1">
                  <MDBTypography className="small fw-bold" tag="h6">
                  {props.subtitle13}
                  </MDBTypography>
                  <MDBCardText className="text-muted">
                    {props.creatinine}
                  </MDBCardText>
                </MDBCol>
                <MDBCol size="6" className="mb-4">
                  <MDBTypography className="small fw-bold" tag="h6">
                  {props.subtitle14}
                  </MDBTypography>
                  <MDBCardText className="text-muted">{props.hb}</MDBCardText>
                </MDBCol>
              </MDBRow>

              <MDBTypography tag="h10">{props.title2}</MDBTypography>
              <hr className="mt-0 mb-3" />
              <MDBRow className="pt-1">
                <MDBCol size="10" className="mb-1">
                  <MDBCardText className="text-muted">
                    {props.hydra}
                  </MDBCardText>
                </MDBCol>
                <MDBCol size="10" className="mb-1">
                  <MDBCardText className="text-muted">
                    {props.abspain}
                  </MDBCardText>
                </MDBCol>
                <MDBCol size="10" className="mb-1">
                  <MDBCardText className="text-muted">{props.hypo}</MDBCardText>
                </MDBCol>
                <MDBCol size="10" className="mb-1">
                  <MDBCardText className="text-muted">
                    {props.sighing}
                  </MDBCardText>
                </MDBCol>
                <MDBCol size="10" className="mb-1">
                  <MDBCardText className="text-muted">
                    {props.confusion}
                  </MDBCardText>
                </MDBCol>
                <MDBCol size="10" className="mb-4">
                  <MDBCardText className="text-muted">
                    {props.prego}
                  </MDBCardText>
                </MDBCol>
                <MDBCol size="10" className="mb-4">
                  <MDBCardText className="text-muted">
                    {props.prego1}
                  </MDBCardText>
                </MDBCol>
                <MDBCol size="10" className="mb-4">
                  <MDBCardText className="text-muted">
                    {props.prego2}
                  </MDBCardText>
                </MDBCol>
              </MDBRow>

              <MDBTypography tag="h10">{props.title3}</MDBTypography>
              <hr className="mt-0 mb-3" />
              <MDBRow className="pt-1">
                <MDBCol size="10" className="mb-1">
                  <MDBCardText className="text-muted">
                    {props.retino}
                  </MDBCardText>
                </MDBCol>
                <MDBCol size="10" className="mb-1">
                  <MDBCardText className="text-muted">
                    {props.nephro}
                  </MDBCardText>
                </MDBCol>
                <MDBCol size="10" className="mb-1">
                  <MDBCardText className="text-muted">
                    {props.neuro}
                  </MDBCardText>
                </MDBCol>
                <MDBCol size="10" className="mb-1">
                  <MDBCardText className="text-muted">
                    {props.sighing}
                  </MDBCardText>
                </MDBCol>
                <MDBCol size="10" className="mb-1">
                  <MDBCardText className="text-muted">
                    {props.footulc}
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
