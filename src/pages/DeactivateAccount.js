import React from 'react';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';
import { useState } from 'react';

const address = 'http://127.0.0.1:8086/deactivateAccount';

function DeactivateAccount(){
    const {marginLeft} = useMargin();
    const [message, setMessage] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();

        //const password = e.target.querySelector('.deactivateaccount-password').value;
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(address, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if(data.validate) {
                alert("Pomyślnie dezaktywowano Twoje konto!");
				localStorage.clear();
				 window.location.href = "/";
				

            } else {
                setMessage("Wystąpił błąd podczas dezaktywowania Twojego konta!");
            }
        } catch (error) {
            console.error("Error: ", error);
            setMessage("Wystąpił błąd podczas dezaktywowania Twojego konta! Spróbuj ponownie.")
        }

    }

    return(
        <div className="site-first-div" style={{marginLeft}}>
            <NavButton routes={[{route: '/pages/Home', name: 'Strona główna'}, {route: '/pages/Profile', name: 'Profil'}, {route: '/pages/Profile/DeactivateAccount', name: 'Dezaktywuj konto'}]}/>
            <div className='deactivateaccount-locate'>
                <div className="deactivateaccount-information">Czy na pewno chcesz dezaktywować swoje konto? Pamiętaj, że ta operacja jest nieodwracalna!</div>
                <form onSubmit={handleSubmit} className='deactivateaccount-form'>
                    {/*<input className='deactivateaccount-password' type='password' required placeholder='PODAJ HASŁO'></input>*/}
                    <input className='deactivateaccount-submit' type='submit' value='Dezaktywuj'></input>
                </form>
                {message && <div className='message'>{message}</div>}
            </div>
        </div>
    );
}

export default DeactivateAccount;