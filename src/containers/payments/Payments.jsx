import React, { useState } from "react";

// firebase
import { update, ref as refDatabaseFunction } from "firebase/database";
import {
  ref as refStorageFunc,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

import { makeStyles, useTheme, Typography, Button } from "@material-ui/core";
import UploadIcon from "@mui/icons-material/Upload";
import styles from "./styles";

import Compressor from "compressorjs";

import { isSriLankan } from "../../functions/user";

import LocalInstructions from "./local-instructions/LocalInstructions";
import ForeignInstructions from "./foreign-instructions/ForeignInstructions";
import CommitteeRegistrationStatus from "../../components/committee-registration-status/CommitteeRegistrationStatus";
import FileUploadModal from "../../components/file-upload-modal/FileUploadModal";

const useStyles = makeStyles(styles);

const Payments = ({
  fetchedUserData,
  firebaseAuth,
  firebaseDb,
  firebaseStorage,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  // state
  const [showModal, setShowModal] = useState(false);
  const [alertModalData, setAlertModalData] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFile = (image) => {
    // firebase
    const current_uid = firebaseAuth.currentUser.uid;
    const storageRef = refStorageFunc(
      firebaseStorage,
      "/images/payment-slips/" + current_uid + "/" + image.name
    );
    const uploadTask = uploadBytesResumable(storageRef, image);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const userRef = refDatabaseFunction(
            firebaseDb,
            "users/" + current_uid
          );
          update(userRef, { bank_slip: downloadURL });
          setShowModal(false);
          setUploadProgress(0);
        });
      }
    );
  };

  // handlers
  const fileUploadHandler = (e) => {
    const image = e.target.files[0];

    // if the image file is too large (>1MB), compress the image and then upload
    if (image.size / (1024 * 2) > 1) {
      const quality = (1024 * 2) / image.size;
      new Compressor(image, {
        quality,
        success(result) {
          uploadFile(result);
        },
        error(err) {
          console.log(err.message);
        },
      });
    } else {
      // directly upload if the file size is small enough (<1MB)
      uploadFile(image);
    }
  };

  // rendering components
  let instructions = <LocalInstructions />;
  if (!isSriLankan(fetchedUserData.residence_country)) {
    instructions = <ForeignInstructions />;
  }
  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.h1}>
        Payments
      </Typography>
      <div className={classes.container}>
        {instructions}
        <div className={classes.breaker}></div>
        {fetchedUserData.bank_slip ? (
          <div className={classes.uploaded_image_container}>
            <img
              className={classes.bank_slip_img}
              src={fetchedUserData.bank_slip}
              alt="transaction-document"
            />
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
            Upload Image
          </Button>
        )}
        <div className={classes.breaker}></div>
        <CommitteeRegistrationStatus fetchedUserData={fetchedUserData} />
      </div>
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

export default Payments;
