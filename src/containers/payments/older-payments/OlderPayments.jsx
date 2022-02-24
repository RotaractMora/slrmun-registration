import { makeStyles, Typography, useTheme } from "@material-ui/core";
import React, { useState } from "react";

import styles from "../local-instructions/styles";
import localStyles from "./local-styles";

const useStyles = makeStyles({ ...styles, ...localStyles });

const OlderPayments = () => {
  const theme = useTheme();
  console.log(theme);
  const classes = useStyles(theme);
  const [expanded, setExpanded] = useState(false);

  let wrapper = [classes.wrapper, classes.wrapperColapsed].join(" ");
  if (expanded) wrapper = classes.wrapper;

  return (
    <div className={classes.root}>
      <Typography variant="body1" className={classes.oldDescription}>
        Please note that the payments you made before 24<sup>th</sup> of
        February 2022 to the{" "}
        <span
          className={classes.clickable}
          onClick={() => setExpanded(!expanded)}
        >
          previous&nbsp;bank&nbsp;account
        </span>{" "}
        are also valid
      </Typography>
      <div className={wrapper}>
        <table className={[classes.table, classes.oldTable].join(" ")}>
          <tbody>
            <tr>
              <td
                align="right"
                className={[classes.main_data, classes.table_cell].join(" ")}
              >
                Account Number
              </td>
              <td className={classes.table_cell} align="left">
                2785328
              </td>
            </tr>
            <tr>
              <td align="right" className={classes.main_data}>
                Account Name
              </td>
              <td align="left">MS S P Manimendra</td>
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
              <td align="left">Hikkaduwa Branch</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OlderPayments;
