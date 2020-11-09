import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import LeadContext from "./leadContext";
import leadReducer from "./leadReducer";
import axios from "axios"
import {
UPLOAD_FILES,
SEND_TODAYS
} from "../types";

const LeadState = (props) => {
  const initialState = {

  };



  const [state, dispatch] = useReducer(leadReducer, initialState);

const uploadFiles = async (files) => {

     const res = await axios.put(`/api/leads/`, files);

    dispatch({
      type: UPLOAD_FILES,
      payload: res.data,
    });
  };


 const sendTodays = async () =>{
   const res = await axios.get(`/api/leads`)
   dispatch({
     type: SEND_TODAYS,
     payload:res.data
   })
 } 

  return (
    <LeadContext.Provider
      value={{
      uploadFiles,
      sendTodays
      }}>
      {props.children}
    </LeadContext.Provider>
  );
};

export default LeadState;
