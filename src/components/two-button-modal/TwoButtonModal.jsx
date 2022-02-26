import React from "react";
import { Button, makeStyles, Typography, useTheme } from "@material-ui/core";
import styles from "./styles";

const useStyles = makeStyles(styles);

const TwoButtonModal = ({ children, icon, heading, onProceed, onCancel }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.root} onClick={onProceed}>
      <div className={classes.container} onClick={(e) => e.stopPropagation()}>
        {icon}
        <Typography variant="h2" className={classes.heading}>
          {heading}
        </Typography>
        {children}
        <div className={classes.buttonPanel}>
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={onProceed}
          >
            Proceed
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.btn}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TwoButtonModal;
