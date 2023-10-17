import React from 'react';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';

function Home(){
    const {marginLeft} = useMargin();

    return(
        <div className="site-first-div" style={{marginLeft}}>
            <NavButton routes={[{route: '/pages/Home', name: 'Strona główna'}]}/>
            
        </div>
    );
}

export default Home;