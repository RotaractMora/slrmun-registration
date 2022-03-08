export const BASE_URL = "/slrmun";

export const DEFAULT_FLAG = "/images/country-flags/default-flag.jpg";

export const PAYMENTS_UPLOAD_DIRECTORY = "/images/payment-slips";
export const PAYMENTS_FIELD_NAME = "payment_slip";
export const PROFILE_PICTURE_UPLOAD_DIRECTORY = "/images/profile-pictures";
export const PROFILE_PICTURE_FIELD_NAME = "profile_picture";
export const FPS_UPLOAD_DIRECTORY = "fps";
export const FPS_FIELD_NAME = "fps";

export const USERS_DOC_NAME = "users";
export const COMMITTEES_DOC_NAME = "committees";
export const FPS_DOC_NAME = "fps_submissions";

export const GENERAL_USER_LEVEL = 0;
export const COMMITTEE_CHAIR_USER_LEVEL = 1;
export const ADMIN_USER_LEVEL = 2;
export const DEVELOPER_USER_LEVEL = 3;

export const REQUEST_INJECTION_GOOGLE_SHEET_LINK =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR842RlySebWiztfLWsIspZnShUfc110NHrXlzqJcrIZOhWT02y2zLEdLUQEwlpGjvcO8pqSJN5TvGa/pub?output=csv";
export const GOOGLE_SHEET_GIDS = {
  sochum: 0,
  unhrc: 1780546441,
  unicef: 930751806,
  unsc: 1626549081,
  ipc: 1359865796,
};

export const committeeIdToCommitteeNameMap = {
  0: "sochum",
  1: "unhrc",
  2: "unicef",
  3: "unsc",
  4: "ipc",
};
