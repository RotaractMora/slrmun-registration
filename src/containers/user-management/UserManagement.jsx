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

const UserManagement = ({ firebaseDatabase, committeesData }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [usersData, setUsersData] = useState([]);
  const [fetchedUserData, setFetchedUsersData] = useState([]);
  const [fecthedVisibleUsers, setFetchedVisibleUsers] = useState([]);
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
      return newUsersData;
    }
  };

  // used to filter the users list by the switches
  const handleVisibility = (e, userLevel) => {
    const visibleUserLevels = JSON.parse(JSON.stringify(visibleUsersArr));
    if (e.target.checked) {
      visibleUserLevels.push(userLevel);
    } else {
      const index = visibleUserLevels.indexOf(userLevel);
      if (index > -1) {
        visibleUserLevels.splice(index, 1);
      }
    }

    setVisibleUsersArr(visibleUserLevels);
    const newUsersData = getVisibleUsers(fetchedUserData, visibleUserLevels);
    setUsersData(newUsersData);
    setFetchedVisibleUsers(newUsersData);
  };

  // fetches the all users data
  useEffect(() => {
    const usersRef = ref(firebaseDatabase, USERS_DOC_NAME);
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
      const visibleUsers = getVisibleUsers(dataArr, visibleUsersArr);
      setUsersData(visibleUsers);
      setFetchedVisibleUsers(visibleUsers);
    });
  }, []);

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
        fetchedUserData={fecthedVisibleUsers}
        committeesData={committeesData}
      />
    </div>
  );
};

export default UserManagement;
