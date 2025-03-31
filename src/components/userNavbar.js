import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./landingPage/navbar.css";
import "../components/buttons/button.css";

import { MDBIcon } from "mdb-react-ui-kit";
import Dropdown from "./buttons/dropdown";

function UserNavbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closePhoneMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  //logout
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "/sign-in";
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closePhoneMenu}>
          <MDBIcon
            fas
            icon="fa-duotone fa-capsules"
            style={{ color: "#01AB87ff" }}
            size="1x"
          />
          Mediqqo
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link
              to="/userDetails"
              className="nav-links"
              onClick={closePhoneMenu}
            >
              Profile
            </Link>
          </li>
          <li className="nav-item nav-links">
            <Dropdown />
          </li>
          {/* <li className="nav-item">
            <Link
              to="/userDetails/consultation"
              className="nav-links"
              onClick={closePhoneMenu}
            >
              Consultation
            </Link>
          </li> */}
          <li className="nav-item">
            <Link
              to="/userDetails/patients"
              className="nav-links"
              onClick={closePhoneMenu}
            >
              Patients
            </Link>
          </li>

          <li>
            <a
              href="http://bloodloof.herokuapp.com/"
              className="nav-links-mobile"
              onClick={closePhoneMenu}
              rel="noreferrer"
              target="_blank"
            ></a>
          </li>
        </ul>

        <button
          onClick={logOut}
          type="submit"
          className="button-1 btn--outline"
        >
          LOGOUT
        </button>
      </div>
    </nav>
  );
}

export default UserNavbar;
