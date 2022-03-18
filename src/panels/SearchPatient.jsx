//Import features from libraries
import React, { useContext, useState } from "react";
import { ClientContext } from "../App";
import {
  IconButtonUI,
  SearchOutlinedIconUI,
  TextFieldUI,
} from "../utilities/materialUI.jsx";

//Import components from folders
import ClearButton from "../buttons/ClearButton.jsx";
import SearchButton from "../buttons/SearchButton.jsx";

//Main function for the component which returns a search panel
function SearchPatient() {
  //constant declared as a variable & function pair for the useState hook, initialised to an empty string
  const [clientID, setClientID] = useState("");

  //Declared constant object whose properties will hold the values of the 'client' context
  const { client, dispatch } = useContext(ClientContext);

  //Calls a function to update 'client' context to the client ID of a record
  function handleSearch() {
    /*Function called to manage the 'client' state
     *@param {object} the action type and payload value
     *@return {object} a new state for 'client' context
     */
    dispatch({ type: "search", payload: clientID });
  }

  return (
    <div>
      <h4 className="dark-bg">Search by Client ID</h4>
      <div className="panel_boxes">
        <TextFieldUI
          label="Enter Client ID Number"
          type="number"
          variant="outlined"
          value={clientID}
          onChange={(e) => setClientID(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButtonUI>
                <SearchOutlinedIconUI color="primary" />
              </IconButtonUI>
            ),
          }}
        />
      </div>
      <div className="button_row">
        <SearchButton onClick={handleSearch} disabled={clientID == ""} />
        <ClearButton
          variant={"outlined"}
          size={"large"}
          onClick={() => setClientID("")}
        />
      </div>
    </div>
  );
}

//Make the main function available for import
export default SearchPatient;
