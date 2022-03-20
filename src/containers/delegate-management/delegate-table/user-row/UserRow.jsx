import React, { Fragment, useRef, useState } from "react";

//styles
import {
  makeStyles,
  useTheme,
  TableRow,
  TableCell,
  Button,
  TextField,
  TextareaAutosize,
} from "@material-ui/core";
import styles from "./styles";

// components
import defaultUserIcon from "../../../../assets/images/default-user-icon.png";
import whatsAppIcon from "../../../../assets/images/whatsapp-icon.png";

// functions
import { getWhatsAppNumber } from "../../../../functions/userManagement";
import { getCommitteeAndCountryFromNumbers } from "../../../../functions/user";
import { USERS_DOC_NAME } from "../../../../constants/general";
import { child, ref, set } from "firebase/database";

const useStyles = makeStyles(styles);

const UserRow = ({
  firebaseDatabase,
  userData,
  onChange,
  index,
  fetchedUserData,
  committeesData,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [notesExpanded, setNotesExpanded] = useState(false);
  const textAreaRef = useRef();

  const handleSave = () => {
    const userRef = ref(
      firebaseDatabase,
      USERS_DOC_NAME + "/" + userData.user_id
    );
    // update fps
    if (userData.fps) {
      const fpsGrade = userData.fps.grade;
      if (fetchedUserData.fps && fpsGrade) {
        if (fpsGrade !== fetchedUserData.fps.grade) {
          set(child(userRef, "fps/grade"), fpsGrade);
        }
      } else if (fpsGrade) {
        set(child(userRef, "fps/grade"), fpsGrade);
      }
    }

    // update final grade
    if (userData.conference) {
      const finalGrade = userData.conference.final_grade;
      if (fetchedUserData.conference && finalGrade) {
        if (finalGrade !== fetchedUserData.conference.final_grade) {
          set(child(userRef, "conference/final_grade"), finalGrade);
        }
      } else if (finalGrade) {
        set(child(userRef, "conference/final_grade"), finalGrade);
      }
    }

    // update notes
    if (userData.conference) {
      const notes = userData.conference.notes;
      if (notes !== undefined) {
        if (fetchedUserData.conference) {
          if (userData.conference.notes !== fetchedUserData.conference.notes) {
            set(child(userRef, "conference/notes"), notes);
          }
        } else {
          set(child(userRef, "conference/notes"), notes);
        }
      }
    }
  };

  const handleCancel = () => {
    onChange(JSON.parse(JSON.stringify(fetchedUserData)));
    textAreaRef.current.value = textAreaRef.current.value;
  };

  const onChangeHandler = (e) => {
    const newUserData = userData;
    if (e.target.id === "final_grade") {
      if (!newUserData.conference) newUserData.conference = { final_grade: 0 };
      newUserData.conference.final_grade = e.target.value;
      onChange(newUserData);
    } else if (e.target.id === "fps_grade") {
      if (!newUserData.fps) newUserData.fps = { grade: 0 };
      newUserData.fps.grade = e.target.value;
      onChange(newUserData);
    } else if (e.target.id === "notes") {
      if (!newUserData.conference) newUserData.conference = { notes: 0 };
      newUserData.conference.notes = e.target.value;
      onChange(newUserData);
    }
  };

  const [committee, country] = getCommitteeAndCountryFromNumbers(
    userData.committee_id,
    userData.country_id,
    committeesData
  );

  let fps_name = "No submissions yet";
  let fps_url;
  if (userData.fps) {
    if (userData.fps.file) {
      const storage_path_arr = userData.fps.file.storage_path.split("/");
      fps_name = storage_path_arr.splice(storage_path_arr.length - 1, 1);
      fps_url = userData.fps.file.public_url;
    }
  }

  let textareaClass = [classes.textArea, classes.textAreaHidden].join(" ");
  let notesCellClassName = [classes.notesCell, classes.notesCellHidden].join(
    " "
  );
  if (notesExpanded) {
    notesCellClassName = classes.notesCell;
    textareaClass = classes.textArea;
  }

  return (
    <Fragment>
      <TableRow>
        <TableCell rowSpan={3} className={classes.maxWidth300}>
          <TableCell className={classes.no_bottom_border}>
            {index + 1}
          </TableCell>
          <TableCell className={classes.no_bottom_border}>
            <img
              className={classes.profile_picture}
              src={
                userData.profile_picture
                  ? userData.profile_picture.public_url
                  : defaultUserIcon
              }
              alt={userData.name}
            ></img>
          </TableCell>
          <TableCell className={classes.no_bottom_border}>
            {userData.name}
          </TableCell>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{userData.email}</TableCell>
        <TableCell>
          <span className={classes.numberCell}>
            <a target="_blank" href={getWhatsAppNumber(userData.mobile_number)}>
              <img src={whatsAppIcon} />
            </a>
            {userData.mobile_number}
          </span>
        </TableCell>
        <TableCell className={classes.maxWidth200}>
          {userData.institute}
        </TableCell>
        <TableCell>{committee + " | " + country}</TableCell>
        <TableCell>
          <Button
            size="small"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSave}
            className={classes.btn}
            disabled={
              JSON.stringify(userData) === JSON.stringify(fetchedUserData)
            }
          >
            Save
          </Button>
        </TableCell>
      </TableRow>
      <TableRow className={classes.admin_area_row}>
        <TableCell className={classes.committeeCell}></TableCell>
        <TableCell>
          {userData.fps ? (
            <a href={fps_url} target="_blank" download>
              {fps_name}
            </a>
          ) : (
            fps_name
          )}
        </TableCell>
        <TableCell style={{ minWidth: "11em" }}>
          <TextField
            label="FPS&nbsp;Marks"
            id="fps_grade"
            variant="outlined"
            size="small"
            margin="normal"
            value={userData.fps ? userData.fps.grade : 0}
            onChange={onChangeHandler}
          />
        </TableCell>
        <TableCell>
          <TextField
            label="Overall&nbsp;Marks"
            id="final_grade"
            variant="outlined"
            size="small"
            margin="normal"
            value={userData.conference ? userData.conference.final_grade : 0}
            onChange={onChangeHandler}
          />
        </TableCell>
        <TableCell className={classes.flexColumn}>
          <Button
            size="small"
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            className={classes.btn}
            disabled={
              JSON.stringify(userData) === JSON.stringify(fetchedUserData)
            }
          >
            Cancel
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={notesCellClassName} colSpan={6}>
          <TextareaAutosize
            id="notes"
            className={textareaClass}
            onChange={onChangeHandler}
            value={userData.conference ? userData.conference.notes : ""}
            ref={textAreaRef}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.zeroHeight} colSpan={6} align="center">
          <span
            className={classes.expandButton}
            onClick={() => setNotesExpanded(!notesExpanded)}
          >
            Notes
          </span>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default UserRow;
