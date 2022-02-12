import React, { useState, useEffect } from "react";

//firebase
import app from "../../auth/base";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";

// styles
import { makeStyles, useTheme, Typography } from "@material-ui/core";
import styles from "./styles";

const CommitteeRegistrationStatus = () => {
  // state
  const [userData, setUserData] = useState({});
  const [registrationStatus, setRegistrationStatus] = useState(0);
  /* Registration status:
   * 4: Approved by the admin
   * 3: Payment made; registered for committee and country; not approved by the admin
   * 2: Registered for committee and country; Payment not made; not approved by the admin
   * 1: Payment made; Not registered for committee and country; not approved by the admin
   * 0: Not registered for committee and country; Payment not made; not approved by the admin
   */

  //firebase
  const auth = getAuth(app);
  const db = getDatabase(app);
  const current_uid = auth.currentUser.uid;
  const userRef = ref(db, "users/" + current_uid);
  const fetch = () => {
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setUserData(data);
    });
  };

  // state management
  useEffect(() => fetch(), []);
  useEffect(() => {
    if (userData.admin_approved) {
      setRegistrationStatus(4);
    } else if (
      userData.bank_slip !== undefined &&
      userData.committee_id !== undefined &&
      userData.country_id !== undefined
    ) {
      setRegistrationStatus(3);
    } else if (
      userData.bank_slip === undefined &&
      userData.committee_id !== undefined &&
      userData.country_id !== undefined
    ) {
      setRegistrationStatus(2);
    } else if (
      userData.bank_slip !== undefined &&
      userData.committee_id === undefined &&
      userData.country_id === undefined
    ) {
      setRegistrationStatus(1);
    } else if (
      userData.bank_slip === undefined &&
      userData.committee_id === undefined &&
      userData.country_id === undefined
    ) {
      setRegistrationStatus(0);
    }
  }, [userData]);

  // Styling
  const theme = useTheme();
  const useStyles = makeStyles(styles(theme, registrationStatus));
  const classes = useStyles();
  let reg_class = classes["reg_stat_" + registrationStatus];
  const root_className = [classes.root, reg_class].join(" ");

  return (
    <div className={root_className}>
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
