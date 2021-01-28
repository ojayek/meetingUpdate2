import React, { useContext, useEffect } from 'react';
import MailContext from '../../Context/mailContext';
import swal from 'sweetalert';

const RefreshContactList = (prop) => {
  const changeStateByRefreshChild = () => {
    prop.changeStateByRefreshChild();
  };

  const mailContext = useContext(MailContext);

  const { SetCreateOrUpdateContactToNull } = mailContext;
  const shwoswal = () => {
    swal({
      title: 'ارسال ',
      text: 'تغییرات با موفقیت به روز رسانی گردید',
      icon: 'success',
    }).then((value) => {
      SetCreateOrUpdateContactToNull();
      changeStateByRefreshChild();
    });
  };

  return <div>{shwoswal()}</div>;
};

export default RefreshContactList;
