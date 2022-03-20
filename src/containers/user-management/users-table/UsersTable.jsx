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
import { processCommitteesToDropDown } from "../../../functions/user";

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

  const [processedCommittees, processedCountries] =
    processCommitteesToDropDown(committeesData);

  const categorizedCountries = {};
  for (const committeeId in processedCountries) {
    if (Object.hasOwnProperty.call(processedCountries, committeeId)) {
      const committee = processedCountries[committeeId];
      categorizedCountries[committeeId] = {};
      categorizedCountries[committeeId].reserved = [];
      categorizedCountries[committeeId].available = [];

      for (const countryId in committee) {
        if (Object.hasOwnProperty.call(committee, countryId)) {
          const country = committee[countryId];
          if (country.available)
            categorizedCountries[committeeId].available.push({
              ...country,
              countryId,
            });
          else
            categorizedCountries[committeeId].reserved.push({
              ...country,
              countryId,
            });
        }
      }
    }
  }

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
                Committee&nbsp;|&nbsp;Country&nbsp;|&nbsp;MUN XP
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
              <div className={classes.grayBg}>
                Chairperson&nbsp;|&nbsp;Admin
              </div>
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
              countriesData={categorizedCountries[userData.committee_id]}
              committeesData={Object.values(processedCommittees)}
              countryData={
                userData && processedCountries
                  ? userData.committee_id &&
                    userData.country_id &&
                    processedCountries
                    ? processedCountries[userData.committee_id][
                        userData.country_id
                      ]
                    : {}
                  : null
              }
              usersData={usersData}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
