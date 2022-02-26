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
  fetchedCountryId,
  selectedCountry,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

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
          fetchedSelectedId={fetchedCountryId}
        />
      </div>
      {selectedCountry.requests
        ? console.log(Object.keys(selectedCountry.requests).length)
        : null}
      {selectedCountry.requests ? (
        Object.keys(selectedCountry.requests).length > 0 ? (
          <Typography variant="body2" className={classes.warning}>
            This country has already been requested by{" "}
            <b>{Object.keys(selectedCountry.requests).length.toString()}</b>{" "}
            registrants. Make the registration fee and confirm your
            participation soon.
          </Typography>
        ) : null
      ) : null}
    </div>
  );
};

export default DropDownSection;
