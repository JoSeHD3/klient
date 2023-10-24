import React from 'react';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';

function Profile(){

    const handleClick = (href) => {
        window.location.href = href;
    };

    const {marginLeft} = useMargin();

    return(
        <div className="site-first-div" style={{marginLeft}}>
            <NavButton routes={[{route: '/pages/Home', name: 'Strona główna'}, {route: '/pages/Profile', name: 'Profil'}]}/>
            <div className='profileButtonBox'>
                <button className="profileButton" onClick={() => handleClick('/pages/Profile/ChangeData')}>Zmień dane</button>
                <button className="profileButton" onClick={() => handleClick('/pages/Profile/CommissionsHistory')}>Paczki</button>
                <button className="profileButton" onClick={() => handleClick('/pages/Profile/DeactivateAccount')}>Dezaktywuj konto</button>
            </div>
        </div>
    );
}

export default Profile;