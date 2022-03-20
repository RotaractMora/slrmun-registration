import {
  makeStyles,
  useTheme,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import React from "react";
import styles from "./styles";
import UserRow from "./user-row/UserRow";

const useStyles = makeStyles(styles);

const DelegateTable = ({
  firebaseDatabase,
  usersData,
  setUsersData,
  fetchedUsersData,
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
            <TableCell align="center">Delegate</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">
              <div>Phone&nbsp;Number</div>
              <div className={classes.grayBg}>FPS&nbsp;Submission</div>
            </TableCell>
            <TableCell align="center">
              <div>Institue</div>
              <div className={classes.grayBg}>FPS&nbsp;Marks</div>
            </TableCell>
            <TableCell align="center">
              <div>Committee&nbsp;|&nbsp;Country</div>
              <div className={classes.grayBg}>Overall&nbsp;Marks</div>
            </TableCell>
            <TableCell align="center">Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersData.map((userData, index) => (
            <UserRow
              key={index}
              firebaseDatabase={firebaseDatabase}
              userData={userData}
              index={index}
              onChange={(userData) => handleOnChange(index, userData)}
              fetchedUserData={
                fetchedUsersData ? fetchedUsersData[index] : null
              }
              committeesData={committeesData}
              usersData={usersData}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DelegateTable;
