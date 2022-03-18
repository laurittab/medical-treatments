//Import features from libraries
import React from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

//Import components from folder
import Course from "../displays/Course.jsx";
import Treatment from "../displays/Treatment.jsx";

/**
 *Converts JSON object to a JavaScript object
 *@param {object} a JSONdata  object
 *@return {object} a JavaScript object
 */
export const convertToJS = (json) => JSON.parse(JSON.stringify(json));

/**
 *Creates a list of treatments, each as formated by the Treatment component
 *@param {object[]} a list of treatments
 *@return {object[]} a formated list of treatments with unique IDs
 */
export const treatmentList = (arr) => {
  var records = convertToJS(arr);
  return records.map((record) => (
    <ul key={uuidv4()}>
      <Treatment patientTreatments={record} />
    </ul>
  ));
};

/**
 *Creates a list of courses, each as formated by the Course component
 *@param {object[]} a list of courses
 *@return {object[]} a formated list of courses with unique IDs
 */
export const courseList = (arr) => {
  var records = convertToJS(arr);
  return records.map((record) => (
    <ul key={uuidv4()}>
      <Course treatmentCourse={record} class={"ul-lists"} />
    </ul>
  ));
};

/**
 *Creates a list formated list based on responses from the server
 *@param {object[]} a list of responses
 *@return {object[]} a formated list of updates with unique IDs
 */
export const listResponses = (list) =>
  list.map((record) => (
    <li key={uuidv4()}>
      {record.message}, <u>changes made:</u> {JSON.stringify(record.changes)},{" "}
      <u>data amended:</u> {JSON.stringify(record.data)}
    </li>
  ));

/**
 *Saves data to the server
 *@param {object} details to be saved
 *@param {string} type of data, e.g. record, treatment or course
 *@param {function} to update a state variable
 *@return {object} new value for a state variable
 */
export const saveRecord = (value, type, setUpdate) =>
  axios
    .post(`https://1-a-node-app-for-medical-records.glitch.me/${type}`, value)
    .then((response) => {
      var resData = response;
      return setUpdate(resData.data);
    });

/**
 *Updates data on the server
 *@param {object} details to be updated
 *@param {string} type of data, e.g. record, treatment or course
 *@param {string} an ID number
 *@param {function} to update a state variable
 *@return {object} new value for a state variable
 */
export const updateRecord = (value, type, id, setUpdate) =>
  axios
    .put(
      `https://1-a-node-app-for-medical-records.glitch.me/update${type}/${id}`,
      value
    )
    .then((response) => {
      var resData = response;
      return setUpdate(resData.data);
    });

/**
 *Deletes data from the server
 *@param {string} type of data, e.g. record, treatment or course
 *@param {string} an ID number
 *@param {function} to update a state variable
 *@return {object} new value for a state variable
 */
export const deleteRecord = (type, id, setUpdate) =>
  axios
    .delete(
      `https://1-a-node-app-for-medical-records.glitch.me/delete${type}/${id}`
    )
    .then((response) => {
      var resData = response.data;
      return setUpdate(resData);
    });
