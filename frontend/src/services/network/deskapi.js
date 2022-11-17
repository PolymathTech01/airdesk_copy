import axios from 'axios';

export const getMessagebyId = (deskId) => {
  return axios.get(
    `https://airdeskweb.herokuapp.com/api/desk/get-desk-data/${deskId}`
  );
};

export const saveDesk = (deskdata) => {
  return axios.post(`https://airdeskweb.herokuapp.com/api/desk/generateId`, {
    deskData: deskdata,
  });
};

// const data = {
//   email,
//   password,
//   image
// }
