//Import features from libraries
import React, { useState } from "react";

//Import functions and components from folders
import { treatmentList } from "../utilities/functions.jsx";
import CategoryFilters from "../displays/CategoryFilters.jsx";
import ClearButton from "../buttons/ClearButton.jsx";
import DisplayButton from "../buttons/DisplayButton.jsx";
import ExitButton from "../buttons/ExitButton.jsx";

//Main function for the component which returns a list of treatments
function DisplayTreatments(props) {
  //constants declared as variable & function pairs for the useState hook, initialised to an empty string and false
  const [category, setCategory] = useState("");
  const [clicked, setClicked] = useState(false);

  //constant declared and assigned props as its value
  const treatmentRecords = props.endpoint;

  /**
   *Checks whether a record's treatment category matches the chosen state variable 'category'
   *@param {object} a record of client details
   *@return {boolean} returns true if value is equivalent to 'category'
   */
  const categoryFilter = (rec) => rec.treatment_category == category;

  return (
    <div>
      <h4 className="dark-bg"> View Treatments</h4>
      {!clicked && (
        <DisplayButton
          text={"Display Treatments"}
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
          <br />
          {category && category == "All" && treatmentList(treatmentRecords)}
          {category &&
            category != "All" &&
            treatmentList(treatmentRecords.filter(categoryFilter))}
        </div>
      )}
    </div>
  );
}

//Make the main function available for import
export default DisplayTreatments;
