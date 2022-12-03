import React, { useEffect, useState, useCallback, useContext } from 'react';
import logo from '../Assets/logo_svg.png';
import dummyImg from '../Assets/qrcode.png';
import './admin.css';
import QRCode from 'qrcode';
import { Desks } from '../services/api';
import { notifyError, notifySuccess } from './DeskToast';
import { Spinner } from 'flowbite-react';
import { Link } from 'react-router-dom';
import copyLogo from '../Assets/link-chain-10470.svg';
import codeLogo from '../Assets/files.svg';
import paperTilt from '../Assets/paper-plane-tilt_1.svg';
import TwitterLogo from '../Assets/twitter.svg';
import ReactGA from 'react-ga';
import axios from 'axios';
import { UploadContext } from './Context/Upload.context';
// import { createBrowserHistory } from 'history';

const Admin = () => {
  const [src, setSrc] = useState(dummyImg);
  const [message, setMessage] = useState('');
  const [deskId, setDeskId] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [status, setStatus] = useState(false);
  const { acceptdFilesContext } = useContext(UploadContext);
  const generateDeskId = useCallback(() => {
    if (message === '' || message === null) {
      notifyError('Sorry, Your desk cannot be empty!');
    } else {
      setLoading(true);
      const res = Desks.saveDesk(message);
      res
        .then((res) => {
          setLoading(false);
          setDeskId(res.data.data);
          setStatus(res.data.status);
          notifySuccess('Your desk has been created successfully!');
        })
        .catch((error) => {
          notifyError(error.message);
        });
    }
    // eslint-disable-next-line
  }, [message]);
  // const handleMessageChange = (e) => {
  // };
  useEffect(() => {
    ReactGA.initialize('UA-235380934-1');
    // setDeskUrl(true);
    if (deskId) {
      QRCode.toDataURL(
        `
       ${process.env.REACT_APP_BASE_URL}/view/${deskId}`
      ).then((result) => setSrc(result));

      ReactGA.event({
        category: `ID - ${deskId}`,
        action: `Desk generated`,
        label: 'AirDesk',
      });
    }
  }, [deskId]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  if (isCopied) {
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }
  const handleCopy = (e) => {
    e.preventDefault();
    status && setIsCopied(true);
    navigator.clipboard.writeText(deskId);
  };
  useEffect(() => {
    setMessage(sessionStorage.getItem('message'));
    message && generateDeskId();
  }, [generateDeskId, message]);

  return (
    <div
      className='mx-4'
      onLoad={() => {
        setMessage(sessionStorage.getItem('message'));
      }}
    >
      <div className='sm:pt-7 pt-4 sm:pb-7 pb-4 codeContainer flex justify-between max-w-[48rem]'>
        <Link to={'/'}>
          <img src={logo} className='w-[10.688rem]' alt='logo' />
        </Link>
        <a
          href='https://twitter.com/airdesk_link'
          target='_blank'
          rel='noreferrer'
        >
          <img src={TwitterLogo} alt='twitterLogo' />
        </a>
      </div>

      <div className='container-grid'>
        <div className='inner-grid'>
          <div id='barcode'>
            <img src={src} alt='barcode' className='h-[100%] rounded-lg' />
          </div>
          <div id='codeInstruction'>
            <p className='text-slate-500 leading-[1.313rem]'>
              Visit <a href='user'>airdesk.link</a> on other devices and Scan
              this QRcode or input code to view
            </p>
          </div>
          <div
            className='text-center flex bg-[#DFFCF8] py-2 rounded-md border  font-bold h-[3rem] gap-[1rem] cursor-pointer lg:w-[85%] '
            id='deskCode'
            style={{ justifyContent: 'center' }}
            onClick={handleCopy}
          >
            <p className='text-[#069362] my-auto text-center'>
              {loading ? (
                <Spinner aria-label='Medium sized spinner example' size='md' />
              ) : isCopied ? (
                'Copied'
              ) : (
                deskId || 'Desk Code'
              )}
            </p>
            {!isCopied &&
              ((
                <img
                  src={copyLogo}
                  alt='copy'
                  className='h-[1.5rem] relative top-[0.1rem]'
                />
              ) || (
                <img
                  src={copyLogo}
                  alt='copy'
                  className='h-[1.5rem] relative top-[0.1rem]'
                />
              ))}
          </div>
        </div>
        <div></div>
      </div>
      <div className='mt-8'>
        <div className='container-tabs active-tab'>
          <ul className='tabs'>
            <li className='font-bold text-xl rounded-tl-2xl border-r-0 flex bg-white h-[2em] shadow-md'>
              <span
                className='font-bold py-4 px-[0.5rem] rounded-t-2xl rounded-tl-2xl relative  text-xl bg-white flex'
                style={{ justifyContent: 'space-evenly', minWidth: '9em' }}
              >
                <img
                  src={codeLogo}
                  alt='codeLogo'
                  className='codeLogo h-[1.5rem]'
                />
                <p>{deskId ? deskId : 'Desk Code'}</p>
              </span>
              {/* <span className='text-[#006CFF] bg-slate-200 px-4 pb-4 pt-3 mb-0 rounded-tr-xl'>
                <p className='relative bottom-1'>+</p>
              </span> */}
            </li>
          </ul>
        </div>
        <div className='max-w-[48rem] h-auto '>
          <form onSubmit={handleSubmit} className='relative'>
            <textarea
              name=''
              id=''
              className='focus:outline-none text-xl overflow-visible border-none shadow-md rounded-lg rounded-tl-none pt-6 pl-6 focus:none  w-full resize-none h-80 box-border'
              placeholder='Write/Paste link or content you want to publish here'
              defaultValue={message}
              // onChange={}
            ></textarea>

            {/* <button
              onClick={generateDeskId}
              type='submit'
              className='rounded-lg py-4 px-6 bg-[#DFFCF8] text-[#069362] font-bold uppercase pub flex absolute right-0 w-[11rem] h-auto justify-between border'
            >
              <p>Publish</p>
              <img src={planeTilt} alt='paper-plane-tilt' />
            </button> */}
            <img
              src={paperTilt}
              alt='papertilt'
              onClick={message && generateDeskId}
              className={`absolute right-0 rounded-full p-4 ${
                message ? 'bg-[#3E9383] cursor-pointer' : 'bg-[#DEE7F4]'
              } `}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
