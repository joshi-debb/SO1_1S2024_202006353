// App.js
import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import StateDiagram from './pages/StateDiagram';
import RealTimeMonitor from './pages/RealTimeMonitor';
import OverTimeMonitor from './pages/OverTimeMonitor';
import ProcessTree from './pages/ProcessTree';
import StateChange from './pages/StateChange';
import Home from './pages/Home';

import './css/App.css';

function App() {

  const routes = [
    { path: '/', component: Home},
    { path: '/StateDiagram', component: StateDiagram },
    { path: '/RealTimeMonitor', component: RealTimeMonitor },
    { path: '/OverTimeMonitor', component: OverTimeMonitor },
    { path: '/ProcessTree', component: ProcessTree },
    { path: '/StateChange', component: StateChange}
  ];

  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">
          <div className="navbar">
            <h1 className="custom-color">SYSTEM MONITOR SO1_PY1_1S2024</h1>
          </div>
          <div className="content">
            <div className="sidebar">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/RealTimeMonitor">Real-Time Monitoring</Link></li>
                <li><Link to="/OverTimeMonitor">Over-Time Monitoring</Link></li>
                <li><Link to="/ProcessTree">Process Tree</Link></li>
                <li><Link to="/StateChange">Changes in Processes</Link></li>
                <li><Link to="/StateDiagram">Process State Diagram</Link></li>

              </ul>
            </div>
            <div className="pages-style" >
              <Switch style={{ display: 'flex' }}>
                {routes.map((route, index) => (
                  <Route key={index} path={route.path} exact component={route.component} />
                ))}
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;