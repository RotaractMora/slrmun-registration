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
import { get, onValue, ref } from "firebase/database";
import { FPS_DOC_NAME, USERS_DOC_NAME } from "../../constants/general";
import { timeStampToString } from "../../functions/general";

const useStyles = makeStyles(styles);

const FPSSubmission = ({ firebaseDb, committee_id, current_uid }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [showModal, setShowModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [subTableData, setSubTableData] = useState({});
  const [subUserTableData, setUserSubTableData] = useState({});

  const fileUploadHandler = (e) => {
    const image = e.target.files[0];
    // uploadFile(
    //   image,
    //   fetchedUserData,
    //   firebaseStorage,
    //   firebaseDb,
    //   currentUser,
    //   setUploadProgress,
    //   setShowModal,
    //   uploadDirectory,
    //   uploadFieldName,
    //   uploadTimestampeFieldName
    // );
  };

  const fetchFPSData = () => {
    // fetch common submission data
    const commonFpsRef = ref(firebaseDb, FPS_DOC_NAME);
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
    const userSpecificFpsRef = ref(
      firebaseDb,
      USERS_DOC_NAME + "/" + current_uid + "/" + "fps"
    );
    onValue(userSpecificFpsRef, (snapshot) => {
      const userSpecificFpsData = snapshot.val();
      console.log(userSpecificFpsData);
      if (userSpecificFpsData) setUserSubTableData(userSpecificFpsData);
    });
  };

  useEffect(() => {
    fetchFPSData();
  }, []);

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
                {Object.keys(subUserTableData).length > 0
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
                  ? timeStampToString(subTableData.due_timestamp, 1)
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
                {subUserTableData.submission_timestamp
                  ? timeStampToString(subUserTableData.submission_timestamp, 1)
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
                <Typography>[File]</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShowModal(!showModal)}
                >
                  Upload Document
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
