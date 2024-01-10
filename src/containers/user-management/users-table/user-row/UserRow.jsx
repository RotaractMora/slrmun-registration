import React, { Fragment, useRef, useState } from "react";

//styles
import {
  makeStyles,
  useTheme,
  TableRow,
  TableCell,
  Button,
  FormControlLabel,
  Switch,
  Typography,
  Table,
  TableBody,
} from "@material-ui/core";
import styles from "./styles";

// components
import defaultUserIcon from "../../../../assets/images/default-user-icon.png";
import whatsAppIcon from "../../../../assets/images/whatsapp-icon.png";
import {
  ADMIN_USER_LEVEL,
  COMMITTEES_DOC_NAME,
  COMMITTEE_CHAIR_USER_LEVEL,
  DEVELOPER_USER_LEVEL,
  USERS_DOC_NAME,
} from "../../../../constants/general";

import { getDatabase, update, ref } from "firebase/database";
import TwoButtonModal from "../../../../components/two-button-modal/TwoButtonModal";
import { timeStampToString } from "../../../../functions/general";
import {
  getUserLevelAccordingToSwitches,
  getWhatsAppNumber,
} from "../../../../functions/userManagement";
import GroupedDropDown from "../../../../components/grouped-drop-down/GroupedDropDown";

const useStyles = makeStyles(styles);

