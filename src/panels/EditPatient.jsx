//Import features from libraries
import React, { useState } from "react";
import axios from "axios";
import {
  SearchOutlinedIconUI,
  IconButtonUI,
  TextFieldUI,
  CheckboxUI,
  SnackbarUI,
  MuiAlertUI,
} from "../utilities/materialUI.jsx";

//Import functions and components from folders
import {
  convertToJS,
  listResponses,
  saveRecord,
  updateRecord,
  deleteRecord,
} from "../utilities/functions.jsx";
import ClearButton from "../buttons/ClearButton.jsx";
import EditButton from "../buttons/EditButton.jsx";
import DeleteButton from "../buttons/DeleteButton.jsx";
import ExitButton from "../buttons/ExitButton.jsx";
import SaveButton from "../buttons/SaveButton.jsx";
import SelectButton from "../buttons/SelectButton.jsx";
import UpdateButton from "../buttons/UpdateButton.jsx";
import ViewChanges from "../buttons/ViewChanges.jsx";

const REACT_APP_CLIENT_SERVER_URL = process.env.REACT_APP_CLIENT_SERVER_URL;

//constant declared as a component passed as a reference to the main function's child to create an alert warning
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlertUI elevation={6} ref={ref} variant="filled" {...props} />;
});

//Main function for the component which returns a client records panel
function EditPatient() {
  //constants declared as variable & function pairs for the useState hook, initialised to an empty values and false
  const [clientID, setClientID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [allergies, setAllergies] = useState("");
  const [updatesList, setUpdatesList] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [display, setDisplay] = useState(false);
  const [open, setOpen] = useState(false);

  //constant declared and assinged JavaScript version of state variable as its value
  const theList = convertToJS(updatesList);

  //constant declared and assigned a string value
  const recordType = "record";

  //constant declared and assigned state variable 'clientID' as it value
  const idType = clientID;

  //constant declared as an object and assigned state variables as properties
  const value = {
    first_name: firstName,
    last_name: lastName,
    date_of_birth: dob,
    gender: gender,
    address_line1: address1,
    address_line2: address2,
    city: city,
    post_code: postCode,
    country: country,
    phone: phone,
    email: email,
    comment: comment,
    allergies: allergies,
  };

  /**
   *Calls a function to update the state variable to 'false' and close the alert, unless the user clicks outside of the page
   *@param {string} reason for closing the alert
   */
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //Calls state update functions to return state variables to their intial states
  function clearPanel() {
    setClientID("");
    setFirstName("");
    setLastName("");
    setDateOfBirth("");
    setGender("");
    setAddress1("");
    setAddress2("");
    setCity("");
    setPostCode("");
    setCountry("United Kingdom");
    setPhone("");
    setEmail("");
    setComment("");
    setAllergies("");
    setClicked(false);
  }

  /**
   *Adds data objects to a list, e.g. responses from the server
   *@param {object} client record
   *@return {object[]} a list of updates
   */
  const addChanges = (record) => {
    var list = updatesList;
    list.push(record);
    setUpdatesList(list);
    return list;
  };

  //Calls a function to make a server request and then updates values from the response to the state variables
  function getData() {
    axios
      .get(
        `${REACT_APP_CLIENT_SERVER_URL}/records/${clientID}`
      )
      .then((response) => {
        var resData = response.data;
        setFirstName(resData.data.first_name);
        setLastName(resData.data.last_name);
        setDateOfBirth(resData.data.date_of_birth);
        setGender(resData.data.gender);
        setAddress1(resData.data.address_line1);
        setAddress2(resData.data.address_line2);
        setCity(resData.data.city);
        setPostCode(resData.data.post_code);
        setCountry(resData.data.country);
        setPhone(resData.data.phone);
        setEmail(resData.data.email);
        setComment(resData.data.comment);
        setAllergies(resData.data.allergies);
      });
  }

  //Calls functions to save data to the database, update the state variables 'clicked' and 'open' and prevent the panel from clearing
  function saveRecordHandler(event) {
    if (allergies == "") {
      setOpen(true);
      return;
    }
    saveRecord(value, recordType, addChanges);
    setClicked(true);
    event.preventDefault();
  }

  //Calls functions to update data in the database, update the state variable 'clicked' prevent the panel from clearing
  function updateRecordHandler(event) {
    if (allergies == "") {
      setOpen(true);
      return;
    }
    updateRecord(value, recordType, idType, addChanges);
    setClicked(true);
    event.preventDefault();
  }

  //Calls functions to delete data in the database, update the state variable 'clicked' prevent the panel from clearing
  function deleteRecordHandler(event) {
    deleteRecord(recordType, idType, addChanges);
    setClicked(true);
    event.preventDefault();
  }

  return (
    <div>
      {!display && (
        <div>
          <h4 className="light-bg">Save, Update or Delete a Client Record</h4>
          <EditButton
            text={"Edit Client Details"}
            onClick={() => setDisplay(true)}
          />
        </div>
      )}
      {display && (
        <div className="mrgn-tp-100">
          <ExitButton onClick={() => setDisplay(false)} />
          <br />
          <br />
          <p>Choose Client Record to Update/Delete:</p>
          <div>
            <div className="panel_boxes">
              <TextFieldUI
                label="Enter Client ID Number"
                variant="outlined"
                type="number"
                value={clientID}
                onChange={(e) => setClientID(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButtonUI>
                      <SearchOutlinedIconUI color="primary" />
                    </IconButtonUI>
                  ),
                }}
              />
            </div>
            <div className="button_row">
              <SelectButton disabled={clientID == ""} onClick={getData} />
              <ClearButton
                variant={"outlined"}
                size={"large"}
                onClick={clearPanel}
              />
            </div>
            <br />
            <br />
            <div className="light-bg">
              <p>Client Details Panel:</p>
              <div className="panel_boxes">
                <TextFieldUI
                  type="number"
                  label="Patient ID"
                  variant="outlined"
                  disabled={true}
                  value={clientID}
                  onChange={(e) => setClientID(e.target.value)}
                />
                <br />
                <TextFieldUI
                  label="First Name"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <br />
                <TextFieldUI
                  label="Last Name"
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <br />
                <TextFieldUI
                  label="Date of Birth: yyyy-mm-dd"
                  variant="outlined"
                  value={dob}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
                <br />
                <TextFieldUI
                  label="Gender"
                  variant="outlined"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
                <br />
                <TextFieldUI
                  label="Address line 1"
                  variant="outlined"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                />
                <br />
                <TextFieldUI
                  label="Address line 2"
                  variant="outlined"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
                <br />
                <TextFieldUI
                  label="City"
                  variant="outlined"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <br />
                <TextFieldUI
                  label="Post Code"
                  variant="outlined"
                  value={postCode}
                  onChange={(e) => setPostCode(e.target.value)}
                />
                <br />
                <TextFieldUI
                  label="Country"
                  variant="outlined"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <br />
                <TextFieldUI
                  label="Contact number"
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <br />
                <TextFieldUI
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <TextFieldUI
                  label="Additional comments"
                  variant="outlined"
                  multiline
                  minRows="3"
                  maxRows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <br />
                <TextFieldUI
                  label="Types of allergies"
                  variant="outlined"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                />
              </div>
              <label>
                Any known allergies?{" "}
                <CheckboxUI
                  type="checkbox"
                  value="None"
                  checked={allergies == "None"}
                  onChange={(e) => setAllergies(e.target.value)}
                />
                No
              </label>
              <label>
                <CheckboxUI
                  type="checkbox"
                  value=""
                  checked={allergies != "None"}
                  onChange={(e) => setAllergies(e.target.value)}
                />
                Yes
              </label>
            </div>
            <div className="button_row">
              <SaveButton
                disabled={
                  clicked ||
                  clientID != "" ||
                  !(
                    firstName != "" &&
                    lastName != "" &&
                    dob != "" &&
                    address1 != "" &&
                    city != "" &&
                    postCode != "" &&
                    phone != ""
                  )
                }
                onClick={saveRecordHandler}
              />
              <UpdateButton
                disabled={clientID == "" || clicked}
                onClick={updateRecordHandler}
              />
              <DeleteButton
                disabled={clientID == "" || clicked}
                onClick={deleteRecordHandler}
              />
              <ClearButton
                variant={"contained"}
                size={"medium"}
                onClick={clearPanel}
              />
            </div>
            <div />
            <SnackbarUI
              open={open}
              autoHideDuration={2500}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="warning"
                sx={{ width: "100%" }}
              >
                Enter allergy information for client with known allergies.
              </Alert>
            </SnackbarUI>
            <ViewChanges disabled={!clicked} onClick={clearPanel} />
          </div>
          <hr></hr>
          Updates from Panel:
          {listResponses(theList)}
        </div>
      )}
    </div>
  );
}

//Make the main function available for import
export default EditPatient;
