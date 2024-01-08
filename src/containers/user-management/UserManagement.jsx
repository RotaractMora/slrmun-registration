import React, { useEffect, useState } from "react";

// styling
import {
  makeStyles,
  useTheme,
  Typography,
  Switch,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import styles from "./styles";

// components
import UsersTable from "./users-table/UsersTable";

// other constants
import {
  GENERAL_USER_LEVEL,
  ADMIN_USER_LEVEL,
  COMMITTEE_CHAIR_USER_LEVEL,
  DEVELOPER_USER_LEVEL,
} from "../../constants/general";
import { download_csv_file, timeStampToString } from "../../functions/general";
import {
  filterVisibleUsersFromField,
  usersObjectToCSV,
} from "../../functions/userManagement";
import { userLevelToString } from "../../functions/user";

const useStyles = makeStyles(styles);

const UserManagement = ({ committeesData, fetchedUserData }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [visibleUsersArr, setVisibleUsersArr] = useState([
    GENERAL_USER_LEVEL,
    COMMITTEE_CHAIR_USER_LEVEL,
    ADMIN_USER_LEVEL,
    DEVELOPER_USER_LEVEL,
  ]);

  const visibleUsers = filterVisibleUsersFromField(
    fetchedUserData,
    visibleUsersArr,
    "user_level"
  );
  const [fetchedVisibleUsers, setFetchedVisibleUsers] = useState(visibleUsers);
  const [usersData, setUsersData] = useState(visibleUsers);

  useEffect(() => {
    const visibleUsers = filterVisibleUsersFromField(
      fetchedUserData,
      visibleUsersArr,
      "user_level"
    );
    setUsersData(visibleUsers);
    setFetchedVisibleUsers(visibleUsers);
  }, [fetchedUserData, visibleUsersArr]);

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
    const newUsersData = filterVisibleUsersFromField(
      fetchedUserData,
      newVisibleUsersArr,
      "user_level"
    );
    setUsersData(newUsersData);
    setFetchedVisibleUsers(newUsersData);
  };

  const handleUserDataDownload = () => {
    const downloadData = usersObjectToCSV(fetchedVisibleUsers, committeesData);
    const timestamp = new Date().getTime();
    const downloadName =
      timeStampToString(timestamp, 1) +
      "-" +
      visibleUsersArr.map((level) => userLevelToString(level)).join("-") +
      ".csv";
    const headings = [
      "Approval",
      "Committee",
      "Country",
      "Country Reservation",
      "Current Status",
      "Email",
      "FPS URL",
      "Institue",
      "Interact Club",
      "Mobile number",
      "MUN awards",
      "MUN Experience",
      "Name",
      "Payment time",
      "Payment image",
      "Preference list",
      "Profile picture",
      "Registered time",
      "Resident address",
      "Resident Country",
      "Rotaract Club",
      "user_id",
      "User Level",
    ];
    download_csv_file(headings, downloadData, downloadName);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.h1}>
        User Management
      </Typography>
      <UsersTable
        usersData={usersData}
        setUsersData={setUsersData}
        fetchedUserData={fetchedVisibleUsers}
        committeesData={committeesData}
      />
      <div className={classes.controls_container}>
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
              checked={visibleUsersArr.includes(COMMITTEE_CHAIR_USER_LEVEL)}
              onChange={(e) => {
                handleVisibility(e, COMMITTEE_CHAIR_USER_LEVEL);
              }}
              color="primary"
              name="admins"
            />
          }
          label="Chairpersons"
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
        <FormControlLabel
          control={
            <Switch
              checked={visibleUsersArr.includes(DEVELOPER_USER_LEVEL)}
              onChange={(e) => {
                handleVisibility(e, DEVELOPER_USER_LEVEL);
              }}
              color="primary"
              name="admins"
            />
          }
          label="Developers"
        />
        <Button
          color="primary"
          variant="contained"
          startIcon={<FileDownloadIcon />}
          onClick={handleUserDataDownload}
        >
          Download Table
        </Button>
      </div>
    </div>
  );
};

export default UserManagement;
