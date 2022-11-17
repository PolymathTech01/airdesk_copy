import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './Admin';
import Home from './Home';
import TabComponent from './Tab.component';
import ViewerPage from './ViewerPage';
import ViewerPageInput from './ViewerPageInput';
// import ReactGA from 'react-ga';
// import { createBrowserHistory } from 'history';
const Index = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='admin' element={<Admin />} />
        <Route exact path='view/:deskIdParams' element={<ViewerPage />} />
        <Route path='view' element={<ViewerPageInput />}></Route>
        <Route path='test' element={<TabComponent />}></Route>
        <Route
          path='*'
          element={
            <div style={{ padding: '1rem', textAlign: 'center' }}>
              <p>There's nothing here!</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default Index;