const UserRow = ({
  userData,
  onChange,
  index,
  fetchedUserData,
  countriesData,
  committeesData,
  countryData,
  usersData,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  const chairSwitchRef = useRef();
  const adminSwitchRef = useRef();

  const handleApprovalChange = (e) => {
    onChange({
      ...userData,
      admin_approved: e.target.checked,
    });
    // if the country is available, and the admin is approving, must check if other people have requested the same country
    // Then must give a feedback that there are other people who requested that country and their names.
    // Must also show who requested it first and had deposited the payment SPECIALLY
    if (e.target.checked !== fetchedUserData.admin_approved) {
      if (countryData.availability && e.target.checked) {
        // finds the users who has requested it
        const userIdToTimeStamp = {};
        for (const key in countryData.requests) {
          userIdToTimeStamp[countryData.requests[key]] = key;
        }

        const requestedList = [];
        const paymentsList = [];
        for (const index in usersData) {
          if (Object.hasOwnProperty.call(usersData, index)) {
            const user = usersData[index];
            if (countryData.requests) {
              if (Object.values(countryData.requests).includes(user.user_id)) {
                if (user.payment_slip) {
                  paymentsList.push([
                    index,
                    user.name,
                    timeStampToString(userIdToTimeStamp[user.user_id], 2),
                  ]);
                } else {
                  requestedList.push([
                    index,
                    user.name,
                    timeStampToString(userIdToTimeStamp[user.user_id], 2),
                  ]);
                }
              }
            }
          }
        }
        if (paymentsList.length > 0 || requestedList.length > 0) {
          setShowModal(true);
          setModalData([paymentsList, requestedList]);
        }
      }
    }
  };

  const handleSave = () => {
    const db = getDatabase();

    // Do any change only if the admin_approved value has been changed
    if (
      userData.admin_approved !== fetchedUserData.admin_approved ||
      userData.user_level !== fetchedUserData.user_level
    ) {
      if (userData.admin_approved !== fetchedUserData.admin_approved) {
        const countryRef = ref(
          db,
          COMMITTEES_DOC_NAME +
            "/" +
            userData.committee_id +
            "/countries/" +
            userData.country_id
        );

        // checks the country's availability and update it
        if (countryData.availability) {
          if (userData.admin_approved) {
            // reserve the country
            update(countryRef, {
              availability: 0,
              reserved_to: userData.user_id,
            });
            userData.country_reserved = true;
          } else {
            userData.country_reserved = false;
            // make the country available if it was reserved for this user. This will not happen if everything had gone correctly
            if (countryData.reserved_to === userData.user_id) {
              update(countryRef, { reserved_to: "" });
            }
          }
        } else {
          // if the country is unavailable and the admin is approving, must show that the user has not got the country
          if (userData.admin_approved) {
            alert(
              userData.name +
                " did not get the requested country because it has been reserved to someone else"
            );
          }

          // if the country is unavailable and the admin is unapproving
          if (!userData.admin_approved) {
            if (countryData.reserved_to === userData.user_id) {
              update(countryRef, { reserved_to: "", availability: 1 });
              userData.country_reserved = false;
            }
          }
        }
      }
      // update userData
      const userRef = ref(db, USERS_DOC_NAME + "/" + userData.user_id);
      update(userRef, userData);
    }
  };

  const handleCancel = () => {
    onChange(fetchedUserData);
  };


  function prefOrder(arr){
    if ( arr == undefined ){
      return (
        <div>
            <select defaultValue={"preference_order"}>
              <option disabled value="preference_order">--Preference Order--</option>
              <option disabled value="not_selected">Not yet selected</option>
            </select>
        </div>
      );
    } else {
      const tempArr = []
      for(let i=0;i<arr.length;i++){
        if (arr[i]==0){
          tempArr.push(`(${i+1}) UNGA4`);
        } else if (arr[i]==1){
          tempArr.push(`(${i+1}) UNSC`);
        } else if (arr[i]==2){
          tempArr.push(`(${i+1}) UNHRC`);
        } else if (arr[i]==3){
          tempArr.push(`(${i+1}) UNEP`);
        } else if (arr[i]==4){
          tempArr.push(`(${i+1}) UNCSW`);
        } else if (arr[i]==5){
          tempArr.push(`(${i+1}) IPC`);
        }
        //tempArr.push(" ");
      }
      return (
        <div>
          <select defaultValue={"preference_order"}>
            <option disabled value="preference_order">--Preference Order--</option>
            <option disabled value={tempArr[0]}>{tempArr[0]}</option>
            <option disabled value={tempArr[1]}>{tempArr[1]}</option>
            <option disabled value={tempArr[2]}>{tempArr[2]}</option>
            <option disabled value={tempArr[3]}>{tempArr[3]}</option>
            <option disabled value={tempArr[4]}>{tempArr[4]}</option>
            <option disabled value={tempArr[5]}>{tempArr[5]}</option>
          </select>
        </div>
      );
    }
  }



  return (
    <Fragment>
      {showModal && (modalData[0].length > 0 || modalData[1].length > 0) ? (
        <TwoButtonModal
          heading="User Approval"
          onProceed={() => setShowModal(false)}
          onCancel={() => {
            onChange({
              ...userData,
              admin_approved: false,
            });
            setShowModal(false);
          }}
        >
          {modalData[0] ? (
            <div>
              <Typography variant="body1">
                Other users who have made the payment and requested this country
              </Typography>
              <Table className={classes.table}>
                <TableBody>
                  {modalData[0].map((userData, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className={classes.smallTableCell}>
                          {userData[0]}
                        </TableCell>
                        <TableCell className={classes.smallTableCell}>
                          {userData[1]}
                        </TableCell>
                        <TableCell className={classes.smallTableCell}>
                          {userData[2]}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : null}
          {modalData[1] ? (
            <div>
              <Typography variant="body1">
                Other users who have requested the same country
              </Typography>
              <Table className={classes.table}>
                <TableBody>
                  {modalData[1].map((userData, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className={classes.smallTableCell}>
                          {userData[0]}
                        </TableCell>
                        <TableCell className={classes.smallTableCell}>
                          {userData[1]}
                        </TableCell>
                        <TableCell className={classes.smallTableCell}>
                          {userData[2]}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : null}
        </TwoButtonModal>
      ) : null}
      <TableRow>
        <TableCell rowSpan={3} className={classes.maxWidth300}>
          <TableCell className={classes.no_bottom_border}>
            {index + 1}
          </TableCell>
          <TableCell className={classes.no_bottom_border}>
            <img
              className={classes.profile_picture}
              src={
                userData.profile_picture
                  ? userData.profile_picture.public_url
                  : defaultUserIcon
              }
              alt={userData.name}
            ></img>
          </TableCell>
          <TableCell className={classes.no_bottom_border}>
            {userData.name}
          </TableCell>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          {userData.email}
        </TableCell>
        <TableCell>
          {prefOrder(userData.preference_list)}
        </TableCell>

        <TableCell className={classes.maxWidth200} align="center">
          {userData.mun_awards}
        </TableCell>
        <TableCell>
          <span className={classes.numberCell}>
            <a target="_blank" href={getWhatsAppNumber(userData.mobile_number) } rel= "noopener noreferrer">
              <img src={whatsAppIcon} alt = "whatsAppIcon"/>
            </a>
            {userData.mobile_number}
          </span>
        </TableCell>
        <TableCell className={classes.maxWidth200}>
          {userData.institute}
        </TableCell>
        <TableCell className={classes.maxWidth200}>
          {userData.residence_address + " " + userData.residence_country}
        </TableCell>
        <TableCell className={classes.maxWidth200}>
          {userData.rotaractor ? userData.rotaract_club : "None"}
        </TableCell>
        <TableCell className={classes.maxWidth200}>
          {userData.interactor ? userData.interact_club : "None"}
        </TableCell>
      </TableRow>
      <TableRow className={classes.admin_area_row}>
        <TableCell
          className={classes.committeeCell}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {(userData.committee_id != undefined) ? (
            <GroupedDropDown
              selected={committeesData[userData.committee_id]}
              groupLabel="Committee"
              data={committeesData}
              categorized={false}
              onSelectionChange={(index) =>   onChange({ ...userData, committee_id: index,})} 
            />
          ) : (
            <GroupedDropDown
              selected={{ text: "None", id: -1 }}
              groupLabel="Committee"
              data={committeesData}
              categorized={false}
              onSelectionChange={(index) =>   onChange({ ...userData, committee_id: index,})} 
            />
          )}
          {(userData.committee_id != undefined)? (
            <GroupedDropDown
              selected={countryData}
              groupLabel="Country"
              data={countriesData}
              categorized={true}
              onSelectionChange={(index) =>   onChange({ ...userData, country_id: index,})} 
            />
          ) : (
            <GroupedDropDown
              selected={{ text: "None", id: -1 }}
              groupLabel="Country"
              onSelectionChange={(index) =>   onChange({ ...userData, committee_id: index,})} 
            />
          )}
          <span>{userData.mun_experience}</span>
        </TableCell>
        
        <TableCell>
        </TableCell>
        <TableCell className={classes.maxWidth200} align="center">
          {userData.mun_experience}
        </TableCell>
        <TableCell>
          {timeStampToString(userData.registered_timestamp, 2)}
        </TableCell>
        <TableCell>
          <FormControlLabel
            control={
              <Switch
                checked={userData.admin_approved == 1}
                onChange={handleApprovalChange}
                color="primary"
                name="gilad"
              />
            }
            label="Approval"
          />
        </TableCell>
        <TableCell>
          <FormControlLabel
            control={
              <Switch
                inputRef={chairSwitchRef}
                checked={
                  userData.user_level === COMMITTEE_CHAIR_USER_LEVEL ||
                  userData.user_level === DEVELOPER_USER_LEVEL
                }
                onChange={(e) => {
                  const chairSwitchChecked = e.target.checked;
                  const adminSwitchChecked = adminSwitchRef.current.checked;

                  const newUserLevel = getUserLevelAccordingToSwitches(
                    chairSwitchChecked,
                    adminSwitchChecked
                  );
                  onChange({
                    ...userData,
                    user_level: newUserLevel,
                  });
                }}
                color="primary"
                name="gilad"
              />
            }
            label="Chairperson"
          />
          <FormControlLabel
            control={
              <Switch
                inputRef={adminSwitchRef}
                checked={
                  userData.user_level === ADMIN_USER_LEVEL ||
                  userData.user_level === DEVELOPER_USER_LEVEL
                }
                onChange={(e) => {
                  const chairSwitchChecked = chairSwitchRef.current.checked;
                  const adminSwitchChecked = e.target.checked;

                  const newUserLevel = getUserLevelAccordingToSwitches(
                    chairSwitchChecked,
                    adminSwitchChecked
                  );
                  onChange({
                    ...userData,
                    user_level: newUserLevel,
                  });
                }}
                color="primary"
                name="gilad"
              />
            }
            label="Admin"
          />
        </TableCell>
        <TableCell>
          {userData.payment_slip ? (
            <div className={classes.flexColumn}>
              <span>
                <img
                  className={classes.bank_slip_img}
                  src={userData.payment_slip.public_url}
                  alt="bank slip"
                />
              </span>
              <Typography variant="caption">
                {timeStampToString(userData.payment_slip.timestamp, 2)}
              </Typography>
            </div>
          ) : (
            "No payments made"
          )}
        </TableCell>
        <TableCell className={classes.flexColumn}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleSave}
            className={classes.btn}
            disabled={
              JSON.stringify(userData) === JSON.stringify(fetchedUserData)
            }
          >
            Save
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            className={classes.btn}
            disabled={
              JSON.stringify(userData) === JSON.stringify(fetchedUserData)
            }
          >
            Cancel
          </Button>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default UserRow;
