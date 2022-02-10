import React from "react";

import { makeStyles, useTheme } from "@material-ui/core";
import styles from "../user-profile/styles";

const useStyles = makeStyles(styles);

const UserManagement = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return <div>User management</div>;
};

export default UserManagement;
