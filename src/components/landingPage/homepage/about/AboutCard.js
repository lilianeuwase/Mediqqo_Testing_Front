import React from "react";
import Heading from "../common/heading/Heading";
import "./about.css";
import { homeAbout } from "../../../../dummydata";
import Awrapper from "./Awrapper";
import AboutIntro from "./AboutIntro";
let photo = require("../../../../images/prescription.jpeg");

const AboutCard = () => {
  return (
    <>
      <section className="aboutHome" id="about">
        <div className="container flexSB">
          <div className="left rowhome">
            <img src={photo} alt="" />
          </div>{" "}
          <div className="right rowhome">
            <h2 className="text-3xl font-bold tracking-tight text-orange-400 sm:text-4xl">
              About MEDIQQO
              <br />
            </h2>
            <p className="mt-6 mb-5 text-xl leading-8 text-black">
              Mediqqo is an electronic medical prescription management system
              which is developped using the Rwandan’s official Ministry of
              Health's National Guideline for management of Non-Communicable
              Diseases (NCDs)
              <br />
              <br />
              Mediqqo has been tested by randomly selected healthcare
              professionals who practice in referral hospitals, district
              hospitals, and clinics that treat and manage diabetes, and
              hypertension in Rwanda.
            </p>
            <Heading
              subtitle="MEDIQQO FEATURES"
              title="Targeted Outcome & Objectives"
            />
            <div className="items">
              {" "}
              {homeAbout.map((val) => {
                return (
                  <div className="item flexSB">
                    <div className="img">
                      {/* <img src={val.cover} alt="" /> */}
                    </div>{" "}
                    <div className="text">
                      <h2> {val.title} </h2> <p className="pHP"> {val.desc} </p>{" "}
                    </div>{" "}
                  </div>
                );
              })}{" "}
              <div className="button">
                <a href="#signup">
                  <button className="primary-btn buttonHP">
                    SIGN UP <i className="fa fa-long-arrow-alt-down"></i>
                  </button>
                </a>
                <a href="/auth/sign-in" target="_blank" rel="noopener noreferrer">
                  <button className="buttonHP">
                    LOG IN <i className="fa fa-long-arrow-alt-right"></i>
                  </button>
                </a>
              </div>
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <Awrapper />
    </>
  );
};

export default AboutCard;
