import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div className='text-center mt-15'>
      <NavLink to='/CreateForm'>ایجاد یک صورتجلسه</NavLink>
    </div>
  );
};

export default Home;
