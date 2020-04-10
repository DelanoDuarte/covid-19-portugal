import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';

import 'antd/dist/antd.css';
import SideBar from './components/layout/SideBar';
import Routes from './routes';

function App() {
  return (
    <SideBar>
      <div className="App">
        <Router>
          <Routes />
        </Router>
      </div>
    </SideBar>
  );
}

export default App;
