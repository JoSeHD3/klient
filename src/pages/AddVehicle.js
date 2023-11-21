import React, {useState} from 'react';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';
import Cookies from 'js-cookie';

function AddVehicle(){
    const {marginLeft} = useMargin();

    const [model, setModel] = useState();
    const [mass, setMass] = useState();
    const [licensePlate, setLicensePlate] = useState();
    const address = 'http://127.0.0.1:8086/addTruck';
    const token = localStorage.getItem('token');
    const role = Cookies.get('userRole');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch (address, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({model, mass, licensePlate}),
            });

            if(response.ok){
                alert('Pomyślnie dodano pojazd!');
            } else {
                alert('Wystąpił błąd');
            }
        } catch (error) {
            console.error(error);
        }
    };
    return(
        <div className="site-first-div" style={{marginLeft}}>
            <NavButton routes={[{route: '/pages/Home', name: 'Strona główna'}, {route: '/pages/Company', name: 'Firma'}, {route: '/pages/Company/ManageVehicles', name: 'Zarządzaj pojazdami'}, {route: '/pages/Company/AddVehicle', name: 'Dodaj Pojazd'}]}/>
            {(role === 'manager' || role === 'logistician') ? 
            <div className='firmuser-locate'>
                <form onSubmit={handleSubmit} className='deactivateaccount-form'>
                    <input className='deactivateaccount-password' type='text' required placeholder='MODEL' onChange={e => setModel(e.target.value)}></input>
                    <input className='deactivateaccount-password' type='number' required placeholder='MASA' onChange={e => setMass(e.target.value)}></input>
                    <input className='deactivateaccount-password' type='text' required placeholder='REJESTRACJA' onChange={e => setLicensePlate(e.target.value)}></input>
                    <input className='deactivateaccount-submit' type='submit' value='Dodaj'></input>
                </form>
            </div>
            :''}
        </div>
    );
}

export default AddVehicle;