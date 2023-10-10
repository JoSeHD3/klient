import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Test from './pages/Test';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
    const token = localStorage.getItem('accessToken');

    if(!token){
        return (
            <div className="app">
                <Login />
            </div>
        );
    }

    return (
        <div className="app">
            
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
