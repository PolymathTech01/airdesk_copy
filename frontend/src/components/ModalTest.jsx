import { Modal } from 'flowbite-react';
import React, { useContext } from 'react';
import { QrcodeContext } from './Context/Qrcode.context';

import CodeScanner from './CodeScanner';

const ModalTest = () => {
  const { openModal, setOpenModal } = useContext(QrcodeContext);
  console.log('modal test', openModal);

  return (
    <div>
      <Modal
        show={openModal}
        size='sm'
        popup={true}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className='space-y-6 px-6'>
            <h3
              className=' font-medium text-gray-900 dark:text-white'
              style={{ fontSize: '1rem', lineHeight: '2rem' }}
            >
              Please Scan QR code to view your desk
            </h3>
          </div>
          <CodeScanner />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalTest;
