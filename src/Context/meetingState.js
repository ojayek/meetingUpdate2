import React, { useReducer } from 'react';
import MeetingContext from './meetingContext';
import MeetingReducer from './meetingReducer';

//import { encode, decode } from 'js-base64';

import axios from 'axios';
import { SERVER_URL } from '../Constant/constant';
import {
  GET_MEETING_LIST_SUCCESS,
  GET_MEETING_LIST_FAIL,
  CREATE_OR_UPDATE_MEETING_SUCCESS,
  CREATE_OR_UPDATE_MEETING_FAIL,
  SET_CREATE_MEETING_TO_NULL,
  SET_SHOW_MODAL,
  SET_SHOW_LOADER,
  GET_MEETING_BY_ID_FAIL,
  GET_MEETING_BY_ID_SUCCESS,
  GET_CONTACT_DECODE_FAIL,
  GET_CONTACT_DECODE_SUCCESS,
} from './types';

const MeetingState = (props) => {
  const initialState = {
    error: null,
    createdorupdatedMeeting: null,
    showResult: false,
    meetinglist: [],
    showModal: null,
    showLoader: false,
    decodePrsCode: null,
    currentUser: null,
    isAdmin: false,
  };

  const [state, dispatch] = useReducer(MeetingReducer, initialState);

  const SetShowLoader = (data) => {
    dispatch({
      type: SET_SHOW_LOADER,
      payload: data,
    });
  };
  const setCreateMeetingToNull = () => {
    SetShowLoader(false);
    SetShowModal(false);
    dispatch({
      type: SET_CREATE_MEETING_TO_NULL,
      payload: null,
    });
  };

  // Register User
  const createOrUpdateMeeting = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        SERVER_URL + '/Meeting/CreateMeeting',
        formData,
        config
      );
      console.log('create or update meeting data:', res.data);
      // if (pc) {
      //   GetDecodePrsCode(pc);
      // }
      dispatch({
        type: CREATE_OR_UPDATE_MEETING_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CREATE_OR_UPDATE_MEETING_FAIL,
        payload: err.response,
      });
    }
  };
  const GetMeetingList = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.get(
        SERVER_URL + '/Meeting/GetMeetingList',
        config
      );
      //console.log('register data:', res.data);
      dispatch({
        type: GET_MEETING_LIST_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_MEETING_LIST_FAIL,
        payload: err.response.data.msgText,
      });
    }
  };

  const GetMeetingById = async (prsnum) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.get(
        SERVER_URL + '/Meeting/GetMeetingById/' + prsnum,
        config
      );
      //console.log('register data:', res.data);
      dispatch({
        type: GET_MEETING_BY_ID_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_MEETING_BY_ID_FAIL,
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
    <MeetingContext.Provider
      value={{
        error: state.error,
        meetinglist: state.meetinglist,
        createdorupdatedMeeting: state.createdorupdatedMeeting,
        showModal: state.showModal,
        showLoader: state.showLoader,
        decodePrsCode: state.decodePrsCode,
        currentUser: state.currentUser,
        isAdmin: state.isAdmin,
        createOrUpdateMeeting,

        GetMeetingList,
        setCreateMeetingToNull,
        SetShowModal,
        SetShowLoader,
        GetMeetingById,
        GetDecodePrsCode,
      }}
    >
      {props.children}
    </MeetingContext.Provider>
  );
};

export default MeetingState;
