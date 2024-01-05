import React, { useState, useEffect, useContext } from "react";

// styles
import { makeStyles, useTheme, Typography } from "@material-ui/core";
import styles from "./styles";

// firebase
import { get, ref, update, remove, child } from "firebase/database";

// components
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


  const [selectedPref1, setSelectedPref1] = useState('-');
  const [selectedPref2, setSelectedPref2] = useState('-');
  const [selectedPref3, setSelectedPref3] = useState('-');
  const [selectedPref4, setSelectedPref4] = useState('-');
  const [selectedPref5, setSelectedPref5] = useState('-');
  const [selectedPref6, setSelectedPref6] = useState('-');

  //Pref list validating
  const prefList = ["-","-","-","-","-","-"];
  function creatingPrefList(idx, val, prefList){
    prefList.splice(idx, 1, val);
  };
  function validatingPrefList(prefList) {
    const uniqList = new Set()
    for(let i=0;i<prefList.length;i++){
      if(prefList[i]==="-"){
        continue
      }
      else if(uniqList.has(prefList[i])){
        return true
      } else{
        uniqList.add(prefList[i]);
      };
    };
    return false
  };

  


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
        
        
        
        
        {/*
        <DropDownSection
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
        />
        */}

        <form>
          <div className={classes.container2}>
            <div>
              <Typography variant="h6">Enter your committee preferences</Typography>
            </div>
            <div className={classes.pref}>
            <label>
              01. UNGA 4 (United Nations General Assembly 4) :
              <select name="unga4" defaultValue="-"
              value={selectedPref1}
              onChange={e => setSelectedPref1(e.target.value)}>
                <option value="-">-</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </label>
            </div>
            <div className={classes.pref}>
            <label>
              02. UNSC (United Nations Security Council) :
              <select name="unsc" defaultValue="-"
              value={selectedPref2}
              onChange={e => setSelectedPref2(e.target.value)}>
                <option value="-">-</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </label>
            </div>
            <div className={classes.pref}>
            <label>
              03. UNHRC (Unit Nations Humans Rights Council) :
              <select name="unhrc" defaultValue="-"
              value={selectedPref3}
              onChange={e => setSelectedPref3(e.target.value)}>
                <option value="-">-</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </label>
            </div>
            <div className={classes.pref}>
            <label>
              04. UNEP (United Nations Environment Programme) :
              <select name="unep" defaultValue="-"
              value={selectedPref4}
              onChange={e => setSelectedPref4(e.target.value)}>
                <option value="-">-</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </label>
            </div>
            <div className={classes.pref}>
            <label>
              05. UNCSW (United Nations Commison on the status of women) :
              <select name="uncsw" defaultValue="-"
              value={selectedPref5}
              onChange={e => setSelectedPref5(e.target.value)}>
                <option value="-">-</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </label>
            </div>
            <div className={classes.pref}>
            <label>
              06. IPC (International Press Corps) :
              <select name="ipc" defaultValue="-"
              value={selectedPref6}
              onChange={e => setSelectedPref6(e.target.value)}>
                <option value="-">-</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </label>
            </div>
            {creatingPrefList(0,selectedPref1,prefList)}
            {creatingPrefList(1,selectedPref2,prefList)}
            {creatingPrefList(2,selectedPref3,prefList)}
            {creatingPrefList(3,selectedPref4,prefList)}
            {creatingPrefList(4,selectedPref5,prefList)}
            {creatingPrefList(5,selectedPref6,prefList)}
            {console.log(prefList)}
            {console.log(validatingPrefList(prefList))}
          </div>
        </form>


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
