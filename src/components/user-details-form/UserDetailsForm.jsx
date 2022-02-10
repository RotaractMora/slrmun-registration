import React from "react";

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

const UserDetailsForm = ({ userData, setUserData }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Name"
        fullWidth
        variant="outlined"
        margin="normal"
        value={userData.name}
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
      />
      <TextField
        id="outlined-basic"
        label="Email"
        fullWidth
        variant="outlined"
        margin="normal"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <div className={classes.inputPair}>
        <TextField
          id="outlined-basic"
          label="Mobile Number"
          InputProps={{
            className: [classes.marginR, classes.input].join(" "),
          }}
          variant="outlined"
          margin="normal"
          value={userData.mobile_number}
          onChange={(e) =>
            setUserData({ ...userData, mobile_number: e.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="MUN Experience (years)"
          InputProps={{
            className: [classes.marginL, classes.input].join(" "),
          }}
          type="number"
          variant="outlined"
          margin="normal"
          value={userData.mun_experience}
          onChange={(e) =>
            setUserData({ ...userData, mun_experience: e.target.value })
          }
        />
      </div>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">
          Current Status
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={userData.current_status}
        >
          <FormControlLabel
            value={0}
            control={
              <Radio
                color="primary"
                onClick={() =>
                  setUserData({
                    ...userData,
                    current_status: 0,
                  })
                }
              />
            }
            label="School Student"
          />
          <FormControlLabel
            value={1}
            control={
              <Radio
                color="primary"
                onClick={() =>
                  setUserData({
                    ...userData,
                    current_status: 1,
                  })
                }
              />
            }
            label="Uniersity Student"
          />
          <FormControlLabel
            value={2}
            control={
              <Radio
                color="primary"
                onClick={() =>
                  setUserData({
                    ...userData,
                    current_status: 2,
                  })
                }
              />
            }
            label="Employeed"
          />
        </RadioGroup>
      </FormControl>
      <div className={classes.inputPair}>
        <TextField
          id="outlined-basic"
          label="Institute"
          InputProps={{
            className: [classes.marginR, classes.input].join(" "),
          }}
          variant="outlined"
          margin="normal"
          value={userData.institute}
          onChange={(e) =>
            setUserData({ ...userData, institute: e.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="Residence Country"
          InputProps={{
            className: [classes.marginL, classes.input].join(" "),
          }}
          variant="outlined"
          margin="normal"
          value={userData.residence_country}
          onChange={(e) =>
            setUserData({ ...userData, residence_country: e.target.value })
          }
        />
      </div>
      <TextField
        id="outlined-basic"
        label="Residence Address"
        fullWidth
        variant="outlined"
        margin="normal"
        value={userData.residence_address}
        onChange={(e) =>
          setUserData({ ...userData, residence_address: e.target.value })
        }
      />
      <div className={classes.inputPair}>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={userData.rotaractor}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  rotaractor: e.target.checked,
                })
              }
            />
          }
          label="I am a Rotaractor"
        />
        {userData.rotaractor ? (
          <TextField
            id="outlined-basic"
            label="Rotaract Club"
            InputProps={{
              className: [classes.marginL, classes.input].join(" "),
            }}
            variant="outlined"
            margin="normal"
            value={userData.rotaract_club}
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
              checked={userData.interactor}
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
            id="outlined-basic"
            label="Interact Club"
            InputProps={{
              className: [classes.marginL, classes.input].join(" "),
            }}
            variant="outlined"
            margin="normal"
            value={userData.interact_club}
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
