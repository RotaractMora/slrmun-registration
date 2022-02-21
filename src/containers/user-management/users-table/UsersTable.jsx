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
  fethedUsersData,
  committeesData,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const handleOnChange = (index, updatedUserData) => {
    const newUsersData = usersData.slice();
    newUsersData[index] = updatedUserData;
    setUsersData(newUsersData);
  };

  return (
    <TableContainer
      component={Paper}
      className={classes.root}
      style={{ maxHeight: "80vh" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow className={classes.table_head}>
            <TableCell align="center">User</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone&nbsp;Number</TableCell>
            <TableCell>Institue</TableCell>
            <TableCell>Resident Address</TableCell>
            <TableCell>Rotaractor</TableCell>
            <TableCell>Interactor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersData.map((userData, index) => (
            <UserRow
              key={index}
              userData={userData}
              index={index}
              onChange={(userData) => handleOnChange(index, userData)}
              fethedUserData={fethedUsersData ? fethedUsersData[index] : null}
              committeesData={committeesData}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
