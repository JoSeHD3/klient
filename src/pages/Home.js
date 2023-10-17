import React from 'react';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';

function Home(){
    const {marginLeft} = useMargin();

    return(
        <div className="site-first-div" style={{marginLeft}}>
            <NavButton className="top-nav" routes={[{route: '/pages/Test', name: 'Test'}, {route: '/pages/Home', name: 'Home'}]}/>
            Home Page
        </div>
    );
}

export default Home;