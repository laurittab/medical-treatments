//Import features from libraries
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

//Import functions and components from folders
import { convertToJS } from "../utilities/functions.jsx";
import CategoryFilters from "../displays/CategoryFilters.jsx";
import ClearButton from "../buttons/ClearButton.jsx";
import DisplayButton from "../buttons/DisplayButton.jsx";
import ExitButton from "../buttons/ExitButton.jsx";
import PatientList from "./PatientList.jsx";
import Treatment from "../displays/Treatment.jsx";

//Main function for the component which conditionally renders a button or a list of client and treatment details
function DisplayAll(props) {
  //constants declared as variable & function pairs for useState hooks, initialised to an empty string and false
  const [category, setCategory] = useState("");
  const [clicked, setClicked] = useState(false);

  //constants declared and assigned props as their values
  const patients = props.patientEndpoint;
  const treatments = props.treatEndpoint;

  /**
   *Checks whether treatment's category matches the chosen state variable 'category'
   *@param {object} a treatment record
   *@return {boolean} returns true if value is equivalent to 'category'
   */
  const categoryFilter = (rec) => rec.treatment_category == category;

  /**
   *Lists details and treatements for each client
   *@param {object[]} a list of patient records
   *@param {object[]} a list of treatmentments
   *@return {(object,object)[]} returns a list client details paired with their treatments
   */
  const patientsTreatments = (arr1, arr2) => {
    var records1 = convertToJS(arr1);
    var records2 = convertToJS(arr2);
    return records1.map((record1) => (
      <ul key={uuidv4()}>
        <br />
        <hr />
        <PatientList patients={[record1]} />
        <ul>
          {records2
            .filter((rec2) => rec2.service_user_id == record1.client_id)
            .map((record2) => (
              <ul key={uuidv4()}>
                <Treatment patientTreatments={record2} />
              </ul>
            ))}
        </ul>
      </ul>
    ));
  };

  /**
   *Checks whether a client's ID number for a record matches the service user ID for all treatments in a list filtered by the state variable 'category'
   *@param {object} a list of patient records
   *@return {boolean} returns true if the client ID is equivalent to the service user ID for all records in the filtered list
   */
  function checkID(record) {
    var filteredList = treatments.filter(categoryFilter);
    var test = false;
    for (var i = 0; i < filteredList.length; i++) {
      if (record.client_id == filteredList[i].service_user_id)
        return (test = true);
    }
    return test;
  }

  return (
    <div>
      <h4 className="dark-bg"> View Clients' Treatments and Related Courses</h4>
      {!clicked && (
        <DisplayButton
          text={"Display Records"}
          onClick={() => setClicked(true)}
        />
      )}
      {clicked && (
        <div>
          <ExitButton
            onClick={() => {
              setClicked(false);
              setCategory("");
            }}
          />
          <br />
          <br />
          <div className="button_row">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <CategoryFilters />
            </select>
            <ClearButton
              variant={"outlined"}
              size={"large"}
              onClick={() => setCategory("")}
            />
          </div>
          <br />
          {category &&
            category == "All" &&
            patientsTreatments(patients, treatments)}
          {category &&
            category != "All" &&
            patientsTreatments(
              patients.filter(checkID),
              treatments.filter(categoryFilter)
            )}
        </div>
      )}
    </div>
  );
}

//Make the main function available for import
export default DisplayAll;
