import React, { useState, useEffect, useContext } from "react";

// styles
import { makeStyles, useTheme, Typography } from "@material-ui/core";
import styles from "./styles";

// firebase
import { get, ref, update, remove, child } from "firebase/database";

// components
import PreferenceOrderSection from "./preference-oreder-section/PreferenceOrderSection";
import DropDownSection from "./dropdown-section/DropDownSection";
import ButtonPanel from "../../components/button-panel/ButtonPanel";
import CommitteeRegistrationStatus from "../../components/committee-registration-status/CommitteeRegistrationStatus";
import { AuthContext } from "../../firebase/Auth";
import { COMMITTEES_DOC_NAME, USERS_DOC_NAME } from "../../constants/general";
import {
  processCommitteesToDropDown,
  updateUserCountry,
} from "../../functions/user";

const useStyles = makeStyles(styles);

const CommitteeSelection = ({
  fetchedUserData,
  firebaseDb,
  committeesData,
  showRequestCounts,
  injectingRequests,
}) => {
  // Styling
  const theme = useTheme();
  const classes = useStyles(theme);

  // states
  const [preferenceList, setPreferenceList] = useState([0, 1, 2, 3, 4, 5]);
  const [fullCountryList, setFullCountryList] = useState({});
  const [selectedCommitteeId, setSelectedCommitteeId] = useState(
    fetchedUserData.committee_id
  );
  const [selectedCountryId, setSelectedCountryId] = useState(
    fetchedUserData.country_id
  );
  const [enableButtons, setEnableButtons] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  const { currentUser } = useContext(AuthContext);
  const current_uid = currentUser.uid;
  const fetchedCommitteeId = fetchedUserData.committee_id;
  const fetchedCountryId = fetchedUserData.country_id;

  const [local_committee_obj, local_country_obj] =
    processCommitteesToDropDown(committeesData);

  const fetchedCommitteeList = local_committee_obj;
  if (
    JSON.stringify(fullCountryList) !==
    JSON.stringify(processCommitteesToDropDown(committeesData)[1])
  ) {
    setFullCountryList(local_country_obj);
  }
  const [selectedCountryList, setSelectedCountryList] = useState(
    fullCountryList[selectedCommitteeId]
  );

  // button panel functions
  const save = () => {
    updateUserCountry(
      fetchedUserData,
      fetchedCountryId,
      fetchedCommitteeId,
      firebaseDb,
      selectedCommitteeId,
      selectedCountryId,
      committeesData
    );
  };

  const cancel = () => {
    setSelectedCommitteeId(fetchedCommitteeId);
    setSelectedCountryId(fetchedCountryId);
  };

  // enability update function of the button panel
  const updateEnability = (fetchedArr, selectedArr) => {
    if (selectedCountryId) {
      setEnableButtons(
        JSON.stringify(fetchedArr) !== JSON.stringify(selectedArr)
      );
    }
    if (!selectedArr[0] && !selectedArr[1]) {
      setEnableButtons(false);
    }
  };

  const move = (index, dir) => {
    console.log(index, dir);
    if (index - dir < 0 || index + dir >= preferenceList.length) return;
    const newPreferenceList = [...preferenceList];
    [newPreferenceList[index], newPreferenceList[index - dir]] = [newPreferenceList[index - dir], newPreferenceList[index]];
    setPreferenceList(newPreferenceList);
  };

  ///////////////////////// useEffects/////////////////////////////
  // Event listner to update the country list
  useEffect(() => {
    setSelectedCountryList(fullCountryList[selectedCommitteeId]);
  }, [selectedCommitteeId, fullCountryList]);

  useEffect(() => {
    updateEnability(
      [fetchedCommitteeId, fetchedCountryId],
      [selectedCommitteeId, selectedCountryId]
    );
  }, [
    selectedCommitteeId,
    selectedCountryId,
    fetchedCommitteeId,
    fetchedCountryId,
  ]);

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.h1}>
        Committee Selection
      </Typography>
      <div className={classes.container}>
        {showBanner ? (
          <CommitteeRegistrationStatus
            fetchedUserData={fetchedUserData}
            countryData={
              fetchedCommitteeId &&
              fetchedCountryId &&
              JSON.stringify(committeesData) !== JSON.stringify({})
                ? committeesData[fetchedCommitteeId].countries[fetchedCountryId]
                : undefined
            }
          />
        ) : null}
        <Typography className={classes.body1} variant="body1">
          Please note that your selection might be changed by the admin
          depending on your MUN experience. You will be notified through your
          contact details if this occurs.
        </Typography>
        {/* <DropDownSection
          fetchedCommitteeId={fetchedCommitteeId}
          fetchedCountryList={selectedCountryList}
          fetchedCommitteeList={fetchedCommitteeList}
          selectedCommitteeId={selectedCommitteeId}
          setSelectedCommitteeId={(value) => setSelectedCommitteeId(value)}
          selectedCountryId={selectedCountryId}
          setSelectedCountryId={(value) => setSelectedCountryId(value)}
          fetchedCountryId={fetchedUserData.country_id}
          showRequestCounts={showRequestCounts}
          injectingRequests={injectingRequests}
        /> */}
        <PreferenceOrderSection preferenceList={preferenceList} move={move} />
        <ButtonPanel
          enabled={enableButtons}
          showMessage={!fetchedUserData.admin_approved}
          message={
            "Please make the payment and wait for admin approval to enable committee selection"
          }
          onSave={save}
          onCancel={cancel}
        />
      </div>
    </div>
  );
};

export default CommitteeSelection;
