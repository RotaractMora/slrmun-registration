import React from "react";

import { makeStyles, useTheme, Typography } from "@material-ui/core";
import styles from "./styles";

const useStyles = makeStyles(styles);

const Payments = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.h1}>
        Payments
      </Typography>
      <div className={classes.container}>upload image here</div>
    </div>
  );
};

export default Payments;
