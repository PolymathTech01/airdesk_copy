import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Input = ({ placeholder, aFunction }) => {
  const [isRedirect, setIsRedirect] = useState(false);
  const [deskId, setDeskId] = useState('');

  const onEnterPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setIsRedirect(true);
    }
  };
  const handleChange = (e) => {
    setDeskId(e.target.value.toUpperCase());
  };
  return (
    <div>
      <form>
        <input
          type='text'
          className='p-4 rounded-md shadow-md border-none focus:outline-blue-400 w-full text-xl bg-white'
          placeholder={placeholder}
          defaultValue={aFunction}
          onKeyPress={onEnterPress}
          onChange={handleChange}
        />
      </form>
      {isRedirect && <Navigate to={`/view/${deskId}`} />}
    </div>
  );
};

export default Input;
