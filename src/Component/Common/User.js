import React, { useContext } from 'react';
import MeetingContext from '../../Context/meetingContext';

function User() {
  const mailContext = useContext(MeetingContext);
  const { currentUser } = mailContext;
  return (
    <div className='text-left' style={{ top: '0px' }}>
      {currentUser ? (
        <div>
          <label style={{ color: 'whitesmoke', marginLeft: '5px' }}>
            {currentUser.Nam}-{currentUser.NamKhanevadegi}
          </label>
          <a
            style={{
              color: 'whitesmoke',
              display: 'block',
              marginLeft: '2.2rem',
            }}
            href='http://software.moshanir.com/mis/'
          >
            خروج
          </a>
        </div>
      ) : null}
    </div>
  );
}

export default User;
