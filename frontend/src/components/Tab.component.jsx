import React from 'react';

const TabComponent = ({ placeholder }) => {
  return (
    <div className='grid'>
      <div className='max-w-[48rem] h-auto relative '>
        <textarea
          name='deskContent'
          className='focus:outline-none text-xl overflow-visible border-none shadow-md rounded-lg rounded-tl-none pt-6 pl-6 focus:none  w-full resize-none h-80 box-border'
          placeholder={placeholder}
   
        ></textarea>
     
      </div>
    </div>
  );
};

export default TabComponent;
