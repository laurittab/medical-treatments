//Import features from libraries
import React from "react";
import { HomeIconUI, IconButtonUI } from "../utilities/materialUI.jsx";

//Main function for the component which returns a button
const HomeButton = (props) => {
  //constant declared and assigned props as its value
  const buttonColor = props.color;

  return (
    <div>
      <form>
        <IconButtonUI type="submit" size="large">
          <HomeIconUI color={buttonColor} fontSize="inherit" />
        </IconButtonUI>
      </form>
    </div>
  );
};

//Make the main function available for import
export default HomeButton;

<a href="https://Glandor.reetzonline.repl.run" target="_blank">
  Play Glandor online now
</a>;
