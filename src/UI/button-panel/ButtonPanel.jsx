import React from "react";

import { makeStyles, useTheme, Button } from "@material-ui/core";
import styles from "./styles";

const useStyles = makeStyles(styles);

const ButtonPanel = ({ enabled, onSave, onCancel }) => {
  // console.log(enabled);
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
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
