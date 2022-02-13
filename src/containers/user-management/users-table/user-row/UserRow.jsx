import React, { Fragment } from "react";

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
  Button,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import styles from "./styles";

// components
import defaultUserIcon from "../../../../assets/images/default-user-icon.png";
import Dropdown from "./dropdown/Dropdown";

const useStyles = makeStyles(styles);

const UserRow = ({ userData, onChange, index }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

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
      <TableRow>
        <TableCell>
          <Dropdown label={"Committee"} />
        </TableCell>
        <TableCell>
          <Dropdown label={"Country"} />
        </TableCell>
        <TableCell>
          <FormControlLabel
            control={
              <Switch
                checked={userData.admin_approved}
                onChange={() =>
                  onChange({
                    ...userData,
                    admin_approved: !userData.admin_approved,
                  })
                }
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
                // onChange={handleChange}
                color="primary"
                name="gilad"
              />
            }
            label="Admin"
          />
        </TableCell>
        <TableCell>View image</TableCell>
        <TableCell>
          <TableRow>
            <TableCell className={classes.no_bottom_border}>
              <Button fullWidth variant="contained" color="primary">
                Save
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.no_bottom_border}>
              <Button fullWidth variant="outlined" color="secondary">
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
