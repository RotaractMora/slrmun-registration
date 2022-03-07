import React, { useState, useEffect, useContext } from "react";

//firebase
import app from "../../../firebase/base";
import { getDatabase, onValue, ref } from "firebase/database";
import { getStorage } from "firebase/storage";
import { AuthContext } from "../../../firebase/Auth";

//routing
import { Routes, Route } from "react-router-dom";
import {
  USER_PROFILE,
  COMMITTEE_SELECTION,
  PAYMENTS,
  USER_MANAGEMENT,
  FPS_SUBMISSION,
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

// other constants
import {
  COMMITTEES_DOC_NAME,
  GENERAL_USER_LEVEL,
  USERS_DOC_NAME,
} from "../../../constants/general";

// other functions
import { getUserVisibilityArray } from "../../../functions/user";
import FPSSubmission from "../../fps-submission/FPSSubmission";

const useStyles = makeStyles(styles);

const LoggedIn = ({ firebaseAuth }) => {
  //styling
  const theme = useTheme();
  const classes = useStyles(theme);

  //states
  const [cross, setCross] = useState(false);
  const [userData, setUserData] = useState({});
  const [fetchedUserData, setFetchedUsersData] = useState([]);

  const [committeesData, setCommitteesData] = useState({});

  //firebase
  const db = getDatabase(app);
  const storage = getStorage(app);
  const { currentUser } = useContext(AuthContext);
  const current_uid = currentUser.uid;
  const userRef = ref(db, USERS_DOC_NAME + "/" + current_uid);
  const committeesRef = ref(db, COMMITTEES_DOC_NAME);
  const initFetch = () => {
    // fetch user data
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      setUserData({ ...userData, user_id: current_uid });
    });

    // fetch committee data
    onValue(committeesRef, (snapshot) => {
      const committeeData = snapshot.val();
      setCommitteesData(committeeData);
    });
  };

  const loggedInFetch = () => {
    //fetch all users data
    const usersRef = ref(db, USERS_DOC_NAME);
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const dataObj = {};
      let dataArr = [];
      for (const user_id in data) {
        if (Object.hasOwnProperty.call(data, user_id)) {
          const user = data[user_id];
          if (dataObj[user.registered_timestamp]) {
            dataObj[user.registered_timestamp + 1] = { ...user, user_id };
          } else {
            dataObj[user.registered_timestamp] = { ...user, user_id };
          }
        }
      }

      dataArr = Object.values(dataObj);
      setFetchedUsersData(dataArr);
    });
  };

  //state management
  useEffect(() => {
    if (JSON.stringify(userData) === JSON.stringify({})) {
      initFetch();
    }
  }, []);
  useEffect(() => {
    if (userData) {
      if (userData.user_level >= 1) {
        loggedInFetch();
      }
    }
  }, [userData]);

  const visibilityArray = getUserVisibilityArray(userData.user_level);
  return (
    <React.Fragment>
      <Header cross={cross} setCross={(setValue) => setCross(setValue)} />
      <div className={classes.body}>
        <SidePanel cross={cross} setShowSidePanel={setCross} />
        <Routes>
          {visibilityArray[0] ? (
            <Route
              path={USER_PROFILE}
              element={
                <UserProfile
                  fetchedUserData={userData}
                  firebaseDb={db}
                  firebaseStorage={storage}
                />
              }
            />
          ) : null}
          {visibilityArray[1] ? (
            <Route
              path={COMMITTEE_SELECTION}
              element={
                <CommitteeSelection
                  fetchedUserData={userData}
                  firebaseDb={db}
                  committeesData={committeesData}
                />
              }
            />
          ) : null}
          {visibilityArray[2] ? (
            <Route
              path={PAYMENTS}
              element={
                <Payments
                  fetchedUserData={userData}
                  firebaseDb={db}
                  firebaseStorage={storage}
                  committeesData={committeesData}
                />
              }
            />
          ) : null}
          {visibilityArray[3] ? (
            <Route
              path={FPS_SUBMISSION}
              element={
                <FPSSubmission
                  firebaseDb={db}
                  firebaseStorage={storage}
                  committee_id={userData.committee_id}
                  fetchedUserData={userData}
                  current_uid={current_uid}
                />
              }
            />
          ) : null}
          {visibilityArray[4] ? (
            <Route
              path={USER_MANAGEMENT}
              element={
                <UserManagement
                  firebaseDatabase={db}
                  committeesData={committeesData}
                  fetchedUserData={fetchedUserData}
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
