import QrScan from '../Assets/qr-scan.svg';

const Barcode = ({ clickFunction }) => {
  return (
    <button
      className='bg-white shadow-lg rounded-md w-[100%] h-[3.8rem]'
      onClick={clickFunction || ''}
      // style={{ right: '0.22rem' }}
    >
      <img
        src={QrScan}
        alt='QrScan'
        className='relative left-2 right-2 w-[48px] h-[48px]'
      />
    </button>
  );
};

export default Barcode;
