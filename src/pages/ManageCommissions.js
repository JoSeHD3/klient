import React from 'react';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';
import Cookies from 'js-cookie';

function ManageCommissions(){
    const {marginLeft} = useMargin();
    const role = Cookies.get('userRole');

    const handleClick = (href) => {
        window.location.href = href;
    };

    return(
        <div className="site-first-div" style={{marginLeft}}>
            <NavButton routes={[{route: '/pages/Home', name: 'Strona główna'},{route: '/pages/Company', name: 'Firma'}, {route: '/pages/Company/ManageCommissions', name: 'Zarządzaj zleceniami'}]}/>
            {(role === 'manager' || role === 'logistyk') ? 
            <div className='profileButtonBox'>
                <button className="profileButton" onClick={() => handleClick('/pages/Company/RoutesList')}>Lista przejazdów</button>
                <button className="profileButton" onClick={() => handleClick('/pages/Company/AnnounceRide')}>Ogłoś przejazd</button>
                <button className="profileButton" onClick={() => handleClick('/pages/Company/SearchCargo')}>Wyszukaj ładunek</button>
            </div>
            :''}
        </div>
    );
}

export default ManageCommissions;