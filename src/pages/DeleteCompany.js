import React, {useState} from 'react';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';
import Cookies from 'js-cookie';

function DeleteCompany(){
    const {marginLeft} = useMargin();

    const [nip, setNip] = useState();
    const address = '';
    const token = localStorage.getItem('token');
    const role = Cookies.get('userRole');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch (address, {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token, nip}),
            });

            if(response.ok){
                alert('Pomyślnie usunięto firmę!');
            } else {
                alert('Wystąpił błąd');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div className="site-first-div" style={{marginLeft}}>
            <NavButton routes={[{route: '/pages/Home', name: 'Strona główna'}, {route: '/pages/Company', name: 'Firma'}, {route: '/pages/Company/DeleteCompany', name: 'Usuń firmę'}]}/>
            {role === 'manager' ?
                <div className='firmuser-locate'>
                    <div className="deactivateaccount-information">Czy na pewno chcesz usunąć swoją firmę? Pamiętaj, że ta operacja jest nieodwracalna!</div>
                    <form onSubmit={handleSubmit} className='deactivateaccount-form'>
                        <input className='deactivateaccount-password' type='number' required placeholder='NIP' onChange={e => setNip(e.target.value)}></input>
                        <input className='deactivateaccount-submit' type='submit' value='Usuń firmę'></input>
                    </form>
                </div>
            : ""}
        </div>
    );
}

export default DeleteCompany;