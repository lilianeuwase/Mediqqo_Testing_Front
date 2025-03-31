import React from "react";
import { MDBIcon } from "mdb-react-ui-kit";

const Head = () => {
  return (
    <>
      <section className="head">
        <div className="container flexSB">
          <div className="logo">
            <h1>
              <MDBIcon
                fas
                icon="fa-duotone fa-capsules"
                style={{ color: "#fff" }}
                size="1/2x"
              />
              MEDIQQO
            </h1>
            <span>ELECTRONIC MEDICAL PRESCRIPTION</span>
          </div>

          <div className="social">
            {/* <i className='fab fa-facebook-f icon'></i> */}
            <i className="fab fa-instagram icon"></i>
            {/* <i className='fab fa-twitter icon'></i>
            <i className='fab fa-youtube icon'></i> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;
