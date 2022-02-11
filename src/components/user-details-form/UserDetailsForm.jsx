import React, { useState, useEffect } from "react";

import {
  makeStyles,
  useTheme,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@material-ui/core";
import styles from "./styles";

const useStyles = makeStyles(styles);

const UserDetailsForm = ({ userData, setUserData, getPassword }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [sriLankan, setSriLankan] = useState(false);

  const isSriLankan = (text) => {
    if (text) {
      const lowered_text = text.toLowerCase().trim();
      if (
        lowered_text === "srilanka" ||
        lowered_text === "sri lanka" ||
        lowered_text === "sri lanka" ||
        lowered_text === "sri lankan" ||
        lowered_text === "sri lankan" ||
        lowered_text === "sri-lankan"
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (isSriLankan(userData.residence_country)) {
      setSriLankan(true);
    } else {
      setSriLankan(false);
    }
  }, [userData]);

  return (
    <div>
      <TextField
        id="name"
        label="Name"
        required
        fullWidth
        variant="outlined"
        margin="normal"
        value={userData.name ? userData.name : ""}
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
      />
      {getPassword ? (
        <div className={classes.inputPair}>
          <TextField
            id="password"
            label="Password"
            required
            InputProps={{
              className: [classes.marginR, classes.input].join(" "),
            }}
            variant="outlined"
            margin="normal"
            value={userData.password ? userData.password : ""}
            type="password"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <TextField
            id="confirm_password"
            label="Confirm Password"
            required
            InputProps={{
              className: [classes.marginL, classes.input].join(" "),
            }}
            variant="outlined"
            margin="normal"
            value={userData.confirm_password ? userData.confirm_password : ""}
            type="password"
            onChange={(e) =>
              setUserData({ ...userData, confirm_password: e.target.value })
            }
          />
        </div>
      ) : null}
      <TextField
        id="email"
        label="Email"
        required
        fullWidth
        variant="outlined"
        margin="normal"
        value={userData.email ? userData.email : ""}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <div className={classes.inputPair}>
        <TextField
          id="mobile_number"
          label="Mobile Number"
          required
          InputProps={{
            className: [classes.marginR, classes.input].join(" "),
          }}
          variant="outlined"
          margin="normal"
          value={userData.mobile_number ? userData.mobile_number : ""}
          onChange={(e) =>
            setUserData({ ...userData, mobile_number: e.target.value })
          }
        />
        <TextField
          id="mun_experience"
          label="MUN Experience (years)"
          required
          InputProps={{
            className: [classes.marginL, classes.input].join(" "),
          }}
          type="number"
          variant="outlined"
          margin="normal"
          value={
            userData.mun_experience ? parseInt(userData.mun_experience) : 0
          }
          onChange={(e) =>
            setUserData({ ...userData, mun_experience: e.target.value })
          }
        />
      </div>
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Current Status</FormLabel>
          <RadioGroup
            aria-label="Current Status"
            name="current_status"
            row
            className={classes.group}
            value={userData.current_status ? userData.current_status : "0"}
            onChange={(e) => {
              setUserData({ ...userData, current_status: e.target.value });
            }}
          >
            <FormControlLabel
              value="0"
              control={<Radio color="primary" />}
              label="School Student"
            />
            <FormControlLabel
              value="1"
              control={<Radio color="primary" />}
              label="University Student"
            />
            <FormControlLabel
              value="2"
              control={<Radio color="primary" />}
              label="Employed"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className={classes.inputPair}>
        <TextField
          id="institute"
          label="Institute"
          required
          InputProps={{
            className: [classes.marginR, classes.input].join(" "),
          }}
          variant="outlined"
          margin="normal"
          value={userData.institute ? userData.institute : ""}
          onChange={(e) =>
            setUserData({ ...userData, institute: e.target.value })
          }
        />
        <TextField
          id="residence_country"
          label="Residence Country"
          required
          InputProps={{
            className: [classes.marginL, classes.input].join(" "),
          }}
          variant="outlined"
          margin="normal"
          value={userData.residence_country ? userData.residence_country : ""}
          onChange={(e) =>
            setUserData({ ...userData, residence_country: e.target.value })
          }
        />
      </div>
      {sriLankan ? (
        <TextField
          id="residence_address"
          label="Residence Address"
          fullWidth
          variant="outlined"
          margin="normal"
          value={userData.residence_address ? userData.residence_address : ""}
          onChange={(e) =>
            setUserData({ ...userData, residence_address: e.target.value })
          }
        />
      ) : null}
      <div className={classes.inputPair}>
        <FormControlLabel
          checked={userData.rotaractor ? userData.rotaractor : false}
          onChange={(e) =>
            setUserData({
              ...userData,
              rotaractor: e.target.checked,
            })
          }
          control={<Checkbox color="primary" id="rotaractor" />}
          label="I am a Rotaractor"
        />
        {userData.rotaractor ? (
          <TextField
            id="rotaract_club"
            label="Rotaract Club"
            InputProps={{
              className: [classes.marginL, classes.input].join(" "),
            }}
            variant="outlined"
            margin="normal"
            value={userData.rotaract_club ? userData.rotaract_club : ""}
            onChange={(e) =>
              setUserData({ ...userData, rotaract_club: e.target.value })
            }
          />
        ) : null}
      </div>
      <div className={classes.inputPair}>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              id="interactor"
              checked={userData.interactor ? userData.interactor : false}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  interactor: e.target.checked,
                })
              }
            />
          }
          label="I am an Interactor"
        />
        {userData.interactor ? (
          <TextField
            id="interact_club"
            label="Interact Club"
            InputProps={{
              className: [classes.marginL, classes.input].join(" "),
            }}
            variant="outlined"
            margin="normal"
            value={userData.interact_club ? userData.interact_club : ""}
            onChange={(e) =>
              setUserData({ ...userData, interact_club: e.target.value })
            }
          />
        ) : null}
      </div>
    </div>
  );
};

export default UserDetailsForm;
