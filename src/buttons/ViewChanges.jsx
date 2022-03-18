//Import features from libraries
import React from "react";
import { ButtonUI, PreviewOutlinedIconUI } from "../utilities/materialUI.jsx";

//Main function for the component which returns a button
const ViewChanges = (props) => {
  //constants declared and assigned props as their values
  const disabledConditions = props.disabled;
  const viewFunction = props.onClick;

  return (
    <div>
      <ButtonUI
        className="wdth-44"
        type="button"
        variant="outlined"
        color="success"
        size="large"
        startIcon={<PreviewOutlinedIconUI />}
        disabled={disabledConditions}
        onClick={viewFunction}
      >
        View Changes
      </ButtonUI>
    </div>
  );
};

//Make the main function available for import
export default ViewChanges;
