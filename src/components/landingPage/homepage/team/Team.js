import React from "react";
import Back from "../common/back/Back";
import TeamCard from "./TeamCard";
import "./team.css";
import Awrapper from "../about/Awrapper";
import "../about/about.css";
import { ContactUs } from "../contact/contactUs";

const Team = () => {
  return (
    <>
      <section className="team padding" id="team">
        <div className="container grid">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-teal-500 sm:text-4xl ">
              MEET THE TEAM
            </h2>
          </div>
          <TeamCard />
          {/* <ContactUs /> */}
        </div>
      </section>
    </>
  );
};

export default Team;
