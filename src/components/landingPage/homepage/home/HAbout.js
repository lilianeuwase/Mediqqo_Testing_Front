import React from "react";
import OnlineCourses from "../allcourses/OnlineCourses";
import Heading from "../common/heading/Heading";
import "../allcourses/courses.css";
import { coursesCard } from "../../../../dummydata";

const HAbout = () => {
  return (
    <>
      <section className="homeAbout mb-8" id="services">
        <div className="container">
          <Heading
            subtitle="Our Services"
            title="Explore Mediqqo unique services"
          />
          <div className="coursesCard">
            {" "}
            {/* copy code form  coursesCard */}{" "}
            <div className="grid2">
              {" "}
              {coursesCard.slice(0, 6).map((val) => (
                <div className="items">
                  <div className="content flex">
                    <div className="left">
                      <div className="img">
                        <img src={val.cover} alt="" />
                      </div>{" "}
                    </div>{" "}
                    <div className="text">
                      <h1> {val.coursesName} </h1>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="price">
                    <h3> {val.item1} </h3>{" "}
                  </div>{" "}
                  <div className="price">
                    <h3> {val.item2} </h3>{" "}
                  </div>{" "}
                  <div className="price">
                    <h3> {val.item3} </h3>{" "}
                  </div>{" "}
                </div>
              ))}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <OnlineCourses />
      </section>{" "}
    </>
  );
};

export default HAbout;
