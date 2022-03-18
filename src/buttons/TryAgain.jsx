//Import features from libraries
import React from "react";
import { ButtonUI, RefreshOutlinedIconUI } from "../utilities/materialUI.jsx";

//Main function for the component which returns a button
const TryAgain = () => {
  return (
    <div>
      <form>
        <ButtonUI
          type="submit"
          variant="outlined"
          color="error"
          size="large"
          startIcon={<RefreshOutlinedIconUI />}
        >
          Try Again
        </ButtonUI>
      </form>
    </div>
  );
};

//Make the main function available for import
export default TryAgain;
