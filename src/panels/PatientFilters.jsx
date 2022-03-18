//Import features from libraries
import React, { useState } from "react";
import { TextFieldUI } from "../utilities/materialUI.jsx";

//Import components from folders
import ClearButton from "../buttons/ClearButton.jsx";
import SearchButton from "../buttons/SearchButton.jsx";
import PatientList from "../displays/PatientList.jsx";

function PatientFilters(props) {
  //constants declared as variable & function pairs for the useState hook, initialised to an empty values and false
  const [clicked, setClicked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDOB] = useState("");
  const [postCode, setPostCode] = useState("");

  //constant declared and assigned props as its value
  const patientRecords = props.endpoint;

  //constant declared and assigned an array of state variables as its value
  const filterCriteria = [firstName, lastName, dob, postCode];

  //Calls state update functions to return state variables to their intial states
  function clearfilters() {
    setFirstName("");
    setLastName("");
    setDOB("");
    setPostCode("");
    setClicked(false);
  }

  /**
   *Filters a list to remove empty string variables
   * @param {string[]} a list of filter values
   * @return {string[]} a filtered list
   */
  function finaliseFilters(arr) {
    var filters = arr.filter((x) => x != "");
    return filters;
  }

  /**
   *Checks whether a record's values match the filtering critera.
   * @param {object} a client record
   * @return {boolean} a true or fale value
   */
  function filterTest(rec) {
    var filterList = finaliseFilters(filterCriteria);
    var criteria = [];
    for (var i = 0; i < filterList.length; i++) {
      switch (filterList[i]) {
        case firstName:
          criteria.push(rec.first_name == firstName);
          break;
        case lastName:
          criteria.push(rec.last_name == lastName);
          break;
        case dob:
          criteria.push(rec.date_of_birth == dob);
          break;
        case postCode:
          criteria.push(rec.post_code == postCode);
          break;
        default:
          break;
      }
    }
    return criteria.every((test) => test == true);
  }

  return (
    <div>
      <h4 className="dark-bg"> Filter by Client Detail(s)</h4>
      <div className="panel_boxes">
        <TextFieldUI
          label="First Name"
          // size="small"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <TextFieldUI
          label="Last Name"
          variant="outlined"
          // size="small"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <TextFieldUI
          label="Date of Birth"
          variant="outlined"
          // size="small"
          value={dob}
          onChange={(e) => setDOB(e.target.value)}
        />
        <br />
        <TextFieldUI
          label="Post Code"
          variant="outlined"
          // size="small"
          value={postCode}
          onChange={(e) => setPostCode(e.target.value)}
        />
      </div>
      <div className="button_row">
        <SearchButton
          onClick={() => setClicked(true)}
          disabled={
            firstName == "" && lastName == "" && dob == "" && postCode == ""
          }
        />
        <ClearButton
          variant={"outlined"}
          size={"large"}
          onClick={clearfilters}
        />
      </div>
      {clicked &&
        !(firstName == "" && lastName == "" && dob == "" && postCode == "") && (
          <PatientList patients={patientRecords.filter(filterTest)} />
        )}
    </div>
  );
}

//Make the main function available for import
export default PatientFilters;
