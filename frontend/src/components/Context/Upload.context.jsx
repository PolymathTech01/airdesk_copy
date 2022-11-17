import { createContext, useState } from 'react';

export const UploadContext = createContext({
  accpetedFilesContext: [],
  setAcceptdFilesContext: () => {},
});

export const UploadProvider = ({ children }) => {
  const [accpetedFilesContext, setAcceptdFilesContext] = useState([]);
  const value = { accpetedFilesContext, setAcceptdFilesContext };
  return (
    <UploadContext.Provider value={value}>{children}</UploadContext.Provider>
  );
};
