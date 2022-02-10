import React, { useState } from "react";

import { Link } from "react-router-dom";

import {
  makeStyles,
  useTheme,
  TextField,
  Typography,
  Icon,
} from "@material-ui/core";

import styles from "./styles";

const useStyles = makeStyles(styles);

const Model = ({ icon, heading, body }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <div className={classes.container}>{icon}</div>
    </div>
  );
};

export default Model;
