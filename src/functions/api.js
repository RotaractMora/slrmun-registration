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
  firebaseStorage,
  setUploadProgress,
  setShowModal,
  uploadDirectory,
  objectTreeToFieldName,
  uploadFieldName,
  uploadRef,
  updateRef,
  updateData
) => {
  const uploadTask = uploadBytesResumable(uploadRef, image);
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
      switch (snapshot.state) {
        case "paused":
          break;
        case "running":
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
      // Check if an old image existed. If so, check if the storage_path exists, then delete the old image
      let insideObject = fetchedUserData;
      for (let int = 0; int < objectTreeToFieldName.length; int++) {
        const path = objectTreeToFieldName[int];
        if (insideObject[path]) {
          insideObject = insideObject[path];
        }
      }
      if (insideObject) {
        if (insideObject[uploadFieldName]) {
          if (insideObject[uploadFieldName].storage_path) {
            // Before that, must check if the new file name is the same as the old file
            // When a file with the same name is uploaded, firebase will automatially replace the old file with the new one
            // Hence, we must check if the new file name is different from the old name.
            //    If they are different, proceed the deletion process
            //    else (file names are equal), skip the deletion process
            if (
              !insideObject[uploadFieldName].storage_path.endsWith(image.name)
            ) {
              const oldImageRef = refStorageFunc(
                firebaseStorage,
                insideObject[uploadFieldName].storage_path
              );
              deleteObject(oldImageRef)
                .then(() => {
                  // File deleted successfully, firebaseAuth
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }
        }
      }

      // now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const fileObject = {};
        fileObject.timestamp = parseInt(Date.now());
        const upload_path =
          uploadDirectory + "/" + fetchedUserData.user_id + "/" + image.name;
        fileObject.public_url = downloadURL;
        fileObject.storage_path = upload_path;

        updateData[uploadFieldName] = fileObject;

        update(updateRef, updateData);
        setShowModal(false);
        setUploadProgress(0);
      });
    }
  );
};

export const compressAndUpload = (
  image,
  fetchedUserData,
  firebaseStorage,
  setUploadProgress,
  setShowModal,
  uploadDirectory,
  objectTreeToFieldName,
  uploadFieldName,
  uploadRef,
  updateRef,
  updateData
) => {
  if (image.size / 1024 ** 2 > 1) {
    const quality = 1024 ** 2 / image.size;
    new Compressor(image, {
      quality,
      success(result) {
        uploadFile(
          result,
          fetchedUserData,
          firebaseStorage,
          setUploadProgress,
          setShowModal,
          uploadDirectory,
          objectTreeToFieldName,
          uploadFieldName,
          uploadRef,
          updateRef,
          updateData
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
      firebaseStorage,
      setUploadProgress,
      setShowModal,
      uploadDirectory,
      objectTreeToFieldName,
      uploadFieldName,
      uploadRef,
      updateRef,
      updateData
    );
  }
};
