import React, { useEffect, useState } from "react";

import {
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
} from "@material-ui/core";
import styles from "./styles";
import FileUploadModal from "../../components/file-upload-modal/FileUploadModal";
import { onValue, ref as refDatabase } from "firebase/database";
import { ref as refStorage } from "firebase/storage";

import {
  FPS_DOC_NAME,
  FPS_UPLOAD_DIRECTORY,
  USERS_DOC_NAME,
} from "../../constants/general";
import { timeStampToString } from "../../functions/general";
import { uploadFile } from "../../functions/api";

const useStyles = makeStyles(styles);

const FPSSubmission = ({
  firebaseDb,
  firebaseStorage,
  fetchedUserData,
  settings,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [showModal, setShowModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileUploadHandler = (e) => {
    let file = "";
    if (e.target.files)
      // buton click
      file = e.target.files[0];
    else if (e.dataTransfer)
      // drop files
      file = e.dataTransfer.files[0];

    const upload_path =
      FPS_UPLOAD_DIRECTORY + "/" + fetchedUserData.user_id + "/" + file.name;
    const uploadRef = refStorage(firebaseStorage, upload_path);
    const updateRef = refDatabase(
      firebaseDb,
      "users/" + fetchedUserData.user_id + "/fps"
    );
    const updateData = { grade: 0 };

    uploadFile(
      file,
      fetchedUserData,
      firebaseStorage,
      setUploadProgress,
      setShowModal,
      FPS_UPLOAD_DIRECTORY,
      ["fps"],
      "file",
      uploadRef,
      updateRef,
      updateData
    );
  };

  let lateSubmission = false;
  let submissionClassName = "";
  if (fetchedUserData.fps) {
    if (fetchedUserData.fps.file) {
      if (settings.due_timestamp < fetchedUserData.fps.file.timestamp) {
        submissionClassName = classes.red;
        lateSubmission = true;
      } else {
        submissionClassName = classes.green;
      }
    }
  }

  let file_name = "";
  if (fetchedUserData.fps) {
    if (fetchedUserData.fps.file) {
      const storage_path = fetchedUserData.fps.file.storage_path;
      const path_arr = storage_path.split("/");
      file_name = path_arr[path_arr.length - 1];
    }
  }
  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.h1}>
        Foreign Policy Statement Submission
      </Typography>
      {/*This is edited */}
      <div>
        <center><p>Ignore this page</p></center>
      </div>
      {/*<TableContainer component={Paper} style={{ margin: 20 }}>
        <Table>
          <TableBody>
            <TableRow className={submissionClassName}>
              <TableCell>Submission Status</TableCell>
              <TableCell>
                {fetchedUserData.fps
                  ? fetchedUserData.fps.file
                    ? lateSubmission
                      ? "Submission passed the due time"
                      : "Submitted for grading"
                    : "Not submitted"
                  : "Not submitted"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Grading Status</TableCell>
              <TableCell>
                {fetchedUserData.fps
                  ? fetchedUserData.fps.grade !== undefined
                    ? "Graded"
                    : "Not graded"
                  : "Not graded"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Marks</TableCell>
              <TableCell>
                {fetchedUserData.fps
                  ? fetchedUserData.fps.grade !== undefined
                    ? fetchedUserData.fps.grade
                    : "Not graded"
                  : "Not graded"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Due Time</TableCell>
              <TableCell>
                {settings.due_timestamp
                  ? timeStampToString(settings.due_timestamp, 2)
                  : null}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Accepting Submissions</TableCell>
              <TableCell>
                {settings.accepting_submissions ? "Yes" : "No"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Submission Time</TableCell>
              <TableCell>
                {fetchedUserData.fps
                  ? fetchedUserData.fps.file
                    ? fetchedUserData.fps.file.timestamp
                      ? timeStampToString(fetchedUserData.fps.file.timestamp, 2)
                      : "Not Submitted"
                    : "Not Submitted"
                  : "Not Submitted"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Accepted Submission Formats</TableCell>
              <TableCell>{settings.accepting_formats.join(" ")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Final Submission</TableCell>
              <TableCell
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {file_name !== "" ? (
                  <Typography>
                    <a
                      href={fetchedUserData.fps.file.public_url}
                      target="_blank"
                      download={file_name}
                    >
                      {file_name}
                    </a>
                  </Typography>
                ) : null}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShowModal(!showModal)}
                >
                  {file_name === "" ? "Add Submission" : "Edit Submission"}
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
                </TableContainer>
      {showModal ? (
        <FileUploadModal
          onFileUpload={fileUploadHandler}
          closeModal={() => setShowModal(false)}
          progress={uploadProgress}
        />
      ) : null} */}
    </div>
  );
};

export default FPSSubmission;
