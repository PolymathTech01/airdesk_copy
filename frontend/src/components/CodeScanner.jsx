import React, { useContext } from 'react';
import { QrReader } from 'react-qr-reader';
import { QrcodeContext } from '../components/Context/Qrcode.context';
const CodeScanner = () => {
  const { openModal } = useContext(QrcodeContext);
  const handleWebcamError = (err) => {
    console.log(err);
  };

  return (
    <div>
      {openModal && (
        <QrReader
          style={{ width: '300px' }}
          delay={1000}
          videoId='result'
          constraints={{
            facingMode: 'environment',
          }}
          onError={handleWebcamError}
          // onScan={handleWebcamScan}
          onResult={(result, error) => {
            if (result) {
              window.open(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
        />
      )}
      {/* {webcamScan && window.open(webcamScan)} */}
      {/* <h3>
        This is the information on the provided Qr code desk:
        <p className='font-bold text-xl'>
          {webcamScan && 'Please visit '}

          <a href={webcamScan}>
            {webcamScan}
            {webcamScan && ' to view your desk'}
          </a>
        </p>
      </h3> */}
    </div>
  );
};

export default CodeScanner;
