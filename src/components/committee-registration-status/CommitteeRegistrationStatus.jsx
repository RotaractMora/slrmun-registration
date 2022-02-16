import React, { useState, useEffect } from "react";

// styles
import { makeStyles, useTheme, Typography } from "@material-ui/core";
import styles from "./styles";

import { PAYMENTS_FIELD_NAME } from "../../constants/general";

const CommitteeRegistrationStatus = ({ fetchedUserData, setShowBanner }) => {
  // state
  const [registrationStatus, setRegistrationStatus] = useState(0);
  /* Registration status:
   * 3: Payment made; Approved by the admin; Registered for committee and country
   * 2: Payment made; Approved by the admin; Not registered for committee and country
   * 1: Payment made; Not approved by the admin; Not registered for committee and country
   * 0: Payment not made; Not approved by the admin; Not registered for committee and country
   */

  // state management
  useEffect(() => {
    if (fetchedUserData) {
      if (
        fetchedUserData[PAYMENTS_FIELD_NAME] !== undefined &&
        fetchedUserData.admin_approved &&
        fetchedUserData.committee_id !== undefined &&
        fetchedUserData.country_id !== undefined
      ) {
        setRegistrationStatus(3);
        if (setShowBanner) {
          setShowBanner(false);
        }
      } else if (
        fetchedUserData[PAYMENTS_FIELD_NAME] !== undefined &&
        fetchedUserData.admin_approved &&
        fetchedUserData.committee_id === undefined &&
        fetchedUserData.country_id === undefined
      ) {
        setRegistrationStatus(2);
      } else if (
        fetchedUserData[PAYMENTS_FIELD_NAME] !== undefined &&
        !fetchedUserData.admin_approved &&
        fetchedUserData.committee_id === undefined &&
        fetchedUserData.country_id === undefined
      ) {
        setRegistrationStatus(1);
      } else if (
        fetchedUserData[PAYMENTS_FIELD_NAME] === undefined &&
        !fetchedUserData.admin_approved &&
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
            ? "Please deposit the registration fee and upload a clear image of the transaction document to the payments tab"
            : registrationStatus === 1
            ? "Please wait for admin approval"
            : registrationStatus == 2
            ? "Please register for a committee and select a country"
            : registrationStatus === 3
            ? "You are all set!"
            : "Undefined registration status"}
        </Typography>
      </div>
    </div>
  );
};

export default CommitteeRegistrationStatus;
