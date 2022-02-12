import React, { useState, useEffect } from "react";

// styles
import { makeStyles, useTheme, Typography } from "@material-ui/core";
import styles from "./styles";

// firebase
import app from "../../firebase/base";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth } from "firebase/auth";

// components
import DropDownSection from "./dropdown-section/DropDownSection";
import ButtonPanel from "../../components/button-panel/ButtonPanel";
import CommitteeRegistrationStatus from "../../components/committee-registration-status/CommitteeRegistrationStatus";

const useStyles = makeStyles(styles);

const CommitteeSelection = ({ fetchedUserData }) => {
  // Styling
  const theme = useTheme();
  const classes = useStyles(theme);

  // states
  const [fetchedCommitteeList, setFetchedCommitteeList] = useState({});
  const [fullCountryList, setFullCountryList] = useState({});
  const [selectedCountryList, setSelectedCountryList] = useState({});
  const [selectedCommitteeId, setSelectedCommitteeId] = useState(null);
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [fetchedCommitteeId, setFetchedCommitteeId] = useState(null);
  const [fetchedCountryId, setFetchedCountryId] = useState(null);
  const [enableButtons, setEnableButtons] = useState(false);

  // fetch data
  const db = getDatabase(app);
  const auth = getAuth(app);
  const current_uid = auth.currentUser.uid;
  const userRef = ref(db, "users/" + current_uid);
  const committeesRef = ref(db, "committees");
  const fetchData = () => {
    // update the commitee and country list
    onValue(committeesRef, (snapshot) => {
      const data = snapshot.val();

      const local_committee_obj = {};
      const local_country_obj = {};
      for (
        let committee_key = 0;
        committee_key < data.length;
        committee_key++
      ) {
        const committee_obj = data[committee_key];

        // completes the committee object
        local_committee_obj[committee_key] = {
          text: committee_obj.name,
          imageUrl: committee_obj.imageUrl,
          available: true,
        };

        // completes the country object
        for (const country_key in committee_obj.countries) {
          if (
            Object.hasOwnProperty.call(committee_obj.countries, country_key)
          ) {
            const country_obj = committee_obj.countries[country_key];
            if (local_country_obj[committee_key] === undefined)
              local_country_obj[committee_key] = {};
            local_country_obj[committee_key][country_key] = {
              text: country_obj.name,
              available: country_obj.availability,
              imageUrl: country_obj.imageUrl,
            };
          }
        }
      }

      setFetchedCommitteeList(local_committee_obj);
      setFullCountryList(local_country_obj);
    });
  };

  // button panel functions
  const save = () => {
    const oldContryRef = ref(
      db,
      "committees/" + fetchedCommitteeId + "/countries/" + fetchedCountryId
    );
    const newContryRef = ref(
      db,
      "committees/" + selectedCommitteeId + "/countries/" + selectedCountryId
    );
    update(userRef, {
      committee_id: selectedCommitteeId,
      country_id: selectedCountryId,
    });
    update(oldContryRef, { availability: 1 });
    update(newContryRef, { availability: 0 });
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
  };

  ///////////////////////// useEffects/////////////////////////////
  // Event listner to update the country list
  useEffect(() => {
    setSelectedCountryList(fullCountryList[selectedCommitteeId]);
  }, [fullCountryList, selectedCommitteeId]);

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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSelectedCommitteeId(fetchedUserData.committee_id);
    setSelectedCountryId(fetchedUserData.country_id);
    setFetchedCommitteeId(fetchedUserData.committee_id);
    setFetchedCountryId(fetchedUserData.country_id);
  }, [fetchedUserData]);

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.h1}>
        Committee Selection
      </Typography>
      <div className={classes.container}>
        <CommitteeRegistrationStatus fetchedUserData={fetchedUserData} />
        <DropDownSection
          fetchedCountryId={fetchedCountryId}
          fetchedCommitteeId={fetchedCommitteeId}
          fetchedCountryList={selectedCountryList}
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
