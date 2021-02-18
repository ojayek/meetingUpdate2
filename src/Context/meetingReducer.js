/* eslint-disable import/no-anonymous-default-export */
import {
 
  GET_MEETING_LIST_SUCCESS,
  GET_MEETING_LIST_FAIL,
  
  CREATE_OR_UPDATE_MEETING_FAIL,
  CREATE_OR_UPDATE_MEETING_SUCCESS,
  SET_CREATE_MEETING_TO_NULL ,
  SET_SHOW_MODAL,
  SET_SHOW_LOADER,
 
  GET_MEETING_BY_ID_FAIL,
  GET_MEETING_BY_ID_SUCCESS,
  GET_CONTACT_DECODE_SUCCESS,
  GET_CONTACT_DECODE_FAIL,
  
} from './types';

export default (state, action) => {
  switch (action.type) {
    case GET_CONTACT_DECODE_SUCCESS:
      return {
        ...state,
        decodePrsCode: action.payload.PrsCode,
        currentUser:action.payload.Data,
        isAdmin:action.payload.isAdmin,
      };
    case GET_CONTACT_DECODE_FAIL:
      return {
        ...state,
        error: action.payload,        
      };
    case GET_MEETING_BY_ID_SUCCESS:
      return {
        ...state,
        meetinglist: action.payload,
      };
    case GET_MEETING_BY_ID_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case  SET_CREATE_MEETING_TO_NULL:
      return {
        ...state,
        createdorupdatedMeeting: action.payload,
      };
    case SET_SHOW_LOADER:
      return {
        ...state,
        showLoader: action.payload,
      };
    case SET_SHOW_MODAL:
      return {
        ...state,
        showModal: action.payload,
      };
   

    case GET_MEETING_LIST_SUCCESS:
      return {
        ...state,
        meetinglist: action.payload,
      };
    case GET_MEETING_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CREATE_OR_UPDATE_MEETING_SUCCESS:
      return {
        ...state,
        createdorupdatedMeeting: action.payload,
      };
    case CREATE_OR_UPDATE_MEETING_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
