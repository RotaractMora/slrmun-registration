import React, { useState, useEffect } from "react";

import { makeStyles, useTheme, Typography } from "@material-ui/core";
import styles from "./styles";

import DelegateTable from "./delegate-table/DelegateTable";
import SwitchSection from "./switch-section/SwitchSection";

import { filterVisibleUsersFromField } from "../../functions/userManagement";

const useStyles = makeStyles(styles);

const DelegateManagement = ({
  firebaseDatabase,
  committeesData,
  fetchedUsersData,
  userData,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [visibleCommitteesArr, setvisibleCommitteesArr] = useState([
    userData.committee_id,
  ]);
  const visibleUsers = filterVisibleUsersFromField(
    fetchedUsersData,
    visibleCommitteesArr,
    "committee_id"
  );
  const [fetchedVisibleUsers, setFetchedVisibleUsers] = useState(
    JSON.parse(JSON.stringify(visibleUsers))
  );
  const [usersData, setUsersData] = useState(
    JSON.parse(JSON.stringify(visibleUsers))
  );

  useEffect(() => {
    const visibleUsers = filterVisibleUsersFromField(
      fetchedUsersData,
      visibleCommitteesArr,
      "committee_id"
    );
    setUsersData(JSON.parse(JSON.stringify(visibleUsers)));
    setFetchedVisibleUsers(JSON.parse(JSON.stringify(visibleUsers)));
  }, [fetchedUsersData, visibleCommitteesArr]);

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.h1}>
        Delegate Management
      </Typography>
      <DelegateTable
        firebaseDatabase={firebaseDatabase}
        usersData={usersData}
        setUsersData={setUsersData}
        fetchedUsersData={fetchedVisibleUsers}
        committeesData={committeesData}
      />
      <SwitchSection />
    </div>
  );
};

export default DelegateManagement;
