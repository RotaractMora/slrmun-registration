import React from "react";

import { makeStyles, useTheme, Typography, Button } from "@material-ui/core";

import styles from "./styles";

const useStyles = makeStyles(styles);

const Modal = ({ icon, heading, body, close }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.root} onClick={close}>
      <div className={classes.container} onClick={(e) => e.stopPropagation()}>
        {icon ? icon : null}
        {heading ? (
          <Typography variant="h3" className={classes.h3}>
            {heading}
          </Typography>
        ) : null}
        {body ? (
          <Typography variant="body1" className={classes.bodyText}>
            {body}
          </Typography>
        ) : null}
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={close}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default Modal;
