import React from 'react';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';
import { useState } from 'react';

const address = 'http://127.0.0.1:8086/userUpdate';

function ChangeData(){
    const {marginLeft} = useMargin();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();
    const [isOkay, setIsOkay] = useState(false);

    const comparePasswords = passwordC => {
        if(passwordC === password) {
            setMessage("");
            setIsOkay(true);
        } else {
            setMessage("Hasła nie są takie same.");
            setIsOkay(false);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if(isOkay){
            try {
                const response = await fetch(address, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({name, surname, email, password})
                });

                const data = await response.json();

                if(response.status === 200) {
                    setMessage("Pomyślnie zmieniono Twoje dane!");

                } else {
                    setMessage("Wystąpił błąd podczas zmiany danych!");
                }
            } catch (error) {
                console.error("Error: ", error);
                setMessage("Wystąpił błąd podczas zmiany danych! Spróbuj ponownie.")
            }
        }

    }

    return(
        <div className="site-first-div" style={{marginLeft}}>
            <NavButton routes={[{route: '/pages/Home', name: 'Strona główna'}, {route: '/pages/Profile', name: 'Profil'}, {route: '/pages/Profile/ChangeData', name: 'Zmień dane'}]}/>
            <div className='changedata-locate'>
                <form className='changedata-form' onSubmit={handleSubmit}>
                    <input type='text' required placeholder='Imię' className='changedata-name' onChange={e => setName(e.target.value)}></input>
                    <input type='text' required placeholder='Nazwisko' className='changedata-surname' onChange={e => setSurname(e.target.value)}></input>
                    <input type='email' required placeholder='Email' className='changedata-email' onChange={e => setEmail(e.target.value)}></input>
                    <input type='password' required placeholder='Hasło' className='changedata-password' onChange={e => setPassword(e.target.value)}></input>
                    <input type='password' required placeholder='Powtórz hasło' className='changedata-repeatpassword' onChange={e => comparePasswords(e.target.value)}></input>
                    <input type='submit' required value='Zatwierdź' className='changedata-submit' ></input>
                </form>
                {message && <div className='message'>{message}</div>}
            </div>
        </div>
    );
}

export default ChangeData;