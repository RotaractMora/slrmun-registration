import React, { useState, useEffect } from "react";

//firebase
import app from "../../../firebase/base";
import { getDatabase, onValue, ref } from "firebase/database";
import { getStorage } from "firebase/storage";

//routing
import { Routes, Route } from "react-router-dom";
import {
  USER_PROFILE,
  COMMITTEE_SELECTION,
  PAYMENTS,
  USER_MANAGEMENT,
} from "../../../constants/routes";

//styles
import { makeStyles, useTheme } from "@material-ui/core";
import styles from "./styles";

//components
import Header from "../../../components/header/Header";
import SidePanel from "../../../components/side-panel/SidePanel";
import UserProfile from "../../../containers/user-profile/UserProfile";
import CommitteeSelection from "../../../containers/commitee-selection/CommitteeSelection";
import Payments from "../../../containers/payments/Payments";
import UserManagement from "../../../containers/user-management/UserManagement";

const useStyles = makeStyles(styles);

const LoggedIn = ({ firebaseAuth }) => {
  //styling
  const theme = useTheme();
  const classes = useStyles(theme);

  //states
  const [cross, setCross] = useState(false);
  const [userData, setUserData] = useState({});

  //firebase
  const db = getDatabase(app);
  const storage = getStorage(app);
  const current_uid = firebaseAuth.currentUser.uid;
  const userRef = ref(db, "users/" + current_uid);
  const fetch = () => {
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setUserData(data);
    });
  };

  //state management
  useEffect(() => {
    if (JSON.stringify(userData) === JSON.stringify({})) {
      fetch();
    }
  }, []);
  return (
    <React.Fragment>
      <Header cross={cross} setCross={(setValue) => setCross(setValue)} />
      <div className={classes.body}>
        <SidePanel cross={cross} />
        <Routes>
          <Route
            path={USER_PROFILE}
            element={
              <UserProfile
                fetchedUserData={userData}
                firebaseAuth={firebaseAuth}
                firebaseDb={db}
                firebaseStorage={storage}
              />
            }
          />
          <Route
            path={COMMITTEE_SELECTION}
            element={
              <CommitteeSelection
                fetchedUserData={userData}
                firebaseAuth={firebaseAuth}
                firebaseDb={db}
                firebaseStorage={storage}
              />
            }
          />
          <Route
            path={PAYMENTS}
            element={
              <Payments
                fetchedUserData={userData}
                firebaseAuth={firebaseAuth}
                firebaseDb={db}
                firebaseStorage={storage}
              />
            }
          />
          {userData.user_level > 0 ? (
            <Route
              path={USER_MANAGEMENT}
              element={
                <UserManagement
                  fetchedUserData={userData}
                  firebaseAuth={firebaseAuth}
                  firebaseDb={db}
                  firebaseStorage={storage}
                />
              }
            />
          ) : null}
        </Routes>
      </div>
    </React.Fragment>
  );
};

export default LoggedIn;
