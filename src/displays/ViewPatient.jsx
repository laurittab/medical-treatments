//Import features from libraries
import React, { useContext } from "react";
import { ClientContext } from "../App";
import {
  PaperUI,
  TableBodyUI,
  TableCellUI,
  TableContainerUI,
  TableRowUI,
  TableUI,
} from "../utilities/materialUI.jsx";

//Import functions and components from folder
import ClearButton from "../buttons/ClearButton.jsx";
import DisplayTreatments from "./DisplayTreatments.jsx";
import useAPI from "../utilities/useAPI.jsx";

//Main function for the component which returns a table of details for a client and calls another componment
function ViewPatient(props) {
  //Declared constant object whose properties will hold the values of the 'client' context
  const { client, dispatch } = useContext(ClientContext);

  //constant declared and assigned props as its values
  const {
    client_id,
    first_name,
    last_name,
    date_of_birth,
    gender,
    address_line1,
    address_line2,
    city,
    post_code,
    country,
    phone,
    email,
    comment,
    allergies,
  } = props.patientRecord;

  //constant declared and assigned the value returned from useAPI Hook
  const treatmentRecords = useAPI(
    `http://localhost:8080/patient/treatment/records/${client.details}`
  );

  //Calls a function to update client context to intial state
  function clearClient() {
    /*Function called to manage the 'client' state
     *@param {object} the action type and payload value
     *@return {object} a new state for 'client' context
     */
    dispatch({ type: "search", payload: [] });
  }

  return (
    <div>
      <ClearButton variant={"outlined"} size={"large"} onClick={clearClient} />
      <br />
      <TableContainerUI component={PaperUI}>
        <TableUI sx={{ tableLayout: "auto" }}>
          <TableBodyUI>
            <TableRowUI>
              <TableCellUI align="left">CLIENT ID</TableCellUI>
              <TableCellUI align="right">{client_id}</TableCellUI>
            </TableRowUI>
            <TableRowUI>
              <TableCellUI align="left">NAME</TableCellUI>
              <TableCellUI align="right">
                {first_name} {last_name}
              </TableCellUI>
            </TableRowUI>
            <TableRowUI>
              <TableCellUI align="left">DATE of BIRTH</TableCellUI>
              <TableCellUI align="right">{date_of_birth}</TableCellUI>
            </TableRowUI>
            <TableRowUI>
              <TableCellUI align="left">GENDER</TableCellUI>
              <TableCellUI align="right">{gender}</TableCellUI>
            </TableRowUI>
            <TableRowUI>
              <TableCellUI align="left">ADDRESS</TableCellUI>
              <TableCellUI align="right">
                {address_line1}, {address_line2}, {city}, {post_code}, {country}
              </TableCellUI>
            </TableRowUI>
            <TableRowUI>
              <TableCellUI align="left">PHONE</TableCellUI>
              <TableCellUI align="right">{phone}</TableCellUI>
            </TableRowUI>
            <TableRowUI>
              <TableCellUI align="left">EMAIL</TableCellUI>
              <TableCellUI align="right">{email}</TableCellUI>
            </TableRowUI>
            <TableRowUI>
              <TableCellUI align="left">COMMENTS</TableCellUI>
              <TableCellUI align="right">{comment}</TableCellUI>
            </TableRowUI>
            <TableRowUI>
              <TableCellUI align="left">KNOWN ALLERGIES</TableCellUI>
              {allergies != "None" && (
                <TableCellUI
                  sx={{ fontWeight: "bold", color: "red" }}
                  align="right"
                >
                  {allergies}
                </TableCellUI>
              )}
              {allergies == "None" && (
                <TableCellUI align="right">{allergies}</TableCellUI>
              )}
            </TableRowUI>
          </TableBodyUI>
        </TableUI>
      </TableContainerUI>
      <br />
      <p className="instructions">
        See below for this client's treatment courses and related medical
        teatments. You may display all or filter for your required treatment
        category.
      </p>
      <DisplayTreatments endpoint={treatmentRecords} />
      <br />
    </div>
  );
}

//Make the main function available for import
export default ViewPatient;
