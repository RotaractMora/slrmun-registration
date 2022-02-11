import React, { useState } from "react";

import { makeStyles, useTheme, Button, Typography } from "@material-ui/core";
import styles from "./styles";
import UserDetailsForm from "../../components/user-details-form/UserDetailsForm";

const useStyles = makeStyles(styles);

const Registration = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [userData, setUserData] = useState({});

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography variant="h1" className={classes.h1}>
          Registration
        </Typography>
        <UserDetailsForm userData={userData} setUserData={setUserData} />
        <Button variant="contained" color="primary" className={classes.button}>
          Register
        </Button>
      </div>
    </div>
  );
};

export default Registration;
