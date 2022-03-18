//Import features from libraries
import React, { useState } from "react";

//Import functions and components from folders
import { courseList } from "../utilities/functions.jsx";
import {
  IconButtonUI,
  SearchOutlinedIconUI,
  TextFieldUI,
} from "../utilities/materialUI.jsx";
import ClearButton from "../buttons/ClearButton.jsx";
import DisplayButton from "../buttons/DisplayButton.jsx";

//Main function for the component which returns a list of treatment courses
function DisplayCourses(props) {
  //constants declared as variable & function pairs for useState hooks, initialised to an empty string and false
  const [patientID, setPatientID] = useState("");
  const [clicked, setClicked] = useState(false);

  //constant declared and assigned props as its value
  const courses = props.endpoint;

  /**
   *Checks whether the service user ID number of a treatment course matches the state variable 'patientID'
   *@param {object} a treatment course
   *@return {boolean} returns true if value is equivalent to 'patientID'
   */
  const getFilter = (rec) => rec.service_user_id == patientID;

  return (
    <div>
      <h4 className="dark-bg"> View Treatment Courses</h4>
      <div className="panel_boxes">
        <TextFieldUI
          label="Enter Client ID/Leave Blank to View All"
          variant="outlined"
          size="large"
          value={patientID}
          onChange={(e) => setPatientID(e.target.value)}
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
        <DisplayButton text={"Display"} onClick={() => setClicked(true)} />
        <ClearButton
          variant={"outlined"}
          size={"large"}
          onClick={() => {
            setClicked(false);
            setPatientID("");
          }}
        />
      </div>
      {clicked && !patientID && courseList(courses)}
      {clicked && patientID && courseList(courses.filter(getFilter))}
    </div>
  );
}

//Make the main function available for import
export default DisplayCourses;
