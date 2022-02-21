import {
  ADMIN_USER_LEVEL,
  COMMITTEE_CHAIR_USER_LEVEL,
  DEVELOPER_USER_LEVEL,
  GENERAL_USER_LEVEL,
} from "../constants/general";

export const isSriLankan = (text) => {
  if (text) {
    const lowered_text = text.toLowerCase().trim();
    if (
      [
        "sl",
        "lk",
        "srilanka",
        "sri lanka",
        "sri-lanka",
        "srilankan",
        "sri lankan",
        "sri-lankan",
      ].includes(lowered_text)
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

// returns the tabs to show for a specific user level
// array format = [PROFILE, COMMITTEE_SELECTION, PAYMENTS, USER_MANAGEMENT]
export const getUserVisibilityArray = (userLevel) => {
  let visibilityArr = [];
  if (userLevel === GENERAL_USER_LEVEL) {
    visibilityArr = [true, true, true, false];
  } else if (userLevel === COMMITTEE_CHAIR_USER_LEVEL) {
    visibilityArr = [true, false, false, false];
  } else if (userLevel === ADMIN_USER_LEVEL) {
    visibilityArr = [true, true, true, true];
  } else if (userLevel === DEVELOPER_USER_LEVEL) {
    visibilityArr = [true, true, true, true];
  }
  return visibilityArr;
};
