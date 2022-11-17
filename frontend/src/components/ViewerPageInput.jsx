import React, { useContext, useState } from 'react';
import TwitterLogo from '../Assets/twitter.svg';
import logo from '../Assets/logo_svg.png';
import { Desks } from '../services/api';
import Tab from './Tab';
import { notifyError, notifySuccess } from './DeskToast';
import { Link } from 'react-router-dom';
import Barcode from './Barcode';
import { QrcodeContext } from './Context/Qrcode.context';
import ModalTest from './ModalTest';

const ViewerPageInput = () => {
  const [deskData, setDeskData] = useState('');
  const [deskId, setDeskId] = useState('');
  const { openModal, setOpenModal } = useContext(QrcodeContext);

  const generateDeskData = async (deskId) => {
    try {
      const desk = await Desks.getMessagebyId(deskId);
      setDeskData(desk.data.data);
      notifySuccess('Your Desk data has been fetched successfully!');
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

      <div
        className='mt-8 grid max-w-[48rem]'
        style={{ gridTemplateColumns: '1fr 64px', columnGap: '1rem' }}
      >
        <form>
          <input
            type='text'
            name='inputDeskCode'
            className='p-4 rounded-md shadow-md border-none outline-blue-400 w-full text-xl'
            value={deskId}
            placeholder='Desk Code Here'
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
          page={true}
          view={true}
          value={deskData}
          deskId={deskId}
          showIcon={true}
        />
      </div>
    </div>
  );
};

export default ViewerPageInput;
