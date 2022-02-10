import React from "react";
import { useState } from "react";

import { makeStyles, useTheme } from "@material-ui/core";
import styles from "./styles";

import LoggedIn from "./logged-in/LoggedIn";
import UnLoggedIn from "./unlogged-in/UnLoggedIn";

const useStyles = makeStyles(styles);

const Layout = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className={classes.root}>
      {loggedIn ? <LoggedIn /> : <UnLoggedIn />}
    </div>
  );
};

export default Layout;
