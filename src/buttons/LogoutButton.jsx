//Import features from libraries
import React from "react";
import axios from "axios";
import { IconButtonUI, LogoutIconUI } from "../utilities/materialUI.jsx";

//Main function for the component which returns a button
const LogoutButton = (props) => {
  //constant declared and assigned props as its value
  const buttonColor = props.color;

  function logoutHandler() {
    axios.get("http://localhost:8080/lhm/logout").then((response) => {
      var resData = response.data;
      let data = JSON.stringify(resData);
      window.alert("Response recieved from server = " + data);
    });
  }

  return (
    <div>
      <form>
        <IconButtonUI type="submit" size="large" onClick={logoutHandler}>
          <LogoutIconUI color={buttonColor} fontSize="inherit" />
        </IconButtonUI>
      </form>
    </div>
  );
};

//Make the main function available for import
export default LogoutButton;
