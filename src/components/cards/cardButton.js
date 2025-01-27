import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function CardButton(props) {
  return (
    <section>
      {/* <MDBCard style={{ height: 161 }}>
        <MDBCardBody>
          <MDBCardTitle>Special title treatment</MDBCardTitle>
          <MDBCardText>
            With supporting text below as a natural lead-in to additional
            content.
          </MDBCardText>
          <MDBBtn href="#">Go somewhere</MDBBtn>
        </MDBCardBody>
      </MDBCard> */}

      <MDBCard
        style={{ height: 161 }}
        background={props.color}
        className={props.class}
      >
        <MDBCardHeader>{props.header}</MDBCardHeader>
        <MDBCardBody>
          <MDBCardText className={props.textClass}>{props.text}</MDBCardText>
          
          <Link
              to={props.link}
              className="drops"
            >
             <button 
          type="submit"
          className="button-2"
          >
            {props.buttonText}
          </button>
            </Link>
        </MDBCardBody>
      </MDBCard>
    </section>
  );
}
