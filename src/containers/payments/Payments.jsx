import React, { useState } from "react";

import { makeStyles, useTheme, Typography, Button } from "@material-ui/core";
import UploadIcon from "@mui/icons-material/Upload";
import styles from "./styles";

import { compressAndUpload } from "../../functions/api";
import { isSriLankan } from "../../functions/user";

import LocalInstructions from "./local-instructions/LocalInstructions";
import ForeignInstructions from "./foreign-instructions/ForeignInstructions";
import CommitteeRegistrationStatus from "../../components/committee-registration-status/CommitteeRegistrationStatus";
import FileUploadModal from "../../components/file-upload-modal/FileUploadModal";

import {
  PAYMENTS_FIELD_NAME,
  PAYMENTS_UPLOAD_DIRECTORY,
} from "../../constants/general";

import { ref as refStorage } from "firebase/storage";
import { ref as refDatabase } from "firebase/database";

const useStyles = makeStyles(styles);

const Payments = ({
  fetchedUserData,
  firebaseDb,
  firebaseStorage,
  committeesData,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  // state
  const [showModal, setShowModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // handlers
  const fileUploadHandler = (e) => {
    const image = e.target.files[0];
    const upload_path =
      PAYMENTS_UPLOAD_DIRECTORY +
      "/" +
      fetchedUserData.user_id +
      "/" +
      image.name;
    const uploadRef = refStorage(firebaseStorage, upload_path);
    const updateRef = refDatabase(
      firebaseDb,
      "users/" + fetchedUserData.user_id
    );
    const updateData = {};
    // if the image file is too large (>1MB), compress the image and then upload
    const uploadFieldName = PAYMENTS_FIELD_NAME;

    compressAndUpload(
      image,
      fetchedUserData,
      firebaseStorage,
      setUploadProgress,
      setShowModal,
      PAYMENTS_UPLOAD_DIRECTORY,
      [],
      uploadFieldName,
      uploadRef,
      updateRef,
      updateData
    );
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
        {fetchedUserData.payment_slip ? (
          <div className={classes.uploaded_image_container}>
            <img
              className={classes.bank_slip_img}
              src={fetchedUserData.payment_slip.public_url}
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
        <CommitteeRegistrationStatus
          fetchedUserData={fetchedUserData}
          countryData={
            fetchedUserData.committee_id && fetchedUserData.country_id
              ? committeesData[fetchedUserData.committee_id].countries[
                  fetchedUserData.country_id
                ]
              : undefined
          }
        />
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
