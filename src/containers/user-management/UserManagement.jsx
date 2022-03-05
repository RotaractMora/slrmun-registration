import React, { useEffect, useState } from "react";

// firebase
import { onValue, ref } from "firebase/database";

// styling
import {
  makeStyles,
  useTheme,
  Typography,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import styles from "./styles";

// components
import UsersTable from "./users-table/UsersTable";

// other constants
import {
  USERS_DOC_NAME,
  COMMITTEES_DOC_NAME,
  GENERAL_USER_LEVEL,
  ADMIN_USER_LEVEL,
} from "../../constants/general";

const useStyles = makeStyles(styles);

const UserManagement = ({
  firebaseDatabase,
  committeesData,
  fetchedUserData,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [visibleUsersArr, setVisibleUsersArr] = useState([
    GENERAL_USER_LEVEL,
    ADMIN_USER_LEVEL,
  ]);

  const getVisibleUsers = (allUsers, userLevels) => {
    const newUsersData = [];
    if (userLevels) {
      for (let i = 0; i < allUsers.length; i++) {
        const userData = allUsers[i];
        if (userLevels.includes(userData.user_level)) {
          newUsersData.push(userData);
        }
      }
    }
    return newUsersData;
  };

  const visibleUsers = getVisibleUsers(fetchedUserData, visibleUsersArr);
  const [fetchedVisibleUsers, setFetchedVisibleUsers] = useState(visibleUsers);
  const [usersData, setUsersData] = useState(visibleUsers);

  // used to filter the users list by the switches
  const handleVisibility = (e, userLevel) => {
    const newVisibleUsersArr = JSON.parse(JSON.stringify(visibleUsersArr));
    if (e.target.checked) {
      newVisibleUsersArr.push(userLevel);
    } else {
      const index = newVisibleUsersArr.indexOf(userLevel);
      if (index > -1) {
        newVisibleUsersArr.splice(index, 1);
      }
    }

    setVisibleUsersArr(newVisibleUsersArr);
    const newUsersData = getVisibleUsers(fetchedUserData, newVisibleUsersArr);
    setUsersData(newUsersData);
    setFetchedVisibleUsers(newUsersData);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.h1}>
        User Management
      </Typography>
      <div className={classes.filter_container}>
        <FormControlLabel
          control={
            <Switch
              checked={visibleUsersArr.includes(GENERAL_USER_LEVEL)}
              onChange={(e) => {
                handleVisibility(e, GENERAL_USER_LEVEL);
              }}
              color="primary"
              name="general_users"
            />
          }
          label="Delegates"
        />
        <FormControlLabel
          control={
            <Switch
              checked={visibleUsersArr.includes(ADMIN_USER_LEVEL)}
              onChange={(e) => {
                handleVisibility(e, ADMIN_USER_LEVEL);
              }}
              color="primary"
              name="admins"
            />
          }
          label="Admins"
        />
      </div>
      <UsersTable
        usersData={usersData}
        setUsersData={setUsersData}
        fetchedUserData={fetchedVisibleUsers}
        committeesData={committeesData}
      />
    </div>
  );
};

export default UserManagement;
