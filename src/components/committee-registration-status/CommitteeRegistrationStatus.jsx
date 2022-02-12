import React, { useState, useEffect } from "react";

// styles
import { makeStyles, useTheme, Typography } from "@material-ui/core";
import styles from "./styles";

import { PAYMENTS_FIELD_NAME } from "../../constants/general";

const CommitteeRegistrationStatus = ({ fetchedUserData }) => {
  // state
  const [registrationStatus, setRegistrationStatus] = useState(0);
  /* Registration status:
   * 4: Approved by the admin
   * 3: Payment made; registered for committee and country; not approved by the admin
   * 2: Registered for committee and country; Payment not made; not approved by the admin
   * 1: Payment made; Not registered for committee and country; not approved by the admin
   * 0: Not registered for committee and country; Payment not made; not approved by the admin
   */

  // state management
  useEffect(() => {
    if (fetchedUserData) {
      if (fetchedUserData.admin_approved) {
        setRegistrationStatus(4);
      } else if (
        fetchedUserData[PAYMENTS_FIELD_NAME] !== undefined &&
        fetchedUserData.committee_id !== undefined &&
        fetchedUserData.country_id !== undefined
      ) {
        setRegistrationStatus(3);
      } else if (
        fetchedUserData[PAYMENTS_FIELD_NAME] === undefined &&
        fetchedUserData.committee_id !== undefined &&
        fetchedUserData.country_id !== undefined
      ) {
        setRegistrationStatus(2);
      } else if (
        fetchedUserData[PAYMENTS_FIELD_NAME] !== undefined &&
        fetchedUserData.committee_id === undefined &&
        fetchedUserData.country_id === undefined
      ) {
        setRegistrationStatus(1);
      } else if (
        fetchedUserData[PAYMENTS_FIELD_NAME] === undefined &&
        fetchedUserData.committee_id === undefined &&
        fetchedUserData.country_id === undefined
      ) {
        setRegistrationStatus(0);
      }
    }
  }, [fetchedUserData]);

  // Styling
  const theme = useTheme();
  const useStyles = makeStyles(styles(theme, registrationStatus));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.heading}>
        Committee Registration Status
      </Typography>
      <div className={classes.banner}>
        <Typography>
          {registrationStatus === 0
            ? "Please register for a committee"
            : registrationStatus === 1
            ? "Please register for a committee"
            : registrationStatus == 2
            ? "Please deposit the registration fee and upload a clear image of the transaction document"
            : registrationStatus === 3
            ? "Please wait for the admin approval"
            : registrationStatus === 4
            ? "You are all set!"
            : "Undefined registration status"}
        </Typography>
      </div>
    </div>
  );
};

export default CommitteeRegistrationStatus;
