import React, { useState, useEffect } from "react";

// styles
import { makeStyles, useTheme, Typography } from "@material-ui/core";
import styles from "./styles";

import { PAYMENTS_FIELD_NAME } from "../../constants/general";
import { getUserRegistrationStatus } from "../../functions/user";

const CommitteeRegistrationStatus = ({ fetchedUserData, countryData }) => {
  // state
  const [registrationStatus, setRegistrationStatus] = useState([]);

  // Styling
  const theme = useTheme();

  // state management
  useEffect(() => {
    const userRegistrationStatus = getUserRegistrationStatus(
      fetchedUserData,
      PAYMENTS_FIELD_NAME,
      countryData,
      theme
    );
    setRegistrationStatus(userRegistrationStatus);
  }, [fetchedUserData]);

  const useStyles = makeStyles(styles(theme, registrationStatus[0]));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.heading}>
        Committee Registration Status
      </Typography>
      <div className={classes.banner}>
        <Typography>{registrationStatus[1]}</Typography>
      </div>
    </div>
  );
};

export default CommitteeRegistrationStatus;
