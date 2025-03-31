import React from "react";
import AboutCard from "../about/AboutCard";
import Hblog from "./Hblog";
import HAbout from "./HAbout";
import Hero from "./hero/Hero";
import Hprice from "./Hprice";
import Testimonal from "./testimonal/Testimonal";
import "./Home.css";
import Header from "../common/header/Header";
import Team from "../team/Team";
import { ContactUs } from "../contact/contactUs";
import DarkPanel from "./darkPanel";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <AboutCard />
      <HAbout />
      <DarkPanel/>
      <Team/>
      {/* <Testimonal /> */}
      {/* <Hblog /> */}
      {/* <Hprice /> */}
    </>
  );
};

export default Home;
