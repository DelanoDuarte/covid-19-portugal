import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';

import 'antd/dist/antd.css';
import SideBar from './components/layout/SideBar';
import Routes from './routes';
import NetworkAvailability from './components/common/NetworkAvailability';

function App() {
  return (
    <SideBar>
      <div className="App">
        <NetworkAvailability />
        <Router>
          <Routes />
        </Router>
      </div>
    </SideBar>
  );
}

export default App;
