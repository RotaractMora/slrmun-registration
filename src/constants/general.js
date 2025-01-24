export const BASE_URL = "";

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
export const SETTINGS_DOC_NAME = "settings";
export const METADATA_DOC_NAME = "meta_data";

export const GENERAL_USER_LEVEL = 0;
export const COMMITTEE_CHAIR_USER_LEVEL = 1;
export const ADMIN_USER_LEVEL = 2;
export const DEVELOPER_USER_LEVEL = 3;

export const REQUEST_INJECTION_GOOGLE_SHEET_LINK =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS97_JoGrkvHAJvNu8yCmybfAXfteeQ1VzsyJG1JzcEU3N0EmomhFm4dQ4omZGXBX7UgphA6Oy986m1/pub?output=csv";
export const GOOGLE_SHEET_GIDS = {
  sochum: 0,
  unhrc: 361555657,
  unicef: 1528843080,
  unsc: 779663319,
  ipc: 1286864015,
};

export const committeeIdToCommitteeNameMap = {
  0: "sochum",
  1: "unhrc",
  2: "unicef",
  3: "unsc",
  4: "ipc",
};
