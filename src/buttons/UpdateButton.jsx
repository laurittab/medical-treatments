//Import features from libraries
import React from "react";
import { ButtonUI, SystemUpdateAltIconUI } from "../utilities/materialUI.jsx";

//Main function for the component which returns a button
const UpdateButton = (props) => {
  //constants declared and assigned props as their values
  const disabledConditions = props.disabled;
  const updateFunction = props.onClick;

  return (
    <div>
      <ButtonUI
        type="button"
        variant="contained"
        color="primary"
        size="medium"
        startIcon={<SystemUpdateAltIconUI />}
        disabled={disabledConditions}
        onClick={updateFunction}
      >
        Update
      </ButtonUI>
    </div>
  );
};

//Make the main function available for import
export default UpdateButton;
