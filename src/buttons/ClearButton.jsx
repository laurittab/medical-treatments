//Import features from libraries
import React from "react";
import { ButtonUI, CancelIconUI } from "../utilities/materialUI.jsx";

//Main function for the component which returns a button
const ClearButton = (props) => {
  //constants declared and assigned props as their values
  const variantType = props.variant;
  const buttonSize = props.size;
  const clearFunction = props.onClick;

  return (
    <div>
      <ButtonUI
        type="button"
        variant={variantType}
        color="secondary"
        size={buttonSize}
        startIcon={<CancelIconUI />}
        onClick={clearFunction}
      >
        Clear
      </ButtonUI>
    </div>
  );
};

//Make the main function available for import
export default ClearButton;
