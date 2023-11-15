import React from 'react';
import Cookies from 'js-cookie';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';
import {setUpdateRole} from '../App';
import FirmLogistician from './FirmLogistician';
import FirmUser from './FirmUser';
import FirmManager from './FirmManager';

function Firm(){
    const {marginLeft} = useMargin();
    const role = Cookies.get('userRole');

    return(
        <div className="site-first-div" style={{marginLeft}}>
            <NavButton routes={[{route: '/pages/Home', name: 'Strona główna'}, {route: '/pages/Firm', name: 'Firma'}]}/>
            {role === 'logistyk' ? <FirmLogistician/>: ""}
            {role === 'manager' ? <FirmManager/>: ""}
            {role !== 'manager' && role !== 'logistyk' ? <FirmUser/>:""}
        </div>
    );
}

export default Firm;