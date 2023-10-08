import React from 'react';
import '../App.css';

import NavButton from '../components/NavButton';

function Test(){
    return (
        <div>
            <NavButton className="top-nav" routes={[{route: '/pages/Test', name: 'Test'}, {route: '/pages/Home', name: 'Home'}]}/>
            Test Succeded
        </div>
    );
}

export default Test;