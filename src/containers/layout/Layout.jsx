import React, { useContext, useEffect, useState } from "react";

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
  SETTINGS,
} from "../../constants/routes";

import { AuthContext } from "../../firebase/Auth";
import { get, getDatabase, ref } from "firebase/database";
import { METADATA_DOC_NAME } from "../../constants/general";

const useStyles = makeStyles(styles);

const Layout = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const location = useLocation();

  const auth = getAuth(app);
  const { currentUser } = useContext(AuthContext);

  const [metaData, setMetaData] = useState();

  const fetchMetaData = () => {
    const db = getDatabase(app);
    const metaDataRef = ref(db, METADATA_DOC_NAME);
    get(metaDataRef).then((snapshot) => {
      if (snapshot.exists()) {
        setMetaData(snapshot.val());
      } else {
        console.log("No metadata");
      }
    });
  };

  useEffect(() => {
    fetchMetaData();
  }, []);

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
        SETTINGS,
      ].includes(location.pathname)
    ) {
      renderElement = <LoggedIn metaData={metaData} />;
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
