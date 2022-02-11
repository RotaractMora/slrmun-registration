import React from "react";
import { useState } from "react";

import { makeStyles, useTheme, Typography } from "@material-ui/core";
import styles from "./styles";

import {
  fetchedCommitteeId,
  fetchedCountryId,
  fetchedCommitteeList,
  fetchedCountryList,
} from "./fetchedData";
import DropDownSection from "./dropdown-section/DropDownSection";
import ButtonPanel from "../../UI/button-panel/ButtonPanel";
import { useEffect } from "react";

const useStyles = makeStyles(styles);

const CommitteeSelection = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [selectedCommitteeId, setSelectedCommitteeId] =
    useState(fetchedCommitteeId);
  const [selectedCountryId, setSelectedCountryId] = useState(fetchedCountryId);
  const [enableButtons, setEnableButtons] = useState(false);

  const save = () => {
    console.log("Saved");
  };

  const cancel = () => {
    setSelectedCommitteeId(fetchedCommitteeId);
    setSelectedCountryId(fetchedCountryId);
  };

  const updateEnability = (fetchedArr, selectedArr) => {
    let same = true;
    for (let index = 0; index < fetchedArr.length; index++) {
      if (fetchedArr[index] != selectedArr[index]) {
        same = false;
        break;
      }
    }
    if (same) {
      setEnableButtons(false);
    } else {
      setEnableButtons(true);
    }
  };

  useEffect(() => {
    updateEnability(
      [fetchedCommitteeId, fetchedCountryId],
      [selectedCommitteeId, selectedCountryId]
    );
  }, [selectedCommitteeId, selectedCountryId]);

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.h1}>
        Committee Selection
      </Typography>
      <div className={classes.container}>
        <DropDownSection
          fetchedCountryId={fetchedCountryId}
          fetchedCommitteeId={fetchedCommitteeId}
          fetchedCountryList={fetchedCountryList}
          fetchedCommitteeList={fetchedCommitteeList}
          selectedCommitteeId={selectedCommitteeId}
          setSelectedCommitteeId={(value) => setSelectedCommitteeId(value)}
          selectedCountryId={selectedCountryId}
          setSelectedCountryId={(value) => setSelectedCountryId(value)}
        />
        <ButtonPanel enabled={enableButtons} onSave={save} onCancel={cancel} />
      </div>
    </div>
  );
};

export default CommitteeSelection;
