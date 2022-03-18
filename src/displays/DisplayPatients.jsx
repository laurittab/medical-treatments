//Import features from libraries
import React, { useState } from "react";

//Import components from folders
import DisplayButton from "../buttons/DisplayButton.jsx";
import ExitButton from "../buttons/ExitButton.jsx";
import PatientList from "./PatientList.jsx";

//Main function for the component which conditionally renders a button or calls another component
function DisplayPatients(props) {
  //constant declared as variable & function pair for the useState hook, initialised to false
  const [clicked, setClicked] = useState(false);

  //constant declared and assigned props as its value
  const patientRecords = props.endpoint;

  return (
    <div>
      <h4 className="dark-bg">View All Clients</h4>
      {!clicked && (
        <DisplayButton
          text={"Display Clients"}
          onClick={() => setClicked(true)}
        />
      )}
      {clicked && (
        <div>
          <ExitButton onClick={() => setClicked(false)} />
          <br />
          <br />
          <PatientList patients={patientRecords} />
          <br />
          <p className="instructions">
            Click on a client's ID number to view their details
          </p>
        </div>
      )}
    </div>
  );
}

//Make the main function available for import
export default DisplayPatients;
