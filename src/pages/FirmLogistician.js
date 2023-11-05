import React from 'react';

function FirmLogistician(){

    const handleClick = (href) => {
        window.location.href = href;
    };

    return(
        <div className='profileButtonBox'>
            <button className="profileButton" onClick={() => handleClick('/pages/Company/ManageVehicles')}>Zarządzaj pojazdami</button>
            <button className="profileButton" onClick={() => handleClick('/pages/Company/ManageCommissions')}>Zarządzaj zleceniami</button>
        </div>
    );
}

export default FirmLogistician;