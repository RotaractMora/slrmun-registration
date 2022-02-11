import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { COMMITTEE_SELECTION, USER_LOGIN } from "../../constants/routes";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../auth/base";
import { hashPassword } from "../../functions/authentication";

import { makeStyles, useTheme, Button, Typography } from "@material-ui/core";
import styles from "./styles";

import UserDetailsForm from "../../components/user-details-form/UserDetailsForm";

const useStyles = makeStyles(styles);

const Registration = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [password, setPassword] = useState("");

  const handleRegister = (userData, password) => {
    const auth = getAuth(app);
    const hashedPassword = hashPassword(password);
    createUserWithEmailAndPassword(auth, userData.email, hashedPassword)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential);
        const user = userCredential.user;
        navigate(COMMITTEE_SELECTION);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography variant="h1" className={classes.h1}>
          Registration
        </Typography>
        <UserDetailsForm
          userData={userData}
          setUserData={setUserData}
          password={password}
          setPassword={(password) => setPassword(password)}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => handleRegister(userData, password)}
        >
          Register
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          onClick={() => navigate(USER_LOGIN)}
        >
          Log In
        </Button>
      </div>
    </div>
  );
};

export default Registration;
