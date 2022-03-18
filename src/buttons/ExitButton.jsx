//Import features from libraries
import React from "react";
import {
  ButtonUI,
  CancelPresentationIconUI,
} from "../utilities/materialUI.jsx";

//Main function for the component which returns a button
const ExitButton = (props) => {
  //constant declared and assigned props as its value
  const exitFunction = props.onClick;

  return (
    <div>
      <ButtonUI
        className="flt_rt"
        type="button"
        variant="outlined"
        color="error"
        size="large"
        startIcon={<CancelPresentationIconUI />}
        onClick={exitFunction}
      >
        Exit
      </ButtonUI>
    </div>
  );
};

//Make the main function available for import
export default ExitButton;
