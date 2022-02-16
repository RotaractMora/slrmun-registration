import React from "react";

import { makeStyles, useTheme, Button, Typography } from "@material-ui/core";
import styles from "./styles";

const useStyles = makeStyles(styles);

const ButtonPanel = ({ enabled, showMessage, message, onSave, onCancel }) => {
  // console.log(enabled);
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      {showMessage ? (
        <Typography variant="body1" className={classes.body1}>
          {message}
        </Typography>
      ) : null}
      <Button
        disabled={!enabled}
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={onSave}
      >
        Save
      </Button>
      <Button
        disabled={!enabled}
        variant="outlined"
        color="secondary"
        className={classes.button}
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
  );
};

export default ButtonPanel;
