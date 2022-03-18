//Import features from libraries
import React from "react";
import { ButtonUI, ListIconUI } from "../utilities/materialUI.jsx";

//Main function for the component which returns a button
const DisplayButton = (props) => {
  //constants declared and assigned props as their values
  const buttonText = props.text;
  const launchFunction = props.onClick;

  return (
    <div>
      <ButtonUI
        type="button"
        variant="outlined"
        color="primary"
        size="large"
        startIcon={<ListIconUI />}
        onClick={launchFunction}
      >
        {buttonText}
      </ButtonUI>
    </div>
  );
};

//Make the main function available for import
export default DisplayButton;
