import React from "react";

import {
  USER_PROFILE,
  COMMITTEE_SELECTION,
  PAYMENTS,
  USER_MANAGEMENT,
} from "../../constants/routes";

import { makeStyles, useTheme } from "@material-ui/core";
import styles from "./styles";

import ListItem from "./list-item/ListItem";

const useStyles = makeStyles(styles);

const SidePanel = ({ cross }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  //   Handles the cross transition
  let body_class = classes.body;
  if (cross) {
    body_class = [classes.body, classes.body_in].join(" ");
  }

  return (
    <div className={classes.root}>
      <div className={body_class}>
        <ListItem text={"Profile"} link={USER_PROFILE} />
        <ListItem text={"Committee Selection"} link={COMMITTEE_SELECTION} />
        <ListItem text={"Payments"} link={PAYMENTS} />
        <ListItem text={"User Management"} link={USER_MANAGEMENT} />
      </div>
    </div>
  );
};

export default SidePanel;
