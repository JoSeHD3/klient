import React from 'react';

function FirmManager(){

    const handleClick = (href) => {
        window.location.href = href;
    };

    return(
        <div className='profileButtonBox'>
            <button className="profileButton" onClick={() => handleClick('/pages/Company/ManageEmployees')}>Zarządzaj pracownikami</button>
            <button className="profileButton" onClick={() => handleClick('/pages/Company/ManageVehicles')}>Zarządzaj pojazdami</button>
            <button className="profileButton" onClick={() => handleClick('/pages/Company/ManageCommissions')}>Zarządzaj zleceniami</button>
            <button className="profileButton" onClick={() => handleClick('/pages/Company/DeleteCompany')}>Usuń Firmę</button>
        </div>
    );
}

export default FirmManager;