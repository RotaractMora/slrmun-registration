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

export const getUserRegistrationStatus = (
  userData,
  paymentsFieldName,
  countryData,
  theme
) => {
  /* Registratsion status:
   * 6: Registered for a committee; country reserved for another delegate
   * 5: Registered for a committee; Payment made, Admin approved
   * 4: Not regitered for a committee; Payment made, Admin approved
   * 3: Not regitered for a committee; Payment made, Not admin approved
   * 2: Registered for a committee; Payment made, Not admin approved
   * 1: Registered for a committee; No payment made, Not admin approved
   * 0: Not regitered for a committee; No payment made, Not admin approved
   */

  if (countryData)
    if (
      countryData.availability === 0 &&
      countryData.reserved_to !== userData.user_id
    )
      // 6: Registered for a committee; country reserved for another delegate
      return [
        theme.palette.error.main,
        "Your requested country has been reserved to another registrant. Please select another",
        6,
      ];

  if (
    // 5: Registered for a committee; Payment made, Admin approved
    userData.admin_approved &&
    userData.committee_id !== undefined &&
    userData.country_id !== undefined &&
    userData[paymentsFieldName]
  )
    return [theme.palette.success.main, "You are all set!", 5];

  if (
    // 4: Not regitered for a committee; Payment made, Admin approved
    userData.admin_approved &&
    userData.committee_id === undefined &&
    userData.country_id === undefined &&
    userData[paymentsFieldName]
  )
    return [
      theme.palette.yellow.main,
      "Please register for a committee and a country",
      4,
    ];

  if (
    // 3: Not regitered for a committee; Payment made, Not admin approved
    !userData.admin_approved &&
    userData.committee_id === undefined &&
    userData.country_id === undefined &&
    userData[paymentsFieldName]
  )
    return [
      theme.palette.yellow.main,
      "Please request a committee and a country",
      3,
    ];

  if (
    // 2: Registered for a committee; Payment made, Not admin approved
    !userData.admin_approved &&
    userData.committee_id !== undefined &&
    userData.country_id !== undefined &&
    userData[paymentsFieldName]
  )
    return [
      theme.palette.yellow.main,
      "Please wait for admin approval to confirm your request",
      2,
    ];

  if (
    // 1: Registered for a committee; No payment made, Not admin approved
    !userData.admin_approved &&
    userData.committee_id !== undefined &&
    userData.country_id !== undefined &&
    !userData[paymentsFieldName]
  )
    return [
      theme.palette.orange.main,
      "Please make the payment and wait for admin approval to confirm your request",
      1,
    ];

  if (
    // 0: Not regitered for a committee; No payment made, Not admin approved
    !userData.admin_approved &&
    userData.committee_id === undefined &&
    userData.country_id === undefined &&
    !userData[paymentsFieldName]
  )
    return [
      theme.palette.error.main,
      "Please request a committee and a country",
      0,
    ];

  return [theme.palette.error.main, "Error, Please contact the admin", 0];
};

export const userLevelToString = (userLevel) => {
  if (userLevel === 0) return "Delegate";
  if (userLevel === 1) return "Committee Chairperson";
  if (userLevel === 2) return "Admin";
  if (userLevel === 3) return "Developer";
  return "Undefined User Level";
};

export const getCommitteeAndCountryFromNumbers = (
  committee_id,
  country_id,
  committeesData
) => {
  let committee = "None";
  let country = "None";
  if (committee_id) committee = committeesData[committee_id].short_name;
  if (committee_id && country_id)
    country = committeesData[committee_id].countries[country_id].name;

  return [committee, country];
};

export const getCurrentStatusFromNumber = (number) => {
  if (parseInt(number) === 0) return "School Student";
  if (parseInt(number) === 1) return "University Student";
  if (parseInt(number) === 2) return "Employeed";
  return "Undefined currentStatusNumber";
};
