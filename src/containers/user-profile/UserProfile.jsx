import React, { useState } from "react";

import { makeStyles, Typography, useTheme } from "@material-ui/core";
import styles from "./styles";

import DefaultUserIcon from "../../assets/images/default-user-icon.png";
import UserDetailsForm from "../../components/user-details-form/UserDetailsForm";
import ButtonPanel from "../../UI/button-panel/ButtonPanel";

import { fetchedUserData } from "./fetchedData";
import { useEffect } from "react";

const useStyles = makeStyles(styles);

const UserProfile = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [enableButtons, setEnableButtons] = useState(false);
  const [userData, setUserData] = useState(fetchedUserData);

  const updateEnability = (fetchedObject, currentObject) => {
    if (JSON.stringify(fetchedObject) === JSON.stringify(currentObject)) {
      setEnableButtons(false);
    } else {
      setEnableButtons(true);
    }
  };

  const save = () => {};

  const cancel = () => {
    setUserData(fetchedUserData);
  };

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
