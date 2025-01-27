import React from "react";
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
    padding: `${rem(4)} ${rem(12)}`,
  },
}));

const Heading = ({ subtitle, subtitle1, title }) => {
  const { classes } = useStyles();
  return (
    <>
      <div id="heading">
        <h3>
          {subtitle}{" "}
          <span className=" h3 fw-bold mb-0 " style={{ color: "#1eb2a6" }}>
            {subtitle1}
          </span>
          {/* <span className={classes.highlight}> {subtitle1}</span> */}
        </h3>
        <h1 className="fw-bold">{title} </h1>
      </div>
    </>
  );
};

export default Heading;
