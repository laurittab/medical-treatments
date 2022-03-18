//Import features from libraries
import React from "react";

//Import components from folder
import Course from "./Course.jsx";

//Main function for the component which returns formated details for a treatment
const Treatment = (props) => {
  //constant declared and assigned props as its value
  const {
    course_id,
    service_user_id,
    lead_practitioner_id,
    description,
    start_date,
    estimated_costs,
    completion_date,
    final_costs,
    practitioner_id,
    establishment_id,
    type,
    treatment_category,
    issue_date,
    treatment_id,
  } = props.patientTreatments;

  //constant declared and assigned a course with formated treatment details as its value
  const formatTreatment = (
    <div className="ul-lists">
      <Course
        treatmentCourse={{
          course_id,
          service_user_id,
          lead_practitioner_id,
          description,
          start_date,
          estimated_costs,
          completion_date,
          final_costs,
        }}
      />
      <div>
        <strong>Treatment ID: {treatment_id}</strong> Practitioner ID:{" "}
        {practitioner_id} Establishment ID: "{establishment_id}
        Treatment Type: {type} Treatment Category: {treatment_category}{" "}
        Treatment Issue Date: {issue_date};
      </div>
    </div>
  );

  return (
    <div>
      {treatment_category == "Prescriptions and repeat Prescriptions" && (
        <div className="blue-itlc">{formatTreatment}</div>
      )}
      {treatment_category != "Prescriptions and repeat Prescriptions" && (
        <div>{formatTreatment}</div>
      )}
    </div>
  );
};

//Make the main function available for import
export default Treatment;
