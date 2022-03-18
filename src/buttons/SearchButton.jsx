//Import features from libraries
import React from "react";
import { ButtonUI, PersonSearchIconUI } from "../utilities/materialUI.jsx";

//Main function for the component which returns a button
const SearchButton = (props) => {
  //constants declared and assigned props as their values
  const disabledConditions = props.disabled;
  const searchFunction = props.onClick;

  return (
    <div>
      <ButtonUI
        type="button"
        variant="outlined"
        color="primary"
        size="large"
        startIcon={<PersonSearchIconUI />}
        disabled={disabledConditions}
        onClick={searchFunction}
      >
        Search
      </ButtonUI>
    </div>
  );
};

//Make the main function available for import
export default SearchButton;
