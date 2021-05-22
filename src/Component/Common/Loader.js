import React from 'react';
import spinner from '../../images/spinner.gif';

const Loader = () => {
  return (
    <div>
      <img
        src={spinner}
        alt='jacket'
        className='card bg-info text-center card-form'
      />
    </div>
  );
};

export default Loader;
