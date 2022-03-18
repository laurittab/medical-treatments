//Import features from libraries
import React from "react";
import { ButtonUI, CheckBoxIconUI } from "../utilities/materialUI.jsx";

//Main function for the component which returns a button
const SelectButton = (props) => {
  //constants declared and assigned props as their values
  const disabledConditions = props.disabled;
  const selectFunction = props.onClick;

  return (
    <div>
      <ButtonUI
        type="button"
        variant="outlined"
        color="primary"
        size="large"
        startIcon={<CheckBoxIconUI />}
        disabled={disabledConditions}
        onClick={selectFunction}
      >
        Select
      </ButtonUI>
    </div>
  );
};

//Make the main function available for import
export default SelectButton;
