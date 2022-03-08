import { makeStyles, useTheme } from "@material-ui/core";
import React from "react";
import styles from "./styles";

const useStyles = makeStyles(styles);

const SwitchSection = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <table></table>
    </div>
  );
};

export default SwitchSection;
