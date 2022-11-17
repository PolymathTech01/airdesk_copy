import React, { useState } from 'react';
import './Tab.css';
import clickCopy from '../Assets/clickCopy.svg';
import FileUpload from '../components/Dropzone/FileUpload';
import { useContext } from 'react';
import { UploadContext } from './Context/Upload.context';
const TabContent = ({
  disabled,
  messageFunction,
  value,
  showIcon,
  placeholder,
  view,
}) => {
  const [message, setMessage] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const { accpetedFilesContext } = useContext(UploadContext);
  console.log('accpeted files context length', accpetedFilesContext.length);
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  if (isClicked) {
    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
  }
  const handleCopy = (e) => {
    e.preventDefault();
    setIsClicked(true);
    navigator.clipboard.writeText(value);
    messageFunction(value);
  };
  const handleOnclick = () => {
    message && sessionStorage.setItem('message', message);
    sessionStorage.setItem(
      'acceptedFiles',
      JSON.stringify(accpetedFilesContext)
    );
  };
  const onEnterPress = (e) => {
    if (e.key === 'Enter') {
      if (message === '' || message === null) {
        alert('Sorry, Your desk cannot be empty!');
      } else {
        sessionStorage.setItem('message', message);
      }
      console.log('message', message);
    }
  };

  return (
    <div className='grid'>
      <div className='max-w-[48rem] h-auto relative '>
        <textarea
          name='deskContent'
          className='focus:outline-none text-xl overflow-visible border-none shadow-md rounded-lg rounded-tl-none pt-6 pl-6 focus:none  w-full resize-none h-80 box-border'
          placeholder={placeholder}
          defaultValue={value || message}
          disabled={disabled || false}
          onChange={handleMessageChange || messageFunction}
        ></textarea>
        {showIcon && (
          <div
            className='absolute bottom-3 right-2 bg-[#DEE7F4] p-3 rounded-2xl pl-4 pb-[0.85rem]'
            onClick={handleCopy}
          >
            {isClicked ? (
              <p className='text-[#006CFF] text-sm'>Copied</p>
            ) : (
              <img
                src={clickCopy}
                alt='click to copy'
                className='width-[5rem]'
              />
            )}
          </div>
        )}
        {/* here */}
        <FileUpload
          classNameFileUpload={
            'absolute -left-5 bottom-[-4.8rem] bg-transparent shadow-sm border-none outline-none'
          }
          ClassNameDeskUpload={`absolute right-0 rounded-full p-4 mt-2 ${
            accpetedFilesContext.length > 0 || message
              ? 'bg-[#3E9383] cursor-pointer'
              : 'bg-[#DEE7F4]'
          } `}
          view={view}
          message={message}
          handleOnclick={handleOnclick}
        />
      </div>
    </div>
  );
};

export default TabContent;
