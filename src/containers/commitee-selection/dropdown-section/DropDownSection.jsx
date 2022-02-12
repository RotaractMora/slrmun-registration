import React from "react";

import { makeStyles, useTheme, Typography } from "@material-ui/core";
import styles from "./styles";

import DropDown from "../../../components/drop-down/DropDown";

const useStyles = makeStyles(styles);

const DropDownSection = ({
  fetchedCountryList,
  fetchedCommitteeList,
  selectedCommitteeId,
  setSelectedCommitteeId,
  selectedCountryId,
  setSelectedCountryId,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  // console.log(selectedCommitteeId);

  return (
    <div>
      <div className={classes.selectionContainer}>
        <Typography variant="h2" className={classes.selectionHeading}>
          Committee
        </Typography>
        <DropDown
          list={fetchedCommitteeList}
          selectedId={selectedCommitteeId}
          setSelectedId={(key) => {
            setSelectedCountryId(null);
            setSelectedCommitteeId(key);
          }}
        />
      </div>
      <div className={classes.selectionContainer}>
        <Typography variant="h2" className={classes.selectionHeading}>
          Country
        </Typography>
        <DropDown
          list={fetchedCountryList}
          selectedId={selectedCountryId}
          setSelectedId={(key) => setSelectedCountryId(key)}
        />
      </div>
    </div>
  );
};

export default DropDownSection;
