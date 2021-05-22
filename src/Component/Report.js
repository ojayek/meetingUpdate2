import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Table from '../Component/Common/TableContainer';
import '../css/Report.css';
import Header from './Header';
function Report() {
  const [data, setData] = useState([]);
  const Url = 'http://localhost:58148/api/Meeting/GetAllMeeting';
  useEffect(() => {
    axios(Url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(data);

  const columns = useMemo(() => [
    {
      Header: 'صورت جلسات',
      columns: [
        {
          Header: 'عنوان',
          accessor: 'Title',
        },
        {
          Header: 'شماره',
          accessor: 'Id',
        },
        {
          Header: 'شماره جلسه',
          accessor: 'MeetingNumber',
        },
        {
          Header: 'شرکت کنندگان',
          accessor: 'InnerParticipators',
          Cell: ({ cell: { value } }) =>
            value ? <a href={value}>{value}</a> : '-',
        },
        {
          Header: 'محل تشکیل',
          accessor: 'Location',
          Cell: ({ cell: { value } }) => value || '-',
        },
        {
          Header: 'تاریخ',
          accessor: 'MeetingDate',
        },
        {
          Header: 'تاریخ',
          accessor: 'MeetingDateStr',
          Cell: ({ cell: { value } }) => value || '-',
        },
        {
          Header: 'Null',
          accessor: 'lstSubjects',
          Cell: ({ cell: { value } }) => value || '-',
        },
      ],
    },
  ]);

  return (
    <div className='App'>
      <Header />
      <h1>
        <center>کلیه جلسات</center>
      </h1>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default Report;
