export const TitleColumns = {
  Header: '-',
  columns: [
    {
      Header: 'عنوان',
      accessor: 'Title',
      width: '30px',
    },
    {
      Header: 'شماره',
      accessor: 'Id',
      width: '30px',
    },

    {
      Header: 'تاریخ',
      accessor: 'MeetingDate',
      width: '30px',
    },
    {
      Header: 'محل تشکیل',
      accessor: 'Location',
      width: '30px',
    },
    {
      Header: 'شرکت کنندگان',
      accessor: 'InnerParticipator',
      width: '30px',
    },
  ],
};

export const SubTitleColumns = {
  Header: '-',
  columns: [
    {
      Header: 'شماره',
      accessor: 'Id',
      width: '30px',
    },
    {
      Header: 'موضوع',
      accessor: 'SubTitle',
      width: '30px',
    },
    {
      Header: 'مسسوول پیگیری',
      accessor: 'Responsible',
      width: '30px',
    },

    {
      Header: 'مهلت انجام',
      accessor: 'DeadLine',
      width: '30px',
    }
  ],
};
