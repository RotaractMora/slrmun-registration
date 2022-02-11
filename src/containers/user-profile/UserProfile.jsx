import React, { useState, useEffect } from "react";

import app from "../../auth/base";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth } from "firebase/auth";

import { makeStyles, Typography, useTheme } from "@material-ui/core";
import styles from "./styles";

import DefaultUserIcon from "../../assets/images/default-user-icon.png";
import UserDetailsForm from "../../components/user-details-form/UserDetailsForm";
import ButtonPanel from "../../UI/button-panel/ButtonPanel";

const useStyles = makeStyles(styles);

const UserProfile = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [enableButtons, setEnableButtons] = useState(false);
  const [userData, setUserData] = useState({});
  const [fetchedUserData, setFetchedUserData] = useState({});

  const updateEnability = (fetchedObject, currentObject) => {
    if (JSON.stringify(fetchedObject) === JSON.stringify(currentObject)) {
      setEnableButtons(false);
    } else {
      setEnableButtons(true);
    }
  };

  const db = getDatabase(app);
  const auth = getAuth(app);
  const current_uid = auth.currentUser.uid;
  const userRef = ref(db, "users/" + current_uid);
  const fetchData = () => {
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setFetchedUserData(data);
      setUserData(data);
    });
  };

  const save = () => {
    update(userRef, userData);
  };

  const cancel = () => {
    setUserData(fetchedUserData);
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    updateEnability(fetchedUserData, userData);
  }, [userData]);

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.h1}>
        Profile
      </Typography>
      <div className={classes.container}>
        <img className={classes.profile_img} src={DefaultUserIcon} />
        <UserDetailsForm userData={userData} setUserData={setUserData} />
        <ButtonPanel enabled={enableButtons} onSave={save} onCancel={cancel} />
      </div>
    </div>
  );
};

export default UserProfile;
