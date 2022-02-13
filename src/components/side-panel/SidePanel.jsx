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
  USER_LOGIN,
} from "../../constants/routes";

// styles
import { makeStyles, useTheme } from "@material-ui/core";
import styles from "./styles";

// components
import ListItem from "./list-item/ListItem";

const useStyles = makeStyles(styles);

const SidePanel = ({ cross, setShowSidePanel }) => {
  // styles
  const theme = useTheme();
  const classes = useStyles(theme);
  let body_class = classes.body;
  if (cross) {
    body_class = [classes.body, classes.body_in].join(" ");
  }

  // routing
  const navigate = useNavigate();
  const current_path = useLocation().pathname;

  // state
  const [userLevel, setUserLevel] = useState(null);

  //firebase
  const auth = getAuth(app);
  const db = getDatabase(app);
  const { currentUser } = useContext(AuthContext);
  const current_uid = currentUser.uid;
  const userRef = ref(db, "users/" + current_uid);
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
    navigate(USER_LOGIN);
  };

  return (
    <div className={classes.root}>
      <div className={body_class}>
        <ListItem
          text={"Profile"}
          link={USER_PROFILE}
          active={current_path === USER_PROFILE}
          onClick={() => setShowSidePanel(false)}
        />
        <ListItem
          text={"Committee Selection"}
          link={COMMITTEE_SELECTION}
          active={current_path === COMMITTEE_SELECTION}
          onClick={() => setShowSidePanel(false)}
        />
        <ListItem
          text={"Payments"}
          link={PAYMENTS}
          active={current_path === PAYMENTS}
          onClick={() => setShowSidePanel(false)}
        />
        {userLevel > 0 ? (
          <ListItem
            text={"User Management"}
            link={USER_MANAGEMENT}
            active={current_path === USER_MANAGEMENT}
            onClick={() => setShowSidePanel(false)}
          />
        ) : null}
        <ListItem text={"Log out"} onClick={handleLogout} />
      </div>
    </div>
  );
};

export default SidePanel;
