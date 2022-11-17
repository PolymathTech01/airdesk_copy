import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { notifyError, notifySuccess } from './DeskToast';
import logo from '../Assets/logo_svg.png';
import TwitterLogo from '../Assets/twitter.svg';
import { Desks } from '../services/api';
import Tab from './Tab';
import Barcode from './Barcode';
import ModalTest from './ModalTest';
import { useContext } from 'react';
import { QrcodeContext } from './Context/Qrcode.context';
const ViewerPageInput = () => {
  const { deskIdParams } = useParams();
  const [deskData, setDeskData] = useState('');
  const [deskId, setDeskId] = useState('');
  const { openModal, setOpenModal } = useContext(QrcodeContext);
  useEffect(() => {
    generateDeskData(deskIdParams);
  }, [deskIdParams]);

  const generateDeskData = async (deskId) => {
    try {
      const desk = await Desks.getMessagebyId(deskId);
      notifySuccess('Your Desk data has been fetched successfully!');
      setDeskData(desk.data.data);
    } catch (err) {
      notifyError('Sorry, Desk data not found');
    }
  };

  const onEnterPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      generateDeskData(deskId);
    }
  };
  const handleClick = () => {
    setOpenModal(!openModal);
  };
  return (
    <div className='pb-4 mx-4'>
      <Link to={'/'}>
        <div className='sm:pt-7 pt-4 sm:pb-7 pb-4 flex justify-between max-w-[48rem]'>
          <Link to={'/'}>
            <img src={logo} className='w-[10.688rem]' alt='logo' />
          </Link>
          <a
            href='https://twitter.com/airdesk_link'
            target='_blank'
            rel='noreferrer'
          >
            <img src={TwitterLogo} alt='twitterLogo' />{' '}
          </a>
        </div>
      </Link>
      <div
        className='mt-8 grid max-w-[48rem]'
        style={{ gridTemplateColumns: '1fr 64px', columnGap: '1rem' }}
      >
        <form>
          <input
            type='text'
            name='inputDeskCode'
            id=''
            className='p-4 rounded-md shadow-md border-none focus:outline-blue-400 w-full text-xl'
            placeholder='Desk Code Here'
            value={deskId}
            onChange={(e) => setDeskId(e.target.value.toUpperCase())}
            onKeyPress={onEnterPress}
          />
        </form>

        <div className='-top-20 w-[64px] h-[58px]'>
          <Barcode clickFunction={handleClick} />
          {openModal && <ModalTest />}
        </div>
      </div>
      <div className='mt-8'>
        <Tab
          desk='Desk 1'
          view={true}
          page={true}
          value={deskData}
          deskId={deskId}
          showIcon={true}
        />
      </div>
    </div>
  );
};

export default ViewerPageInput;
// h-[84px]
