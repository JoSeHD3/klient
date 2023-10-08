import React from 'react';

import NavButton from '../components/NavButton';

function Home(){
    return(
        <div>
            <NavButton className="top-nav" routes={[{route: '/pages/Test', name: 'Test'}, {route: '/pages/Home', name: 'Home'}]}/>
            Home Page
        </div>
    );
}

export default Home;