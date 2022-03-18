//Import features from libraries
import React from "react";

//Main function for the component which returns a group of options for a select element
function CategoryFilters(props) {
  //constant declared and assigned props as its value
  const removeOption = props.style;

  return (
    <optgroup>
      <option value="">Select a treatment category</option>
      <option value="All" className={removeOption}>
        Display all treatments
      </option>
      <option value="Operations and vaccinations">
        Operations and vaccinations
      </option>
      <option value="Consultations and check-up">
        {" "}
        Consultations and check-up
      </option>
      <option value="Medicine and different types of tablets">
        {" "}
        Medicine and different types of tablets
      </option>
      <option value="Clinical reports and attached documents and history">
        {" "}
        Clinical reports and attached documents and history
      </option>
      <option value="Prescriptions and repeat Prescriptions">
        {" "}
        Prescriptions and repeat Prescriptions
      </option>
    </optgroup>
  );
}
//Make the main function available for import
export default CategoryFilters;
