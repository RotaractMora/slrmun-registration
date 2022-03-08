import {
  ADMIN_USER_LEVEL,
  COMMITTEE_CHAIR_USER_LEVEL,
  DEVELOPER_USER_LEVEL,
  GENERAL_USER_LEVEL,
} from "../constants/general";
import { timeStampToString } from "./general";
import {
  getCommitteeAndCountryFromNumbers,
  getCurrentStatusFromNumber,
  userLevelToString,
} from "./user";

export const getWhatsAppNumber = (number) => {
  //remove the spaces
  const spacelessNum = number.replace(/\s/g, "");
  const whatsAppPrefix = "https://wa.me/";
  // Sri Lankans
  // general case 0715942246
  if (spacelessNum.length === 10 && spacelessNum[0] === "0") {
    return (
      whatsAppPrefix + "94" + spacelessNum.substr(1, spacelessNum.length - 1)
    );
  }
  // +94715942246
  if (spacelessNum[0] === "+") {
    return whatsAppPrefix + spacelessNum.substr(1, spacelessNum.length - 1);
  }

  // 94715942246
  return whatsAppPrefix + spacelessNum;
};

export const getUserLevelAccordingToSwitches = (
  chairSwitchChecked,
  adminSwitchChecked
) => {
  let newUserLevel;
  if (adminSwitchChecked && chairSwitchChecked) {
    newUserLevel = DEVELOPER_USER_LEVEL;
  } else if (chairSwitchChecked) {
    newUserLevel = COMMITTEE_CHAIR_USER_LEVEL;
  } else if (adminSwitchChecked) {
    newUserLevel = ADMIN_USER_LEVEL;
  } else {
    newUserLevel = GENERAL_USER_LEVEL;
  }

  return newUserLevel;
};

export const usersObjectToCSV = (usersData, committeesData) => {
  const returnArr = [];
  for (let i = 0; i < usersData.length; i++) {
    const user = JSON.parse(JSON.stringify(usersData[i]));

    // change required data
    if (user.admin_approved) user.admin_approved = "Approved";
    else user.admin_approved = "Not approved";
    const [committee, country] = getCommitteeAndCountryFromNumbers(
      user.committee_id,
      user.country_id,
      committeesData
    );
    user.committee = committee;
    user.country = country;
    if (user.country_reserved) user.country_reserved = "Reserved";
    else user.country_reserved = "Not reserved";

    if (user.payment_slip) {
      user.payment_slip_time = timeStampToString(
        user.payment_slip.timestamp,
        1
      );
      user.payment_slip_url = user.payment_slip.public_url;
    } else {
      user.payment_slip_time = "";
      user.payment_slip_url = "";
    }

    if (user.profile_picture) {
      user.profile_picture_url = user.profile_picture.public_url;
    } else {
      user.profile_picture_url = "";
    }

    user.current_status = getCurrentStatusFromNumber(user.current_status);
    if (user.interact_club === "") user.interact_club = "None";
    if (user.rotaract_club === "") user.rotaract_club = "None";
    user.user_level = userLevelToString(user.user_level);
    user.registered_time = timeStampToString(user.registered_timestamp, 1);
    if (user.fps)
      if (user.fps.file) user.fps = user.fps.file.public_url;
      else user.fps = "";
    else user.fps = "";

    // delete unwanted data
    delete user.payment_slip_storage_path;
    delete user.profile_picture_storage_path;
    delete user.committee_id;
    delete user.country_id;
    delete user.interactor;
    delete user.rotaractor;
    delete user.payment_timestamp;
    delete user.registered_timestamp;
    delete user.payment_slip;
    delete user.profile_picture;

    //replace the commas with strings
    for (const key in user) {
      if (Object.hasOwnProperty.call(user, key)) {
        const value = user[key];
        if (typeof value === "string") {
          if (value.includes(",")) {
            user[key] = value.replaceAll(",", "-");
          }
        }
      }
    }

    const orderedUser = Object.keys(user)
      .sort()
      .reduce((object, key) => {
        object[key] = user[key];
        return object;
      }, {});

    const userRow = Object.values(orderedUser);
    returnArr.push(userRow);
  }
  // console.log(returnArr);
  return returnArr;
};
