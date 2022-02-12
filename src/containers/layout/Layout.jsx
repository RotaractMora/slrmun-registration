import React, { useContext } from "react";

import { AuthContext } from "../../auth/Auth";

import { makeStyles, useTheme } from "@material-ui/core";
import styles from "./styles";

import LoggedIn from "./logged-in/LoggedIn";
import UnLoggedIn from "./unlogged-in/UnLoggedIn";

const useStyles = makeStyles(styles);

const Layout = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const { currentUser } = useContext(AuthContext);

  return (
    <div className={classes.root}>
      {currentUser ? <LoggedIn /> : <UnLoggedIn />}
    </div>
  );
};

export default Layout;
