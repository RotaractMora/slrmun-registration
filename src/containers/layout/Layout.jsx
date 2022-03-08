import React, { useContext, useEffect } from "react";

import app from "../../firebase/base";
import { getAuth } from "firebase/auth";
import { useLocation } from "react-router-dom";
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
  FPS_SUBMISSION,
  DELEGATE_MANAGEMENT,
} from "../../constants/routes";

import { AuthContext } from "../../firebase/Auth";

const useStyles = makeStyles(styles);

const Layout = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const location = useLocation();

  const auth = getAuth(app);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {}, [currentUser]);

  let renderElement = <UnLoggedIn />;
  if (currentUser) {
    if (
      [
        USER_PROFILE,
        COMMITTEE_SELECTION,
        PAYMENTS,
        FPS_SUBMISSION,
        DELEGATE_MANAGEMENT,
        USER_MANAGEMENT,
      ].includes(location.pathname)
    ) {
      renderElement = <LoggedIn firebaseAuth={auth} />;
    } else {
      renderElement = <Navigate to={COMMITTEE_SELECTION} />;
    }
  } else {
    if ([USER_LOGIN, USER_REGISTRATION].includes(location.pathname)) {
      renderElement = <UnLoggedIn />;
    } else {
      renderElement = <Navigate to={USER_REGISTRATION} />;
    }
  }
  return <div className={classes.root}>{renderElement}</div>;
};

export default Layout;
