import React from "react";

import app from "../../firebase/base";
import { getAuth } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core";
import styles from "./styles";

import LoggedIn from "./logged-in/LoggedIn";
import UnLoggedIn from "./unlogged-in/UnLoggedIn";
import {
  USER_LOGIN,
  USER_REGISTRATION,
  USER_PROFILE,
  COMMITTEE_SELECTION,
  PAYMENTS,
  USER_MANAGEMENT,
} from "../../constants/routes";

const useStyles = makeStyles(styles);

const Layout = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const location = useLocation();

  const auth = getAuth(app);
  const currentUser = auth.currentUser;

  let renderElement = <UnLoggedIn />;
  if (currentUser) {
    if (
      [USER_PROFILE, COMMITTEE_SELECTION, PAYMENTS, USER_MANAGEMENT].includes(
        location.pathname
      )
    ) {
      console.log("is a user");
      renderElement = <LoggedIn firebaseAuth={auth} />;
    } else {
      renderElement = <Navigate to="/" />;
    }
  } else {
    if ([USER_LOGIN, USER_REGISTRATION].includes(location.pathname)) {
      renderElement = <UnLoggedIn />;
    } else {
      renderElement = <Navigate to="/login" />;
    }
  }
  return <div className={classes.root}>{renderElement}</div>;
};

export default Layout;
