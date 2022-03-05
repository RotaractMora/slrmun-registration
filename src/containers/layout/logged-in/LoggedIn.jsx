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
  const fetch = () => {
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      setUserData(userData);
      if (userData.user_level >= 1) {
        //fetch all users data
        const usersRef = ref(db, USERS_DOC_NAME);
        onValue(usersRef, (snapshot) => {
          const data = snapshot.val();
          const dataObj = {};
          let dataArr = [];
          for (const user_id in data) {
            if (Object.hasOwnProperty.call(data, user_id)) {
              const user = data[user_id];
              if (user.name == "Avishka Perera") {
                console.log(user, user_id);
              }
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
      }
    });
    onValue(committeesRef, (snapshot) => {
      const committeeData = snapshot.val();
      setCommitteesData(committeeData);
    });
  };

  //state management
  useEffect(() => {
    if (JSON.stringify(userData) === JSON.stringify({})) {
      fetch();
    }
  }, []);

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
