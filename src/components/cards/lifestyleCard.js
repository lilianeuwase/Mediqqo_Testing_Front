import React from "react";
import {
  MDBCard,
  MDBCardHeader,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

export default function LifestyleCard() {
  return (
    <MDBCard className="mt-4">
      <MDBCardHeader> <strong>Lifestyle Modifications</strong></MDBCardHeader>
      <MDBListGroup flush>
        <MDBListGroupItem>Salt Reduction</MDBListGroupItem>
        <MDBListGroupItem>Weight Loss (if BMII is greater 25)</MDBListGroupItem>
        <MDBListGroupItem>Physical exercise</MDBListGroupItem>
        <MDBListGroupItem>Smoking Cessation</MDBListGroupItem>
        <MDBListGroupItem>Alcohol Cessation</MDBListGroupItem>
      </MDBListGroup>
    </MDBCard>
  );
}
