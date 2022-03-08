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

  // fetch data
  const { currentUser } = useContext(AuthContext);
  const current_uid = currentUser.uid;
  const fetchedCommitteeId = fetchedUserData.committee_id;
  const fetchedCountryId = fetchedUserData.country_id;
  const userRef = ref(firebaseDb, USERS_DOC_NAME + "/" + current_uid);

  const processCommitteesToDropDown = (committeesData) => {
    const local_committee_obj = {};
    const local_country_obj = {};
    for (
      let committee_key = 0;
      committee_key < committeesData.length;
      committee_key++
    ) {
      const committee_obj = committeesData[committee_key];

      // completes the committee object
      local_committee_obj[committee_key] = {
        text: committee_obj.short_name,
        imageUrl: committee_obj.imageUrl,
        available: true,
      };

      // completes the country object
      for (const country_key in committee_obj.countries) {
        if (Object.hasOwnProperty.call(committee_obj.countries, country_key)) {
          const country_obj = committee_obj.countries[country_key];
          if (local_country_obj[committee_key] === undefined)
            local_country_obj[committee_key] = {};
          let req_count = 0;
          if (country_obj.requests)
            req_count = Object.keys(country_obj.requests).length;
          if (
            country_key === fetchedUserData.country_id &&
            committee_key === parseInt(fetchedUserData.committee_id)
          ) {
            req_count -= 1;
          }
          local_country_obj[committee_key][country_key] = {
            text: country_obj.name,
            available: country_obj.availability,
            imageUrl: country_obj.imageUrl,
            req_count,
          };
        }
      }
    }
    return [local_committee_obj, local_country_obj];
  };

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
    let oldCountryRef = undefined;
    if (fetchedCountryId) {
      oldCountryRef = ref(
        firebaseDb,
        COMMITTEES_DOC_NAME +
          "/" +
          fetchedCommitteeId +
          "/countries/" +
          fetchedCountryId
      );
    }
    const newContryRef = ref(
      firebaseDb,
      COMMITTEES_DOC_NAME +
        "/" +
        selectedCommitteeId +
        "/countries/" +
        selectedCountryId
    );
    // update the database
    const newCountry =
      committeesData[selectedCommitteeId].countries[selectedCountryId];
    // checks if the country is still available (to handle simultaneos updates)
    if (newCountry.availability === 1) {
      // update the request list of the new country
      const current_time = new Date().getTime();
      update(child(newContryRef, "requests"), {
        [current_time]: current_uid,
      });
      // update the request list and the availability of the old country
      if (fetchedCountryId) {
        const oldCountry =
          committeesData[fetchedCommitteeId].countries[fetchedCountryId];

        // delete the requests
        if (oldCountry.requests) {
          // finds the timestamps the user has has selected the country. This will have always one occerence if no error has occured
          const occurences = [];
          for (const timestamp in oldCountry.requests) {
            if (Object.hasOwnProperty.call(oldCountry.requests, timestamp)) {
              const uid = oldCountry.requests[timestamp];
              if (uid === current_uid) {
                occurences.push(timestamp);
              }
            }
          }
          // delete the occurences (most probably a single one) from the database
          for (let i = 0; i < occurences.length; i++) {
            const timestamp = occurences[i];
            remove(child(oldCountryRef, "/requests/" + timestamp));
          }
        }

        // make the country available if if was reserved to this fellow
        if (oldCountry.reserved_to === current_uid) {
          update(oldCountryRef, { reserved_to: "", availability: 1 });
        }
      }

      // update list to update the user
      const userUpdates = {
        committee_id: selectedCommitteeId,
        country_id: selectedCountryId,
      };

      // update the country data (reserve) if approved by the admin
      if (fetchedUserData.admin_approved) {
        update(newContryRef, {
          availability: 0,
          reserved_to: fetchedUserData.user_id,
        });
        userUpdates.country_reserved = true;
      }

      // updates the user
      update(userRef, userUpdates);
    }
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
