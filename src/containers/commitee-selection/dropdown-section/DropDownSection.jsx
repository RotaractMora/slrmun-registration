import React from "react";

import { makeStyles, useTheme, Typography } from "@material-ui/core";
import styles from "./styles";

import DropDown from "../../../components/drop-down/DropDown";
import { stringObjectToArray } from "../../../functions/user";
import { committeeIdToCommitteeNameMap } from "../../../constants/general";

const useStyles = makeStyles(styles);

const DropDownSection = ({
  fetchedCountryList,
  fetchedCommitteeList,
  selectedCommitteeId,
  setSelectedCommitteeId,
  selectedCountryId,
  setSelectedCountryId,
  fetchedCountryId,
  showRequestCounts,
  injectingRequests,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  // used to manually inject requests from the linnked google sheet
  const injectingRequestsArr = stringObjectToArray(injectingRequests);
  let diplayRequestCount = 0;
  if (
    fetchedCountryList &&
    showRequestCounts &&
    selectedCountryId &&
    selectedCommitteeId
  ) {
    diplayRequestCount =
      fetchedCountryList[selectedCountryId].req_count +
      injectingRequestsArr[committeeIdToCommitteeNameMap[selectedCommitteeId]][
        selectedCountryId
      ];
  }

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


    {/*
      <div className={classes.selectionContainer}>
        <Typography variant="h2" className={classes.selectionHeading}>
          Country
        </Typography>
        <DropDown
          list={fetchedCountryList}
          selectedId={selectedCountryId}
          setSelectedId={(key) => setSelectedCountryId(key)}
          fetchedSelectedId={fetchedCountryId}
          showRequestCounts={showRequestCounts}
          injectingRequests={
            injectingRequestsArr[
              committeeIdToCommitteeNameMap[selectedCommitteeId]
            ]
          }
        />
      </div>
        */}






      {fetchedCountryList && showRequestCounts ? (
        fetchedCountryList[selectedCountryId] ? (
          diplayRequestCount > 1 ? (
            <Typography variant="body2" className={classes.warning}>
              This country has already been requested by{" "}
              <b>{diplayRequestCount}</b> registrants. Make the registration fee
              and confirm your participation soon.
            </Typography>
          ) : null
        ) : null
      ) : null}
    </div>
  );
};

export default DropDownSection;
