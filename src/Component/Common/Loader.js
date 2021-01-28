import React from 'react';
import spinner from '../../images/spinner.gif';

const Loader = () => {
  return (
    <div>
      
      <img src={spinner} className='card bg-info text-center card-form' />
    </div>
  );
};

export default Loader;
