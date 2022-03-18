//Import features from libraries
import React, { useContext } from "react";
import { ClientContext } from "../App";
import { v4 as uuidv4 } from "uuid";
import {
  TableContainerUI,
  TableUI,
  TableHeadUI,
  TableBodyUI,
  TableRowUI,
  TableCellUI,
  PaperUI,
} from "../utilities/materialUI.jsx";

//Import functions from folders
import { convertToJS } from "../utilities/functions.jsx";

//Main function for the component which returns a table summarising clients' details
function PatientList(props) {
  //Declared constant object whose properties will hold the values of the 'client' context
  const { client, dispatch } = useContext(ClientContext);

  //constant declared and assigned props as its value
  const patientList = props.patients;

  //Calls a function to update 'client' context to the client ID of a record
  function clientHandler(rec) {
    var client = rec.client_id;
    /*Function called to manage the 'client' state
     *@param {object} the action type and payload value
     *@return {object} a new state for 'client' context
     */
    dispatch({ type: "search", payload: client });
  }

  /**
   *Converts a client details record to a list of details
   *@param {object} a record of client details
   *@return {string[]} a list of values for client details
   */
  function getDetail(record) {
    return [
      record.last_name + ", " + record.first_name,
      record.date_of_birth,
      record.gender,
      record.post_code,
      record.country,
      record.allergies,
    ];
  }
  /**
   *Creates a table with rows of summary client details
   *@param {object[]} containing a list of client records
   *@return {object} a table containing rows of values for a client's details
   */
  function listPatients(list) {
    var records = convertToJS(list);
    return (
      <TableContainerUI component={PaperUI}>
        <TableUI sx={{ tableLayout: "auto" }}>
          <TableHeadUI>
            <TableRowUI>
              <TableCellUI align="left">CLIENT ID</TableCellUI>
              <TableCellUI align="left">NAME</TableCellUI>
              <TableCellUI align="left">DATE of BIRTH</TableCellUI>
              <TableCellUI align="left">GENDER</TableCellUI>
              <TableCellUI align="left">POST CODE</TableCellUI>
              <TableCellUI align="left">LOCATION</TableCellUI>
              <TableCellUI align="left">KNOWN ALLERGIES</TableCellUI>
            </TableRowUI>
          </TableHeadUI>
          <TableBodyUI>
            {records.map((record) => (
              <TableRowUI key={uuidv4()}>
                <TableCellUI
                  sx={{ textDecorationLine: "underline" }}
                  onClick={() => clientHandler(record)}
                >
                  {record.client_id}
                </TableCellUI>
                {record.allergies != "None" &&
                  getDetail(record).map((detail) => (
                    <TableCellUI
                      key={uuidv4()}
                      align="left"
                      sx={{ fontWeight: "bold", color: "red" }}
                    >
                      {detail}
                    </TableCellUI>
                  ))}
                {record.allergies == "None" &&
                  getDetail(record).map((detail) => (
                    <TableCellUI key={uuidv4()} align="left">
                      {detail}
                    </TableCellUI>
                  ))}
              </TableRowUI>
            ))}
          </TableBodyUI>
        </TableUI>
      </TableContainerUI>
    );
  }
  return <div>{listPatients(patientList)}</div>;
}

//Make the main function available for import
export default PatientList;
