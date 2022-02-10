import React, { useState } from "react";

import { makeStyles, useTheme, TextField, Typography } from "@material-ui/core";
import styles from "./styles";

const useStyles = makeStyles(styles);

const Registration = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <Typography variant="h2">Registration</Typography>
    </div>
  );
};

export default Registration;
