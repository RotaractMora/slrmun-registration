import { useNavigate } from "react-router-dom";
import { COMMITTEE_SELECTION } from "../constants/routes";

import Compressor from "compressorjs";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import app from "../firebase/base";

// firebase
import { update, ref as refDatabaseFunction } from "firebase/database";
import {
  ref as refStorageFunc,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

export const HandleSignIn = (email, password) => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      navigate(COMMITTEE_SELECTION);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export const uploadFile = (
  image,
  fetchedUserData,
  firebaseAuth,
  firebaseStorage,
  firebaseDb,
  setUploadProgress,
  setShowModal,
  uploadDirectory,
  uploadFieldName
) => {
  const current_uid = firebaseAuth.currentUser.uid;
  const upload_path =
    "/images/" + uploadDirectory + "/" + current_uid + "/" + image.name;
  const newImageRef = refStorageFunc(firebaseStorage, upload_path);
  const uploadTask = uploadBytesResumable(newImageRef, image);
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
      // Upload completed successfully,
      // delete the old image
      if (fetchedUserData[uploadFieldName + "_storage_path"]) {
        const oldImageRef = refStorageFunc(
          firebaseStorage,
          fetchedUserData[uploadFieldName + "_storage_path"]
        );
        deleteObject(oldImageRef)
          .then(() => {
            // File deleted successfully, firebaseAuth
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
          });
      }

      // now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const userRef = refDatabaseFunction(firebaseDb, "users/" + current_uid);
        const updateObj = {};
        updateObj[uploadFieldName] = downloadURL;
        updateObj[uploadFieldName + "_storage_path"] = upload_path;
        update(userRef, updateObj);
        setShowModal(false);
        setUploadProgress(0);
      });
    }
  );
};

export const compressAndUpload = (
  image,
  fetchedUserData,
  firebaseAuth,
  firebaseStorage,
  firebaseDb,
  setUploadProgress,
  setShowModal,
  uploadDirectory,
  uploadFieldName
) => {
  if (image.size / 1024 ** 2 > 1) {
    const quality = 1024 ** 2 / image.size;
    new Compressor(image, {
      quality,
      success(result) {
        uploadFile(
          result,
          fetchedUserData,
          firebaseAuth,
          firebaseStorage,
          firebaseDb,
          setUploadProgress,
          setShowModal,
          uploadDirectory,
          uploadFieldName
        );
      },
      error(err) {
        console.log(err.message);
      },
    });
  } else {
    // directly upload if the file size is small enough (<1MB)
    uploadFile(
      image,
      fetchedUserData,
      firebaseAuth,
      firebaseStorage,
      firebaseDb,
      setUploadProgress,
      setShowModal,
      uploadDirectory,
      uploadFieldName
    );
  }
};
