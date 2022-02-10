import React, { useState } from "react";

import { Routes, Route } from "react-router-dom";
import {
  USER_PROFILE,
  COMMITTEE_SELECTION,
  PAYMENTS,
  USER_MANAGEMENT,
} from "../../../constants/routes";

import { makeStyles, useTheme } from "@material-ui/core";
import styles from "./styles";

import Header from "../../../components/header/Header";
import SidePanel from "../../../components/side-panel/SidePanel";
import UserProfile from "../../../containers/user-profile/UserProfile";
import CommitteeSelection from "../../../containers/commitee-selection/CommitteeSelection";
import Payments from "../../../containers/payments/Payments";
import UserManagement from "../../../containers/user-management/UserManagement";

const useStyles = makeStyles(styles);

const LoggedIn = () => {
  const [cross, setCross] = useState(false);

  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <React.Fragment>
      <Header cross={cross} setCross={(setValue) => setCross(setValue)} />
      <div className={classes.body}>
        <SidePanel cross={cross} />
        <Routes>
          <Route path={USER_PROFILE} element={<UserProfile />} />
          <Route path={COMMITTEE_SELECTION} element={<CommitteeSelection />} />
          <Route path={PAYMENTS} element={<Payments />} />
          <Route path={USER_MANAGEMENT} element={<UserManagement />} />
        </Routes>
      </div>
    </React.Fragment>
  );
};

export default LoggedIn;
