import React, { useEffect, useState } from "react";

// firebase
import { onValue, ref } from "firebase/database";

// styling
import { makeStyles, useTheme, Typography } from "@material-ui/core";
import styles from "../user-profile/styles";

// components
import UsersTable from "./users-table/UsersTable";

// other constants
import { USERS_DOC_NAME } from "../../constants/general";

const useStyles = makeStyles(styles);

const UserManagement = ({ firebaseDatabase }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const usersRef = ref(firebaseDatabase, USERS_DOC_NAME);
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const dataArr = [];
      for (const user_id in data) {
        if (Object.hasOwnProperty.call(data, user_id)) {
          const user = data[user_id];
          dataArr.push({ ...user, user_id });
        }
      }
      setUsersData(dataArr);
    });
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.h1}>
        User Management
      </Typography>
      <UsersTable
        usersData={usersData}
        setUsersData={(newUsersData) => {
          console.log("Triggered");
          console.log("newUsersData: ", newUsersData);
          console.log("usersData: ", usersData);
          setUsersData(newUsersData);
          console.log("Set");
        }}
      />
    </div>
  );
};

export default UserManagement;
