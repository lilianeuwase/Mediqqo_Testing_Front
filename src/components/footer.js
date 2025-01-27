import React from "react";
import { MDBFooter, MDBContainer, MDBIcon, MDBBtn } from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter
      className="text-center text-white"
      style={{ backgroundColor: "#01AB87ff" }}
    >
      <MDBContainer className="p-4">
        <section className="mb-2">
          <MDBBtn
            outline
            color="dark"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <i class="fa-brands fa-facebook-f"></i>
          </MDBBtn>

          <MDBBtn
            outline
            color="dark"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <i class="fa-solid fa-envelope-open-text"></i>
          </MDBBtn>

          <MDBBtn
            outline
            color="dark"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <i class="fa-brands fa-twitter"></i>
          </MDBBtn>

          <MDBBtn
            outline
            color="dark"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <i class="fa-brands fa-instagram"></i>
          </MDBBtn>

          <MDBBtn
            outline
            color="dark"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <i class="fa-brands fa-linkedin-in"></i>
          </MDBBtn>
        </section>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2023 Copyright:
        <a className="text-white" href="/">
          Mediqqo
        </a>
        <br/>
            Designed by 8 Lines Code
      </div>
    </MDBFooter>
  );
}
