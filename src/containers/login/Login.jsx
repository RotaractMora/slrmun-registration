import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { USER_REGISTRATION, COMMITTEE_SELECTION, PAYMENTS } from "../../constants/routes";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase/base";
import { hashPassword } from "../../functions/authentication";

import {
  makeStyles,
  useTheme,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";

import { toast } from 'react-toastify';

import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import styles from "./styles";

import Modal from "../../components/modal/Modal";

const useStyles = makeStyles(styles);

const Login = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const handleSignIn = (email, password) => {
    const auth = getAuth(app);
    const hashedPassword = hashPassword(password);
    signInWithEmailAndPassword(auth, email, hashedPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast.success('Welcome back!', {
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
        console.log(errorCode);
        if (errorCode === "auth/invalid-email") 
          toast.error('Invalid email', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        if (errorCode === "auth/user-not-found") 
          toast.error('Invalid email', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        if (errorCode === "auth/wrong-password") 
        toast.error('Check your email and passwod', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        if (errorCode === "auth/invalid-login-credentials") 
        toast.error('Check your email and passwod', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography variant="h1" className={classes.h1}>
          Log In
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => handleSignIn(email, password)}
        >
          Log in
        </Button>

        <Typography variant="body2">
          <Link to={USER_REGISTRATION}>Register</Link> now
        </Typography>

        <Typography
          variant="caption"
          className={classes.link}
          onClick={() => setShowModal(true)}
        >
          Forgot password?
        </Typography>
        {showModal ? (
          <Modal
            icon={
              <ContactPhoneIcon
                className={classes.modalIcon}
                fontSize="large"
              />
            }
            heading={"Contact Admin"}
            body={
              "Please contact the administration of Sri Lanka Rotaract Model United Nations through the contacts available in the website."
            }
            close={() => setShowModal(false)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Login;
