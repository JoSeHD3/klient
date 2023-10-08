import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Test from './pages/Test';
import Home from './pages/Home';

function App() {
    return (
        <div className="App">
          <Router>
              <Routes>
                  <Route path="/pages/Home" element={<Home />}/>
                  <Route path="/pages/Test" element={<Test />}/>
              </Routes>
          </Router>
          
        </div>
    );
}

export default App;
