import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { COMMITTEE_SELECTION, USER_LOGIN, PAYMENTS } from "../../constants/routes";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import app from "../../firebase/base";
import {
  comparePasswords,
  hashPassword,
  validateEmail,
  validatePassword,
} from "../../functions/authentication";

import { toast } from 'react-toastify';

import { makeStyles, useTheme, Button, Typography } from "@material-ui/core";
import styles from "./styles";

import UserDetailsForm from "../../components/user-details-form/UserDetailsForm";

// other constants
import { USERS_DOC_NAME } from "../../constants/general";

const useStyles = makeStyles(styles);

const Registration = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    current_status: "0",
    rotaractor: false,
    interactor: false,
  });

  const db = getDatabase(app);
  const auth = getAuth(app);

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const password = e.target.password.value;
    const hashedPassword = hashPassword(password);
    const confirm_password = e.target.confirm_password.value;
    const email = e.target.email.value;
    const mobile_number = e.target.mobile_number.value;
    const mun_experience = e.target.mun_experience.value;
    const mun_awards = e.target.mun_awards.value;
    const current_status = e.target.current_status.value;
    const institute = e.target.institute.value;
    const registered_timestamp = parseInt(Date.now());
    const residence_country = e.target.residence_country.value;
    const residence_address = e.target.residence_address
      ? e.target.residence_address.value
      : "";
    const rotaractor = e.target.rotaractor.checked;
    const rotaract_club = e.target.rotaract_club
      ? e.target.rotaract_club.value
      : "";
    const interactor = e.target.interactor.checked;
    const interact_club = e.target.interact_club
      ? e.target.interact_club.value
      : "";

    if (!validateEmail(email)) {
      alert("Invalid Email");
      return;
    }
    if (!validatePassword(password)) {
      alert("Password must be atleast six characters long");
      return;
    }
    if (
      !comparePasswords(password, confirm_password, userData, (data) =>
        setUserData(data)
      )
    ) {
      alert("Passwords are not the same");
      return;
    }

    createUserWithEmailAndPassword(auth, userData.email, hashedPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // Add to database
        const userId = user.uid;
        set(ref(db, USERS_DOC_NAME + "/" + userId), {
          name,
          email,
          mobile_number,
          mun_experience,
          current_status,
          mun_awards,
          institute,
          registered_timestamp,
          residence_country,
          residence_address,
          rotaractor,
          rotaract_club,
          interactor,
          interact_club,
          user_level: 0,
          admin_approved: false,
        });

        toast.success('Registered Successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        navigate(PAYMENTS);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        if (errorCode === "auth/email-already-in-use") {
          // alert("Email already in use");
          toast.warn('Email already in use', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography variant="h1" className={classes.h1}>
          Registration
        </Typography>
        <form onSubmit={(e) => handleRegister(e)}>
          <UserDetailsForm
            userData={userData}
            setUserData={setUserData}
            getPassword
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
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
        </form>
      </div>
    </div>
  );
};

export default Registration;
