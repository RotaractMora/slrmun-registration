import React from "react";

import { makeStyles, useTheme, Typography } from "@material-ui/core";
import styles from "../user-profile/styles";

const useStyles = makeStyles(styles);

const UserManagement = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.h1}>
        User Management
      </Typography>
    </div>
  );
};

export default UserManagement;
