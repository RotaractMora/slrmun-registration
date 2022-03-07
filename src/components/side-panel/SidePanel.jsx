import React, { useState, useEffect, useContext } from "react";

//firebase
import app from "../../firebase/base";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import { AuthContext } from "../../firebase/Auth";

// routing
import { useLocation, useNavigate } from "react-router-dom";
import {
  USER_PROFILE,
  COMMITTEE_SELECTION,
  PAYMENTS,
  USER_MANAGEMENT,
  FPS_SUBMISSION,
} from "../../constants/routes";

// styles
import { makeStyles, useTheme } from "@material-ui/core";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentIcon from "@mui/icons-material/Payment";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./styles";

// components
import ListItem from "./list-item/ListItem";

// other constants
import { USERS_DOC_NAME } from "../../constants/general";

// other functions
import { getUserVisibilityArray } from "../../functions/user";

const useStyles = makeStyles(styles);

const SidePanel = ({ cross, setShowSidePanel }) => {
  // state
  const [userLevel, setUserLevel] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  // styles
  const theme = useTheme();
  const classes = useStyles(theme);
  let body_class = classes.body;
  let backArrow_class = classes.backArrow;
  let root_class = classes.root;
  if (cross) {
    body_class = [body_class, classes.body_in].join(" ");
  }
  if (collapsed) {
    body_class = [body_class, classes.body_collapsed].join(" ");
    backArrow_class = [backArrow_class, classes.backArrow_collapsed].join(" ");
    root_class = [root_class, classes.root_collapsed].join(" ");
  }

  // routing
  const current_path = useLocation().pathname;
  //firebase
  const auth = getAuth(app);
  const db = getDatabase(app);
  const { currentUser } = useContext(AuthContext);
  const current_uid = currentUser.uid;
  const userRef = ref(db, USERS_DOC_NAME + "/" + current_uid);
  const fetch = () => {
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setUserLevel(data.user_level);
    });
  };

  //state management
  useEffect(() => {
    if (userLevel === null) {
      fetch();
    }
  }, []);

  // authentication
  const handleLogout = () => {
    auth.signOut();
  };
  const visibilityArray = getUserVisibilityArray(userLevel);
  return (
    <div className={root_class}>
      <div className={body_class}>
        <div className={classes.listItems}>
          {visibilityArray[0] ? (
            <ListItem
              text={"Profile"}
              DispIcon={AccountCircleIcon}
              link={USER_PROFILE}
              active={current_path === USER_PROFILE}
              collapsed={collapsed}
              onClick={() => setShowSidePanel(false)}
            />
          ) : null}
          {visibilityArray[1] ? (
            <ListItem
              text={"Committee Selection"}
              DispIcon={AccountBalanceIcon}
              link={COMMITTEE_SELECTION}
              active={current_path === COMMITTEE_SELECTION}
              collapsed={collapsed}
              onClick={() => setShowSidePanel(false)}
            />
          ) : null}
          {visibilityArray[2] ? (
            <ListItem
              text={"Payments"}
              DispIcon={PaymentIcon}
              link={PAYMENTS}
              active={current_path === PAYMENTS}
              collapsed={collapsed}
              onClick={() => setShowSidePanel(false)}
            />
          ) : null}
          {visibilityArray[3] ? (
            <ListItem
              text={"FPS Submission"}
              DispIcon={PaymentIcon}
              link={FPS_SUBMISSION}
              active={current_path === FPS_SUBMISSION}
              collapsed={collapsed}
              onClick={() => setShowSidePanel(false)}
            />
          ) : null}
          {visibilityArray[4] ? (
            <ListItem
              text={"User Management"}
              DispIcon={SupervisedUserCircleIcon}
              link={USER_MANAGEMENT}
              active={current_path === USER_MANAGEMENT}
              collapsed={collapsed}
              onClick={() => setShowSidePanel(false)}
            />
          ) : null}
          <ListItem
            text={"Log out"}
            DispIcon={LogoutIcon}
            collapsed={collapsed}
            onClick={handleLogout}
          />
        </div>
        <div className={classes.arrowContainer}>
          <div className={classes.backArrowBg}>
            <ArrowBackIosNewIcon
              className={backArrow_class}
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
