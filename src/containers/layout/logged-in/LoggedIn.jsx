import React, { useState, useEffect } from "react";

//firebase
import app from "../../../auth/base";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";

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

const LoggedIn = () => {
  //styling
  const theme = useTheme();
  const classes = useStyles(theme);

  //states
  const [cross, setCross] = useState(false);
  const [userLevel, setUserLevel] = useState(null);
  const [userData, setUserData] = useState({});

  //firebase
  const auth = getAuth(app);
  const db = getDatabase(app);
  const current_uid = auth.currentUser.uid;
  const userRef = ref(db, "users/" + current_uid);
  const fetch = () => {
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setUserData(data);
      setUserLevel(data.user_level);
    });
  };

  //state management
  useEffect(() => {
    if (userLevel === null) {
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
                userData={userData}
                setUserData={(data) => setUserData(data)}
              />
            }
          />
          <Route path={COMMITTEE_SELECTION} element={<CommitteeSelection />} />
          <Route path={PAYMENTS} element={<Payments />} />
          {userLevel > 0 ? (
            <Route path={USER_MANAGEMENT} element={<UserManagement />} />
          ) : null}
        </Routes>
      </div>
    </React.Fragment>
  );
};

export default LoggedIn;