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
import { GENERAL_USER_LEVEL, USERS_DOC_NAME } from "../../../constants/general";

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
  const { currentUser } = useContext(AuthContext);
  const current_uid = currentUser.uid;
  const userRef = ref(db, USERS_DOC_NAME + "/" + current_uid);
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
        <SidePanel cross={cross} setShowSidePanel={setCross} />
        <Routes>
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
          <Route
            path={COMMITTEE_SELECTION}
            element={
              <CommitteeSelection fetchedUserData={userData} firebaseDb={db} />
            }
          />
          <Route
            path={PAYMENTS}
            element={
              <Payments
                fetchedUserData={userData}
                firebaseDb={db}
                firebaseStorage={storage}
              />
            }
          />
          {userData.user_level > GENERAL_USER_LEVEL ? (
            <Route
              path={USER_MANAGEMENT}
              element={<UserManagement firebaseDatabase={db} />}
            />
          ) : null}
        </Routes>
      </div>
    </React.Fragment>
  );
};

export default LoggedIn;
