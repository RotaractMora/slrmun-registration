import React, { Fragment } from "react";

//styles
import {
  makeStyles,
  useTheme,
  TableRow,
  TableCell,
  Button,
  FormControlLabel,
  Switch,
  Typography,
} from "@material-ui/core";
import styles from "./styles";

// components
import defaultUserIcon from "../../../../assets/images/default-user-icon.png";
import Dropdown from "./dropdown/Dropdown";
import {
  PAYMENTS_FIELD_NAME,
  USERS_DOC_NAME,
} from "../../../../constants/general";
import { getDatabase, update, ref } from "firebase/database";

const useStyles = makeStyles(styles);

const UserRow = ({
  userData,
  onChange,
  index,
  fethedUserData,
  committeesData,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const handleSave = () => {
    const db = getDatabase();
    const userRef = ref(db, USERS_DOC_NAME + "/" + userData.user_id);
    update(userRef, userData);
  };

  const handleCancel = () => {
    onChange(fethedUserData);
  };

  return (
    <Fragment>
      <TableRow>
        <TableCell rowSpan={3}>
          <TableRow>
            <TableCell className={classes.no_bottom_border}>
              {index + 1}
            </TableCell>
            <TableCell className={classes.no_bottom_border}>
              <img
                className={classes.profile_picture}
                src={
                  userData.profile_picture
                    ? userData.profile_picture
                    : defaultUserIcon
                }
                alt={userData.name}
              ></img>
            </TableCell>
            <TableCell className={classes.no_bottom_border}>
              {userData.name}
            </TableCell>
          </TableRow>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{userData.email}</TableCell>
        <TableCell>{userData.mobile_number}</TableCell>
        <TableCell>{userData.institute}</TableCell>
        <TableCell>{userData.residence_address}</TableCell>
        <TableCell>{userData.rotaract_club}</TableCell>
        <TableCell>{userData.interact_club}</TableCell>
      </TableRow>
      <TableRow className={classes.admin_area_row}>
        <TableCell>
          <Typography variant="body1">
            {committeesData !== {} && userData.committee_id
              ? committeesData[userData.committee_id].short_name
              : "None"}
          </Typography>
          {/* <Dropdown
            label={
              committeesData !== {} && userData.committee_id
                ? committeesData[userData.committee_id].short_name
                : "None"
            }
          /> */}
        </TableCell>
        <TableCell>
          <Typography variant="body1">
            {committeesData !== {} &&
            userData.committee_id &&
            userData.country_id
              ? committeesData[userData.committee_id].countries[
                  userData.country_id
                ].name
              : "None"}
          </Typography>
          {/* <Dropdown
            label={
              committeesData !== {} &&
              userData.committee_id &&
              userData.country_id
                ? committeesData[userData.committee_id].countries[
                    userData.country_id
                  ].name
                : "None"
            }
          /> */}
        </TableCell>
        <TableCell>
          <FormControlLabel
            control={
              <Switch
                checked={userData.admin_approved}
                onChange={(e) => {
                  onChange({
                    ...userData,
                    admin_approved: e.target.checked,
                  });
                }}
                color="primary"
                name="gilad"
              />
            }
            label="Approval"
          />
        </TableCell>
        <TableCell>
          <FormControlLabel
            control={
              <Switch
                checked={userData.user_level}
                onChange={(e) => {
                  let newUserLevel;
                  if (userData.user_level === 0) {
                    newUserLevel = 2;
                  } else {
                    newUserLevel = 0;
                  }
                  onChange({
                    ...userData,
                    user_level: newUserLevel,
                  });
                }}
                color="primary"
                name="gilad"
              />
            }
            label="Admin"
          />
        </TableCell>
        <TableCell>
          {userData[PAYMENTS_FIELD_NAME] ? (
            <img
              className={classes.bank_slip_img}
              src={userData[PAYMENTS_FIELD_NAME]}
              alt="bank slip"
            />
          ) : (
            "No payments made"
          )}
        </TableCell>
        <TableCell>
          <TableRow>
            <TableCell className={classes.no_bottom_border}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={
                  JSON.stringify(userData) === JSON.stringify(fethedUserData)
                }
              >
                Save
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.no_bottom_border}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
                disabled={
                  JSON.stringify(userData) === JSON.stringify(fethedUserData)
                }
              >
                Cancel
              </Button>
            </TableCell>
          </TableRow>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default UserRow;
