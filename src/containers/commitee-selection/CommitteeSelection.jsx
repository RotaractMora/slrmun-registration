import React, { useState, useEffect } from "react";

// styles
import { makeStyles, useTheme, Typography } from "@material-ui/core";
import styles from "./styles";

// firebase
import app from "../../auth/base";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth } from "firebase/auth";

// components
import DropDownSection from "./dropdown-section/DropDownSection";
import ButtonPanel from "../../UI/button-panel/ButtonPanel";

const useStyles = makeStyles(styles);

const CommitteeSelection = () => {
  // Styling
  const theme = useTheme();
  const classes = useStyles(theme);

  // states
  const [fetchedCommitteeList, setFetchedCommitteeList] = useState({});
  const [fullCountryList, setFullCountryList] = useState({});
  const [selectedCountryList, setSelectedCountryList] = useState({});
  const [selectedCommitteeId, setSelectedCommitteeId] = useState(null);
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [enableButtons, setEnableButtons] = useState(false);

  // fetch data
  const db = getDatabase(app);
  const auth = getAuth(app);
  const current_uid = auth.currentUser.uid;
  const userRef = ref(db, "users/" + current_uid);
  const fetchData = () => {
    const committeesRef = ref(db, "committees");
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
          imageUrl: "/images/committee-logos/default-logo.jpg",
          available: true,
        };

        // completes the country object
        for (const country_key in committee_obj.countries) {
          if (
            Object.hasOwnProperty.call(committee_obj.countries, country_key)
          ) {
            const country = committee_obj.countries[country_key];
            if (local_country_obj[committee_key] === undefined)
              local_country_obj[committee_key] = {};
            local_country_obj[committee_key][country_key] = {
              text: country.name,
              available: country.availability,
              imageUrl: "/images/country-flags/sri-lanka.jpg",
            };
          }
        }
      }

      setFullCountryList(local_country_obj);
      setFetchedCommitteeList(local_committee_obj);
    });

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setSelectedCommitteeId(data.committee_id);
      setSelectedCountryId(data.country_id);
    });
  };

  let fetchedCommitteeId = null;
  let fetchedCountryId = null;
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    fetchedCommitteeId = data.committee_id;
    fetchedCountryId = data.country_id;
  });

  // button panel functions
  const save = () => {
    update(userRef, {
      committee_id: selectedCommitteeId,
      country_id: selectedCountryId,
    });
  };
  const cancel = () => {
    setSelectedCommitteeId(fetchedCommitteeId);
    setSelectedCountryId(fetchedCountryId);
  };

  // enability update function of the button panel
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
  }, [selectedCommitteeId, selectedCountryId]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.h1}>
        Committee Selection
      </Typography>
      <div className={classes.container}>
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
