import React from 'react';
import '../App.css';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';

function Test(){
    const {marginLeft} = useMargin();

    return (
        <div className="site-first-div" style={{marginLeft}}>
            <NavButton className="top-nav" routes={[{route: '/pages/Home', name: 'Strona główna'}, {route: '/pages/Test', name: 'Test'}]}/>
            Test Succeded
        </div>
    );
}

export default Test;