import React, { useContext, useState } from 'react';
import swal from 'sweetalert';
import MailContext from '../../../Context/mailContext';

const ShowModal = () => {
  const mailContext = useContext(MailContext);

  const { SetShowModal, showModal, error, setCreateXmlToNull } = mailContext;

  const shwoswal = () => {
    swal({
      title: 'ارسال ',
      text: 'نامه شما با موفقیت ارسال گردید',
      icon: 'success',
    }).then((value) => {
      SetShowModal(false);
      setCreateXmlToNull();
    });
  };
  return <div>{showModal ? shwoswal() : null}</div>;
};

export default ShowModal;
