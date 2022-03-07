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
  FPS_FIELD_NAME,
  FPS_UPLOAD_DIRECTORY,
  USERS_DOC_NAME,
} from "../../constants/general";
import { timeStampToString } from "../../functions/general";
import { uploadFile } from "../../functions/api";
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);

const FPSSubmission = ({
  firebaseDb,
  firebaseStorage,
  committee_id,
  fetchedUserData,
  current_uid,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [showModal, setShowModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [subTableData, setSubTableData] = useState({});
  const [subUserTableData, setUserSubTableData] = useState({});

  const fileUploadHandler = (e) => {
    const file = e.target.files[0];

    const upload_path =
      FPS_UPLOAD_DIRECTORY + "/" + fetchedUserData.user_id + "/" + file.name;
    const uploadRef = refStorage(firebaseStorage, upload_path);
    const updateRef = refDatabase(
      firebaseDb,
      "users/" + fetchedUserData.user_id + "/fps"
    );
    const updateData = {};

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

  const fetchFPSData = () => {
    // fetch common submission data
    const commonFpsRef = refDatabase(firebaseDb, FPS_DOC_NAME);
    onValue(commonFpsRef, (snapshot) => {
      const commonFpsData = snapshot.val();
      const submissionTableData = {
        ...subTableData,
        due_timestamp: commonFpsData.due_timestamps[committee_id],
        accepting_submissions:
          commonFpsData.accepting_submissions[committee_id],
        accepting_submission_formats:
          commonFpsData.accepting_submission_formats.join(" "),
      };
      setSubTableData(submissionTableData);
    });

    // fetch user specific submission data
    const userSpecificFpsRef = refDatabase(
      firebaseDb,
      USERS_DOC_NAME + "/" + current_uid + "/" + "fps"
    );
    onValue(userSpecificFpsRef, (snapshot) => {
      const userSpecificFpsData = snapshot.val();
      if (userSpecificFpsData) setUserSubTableData(userSpecificFpsData);
    });
  };

  useEffect(() => {
    fetchFPSData();
  }, []);

  let file_name = "";
  if (subUserTableData.file) {
    const storage_path = subUserTableData.file.storage_path;
    const path_arr = storage_path.split("/");
    file_name = path_arr[path_arr.length - 1];
  }
  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.h1}>
        Foreign Policy Statement Submission
      </Typography>
      <TableContainer component={Paper} style={{ margin: 20 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Submission Status</TableCell>
              <TableCell>
                {subUserTableData.file
                  ? "Submitted for grading"
                  : "Not Submitted"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Grading Status</TableCell>
              <TableCell>
                {subUserTableData.grade ? subUserTableData.grade : "Not graded"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Due Time</TableCell>
              <TableCell>
                {subTableData.due_timestamp
                  ? timeStampToString(subTableData.due_timestamp, 2)
                  : null}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Accepting Submissions</TableCell>
              <TableCell>
                {subTableData.accepting_submissions ? "Yes" : "No"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Submission Time</TableCell>
              <TableCell>
                {subUserTableData.file
                  ? subUserTableData.file.timestamp
                    ? timeStampToString(subUserTableData.file.timestamp, 2)
                    : "Not Submitted"
                  : "Not Submitted"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Accepted Submission Formats</TableCell>
              <TableCell>{subTableData.accepting_submission_formats}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Final Submission</TableCell>
              <TableCell
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {file_name !== "" ? (
                  <Typography>
                    <a
                      href={subUserTableData.file.public_url}
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
      ) : null}
    </div>
  );
};

export default FPSSubmission;
