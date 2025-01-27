import React from "react";
import Heading from "../../common/heading/Heading";
import "./Hero.css";
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  highlight: {
    position: "relative",
    color: theme.colors.orange[4],
    backgroundColor: theme.colors.cyan[1],
    // backgroundColor: theme.fn.variant({
    //   variant: "light",
    //   color: theme.primaryColor,
    // }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(8)}`,
    fontWeight:400,
  },
}));

const Hero = () => {
  const { classes } = useStyles();
  return (
    <>
      <div>
        <section className="hero">
          <div className="container">
            <div className="rowhome">
              <Heading
                subtitle="WELCOME TO "
                subtitle1="MEDIQQO"
                title="An Electronic Management System for NCDs"
              />
              <p className="pHP">
               <span className={classes.highlight}>Mediqqo</span>{" "}
                 is an electronic management system for Non-Communicable
                Diseases used to diagnose hypertension and diabetes, prescribe
                medication to NCD patients, and store records in a centralized
                database.
              </p>
            </div>
          </div>{" "}
        </section>
        <div className="margin"></div>
      </div>
    </>
  );
};

export default Hero;
