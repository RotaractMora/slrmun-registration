import React from "react";

import { makeStyles, useTheme } from "@material-ui/core";
import styles from "./styles";

const useStyles = makeStyles(styles);

const Payments = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return <div>Payments</div>;
};

export default Payments;
