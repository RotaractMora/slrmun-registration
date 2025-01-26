import React, { useState } from "react";
import { makeStyles, useTheme, Typography, Button } from "@material-ui/core";
import UploadIcon from "@mui/icons-material/Upload";
import styles from "./styles";

import LocalInstructions from "./local-instructions/LocalInstructions";
import ForeignInstructions from "./foreign-instructions/ForeignInstructions";
import CommitteeRegistrationStatus from "../../components/committee-registration-status/CommitteeRegistrationStatus";
import FileUploadModal from "../../components/file-upload-modal/FileUploadModal";

import { isSriLankan } from "../../functions/user";

const useStyles = makeStyles(styles);

const Payments = ({ fetchedUserData }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [showModal, setShowModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false); // State to track upload success

  const fileUploadHandler = async (e) => {
    try {
      const image = e.target.files?.[0] || e.dataTransfer?.files?.[0];
      if (!image) throw new Error("No file selected");

      // Prepare the file to send to the backend
      const formData = new FormData();
      formData.append("file", image);
      formData.append("email", fetchedUserData.email);

      // Send the file to the backend
      const response = await fetch("http://152.42.185.12:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Response Error:", await response.text());
        throw new Error("File upload failed");
      }

      const result = await response.json();
      console.log("File uploaded successfully:", result);

      setUploadProgress(100); // Update progress
      setUploadSuccess(true); // Mark upload as successful
      setShowModal(false); // Close the modal after success
    } catch (error) {
      console.error("File upload error:", error.message || error);
      setUploadProgress(0); // Reset progress on failure
      setUploadSuccess(false); // Ensure success status is reset
    }
  };

  const renderUploadButton = () =>
    fetchedUserData.payment_slip && uploadSuccess ? (
      <div className={classes.uploaded_image_container}>
        <img
          className={classes.bank_slip_img}
          src={fetchedUserData.payment_slip.public_url}
          alt="transaction-document"
        />
        <Typography variant="body2" color="primary">
          Upload successful!
        </Typography>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setShowModal(true)}
        >
          Change Image
        </Button>
      </div>
    ) : (
      <Button
        variant="contained"
        color="primary"
        startIcon={<UploadIcon />}
        onClick={() => setShowModal(true)}
      >
        {uploadSuccess ? "Change Image" : "Upload Image"}
      </Button>
    );

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.h1}>
        Payments
      </Typography>
      <div className={classes.container}>
        {isSriLankan(fetchedUserData.residence_country) ? (
          <LocalInstructions />
        ) : (
          <ForeignInstructions />
        )}
        <div className={classes.breaker}></div>
        {renderUploadButton()}
        <div className={classes.breaker}></div>
        <CommitteeRegistrationStatus fetchedUserData={fetchedUserData} />
      </div>
      {showModal && (
        <FileUploadModal
          onFileUpload={fileUploadHandler}
          closeModal={() => setShowModal(false)}
          progress={uploadProgress}
        />
      )}
    </div>
  );
};

export default Payments;
