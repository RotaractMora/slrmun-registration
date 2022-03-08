// import { useGoogleApi } from "react-gapi";

// import {
//   REQUEST_INJECTION_API_KEY,
//   REQUEST_INJECTION_CLIENT_ID,
// } from "../constants/secrets";

// const gapi = useGoogleApi();

// export const makeApiCall = () => {
//   var params = {
//     // The ID of the spreadsheet to retrieve data from.
//     spreadsheetId: "1iAAdFKo1U-Z1QJ0bdJ-2SvKWGvHKs3g2lS_77LMYmi0", // TODO: Update placeholder value.

//     // The A1 notation of the values to retrieve.
//     range: "A1:B2", // TODO: Update placeholder value.

//     // How values should be represented in the output.
//     // The default render option is ValueRenderOption.FORMATTED_VALUE.
//     // valueRenderOption: "", // TODO: Update placeholder value.

//     // How dates, times, and durations should be represented in the output.
//     // This is ignored if value_render_option is
//     // FORMATTED_VALUE.
//     // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
//     // dateTimeRenderOption: "", // TODO: Update placeholder value.
//   };

//   var request = gapi.client.sheets.spreadsheets.values.get(params);
//   request.then(
//     function (response) {
//       // TODO: Change code below to process the `response` object:
//       console.log(response.result);
//     },
//     function (reason) {
//       console.error("error: " + reason.result.error.message);
//     }
//   );
// };

// const initClient = () => {
//   var API_KEY = REQUEST_INJECTION_API_KEY; // TODO: Update placeholder with desired API key.

//   var CLIENT_ID = REQUEST_INJECTION_CLIENT_ID; // TODO: Update placeholder with desired client ID.

//   // TODO: Authorize using one of the following scopes:
//   //   'https://www.googleapis.com/auth/drive'
//   //   'https://www.googleapis.com/auth/drive.file'
//   //   'https://www.googleapis.com/auth/drive.readonly'
//   //   'https://www.googleapis.com/auth/spreadsheets'
//   //   'https://www.googleapis.com/auth/spreadsheets.readonly'
//   var SCOPE = "https://www.googleapis.com/auth/spreadsheets";

//   gapi.client
//     .init({
//       apiKey: API_KEY,
//       clientId: CLIENT_ID,
//       scope: SCOPE,
//       discoveryDocs: [
//         "https://sheets.googleapis.com/$discovery/rest?version=v4",
//       ],
//     })
//     .then(function () {
//       gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
//       updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//     });
// };

// const handleClientLoad = () => {
//   gapi.load("client:auth2", initClient);
// };

// const updateSignInStatus = (isSignedIn) => {
//   if (isSignedIn) {
//     makeApiCall();
//   }
// };

// const handleSignInClick = (event) => {
//   gapi.auth2.getAuthInstance().signIn();
// };

// const handleSignOutClick = (event) => {
//   gapi.auth2.getAuthInstance().signOut();
// };
