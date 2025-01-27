import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Head from "./Head";
import "./header.css";

const Header = () => {
  const [click, setClick] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <>
      <Head />
      <header>
        <nav className="flexSB">
          <ul
            className={click ? "mobile-nav" : "flexSB "}
            onClick={() => setClick(false)}
          >
            {/* <li>
              <Link to="/">Home</Link>
            </li> */}
            <li>
              <a
                href="#about"
                className={
                  activeLink === "about" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("about")}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                className={
                  activeLink === "services" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("services")}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#team"
                className={
                  activeLink === "team" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("team")}
              >
                Team
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={
                  activeLink === "team" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("contact")}
              >
                Contact
              </a>
            </li>
            
          </ul>
          <div className="start">
            <div className="button">
              For NCD Health Professionals & Patients
            </div>
            <div className="startButton">
              <a
                href="#signup"
                className={
                  activeLink === "team" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("team")}
              >
                Sign Up <span aria-hidden="true">&darr;</span>
              </a>
              <a href="/auth/sign-in" rel="noopener noreferrer">
                Sign In <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <button className="toggle" onClick={() => setClick(!click)}>
            {click ? (
              <i className="fa fa-times"> </i>
            ) : (
              <i className="fa fa-bars"></i>
            )}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
