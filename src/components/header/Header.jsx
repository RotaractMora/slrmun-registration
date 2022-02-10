import React from "react";

import { makeStyles, useTheme } from "@material-ui/core";
import styles from "./styles";

const useStyles = makeStyles(styles);

const Header = ({ cross, setCross }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  let line1_class = classes.line;
  let line2_class = classes.line;
  let line3_class = classes.line;
  if (cross) {
    line1_class = [classes.line1, classes.line].join(" ");
    line2_class = [classes.line2, classes.line].join(" ");
    line3_class = [classes.line3, classes.line].join(" ");
  }

  return (
    <div className={classes.header}>
      <div className={classes.burger} onClick={() => setCross(!cross)}>
        <div className={line1_class}></div>
        <div className={line2_class}></div>
        <div className={line3_class}></div>
      </div>
    </div>
  );
};

export default Header;
