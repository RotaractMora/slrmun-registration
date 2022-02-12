import { useNavigate } from "react-router-dom";
import { COMMITTEE_SELECTION } from "../constants/routes";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import app from "../firebase/base";

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
