import React, { useState, useEffect, useContext } from "react";

import { ref, update } from "firebase/database";
import { compressAndUpload } from "../../functions/api";
import { AuthContext } from "../../firebase/Auth";

import { makeStyles, Typography, useTheme } from "@material-ui/core";
import styles from "./styles";

import DefaultUserIcon from "../../assets/images/default-user-icon.png";
import EditImage from "../../assets/images/edit-image.png";
import UserDetailsForm from "../../components/user-details-form/UserDetailsForm";
import ButtonPanel from "../../components/button-panel/ButtonPanel";
import FileUploadModal from "../../components/file-upload-modal/FileUploadModal";

import {
  PROFILE_PICTURE_FIELD_NAME,
  PROFILE_PICTURE_UPLOAD_DIRECTORY,
  USERS_DOC_NAME,
} from "../../constants/general";

const useStyles = makeStyles(styles);

const UserProfile = ({ fetchedUserData, firebaseDb, firebaseStorage }) => {
  // styling
  const theme = useTheme();
  const classes = useStyles(theme);

  //states
  const [enableButtons, setEnableButtons] = useState(false);
  const [userData, setUserData] = useState(fetchedUserData);
  const [showModal, setShowModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // firebase
  const { currentUser } = useContext(AuthContext);
  const current_uid = currentUser.uid;
  const userRef = ref(firebaseDb, USERS_DOC_NAME + "/" + current_uid);

  // button pannel functions
  const updateEnability = (fetchedObject, currentObject) => {
    if (JSON.stringify(fetchedObject) === JSON.stringify(currentObject)) {
      setEnableButtons(false);
    } else {
      setEnableButtons(true);
    }
  };
  const save = () => {
    update(userRef, userData);
  };
  const cancel = () => {
    setUserData(fetchedUserData);
  };
  // Profile picture upload function
  const fileUploadHandler = (e) => {
    const image = e.target.files[0];
    // if the image file is too large (>1MB), compress the image and then upload
    compressAndUpload(
      image,
      fetchedUserData,
      firebaseStorage,
      firebaseDb,
      setUploadProgress,
      setShowModal,
      PROFILE_PICTURE_UPLOAD_DIRECTORY,
      PROFILE_PICTURE_FIELD_NAME
    );
  };

  // state management
  useEffect(() => {
    setUserData(fetchedUserData);
  }, [fetchedUserData]);
  useEffect(() => {
    updateEnability(fetchedUserData, userData);
  }, [userData]);

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.h1}>
        Profile
      </Typography>
      <div className={classes.container}>
        <img
          className={classes.profile_img}
          src={
            fetchedUserData[PROFILE_PICTURE_FIELD_NAME]
              ? fetchedUserData[PROFILE_PICTURE_FIELD_NAME]
              : DefaultUserIcon
          }
        />
        <img
          className={classes.img_overlay}
          src={EditImage}
          onClick={() => setShowModal(true)}
        />
        <UserDetailsForm userData={userData} setUserData={setUserData} />
        <ButtonPanel enabled={enableButtons} onSave={save} onCancel={cancel} />
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

export default UserProfile;
