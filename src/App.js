import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Test from './pages/Test';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorSite from './pages/ErrorSite';
import Profile from './pages/Profile';
import ChangeData from './pages/ChangeData';
import CommissionsHistory from './pages/CommissionsHistory';
import DeactivateAccount from './pages/DeactivateAccount';
import "./components/Fontawesome";
import Sidebar from './components/Sidebar';
import {MarginProvider} from './components/MarginContext';

function App() {
    //const token = localStorage.getItem('accessToken');
    const token = ".";

    return (
        <div className="app">
            <MarginProvider>
            <Router>
                <Routes>
                    <Route path="/*" element={
                        <React.Fragment>
                            {token ? <Sidebar /> : null }
                            <main>
                                <Routes>
                                    <Route index element={token ? <Home /> : <Login />} />
                                    <Route path="/pages/home" element={token ? <Home /> : <Login />} />
                                    <Route path="/pages/test" element={token ? <Test /> : <Login />} />
                                    <Route path="/register" element={!token ? <Register /> : <Home />}/>
                                    <Route path="/pages/profile" element={token ? <Profile /> : <Login />} />
                                    <Route path="/pages/profile/changedata" element={token ? <ChangeData /> : <Login />} />
                                    <Route path="/pages/profile/commissionshistory" element={token ? <CommissionsHistory /> : <Login />} />
                                    <Route path="/pages/profile/deactivateaccount" element={token ? <DeactivateAccount /> : <Login />} />
                                    
                                    <Route path="*" element={<ErrorSite />}/>
                                </Routes>
                            </main>
                        </React.Fragment>
                    }/>
                </Routes>
            </Router>
            </MarginProvider>
        </div>
    );
}

export default App;
