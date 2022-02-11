// import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  //   salt = bcrypt.genSalt(6);
  //   const hashed = bcrypt.hash(password, salt);
  //   return hashed;
  return password;
};

export const validateEmail = (email) => {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    return true;
  } else {
    return false;
  }
};

export const validatePassword = (password) => {
  if (password.length < 6) {
    return false;
  } else {
    return true;
  }
};

export const validateField = (value) => {
  if (value == null) {
    return false;
  }
  if (value.length <= 0) {
    return false;
  }
  if (value == undefined) {
    return false;
  } else {
    return true;
  }
};

export const comparePasswords = (
  password,
  confirmPassword,
  userData,
  setUserData
) => {
  if (password == confirmPassword) {
    return true;
  } else {
    setUserData({ ...userData, password: "", confirm_password: "" });
    return false;
  }
};
