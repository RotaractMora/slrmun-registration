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

const UserManagement = ({ firebaseDatabase }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [usersData, setUsersData] = useState([]);
  const [fethedUsersData, setFetchedUsersData] = useState();
  const [committeesData, setCommitteesData] = useState({});
  const [showUsersArr, setShowUsersArr] = useState([
    GENERAL_USER_LEVEL,
    ADMIN_USER_LEVEL,
  ]);

  const handleVisibility = (e, userLevel) => {
    const newShowUsers = JSON.parse(JSON.stringify(showUsersArr));
    if (e.target.checked) {
      newShowUsers.push(userLevel);
    } else {
      const index = newShowUsers.indexOf(userLevel);
      if (index > -1) {
        newShowUsers.splice(index, 1);
      }
    }
    setShowUsersArr(newShowUsers);

    const newUsersData = [];
    for (let i = 0; i < fethedUsersData.length; i++) {
      const userData = fethedUsersData[i];
      if (newShowUsers.includes(userData.user_level)) {
        newUsersData.push(userData);
      }
    }
    setUsersData(newUsersData);
  };

  useEffect(() => {
    const usersRef = ref(firebaseDatabase, USERS_DOC_NAME);
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const dataObj = {};
      let dataArr = [];
      for (const user_id in data) {
        if (Object.hasOwnProperty.call(data, user_id)) {
          const user = data[user_id];
          dataObj[user.registered_timestamp] = { ...user, user_id };
        }
      }
      dataArr = Object.values(dataObj);
      setUsersData(dataArr);
      setFetchedUsersData(dataArr);
    });

    const committeesRef = ref(firebaseDatabase, COMMITTEES_DOC_NAME);
    onValue(committeesRef, (snapshot) => {
      const data = snapshot.val();
      setCommitteesData(data);
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
              checked={showUsersArr.includes(GENERAL_USER_LEVEL)}
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
              checked={showUsersArr.includes(ADMIN_USER_LEVEL)}
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
        fethedUsersData={fethedUsersData}
        committeesData={committeesData}
      />
    </div>
  );
};

export default UserManagement;
