import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Test from './pages/Test';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorSite from './pages/ErrorSite';

function App() {
    const token = localStorage.getItem('accessToken');

    return (
        <div className="app">
            
            <Router>
                <Routes>
                    <Route path="/" element={token ? <Home /> : <Login />} />
                    <Route path="/pages/home" element={token ? <Home /> : <Login />} />
                    <Route path="/pages/test" element={token ? <Test /> : <Login />} />
                    <Route path="/register" element={!token ? <Register /> : <Home />}/>
                    
                    <Route path="*" element={<ErrorSite />}/>
                </Routes>
            </Router>
          
        </div>
    );
}

export default App;
