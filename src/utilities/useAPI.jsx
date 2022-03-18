//Import of features from libraries
import { useState, useEffect } from "react";
import axios from "axios";

//Main function for the component which returns data from a server response
const useAPI = (endpoint) => {
  //constant declared as variable & function pairs for the useState hook, with data initialised to an empty array
  const [data, setData] = useState([]);

  //Call data when component is mounted
  useEffect(() => {
    fetchRecords();
  }, [endpoint]);

  //Make a request to the server
  function fetchRecords() {
    axios.get(endpoint).then((response) => {
      var resData = response.data;
      setData(resData.data);
    });
  }
  return data;
};

//Make the main function available for import
export default useAPI;
