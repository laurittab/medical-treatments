//Import features from libraries
import React, { useState } from "react";
import axios from "axios";
import {
  IconButtonUI,
  SearchOutlinedIconUI,
  TextFieldUI,
} from "../utilities/materialUI.jsx";

//Import functions and components from folders
import {
  convertToJS,
  deleteRecord,
  listResponses,
  saveRecord,
  updateRecord,
} from "../utilities/functions.jsx";
import CategoryFilters from "../displays/CategoryFilters.jsx";
import ClearButton from "../buttons/ClearButton.jsx";
import DeleteButton from "../buttons/DeleteButton.jsx";
import EditButton from "../buttons/EditButton.jsx";
import ExitButton from "../buttons/ExitButton.jsx";
import UpdateButton from "../buttons/UpdateButton.jsx";
import ViewChanges from "../buttons/ViewChanges.jsx";
import SaveButton from "../buttons/SaveButton.jsx";
import SelectButton from "../buttons/SelectButton.jsx";

const REACT_APP_CLIENT_SERVER_URL = process.env.REACT_APP_CLIENT_SERVER_URL;

//Main function for the component which returns a treatments panel
function EditTreatments() {
  //constants declared as variable & function pairs for the useState hook, initialised to an empty values and false
  const [treatID, setTreatID] = useState("");
  const [treatCourseID, setTreatCourseID] = useState("");
  const [patientID, setPatientID] = useState("");
  const [practionerID, setPractionerID] = useState("");
  const [establishID, setEstablishID] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [updatesList, setUpdatesList] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [display, setDisplay] = useState(false);

  //constant declared and assinged JavaScript version of state variable as its value
  const theList = convertToJS(updatesList);

  //constant declared and assigned a string value
  const recordType = "treatment";

  //constant declared and assigned state variable 'treatID' as it value
  const idType = treatID;

  //constant declared as an object and assigned state variables as properties
  const value = {
    treatment_id: treatID,
    treat_course_id: treatCourseID,
    patient_id: patientID,
    practitioner_id: practionerID,
    establishment_id: establishID,
    type: type,
    treatment_category: category,
    issue_date: issueDate,
  };

  //Calls state update functions to return state variables to their intial states
  function clearPanel() {
    setTreatID("");
    setTreatCourseID("");
    setPatientID("");
    setPractionerID("");
    setEstablishID("");
    setType("");
    setCategory("");
    setIssueDate("");
    setClicked(false);
  }

  /**
   *Adds data objects to a list, e.g. responses from the server
   *@param {object} treatment data
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
        `${REACT_APP_CLIENT_SERVER_URL}/treatments/${treatID}`
      )
      .then((response) => {
        var resData = response.data;
        setTreatID(resData.data.treatment_id);
        setTreatCourseID(resData.data.treat_course_id);
        setPatientID(resData.data.patient_id);
        setPractionerID(resData.data.practitioner_id);
        setEstablishID(resData.data.establishment_id);
        setType(resData.data.type);
        setCategory(resData.data.treatment_category);
        setIssueDate(resData.data.issue_date);
      });
  }

  //Calls functions to save data to the database, update the state variable 'clicked' prevent the panel from clearing
  function saveRecordHandler(event) {
    saveRecord(value, recordType, addChanges);
    setClicked(true);
    event.preventDefault(); //
  }
  //Calls functions to update data in the database, update the state variable 'clicked' prevent the panel from clearing
  function updateRecordHandler(event) {
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
          <h4 className="light-bg">
            Save, Update or Delete a Treatment Record
          </h4>
          <EditButton
            text={"Edit Treatments"}
            onClick={() => setDisplay(true)}
          />
        </div>
      )}
      {display && (
        <div className="mrgn-tp-100">
          <ExitButton onClick={() => setDisplay(false)} />
          <br />
          <br />
          <p>Choose Treatment Record to Update/Delete:</p>
          <div>
            <div className="panel_boxes">
              <TextFieldUI
                type="number"
                label="Enter Treatment ID Number"
                variant="outlined"
                value={treatID}
                onChange={(e) => setTreatID(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButtonUI>
                      <SearchOutlinedIconUI color="primary" />
                    </IconButtonUI>
                  ),
                }}
              />
            </div>
          </div>
          <div className="button_row">
            <SelectButton disabled={treatID == ""} onClick={getData} />
            <ClearButton
              variant={"outlined"}
              size={"large"}
              onClick={clearPanel}
            />
          </div>
          <br />
          <br />
          <div className="light-bg">
            <p>Treatments Panel:</p>
            <div className="panel_boxes">
              <TextFieldUI
                type="number"
                label="Treatment ID"
                disabled={true}
                variant="outlined"
                value={treatID}
                onChange={(e) => setTreatID(e.target.value)}
              />
              <br />
              <TextFieldUI
                type="number"
                label="Patient ID"
                variant="outlined"
                value={patientID}
                onChange={(e) => setPatientID(e.target.value)}
              />
              <br />
              <TextFieldUI
                type="number"
                label="Treatment Course ID"
                variant="outlined"
                value={treatCourseID}
                onChange={(e) => setTreatCourseID(e.target.value)}
              />
              <br />
              <TextFieldUI
                type="number"
                label="Practioner ID"
                variant="outlined"
                value={practionerID}
                onChange={(e) => setPractionerID(e.target.value)}
              />
              <br />
              <TextFieldUI
                type="number"
                label="Establishment ID"
                variant="outlined"
                value={establishID}
                onChange={(e) => setEstablishID(e.target.value)}
              />
              <br />
              <TextFieldUI
                label="Treatment Type"
                variant="outlined"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
              <br />
              <select
                className="select"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <CategoryFilters style={"remove_category"} />
              </select>
              <br />
              <TextFieldUI
                label="Date Issued: yyyy-mm-dd"
                variant="outlined"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
              />
              <br />
              <br />
            </div>
          </div>
          <div className="button_row">
            <SaveButton
              disabled={
                clicked ||
                treatID != "" ||
                !(
                  treatCourseID != "" &&
                  patientID != "" &&
                  practionerID != "" &&
                  establishID != "" &&
                  type != "" &&
                  category != "" &&
                  issueDate != ""
                )
              }
              onClick={saveRecordHandler}
            />
            <UpdateButton
              disabled={treatID == "" || clicked}
              onClick={updateRecordHandler}
            />
            <DeleteButton
              disabled={treatID == "" || clicked}
              onClick={deleteRecordHandler}
            />
            <ClearButton
              variant={"contained"}
              size={"medium"}
              onClick={clearPanel}
            />
          </div>
          <ViewChanges disabled={!clicked} onClick={clearPanel} />
          <hr></hr>
          Updates from Panel:
          {listResponses(theList)}
        </div>
      )}
    </div>
  );
}

//Make the main function available for import
export default EditTreatments;
