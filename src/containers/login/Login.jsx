import React, { useState } from "react";

import { Link } from "react-router-dom";
import { USER_REGISTRATION } from "../../constants/routes";

import { makeStyles, useTheme, TextField, Typography } from "@material-ui/core";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import styles from "./styles";

import Model from "../../UI/model/Model";

const useStyles = makeStyles(styles);

const Login = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography variant="h2" className={classes.h2}>
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
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Typography variant="body2">
          <Link to={USER_REGISTRATION}>Register</Link> now
        </Typography>

        <Typography
          variant="caption"
          className={classes.link}
          //   onClick={}
        >
          Forgot password?
        </Typography>
        <Model icon={<ContactPhoneIcon />} heading={"heading"} body={"body"} />
      </div>
    </div>
  );
};

export default Login;
