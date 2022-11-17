import logo from '../Assets/logo_svg.png';
import { useContext } from 'react';
import Barcode from './Barcode';
import TwitterLogo from '../Assets/twitter.svg';
import Input from './Input';
import ModalTest from './ModalTest';
import { QrcodeContext } from './Context/Qrcode.context';
import '../App.css';
import { Link } from 'react-router-dom';
const Header = () => {
  // const [openModal, setOpenModal] = useState(false);
  const { openModal, setOpenModal } = useContext(QrcodeContext);
  const handleClick = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className=' pb-4'>
      <div className='sm:pt-7 pt-4 sm:pb-7 pb-4 flex justify-between max-w-[48rem]'>
        <Link to={'/'}>
          <img src={logo} className='md:w-[10.688rem] w-[8rem]' alt='logo' />
        </Link>
        <a
          href='https://twitter.com/airdesk_link'
          target='_blank'
          rel='noreferrer'
        >
          <img src={TwitterLogo} alt='twitterLogo' />{' '}
        </a>
      </div>
      <div className=' h-[84px]'>
        <div
          className='mt-8 grid max-w-[48rem]'
          style={{ gridTemplateColumns: '1fr 64px', columnGap: '1rem' }}
        >
          <Input id='DeskCodeInput' placeholder='Paste code here and enter' />

          <div className='w-[64px] h-[64px]'>
            <Barcode clickFunction={handleClick} />
            {openModal && <ModalTest />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
