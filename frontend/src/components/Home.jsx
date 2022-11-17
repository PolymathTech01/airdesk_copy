import React from 'react';
import Header from './Header';
import Tab from './Tab';

const Home = () => {
  return (
    <div className='mx-4'>
      <Header />
      <Tab
        desk='New Desk'
        page={false}
        placeholder='Write/Paste link or content you want to publish here'
      />
    </div>
  );
};

export default Home;
