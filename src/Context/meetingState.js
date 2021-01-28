import React, { useReducer } from 'react';
import MailContext from './mailContext';
import MailReducer from './mailReducer';

import { encode, decode } from 'js-base64';

import axios from 'axios';
import { SERVER_URL } from '../Constant/constant';
import {
  CREATE_XML_AND_SEND_MAIL_SUCCESS,
  CREATE_XML_AND_SEND_MAIL_FAIL,
  GET_CONTACT_LIST_FAIL,
  GET_CONTACT_LIST_SUCCESS,
  CREATE_OR_UPDATE_CONTACT_SUCCESS,
  CREATE_OR_UPDATE_CONTACT_FAIL,
  SET_CREATE_XML_TO_NULL,
  SET_SHOW_MODAL,
  SET_SHOW_LOADER,
  SET_CREATE_OR_UPDATE_CONTACT_TO_NULL,
  GET_CONTACT_BY_PRSNUM_SUCCESS,
  GET_CONTACT_BY_PRSNUM_FAIL,
  GET_CONTACT_DECODE_FAIL,
  GET_CONTACT_DECODE_SUCCESS,
} from './types';

const MailState = (props) => {
  const initialState = {
    createdXmlAndSendMail: null,
    error: null,
    createdorupdatedContact: null,
    showResult: false,
    contactlist: [],
    showModal: null,
    showLoader: false,
    decodePrsCode: null,
    currentUser: null,
    isAdmin: false,
  };

  const [state, dispatch] = useReducer(MailReducer, initialState);

  const SetShowLoader = (data) => {
    dispatch({
      type: SET_SHOW_LOADER,
      payload: data,
    });
  };
  const setCreateXmlToNull = () => {
    SetShowLoader(false);
    SetShowModal(false);
    dispatch({
      type: SET_CREATE_XML_TO_NULL,
      payload: null,
    });
  };
  const SetCreateOrUpdateContactToNull = () => {
    dispatch({
      type: SET_CREATE_OR_UPDATE_CONTACT_TO_NULL,
      payload: null,
    });
  };
  // Register User
  const createXmlAndSendMail = async (formData, inputData) => {
    SetShowLoader(true);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        code: encode(inputData.code),
        organization: encode(inputData.organization),
        position: encode(inputData.position),
        letterno: encode(inputData.letterNo),
        subject: encode(inputData.subject),
        to: inputData.reciever,
        department: encode(inputData.department),
        body: encode(inputData.subject),
      },
    };
    //  console.log(inputData);

    try {
      const res = await axios.post(
        SERVER_URL + '/Email/CreateXml',
        formData,
        config
      );
      SetShowLoader(false);
      SetShowModal(true);
      // console.log('created email response data:', res.data);
      dispatch({
        type: CREATE_XML_AND_SEND_MAIL_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      console.log('error', err);
      dispatch({
        type: CREATE_XML_AND_SEND_MAIL_FAIL,
        payload: err,
      });
    }
  };

  // Register User
  const createOrUpdateContact = async (formData, pc) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        SERVER_URL + '/Contact/CreateContact',
        formData,
        config
      );
      console.log('create or update contact data:', res.data);
      if (pc) {
        GetDecodePrsCode(pc);
      }
      dispatch({
        type: CREATE_OR_UPDATE_CONTACT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CREATE_OR_UPDATE_CONTACT_FAIL,
        payload: err.response.data.msgText,
      });
    }
  };
  const GetContactList = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.get(
        SERVER_URL + '/Contact/GetContactList',
        config
      );
      //console.log('register data:', res.data);
      dispatch({
        type: GET_CONTACT_LIST_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_CONTACT_LIST_FAIL,
        payload: err.response.data.msgText,
      });
    }
  };

  const GetContactByPrsNum = async (prsnum) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.get(
        SERVER_URL + '/Contact/GetContactByPrsNum/' + prsnum,
        config
      );
      //console.log('register data:', res.data);
      dispatch({
        type: GET_CONTACT_BY_PRSNUM_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_CONTACT_BY_PRSNUM_FAIL,
        payload: err.response.data.msgText,
      });
    }
  };
  const GetDecodePrsCode = async (prsnum) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.get(
        SERVER_URL + '/Contact/decode/' + prsnum,
        config
      );
      console.log('prscode data:', res.data);
      dispatch({
        type: GET_CONTACT_DECODE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_CONTACT_DECODE_FAIL,
        payload: err.data.msgText,
      });
    }
  };

  const SetShowModal = (data) => {
    dispatch({
      type: SET_SHOW_MODAL,
      payload: data,
    });
  };

  return (
    <MailContext.Provider
      value={{
        createdXmlAndSendMail: state.createdXmlAndSendMail,
        error: state.error,
        contactlist: state.contactlist,
        createdorupdatedContact: state.createdorupdatedContact,
        showModal: state.showModal,
        showLoader: state.showLoader,
        decodePrsCode: state.decodePrsCode,
        currentUser: state.currentUser,
        isAdmin: state.isAdmin,
        createOrUpdateContact,
        createXmlAndSendMail,
        GetContactList,
        setCreateXmlToNull,
        SetShowModal,
        SetShowLoader,
        SetCreateOrUpdateContactToNull,
        GetContactByPrsNum,
        GetDecodePrsCode,
      }}
    >
      {props.children}
    </MailContext.Provider>
  );
};

export default MailState;
