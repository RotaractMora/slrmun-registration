import React from "react";

import { makeStyles, useTheme, Typography } from "@material-ui/core";
import styles from "../local-instructions/styles";
import OlderPayments from "../older-payments/OlderPayments";

const useStyles = makeStyles(styles);

const ForeignInstructions = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.h1}>
        Payment Method
      </Typography>
      <Typography variant="body1">
        Please deposit the USD 15.00 to the following bank account and upload a
        clear image of the transaction document to the below section. Please
        note that this cost do not include transfering charges and they must be
        beared by the registrant.
      </Typography>
      <table className={classes.table}>
        <tbody>
          <tr>
            <td
              align="right"
              className={[classes.main_data, classes.table_cell].join(" ")}
            >
              Account Number
            </td>
            <td className={classes.table_cell} align="left">
              307599
            </td>
          </tr>
          <tr>
            <td align="right" className={classes.main_data}>
              Account Name
            </td>
            <td align="left">Rotaract Club of University of Moratuwa</td>
          </tr>
          <tr>
            <td align="right" className={classes.main_data}>
              Bank
            </td>
            <td align="left">Bank of Ceylon</td>
          </tr>
          <tr>
            <td align="right" className={classes.main_data}>
              Branch
            </td>
            <td align="left">Katubedda Branch</td>
          </tr>
        </tbody>
      </table>
      {/* <OlderPayments /> */}
    </div>
  );
};

export default ForeignInstructions;
