import React, { useMemo, useState } from 'react';
// import { Calendar, DatePicker } from 'react-persian-datepicker';
import CustomTable from './Common/CustomTable';
import { TitleColumns } from './Common/Columns';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import '../css/KiarashDatePicker/responsiveDatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import { utils } from 'react-modern-calendar-datepicker';

const CreateSummaryOfMeeting = () => {
  const [meetingDate, setMeetingDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedRow, setSelectedRow] = useState('');
  const [showData, setShowData] = useState(false);
  const [meetingSubTitle, setMeetingSubTitle] = useState('');
  const [tracingResponsible, setTracingResponsible] = useState('');
  const [contactlist, setContactList] = useState([]);
  const persianToday = utils('fa').getToday(); // { year: 1399, month: 11, day: 9 }

  const setSelectedRowData = (row) => {
    setSelectedRow(row.original);
    // console.log(row.original);
    if (row.original.DirectPhoneNo) {
      // setDirectPhoneNo(row.original.DirectPhoneNo);
    }
    if (row.original.Tel) {
      // setTel(row.original.Tel);
    }
  };
  const kartableActionsAdmin = {
    Header: 'عملیات',
    columns: [
      {
        Header: '.',
        Cell: ({ row }) => (
          <div className='Operations'>
            <button
              type='button'
              className='editBtn'
              data-toggle='modal'
              data-target='.bd-example-modal-lg'
              onClick={(e) => {
                // setTel('');
                // setDirectPhoneNo('');
                // setSelectedRowData(row);
              }}
            >
              ویرایش
            </button>
            <button
              type='button'
              className='editBtn'
              data-toggle='modal'
              data-target='.bd-example-modal-lg'
              onClick={(e) => {
                console.log('row.id', row.id, row);
                let filterList = contactlist.filter(
                  (o) => o.id !== row.original.id
                );
                console.log('filterData', filterList);
                setTimeout(() => {
                  setShowData(false);
                  setContactList(filterList);
                }, 1);
                setTimeout(() => {
                  if (contactlist.length > 0) {
                    setShowData(true);
                  } else {
                    setShowData(false);
                  }
                }, 2);
                // setSelectedRowData(row);
              }}
            >
              حذف
            </button>
          </div>
        ),
      },
    ],
  };
  const KartableColumns = useMemo(
    () => [kartableActionsAdmin, TitleColumns],
    []
  );

  const onChanged = (e, Type, maxNum) => {
    switch (Type) {
      case 'tracingResponsible':
        // setShowError(false);
        if (e.target.value.length > maxNum)
          e.target.value = e.target.value.slice(0, maxNum);
        //  setIsChangeTel(true);
        setTracingResponsible(e.target.value);
        break;
      case 'meetingSubTitle':
        // setShowError(false);
        if (e.target.value.length > maxNum)
          e.target.value = e.target.value.slice(0, maxNum);
        // setIsChangeDirectPhone(true);
        setMeetingSubTitle(e.target.value);
        break;
      default:
        break;
    }
  };

  const insertToSubjects = async () => {
    setTimeout(() => {
      setShowData(false);
    }, 1);
    let subjects = contactlist;
    let subjectOfMeeting = {
      Subject: meetingSubTitle,
      tracingResponsible: tracingResponsible,
      endDate: endDate.year + '/' + endDate.month + '/' + endDate.day,
      id: contactlist.length + 1,
    };
    subjects.push(subjectOfMeeting);
    setContactList(subjects);
    setEndDate(null);
    setMeetingSubTitle('');
    setTracingResponsible('');

    if (contactlist.length > 0) {
      setTimeout(() => {
        setShowData(true);
      }, 1);
    } else {
      setTimeout(() => {
        setShowData(false);
      }, 1);
    }
    console.log(contactlist);
  };

  return (
    <div className='mt-5'>
      {/* // */}
      <div
        className='modal fade bd-example-modal-lg'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='myLargeModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                ویرایش
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form>
                <div className='form-group'>
                  <label className='col-form-label'></label>
                  موضوع
                  <input
                    type='text'
                    value={meetingSubTitle ? meetingSubTitle : ''}
                    onChange={(e) => {
                      onChanged(e, 'meetingSubTitle', 900);
                    }}
                    className='text-center form-control'
                    id='recipient-name'
                  />
                  {/* {showdpError && <label key='9'>*</label>} */}
                </div>
                <div className='form-group'>
                  <label htmlFor='message-text' className='col-form-label'>
                    مسوول پیگیری
                  </label>
                  <input
                    type='text'
                    value={tracingResponsible ? tracingResponsible : ''}
                    onChange={(e) => {
                      onChanged(e, 'tracingResponsible', 900);
                    }}
                    className='text-center form-control'
                  />
                  {/* {showtelError && <label key='9'>*</label>} */}
                </div>
                <div className='form-group'>
                  <label htmlFor='message-text' className='col-form-label'>
                    مهلت انجام
                  </label>
                  <input
                    type='text'
                    value={endDate ? endDate : ''}
                    onChange={(e) => {
                      onChanged(e, 'tracingResponsible', 900);
                    }}
                    className='text-center form-control'
                  />
                  {/* {showtelError && <label key='9'>*</label>} */}
                </div>
              </form>
            </div>
            <div className='text-center'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
                // onClick={changeStateByRefreshChild}
              >
                بستن
              </button>
              <button
                type='button'
                className='btn btn-primary'
                data-dismiss='modal'
                // onClick={(e) => validateAndSend(e, 'Admin')}
              >
                ذخیره تغییرات
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* /// */}

      <form>
        <div className='form-row' style={{ direction: 'rtl' }}>
          <label
            htmlFor='meetingTitle'
            className='col-1 col-form-label forLable'
          >
            عنوان جلسه:
          </label>
          <div className='col-5'>
            <input
              type='text'
              className='form-control'
              id='meetingTitle'
              // placeholder='عنوان جلسه'
            />
          </div>
          <label
            htmlFor='meetingNumber'
            className='col-1 col-form-label forLable '
          >
            شماره جلسه:
          </label>
          <div className='col-1'>
            <input
              type='text'
              className='form-control'
              id='meetingNumber'
              // placeholder='شماره جلسه'
            />
          </div>
          <label
            htmlFor='inputPassword4'
            className='col-1 col-form-label forLable text-left '
          >
            تاریخ:
          </label>
          <div className='col-2 text-right'>
            <DatePicker
              calendarClassName='responsive-calendar' // added this
              value={meetingDate}
              onChange={setMeetingDate}
              inputPlaceholder='تاریخ را انتخاب نمایید'
              shouldHighlightWeekends
              locale='fa' // add this
            />
          </div>
          <label
            htmlFor='inputPassword4'
            className='col-1 col-form-label forLable '
          ></label>
        </div>

        <div className='form-row mt-2' style={{ direction: 'rtl' }}>
          <label htmlFor='participators' className='col-1 col-form-label'>
            شرکت کنندگان:
          </label>
          <div className='col-8'>
            <input
              type='text'
              className='form-control'
              id='participators'
              // placeholder=' شرکت کنندگان'
            />
          </div>
          <label
            htmlFor='meetingLocation'
            className='col-1 col-form-label forLable '
          >
            محل تشکیل جلسه:
          </label>
          <div className='col-2 '>
            <input
              type='text'
              className='form-control w-75'
              id='meetingLocation'
              // placeholder='محل تشکیل جلسه'
            />
          </div>
        </div>
        <div className='form-row mt-2' style={{ direction: 'rtl' }}>
          <label
            htmlFor='participators'
            className='col-12 col-form-label text-center font-weight-bold'
          >
            موضوعات مطرح شده در جلسه
          </label>
        </div>
        <div className='form-row' style={{ direction: 'rtl' }}>
          <label
            htmlFor='meetingTitle'
            className='col-1 col-form-label forLable'
          >
            موضوع:
          </label>
          <div className='col-5'>
            <input
              type='text'
              className='form-control'
              id='meetingSubTitle'
              value={meetingSubTitle}
              onChange={(e) => onChanged(e, 'meetingSubTitle', 900)}
              // placeholder='عنوان جلسه'
            />
          </div>
          <label
            htmlFor='meetingNumber'
            className='col-1 col-form-label forLable '
          >
            مسوول پیگیری:
          </label>
          <div className='col-1'>
            <input
              type='text'
              className='form-control'
              id='tracingResponsible'
              value={tracingResponsible}
              onChange={(e) => onChanged(e, 'tracingResponsible', 900)}
              // placeholder='شماره جلسه'
            />
          </div>
          <label
            htmlFor='inputPassword4'
            className='col-1 col-form-label forLable text-left '
          >
            مهلت انجام:
          </label>
          <div className='col-2 text-right'>
            <DatePicker
              calendarClassName='responsive-calendar' // added this
              value={endDate}
              onChange={setEndDate}
              inputPlaceholder='تاریخ را انتخاب نمایید'
              shouldHighlightWeekends
              locale='fa' // add this
            />
          </div>
          <label
            htmlFor='inputPassword4'
            className='col-1 col-form-label forLable '
          >
            <button
              type='button'
              onClick={insertToSubjects}
              className='btn btn-secondary ml-2  forLable'
            >
              ثبت موضوع
            </button>
          </label>
        </div>
        <div className='form-row m-3' style={{ direction: 'rtl' }}>
          {showData ? (
            <CustomTable columns={KartableColumns} data={contactlist} />
          ) : null}
        </div>

        <button type='submit' className='btn btn-primary mt-2 ml-3 forLable'>
          ثبت
        </button>
      </form>
    </div>
  );
};

export default CreateSummaryOfMeeting;
