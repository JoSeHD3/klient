import React from 'react';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';

function Profile(){
    const {marginLeft} = useMargin();

    return(
        <div className="site-first-div" style={{marginLeft}}>
            <NavButton routes={[{route: '/pages/Home', name: 'Strona główna'}, {route: '/pages/Profile', name: 'Profil'}]}/>
            <div className='profileButtonBox'>
                <button className="profileButton">Lokacja 1</button>
                <button className="profileButton">Lokacja 1</button>
                <button className="profileButton">Lokacja 1</button>
            </div>
        </div>
    );
}

export default Profile;