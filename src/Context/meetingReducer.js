/* eslint-disable import/no-anonymous-default-export */
import {
  CREATE_XML_AND_SEND_MAIL_SUCCESS,
  CREATE_XML_AND_SEND_MAIL_FAIL,
  GET_CONTACT_LIST_FAIL,
  GET_CONTACT_LIST_SUCCESS,
  CREATE_OR_UPDATE_CONTACT_FAIL,
  CREATE_OR_UPDATE_CONTACT_SUCCESS,
  SET_CREATE_XML_TO_NULL,
  SET_SHOW_MODAL,
  SET_SHOW_LOADER,
  SET_CREATE_OR_UPDATE_CONTACT_TO_NULL,
  GET_CONTACT_BY_PRSNUM_FAIL,
  GET_CONTACT_BY_PRSNUM_SUCCESS,
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
    case GET_CONTACT_BY_PRSNUM_SUCCESS:
      return {
        ...state,
        contactlist: action.payload,
      };
    case GET_CONTACT_BY_PRSNUM_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case SET_CREATE_OR_UPDATE_CONTACT_TO_NULL:
      return {
        ...state,
        createdorupdatedContact: action.payload,
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
    case SET_CREATE_XML_TO_NULL:
      return {
        ...state,
        createdXmlAndSendMail: action.payload,
      };
    case CREATE_XML_AND_SEND_MAIL_SUCCESS:
      return {
        ...state,
        createdXmlAndSendMail: action.payload,
      };
    case CREATE_XML_AND_SEND_MAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_CONTACT_LIST_SUCCESS:
      return {
        ...state,
        contactlist: action.payload,
      };
    case GET_CONTACT_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CREATE_OR_UPDATE_CONTACT_SUCCESS:
      return {
        ...state,
        createdorupdatedContact: action.payload,
      };
    case CREATE_OR_UPDATE_CONTACT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
