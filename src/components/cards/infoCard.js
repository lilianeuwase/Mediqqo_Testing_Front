import React from "react";
import {
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardTitle,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import "./profileCard.css";

export default function InfoCard(props) {
  return (
    <section>
      <MDBCard style={{height: 161}} background={props.color} className={props.class}>
              <MDBCardHeader>{props.header}</MDBCardHeader>
              <MDBCardBody>
                <MDBCardText className={props.textClass}>{props.text}</MDBCardText>
              </MDBCardBody>
            </MDBCard>
    </section>
  );
}
