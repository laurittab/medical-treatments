//Import features from libraries
import React from "react";
import { ButtonUI, SaveIconUI } from "../utilities/materialUI.jsx";

//Main function for the component which returns a button
const SaveButton = (props) => {
  //constants declared and assigned props as their values
  const disabledConditions = props.disabled;
  const saveFunction = props.onClick;

  return (
    <div>
      <ButtonUI
        type="button"
        variant="contained"
        color="success"
        size="medium"
        startIcon={<SaveIconUI />}
        disabled={disabledConditions}
        onClick={saveFunction}
      >
        Save
      </ButtonUI>
    </div>
  );
};

//Make the main function available for import
export default SaveButton;
