import React from "react";

//styles
import {
  makeStyles,
  useTheme,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import styles from "./styles";
import UserRow from "./user-row/UserRow";

const useStyles = makeStyles(styles);

const UsersTable = ({
  usersData,
  setUsersData,
  fetchedUserData,
  committeesData,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  // used to change the original big all users data state when a single user is changed
  const handleOnChange = (index, updatedUserData) => {
    const newUsersData = usersData.slice();
    newUsersData[index] = updatedUserData;
    setUsersData(newUsersData);
  };

  return (
    <TableContainer
      component={Paper}
      className={classes.root}
      style={{ maxHeight: "75vh" }}
    >
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow className={classes.table_head}>
            <TableCell align="center">User</TableCell>
            <TableCell align="center">
              <div>Email</div>
              <div className={classes.grayBg}>
                Committee&nbsp;|&nbsp;Country&nbsp;|&nbsp;MUN
                XP&nbsp;|&nbsp;Approval
              </div>
            </TableCell>
            <TableCell align="center">
              <div>Phone&nbsp;Number</div>
              <div className={classes.grayBg}>Registered time</div>
            </TableCell>
            <TableCell align="center">
              <div>Institue</div>
              <div className={classes.grayBg}>Approval</div>
            </TableCell>
            <TableCell align="center">
              <div>Resident&nbsp;Address</div>
              <div className={classes.grayBg}>Admin</div>
            </TableCell>
            <TableCell align="center">
              <div>Rotaract</div>
              <div className={classes.grayBg}>Payment</div>
            </TableCell>
            <TableCell align="center">
              <div>Interact</div>
              <div className={classes.grayBg}>Update</div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersData.map((userData, index) => (
            <UserRow
              key={index}
              userData={userData}
              index={index}
              onChange={(userData) => handleOnChange(index, userData)}
              fetchedUserData={fetchedUserData ? fetchedUserData[index] : null}
              committeesData={committeesData}
              usersData={usersData}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
