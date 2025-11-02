//Import features from libraries
import React, { useState, useReducer, createContext } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  BoxUI,
  GridUI,
  ItemUI,
  StackUI,
  TabsUI,
  TabUI,
} from "./utilities/materialUI.jsx";
//import "@fontsource/roboto/500.css";

//Import functions and components from folders
import "./styles/styles.css";
import DisplayAll from "./displays/DisplayAll.jsx";
import DisplayCourses from "./displays/DisplayCourses.jsx";
import DisplayPatients from "./displays/DisplayPatients.jsx";
import DisplayTreatments from "./displays/DisplayTreatments.jsx";
import EditPatient from "./panels/EditPatient.jsx";
import EditCourses from "./panels/EditCourses.jsx";
import EditTreatments from "./panels/EditTreatments.jsx";
import HomeButton from "./buttons/HomeButton.jsx";
import LogoutButton from "./buttons/LogoutButton.jsx";
import PatientFilters from "./panels/PatientFilters.jsx";
import SearchPatient from "./panels/SearchPatient.jsx";
import ViewPatient from "./displays/ViewPatient.jsx";
import TryAgain from "./buttons/TryAgain.jsx";
import useAPI from "./utilities/useAPI.jsx";

const REACT_APP_CLIENT_SERVER_URL = process.env.REACT_APP_CLIENT_SERVER_URL;

//constant declared as the initial state for the useReducer Hook and assigned an object containing an empty array as its value
const detailsInitialState = {
  details: [],
};

/**
 *Creates a new state for 'client' based on an action type
 *@param {object} a list client details
 *@param {object} an action
 *@return {object} a new state containing the updated 'client.details'
 */
function detailsReducer(client, action) {
  switch (action.type) {
    case "search":
      return { ...client, details: action.payload };
    default:
      return detailsInitialState;
  }
}

//Make the context available for consumption by other components
export const ClientContext = createContext();

/**
 *A component which returns tab panels and thier content
 *@param {object} properties are tab contents, a number and an index position
 *@return {object} page contents for a tab
 */
function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <h4>{children}</h4>}</div>;
}

/**
 *A component which returns a button and error message
 *@param {object} error data
 *@return {object} formatted message containing message value
 */
function MyFallback(error) {
  return (
    <div className="mrgn-tp-100">
      <h1>An error occurred: {error.message}</h1>
      <p>Please enter a valid Client ID number</p>
      <TryAgain />
    </div>
  );
}

//Make the main function available for import
export default function App() {
  //constant declared as state & function pair for the useReducer hook, initialised to the value of the useReducer function
  const [client, dispatch] = useReducer(detailsReducer, detailsInitialState);

  //constant declared as variable & function pair for the useState hook, initialised to 0
  const [value, setValue] = useState(0);

  //constants declared and assigned the values returned from useAPI Hook
  const patientEndpoint = useAPI(
    `${REACT_APP_CLIENT_SERVER_URL}/records/${client.details}`
  );
  const treatmentEndpoint = useAPI(
    `${REACT_APP_CLIENT_SERVER_URL}/patient/treatment/records`
  );
  const courseEndpoint = useAPI(
    `${REACT_APP_CLIENT_SERVER_URL}/treatmentCourses`
  );

  return (
    <ClientContext.Provider value={{ client, dispatch }}>
      <BoxUI sx={{ m: 2 }}>
        <TabsUI
          value={value}
          onChange={(event, value) => setValue(value)}
          centered
        >
          <TabUI label="Clients" />
          <TabUI label="Treatments" />
        </TabsUI>
        <TabPanel value={value} index={0}>
          <GridUI className="containter_centred" container spacing={2}>
            <GridUI item md={1}>
              <HomeButton />
            </GridUI>
            <GridUI item md={10}>
              <h5 className="admin">
                ADMIN PANEL for creating, editing, deleting and viewing client
                details.
              </h5>
            </GridUI>
            <GridUI item md={1}>
              <LogoutButton />
            </GridUI>
            <GridUI item sm={12} md={6}>
              <StackUI spacing={2}>
                {client.details.length == 0 && (
                  <ItemUI>
                    <SearchPatient />
                  </ItemUI>
                )}
                {client.details.length == 0 && (
                  <ItemUI>
                    <PatientFilters endpoint={patientEndpoint} />
                  </ItemUI>
                )}
                {client.details.length != 0 && (
                  <ItemUI>
                    <ErrorBoundary FallbackComponent={MyFallback}>
                      <ViewPatient patientRecord={patientEndpoint} />
                    </ErrorBoundary>
                  </ItemUI>
                )}
              </StackUI>
            </GridUI>
            <GridUI item sm={12} md={6}>
              <StackUI spacing={2}>
                {client.details.length == 0 && (
                  <ItemUI>
                    <DisplayPatients endpoint={patientEndpoint} />
                  </ItemUI>
                )}
                <br />
                <br />
                <EditPatient />
              </StackUI>
            </GridUI>
            <GridUI item sm={12} md={6}></GridUI>
          </GridUI>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <GridUI className="containter_centred" container spacing={2}>
            <GridUI item md={1}>
              <HomeButton />
            </GridUI>
            <GridUI item md={11}>
              <h5>
                PRACTITIONER PANEL for creating, editing, deleting and viewing:
                a&#41; treatment courses b&#41; individual medical treatments.
              </h5>
            </GridUI>
            <GridUI item sm={12} md={6}>
              <StackUI spacing={2}>
                {client.details.length == 0 && (
                  <ItemUI>
                    <DisplayAll
                      treatEndpoint={treatmentEndpoint}
                      patientEndpoint={patientEndpoint}
                    />
                  </ItemUI>
                )}
                {client.details.length != 0 && (
                  <div>
                    <ItemUI>
                      <ViewPatient patientRecord={patientEndpoint} />
                    </ItemUI>
                  </div>
                )}
                <DisplayTreatments endpoint={treatmentEndpoint} />
                <DisplayCourses endpoint={courseEndpoint} />
              </StackUI>
            </GridUI>
            <GridUI item sm={12} md={6}>
              <StackUI spacing={2}>
                <EditCourses />
                <EditTreatments />
              </StackUI>
            </GridUI>
          </GridUI>
        </TabPanel>
      </BoxUI>
    </ClientContext.Provider>
  );
}
