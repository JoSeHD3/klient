import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const LogoutButton = () => {
    const [buttonBackgroundColor, setButtonBackgroundColor] = useState('#555555');

    const reloadPage = () => {
        window.location.reload();
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        reloadPage();
    };

    const iconStyle = {
        color: '#fff',
        fontSize: '1.75em'
    };

    const buttonStyle = {
        position: 'fixed',
        top: '10px',
        right: '10px',
        padding: '10px',
        borderRadius: '50%',
        cursor: 'pointer',
        backgroundColor: buttonBackgroundColor,
        transition: 'background-color 0.3s'
    };
    
    return (
        <button 
            id = 'logout-button'
            style={buttonStyle}
            onMouseOver={() => {
                setButtonBackgroundColor('#7a7a7a');
            }}
            onMouseOut={() => {
                setButtonBackgroundColor('#555555');
            }}
            onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} style={iconStyle}/>
        </button>
    );
};


export default LogoutButton;