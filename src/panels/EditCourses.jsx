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
  listResponses,
  saveRecord,
  updateRecord,
  deleteRecord,
} from "../utilities/functions.jsx";
import ClearButton from "../buttons/ClearButton.jsx";
import DeleteButton from "../buttons/DeleteButton.jsx";
import EditButton from "../buttons/EditButton.jsx";
import ExitButton from "../buttons/ExitButton.jsx";
import SaveButton from "../buttons/SaveButton.jsx";
import SelectButton from "../buttons/SelectButton.jsx";
import UpdateButton from "../buttons/UpdateButton.jsx";
import ViewChanges from "../buttons/ViewChanges.jsx";

const REACT_APP_CLIENT_SERVER_URL = process.env.REACT_APP_CLIENT_SERVER_URL;

//Main function for the component which returns a treatment courses panel
function EditCourses() {
  //constants declared as variable & function pairs for the useState hook, initialised to an empty values and false
  const [treatCourseID, setTreatCourseID] = useState("");
  const [patientID, setPatientID] = useState("");
  const [practionerID, setPractionerID] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [estimatedCosts, setEstimatedCosts] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [finalCosts, setFinalCosts] = useState("");
  const [updatesList, setUpdatesList] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [display, setDisplay] = useState(false);

  //constant declared and assinged JavaScript version of state variable as its value
  const theList = convertToJS(updatesList);

  //constant declared and assigned a string value
  const recordType = "course";

  //constant declared and assigned state variable 'treatCourseID' as it value
  const idType = treatCourseID;

  //constant declared as an object and assigned state variables as properties
  const value = {
    course_id: treatCourseID,
    service_user_id: patientID,
    lead_practitioner_id: practionerID,
    description: description,
    start_date: startDate,
    estimated_costs: estimatedCosts,
    completion_date: completionDate,
    final_costs: finalCosts,
  };

  //Calls state update functions to return state variables to their intial states
  function clearPanel() {
    setTreatCourseID("");
    setPatientID("");
    setPractionerID("");
    setDescription("");
    setStartDate("");
    setEstimatedCosts("");
    setCompletionDate("");
    setFinalCosts("");
    setClicked(false);
  }

  /**
   *Adds data objects to a list, e.g. responses from the server
   *@param {object} a treatment course
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
        `${REACT_APP_CLIENT_SERVER_URL}/treatmentCourses/${treatCourseID}`
      )
      .then((response) => {
        var resData = response.data;
        setTreatCourseID(resData.data.course_id);
        setPatientID(resData.data.service_user_id);
        setPractionerID(resData.data.lead_practitioner_id);
        setDescription(resData.data.description);
        setStartDate(resData.data.start_date);
        setEstimatedCosts(resData.data.estimated_costs);
        setCompletionDate(resData.data.completion_date);
        setFinalCosts(resData.data.final_costs);
      });
  }

  //Calls functions to save data to the database, update the state variable 'clicked' prevent the panel from clearing
  function saveRecordHandler(event) {
    saveRecord(value, recordType, addChanges);
    setClicked(true);
    event.preventDefault();
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
            Save, Update or Delete a Treatment Course
          </h4>
          <EditButton
            text={"Edit Treatment Courses"}
            onClick={() => setDisplay(true)}
          />
        </div>
      )}
      {display && (
        <div>
          <ExitButton onClick={() => setDisplay(false)} />
          <br />
          <br />
          <p>
            Choose a Treatment Course to Update/Delete or Create a New Course:
          </p>
          <div>
            <div className="panel_boxes">
              <TextFieldUI
                type="number"
                label="Enter Course ID Number"
                variant="outlined"
                value={treatCourseID}
                onChange={(e) => setTreatCourseID(e.target.value)}
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
            <SelectButton disabled={treatCourseID == ""} onClick={getData} />
            <ClearButton
              variant={"outlined"}
              size={"large"}
              onClick={clearPanel}
            />
          </div>
          <br />
          <br />
          <div className="light-bg">
            <p>Treatment Courses Panel:</p>
            <div className="panel_boxes">
              <TextFieldUI
                type="number"
                label="Treatment Course ID"
                disabled={true}
                variant="outlined"
                value={treatCourseID}
                onChange={(e) => setTreatCourseID(e.target.value)}
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
                label="Lead Practioner ID"
                variant="outlined"
                value={practionerID}
                onChange={(e) => setPractionerID(e.target.value)}
              />
              <br />
              <TextFieldUI
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <TextFieldUI
                label="Start Date: yyyy-mm-dd"
                variant="outlined"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <br />
              <TextFieldUI
                label="Estimated Costs"
                variant="outlined"
                value={estimatedCosts}
                onChange={(e) => setEstimatedCosts(e.target.value)}
              />
              <br />
              <TextFieldUI
                label="Completion Date: yyyy-mm-dd"
                variant="outlined"
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
              />
              <br />
              <TextFieldUI
                label="Final Costs"
                variant="outlined"
                value={finalCosts}
                onChange={(e) => setFinalCosts(e.target.value)}
              />
              <br />
              <br />
            </div>
          </div>
          <div className="button_row">
            <SaveButton
              disabled={
                clicked ||
                treatCourseID != "" ||
                !(
                  patientID != "" &&
                  practionerID != "" &&
                  description != "" &&
                  startDate != "" &&
                  estimatedCosts != ""
                )
              }
              onClick={saveRecordHandler}
            />
            <UpdateButton
              disabled={treatCourseID == "" || clicked}
              onClick={updateRecordHandler}
            />
            <DeleteButton
              disabled={treatCourseID == "" || clicked}
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
export default EditCourses;
