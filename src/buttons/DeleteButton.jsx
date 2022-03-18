//Import features from libraries
import React from "react";
import { ButtonUI, DeleteIconUI } from "../utilities/materialUI.jsx";

//Main function for the component which returns a button
const DeleteButton = (props) => {
  //constants declared and assigned props as their values
  const disabledConditions = props.disabled;
  const deleteFunction = props.onClick;

  return (
    <div>
      <ButtonUI
        type="button"
        variant="contained"
        color="error"
        size="medium"
        startIcon={<DeleteIconUI />}
        disabled={disabledConditions}
        onClick={deleteFunction}
      >
        Delete
      </ButtonUI>
    </div>
  );
};

//Make the main function available for import
export default DeleteButton;
