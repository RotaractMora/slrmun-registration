import React from "react";

import { makeStyles, useTheme, Typography } from "@material-ui/core";
import styles from "./styles";

const useStyles = makeStyles(styles);

const ForeignInstructions = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.h1}>
        Payment Method (foreign)
      </Typography>
      <div className={classes.container}>foreign</div>
    </div>
  );
};

export default ForeignInstructions;
