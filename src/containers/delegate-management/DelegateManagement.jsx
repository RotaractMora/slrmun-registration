import React, { useState, useEffect } from "react";

import { makeStyles, useTheme, Typography } from "@material-ui/core";
import styles from "./styles";

import DelegateTable from "./delegate-table/DelegateTable";
import SwitchSection from "./switch-section/SwitchSection";

import { filterVisibleUsersFromField } from "../../functions/userManagement";

const useStyles = makeStyles(styles);

const DelegateManagement = ({ committeesData, fetchedUserData }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [visibleCommitteesArr, setvisibleCommitteesArr] = useState([
    0, 1, 2, 3, 4,
  ]); // TODO: enumerate these

  const visibleUsers = filterVisibleUsersFromField(
    fetchedUserData,
    visibleCommitteesArr,
    "committee_id"
  );
  const [fetchedVisibleUsers, setFetchedVisibleUsers] = useState(visibleUsers);
  const [usersData, setUsersData] = useState(visibleUsers);

  useEffect(() => {
    const visibleUsers = filterVisibleUsersFromField(
      fetchedUserData,
      visibleCommitteesArr,
      "user_level"
    );
    setUsersData(visibleUsers);
    setFetchedVisibleUsers(visibleUsers);
  }, [fetchedUserData, visibleCommitteesArr]);

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.h1}>
        Delegate Management
      </Typography>
      <DelegateTable
        usersData={usersData}
        setUsersData={setUsersData}
        fetchedUserData={fetchedVisibleUsers}
        committeesData={committeesData}
      />
      <SwitchSection />
    </div>
  );
};

export default DelegateManagement;
