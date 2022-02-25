import React, { useState, useEffect, useContext } from "react";

// styles
import { makeStyles, useTheme, Typography } from "@material-ui/core";
import styles from "./styles";

// firebase
import { get, ref, onValue, update, remove, child } from "firebase/database";

// components
import DropDownSection from "./dropdown-section/DropDownSection";
import ButtonPanel from "../../components/button-panel/ButtonPanel";
import CommitteeRegistrationStatus from "../../components/committee-registration-status/CommitteeRegistrationStatus";
import { AuthContext } from "../../firebase/Auth";
import { COMMITTEES_DOC_NAME, USERS_DOC_NAME } from "../../constants/general";

const useStyles = makeStyles(styles);

const CommitteeSelection = ({ fetchedUserData, firebaseDb }) => {
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
  const [showBanner, setShowBanner] = useState(true);

  // fetch data
  const { currentUser } = useContext(AuthContext);
  const current_uid = currentUser.uid;
  const userRef = ref(firebaseDb, USERS_DOC_NAME + "/" + current_uid);
  const committeesRef = ref(firebaseDb, "committees");
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
          text: committee_obj.short_name,
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
    get(newContryRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          // checks if the country is still available (to handle simultaneos updates)
          if (data.availability === 1) {
            // update the request list of the new country
            const current_time = new Date().getTime();
            update(child(newContryRef, "requests"), {
              [current_time]: current_uid,
            });

            // update the request list of the old country
            get(oldCountryRef)
              .then((snapshot) => {
                if (snapshot.exists()) {
                  const data = snapshot.val();
                  if (data.requests) {
                    // finds the timestamps the user has has selected the country. This will have always one occerence if no error has occured
                    const occurences = [];
                    for (const timestamp in data.requests) {
                      if (
                        Object.hasOwnProperty.call(data.requests, timestamp)
                      ) {
                        const uid = data.requests[timestamp];
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
                } else {
                  console.log("No data available");
                }
              })
              .catch((error) => {});

            // update the user data
            update(userRef, {
              committee_id: selectedCommitteeId,
              country_id: selectedCountryId,
            });
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
        {showBanner ? (
          <CommitteeRegistrationStatus
            fetchedUserData={fetchedUserData}
            setShowBanner={setShowBanner}
          />
        ) : null}
        <Typography className={classes.body1} variant="body1">
          Please note that your selection might be changed by the admin
          depending on your MUN experience. You will be notified through your
          contact details if this occurs.
        </Typography>
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
