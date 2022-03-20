import React, { useEffect, useState } from "react";

import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  makeStyles,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";

import styles from "./styles";
import { DateTimePicker } from "@mui/lab";
import { update } from "firebase/database";

const useStyles = makeStyles(styles);

const Settings = ({
  fetchedSettings,
  settings,
  setSettings,
  settingsRef,
  metaData,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const fileFormats = metaData.file_formats;

  const handleChange = (bubbled, changed) => {
    const newSettings = JSON.parse(JSON.stringify(settings));
    if (changed === "time") {
      newSettings.due_timestamp = bubbled.getTime();
    } else if (changed === "accepting") {
      newSettings.accepting_submissions = bubbled.target.checked;
    } else if (changed === "formats") {
      if (newSettings.accepting_formats) {
        if (newSettings.accepting_formats.includes(bubbled)) {
          const spliceIndex = newSettings.accepting_formats.indexOf(bubbled);
          newSettings.accepting_formats.splice(spliceIndex, 1);
        } else {
          newSettings.accepting_formats.push(bubbled);
        }
      } else {
        newSettings.accepting_formats = [bubbled];
      }
    }
    setSettings(newSettings);
  };

  const handleSave = () => {
    update(settingsRef, settings);
  };

  const handleCancel = () => {
    setSettings(JSON.parse(JSON.stringify(fetchedSettings)));
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.h1}>
        Settings
      </Typography>
      <Typography variant="h2">Foreign Policy Statements</Typography>
      <table>
        <tbody>
          <tr>
            <td>Accepting Submissions</td>
            <td>
              <Switch
                checked={settings ? settings.accepting_submissions : false}
                onChange={(e) => handleChange(e, "accepting")}
                color="primary"
              />
            </td>
          </tr>
          <tr>
            <td>Accepting Formats</td>
            <td>
              <FormGroup row>
                {fileFormats.map((format, key) => (
                  <FormControlLabel
                    key={key}
                    control={
                      <Checkbox
                        color="primary"
                        checked={
                          settings
                            ? settings.accepting_formats
                              ? settings.accepting_formats.includes(format)
                              : false
                            : false
                        }
                        onChange={() => handleChange(format, "formats")}
                        name={format}
                      />
                    }
                    label={format}
                  />
                ))}
              </FormGroup>
            </td>
          </tr>
          <tr>
            <td>Submission Deadline</td>
            <td>
              {settings ? (
                <DateTimePicker
                  value={new Date(settings.due_timestamp)}
                  onChange={(value) => handleChange(value, "time")}
                  renderInput={(params) => <TextField {...params} />}
                />
              ) : (
                "unavailable"
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <div className={classes.btn_container}>
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          disabled={
            JSON.stringify(fetchedSettings) === JSON.stringify(settings)
          }
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.btn}
          disabled={
            JSON.stringify(fetchedSettings) === JSON.stringify(settings)
          }
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Settings;
