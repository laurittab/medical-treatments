//Import features from libraries
import React from "react";

//Main function for the component which returns formated details for a treatment course
const Course = (props) => {
  //constants declared and assigned props as their values
  const className = props.class;
  const {
    course_id,
    service_user_id,
    lead_practitioner_id,
    description,
    start_date,
    estimated_costs,
    completion_date,
    final_costs,
  } = props.treatmentCourse;

  //constant declared and assigned formatted treatment details as its value
  const formatCourse = (
    <div className={className}>
      <br />
      <strong>Treatment Course ID: {course_id}</strong> Client ID:{" "}
      {service_user_id} Lead Practitioner ID: {lead_practitioner_id}
      <br />
      <u>Description: {description}</u>
      <br />
      Course Start Date: {start_date} Estimated Costs: {estimated_costs}{" "}
      Completion Date: {completion_date} Final Costs: {final_costs}{" "}
    </div>
  );
  return <div>{formatCourse}</div>;
};

//Make the main function available for import
export default Course;
