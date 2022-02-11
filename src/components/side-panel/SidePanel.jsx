import React from "react";

import { getAuth } from "firebase/auth";

import { useLocation, useNavigate } from "react-router-dom";

import {
  USER_PROFILE,
  COMMITTEE_SELECTION,
  PAYMENTS,
  USER_MANAGEMENT,
  USER_LOGIN,
} from "../../constants/routes";

import { makeStyles, useTheme } from "@material-ui/core";
import styles from "./styles";

import ListItem from "./list-item/ListItem";

import app from "../../auth/base";

const useStyles = makeStyles(styles);

const SidePanel = ({ cross }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const current_path = useLocation().pathname;

  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate(USER_LOGIN);
  };

  //   Handles the cross transition
  let body_class = classes.body;
  if (cross) {
    body_class = [classes.body, classes.body_in].join(" ");
  }

  return (
    <div className={classes.root}>
      <div className={body_class}>
        <ListItem
          text={"Profile"}
          link={USER_PROFILE}
          active={current_path === USER_PROFILE}
        />
        <ListItem
          text={"Committee Selection"}
          link={COMMITTEE_SELECTION}
          active={current_path === COMMITTEE_SELECTION}
        />
        <ListItem
          text={"Payments"}
          link={PAYMENTS}
          active={current_path === PAYMENTS}
        />
        <ListItem
          text={"User Management"}
          link={USER_MANAGEMENT}
          active={current_path === USER_MANAGEMENT}
        />
        <ListItem text={"Log out"} onClick={handleLogout} />
      </div>
    </div>
  );
};

export default SidePanel;
