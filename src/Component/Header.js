import React from 'react';
import Logo from '../images/mosh2.png';
import '../css/Header.css';
import User from './Common/User';

const Header = () => {
  return (
    <div className='text-right HeaderMis'>
      <div className='text-right  '>
        <User style={{ position: 'sticky', top: 0 }} />
        <img
          src={Logo}
          style={{ height: '95px', position: 'sticky', top: 0 }}
          alt='pic'
        />
      </div>
    </div>
  );
};

export default Header;
