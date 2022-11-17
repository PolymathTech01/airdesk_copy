import { createContext, useState } from 'react';

export const QrcodeContext = createContext({
  OpenModal: false,
  setOpenModal: () => {},
});

export const QrcodeProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  // setOpenModal(!openModal);
  const value = { openModal, setOpenModal };
  return (
    <QrcodeContext.Provider value={value}>{children}</QrcodeContext.Provider>
  );
};
