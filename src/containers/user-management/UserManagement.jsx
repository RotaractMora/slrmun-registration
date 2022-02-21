import React, { useEffect, useState } from "react";

// firebase
import { onValue, ref, get } from "firebase/database";

// styling
import { makeStyles, useTheme, Typography, Button } from "@material-ui/core";
import styles from "../user-profile/styles";

// components
import UsersTable from "./users-table/UsersTable";

// other constants
import { USERS_DOC_NAME, COMMITTEES_DOC_NAME } from "../../constants/general";

const useStyles = makeStyles(styles);

const UserManagement = ({ firebaseDatabase }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [usersData, setUsersData] = useState([]);
  const [fethedUsersData, setFetchedUsersData] = useState();
  const [committeesData, setCommitteesData] = useState({});

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
