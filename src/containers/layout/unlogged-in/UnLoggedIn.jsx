import React from "react";

import { Routes, Route } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core";
import styles from "./styles";

import { USER_LOGIN, USER_REGISTRATION } from "../../../constants/routes";

import Login from "../../../containers/login/Login";
import Registration from "../../../containers/registration/Registration";

const useStyles = makeStyles(styles);

const UnLoggedIn = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Routes>
      <Route path={USER_LOGIN} element={<Login />} />
      <Route path={USER_REGISTRATION} element={<Registration />} />
    </Routes>
  );
};

export default UnLoggedIn;
