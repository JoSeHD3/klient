import React, {useState} from 'react';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';
import Cookies from 'js-cookie';

function AddTrailer(){
    const {marginLeft} = useMargin();

    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [volume, setVolume] = useState();
    const [maxMass, setMaxMass] = useState(); //max loadout mass
    const [mass, setMass] = useState(); //trailer's mass
	const [isDismount, setIsDismount] = useState(false); 

    const address = 'http://127.0.0.1:8086/addTrailer';
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
                body: JSON.stringify({width, height, volume, maxMass, mass, isDismount}),
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
            <div className='addtrailer-locate'>
                <form onSubmit={handleSubmit} className='deactivateaccount-form'>
                    <input className='deactivateaccount-password' type='number' required placeholder='SZEROKOŚĆ' onChange={e => setWidth(e.target.value)}></input>
                    <input className='deactivateaccount-password' type='number' required placeholder='WYSOKOŚC' onChange={e => setHeight(e.target.value)}></input>
                    <input className='deactivateaccount-password' type='number' required placeholder='GŁĘBOKOŚĆ' onChange={e => setVolume(e.target.value)}></input>
                    <input className='deactivateaccount-password' type='number' required placeholder='MAKSYMALNA MASA ZAŁADUNKU' onChange={e => setMaxMass(e.target.value)}></input>
                    <input className='deactivateaccount-password' type='number' required placeholder='MASA NACZEPY' onChange={e => setMass(e.target.value)}></input>
                    <div>
						<label className='addtrailer-odczep' htmlFor='odczep'>Czy naczepa jest odczepialna?</label>
						<input
							id='odczep'
							className='deactivateaccount-password'
							type='checkbox'
							checked={isDismount} 
							onChange={() => setIsDismount(!isDismount)} 
						/>
                    </div>
                    
                    <input className='deactivateaccount-submit' type='submit' value='Dodaj'></input>
                </form>
            </div>
            :''}
        </div>
    );
}

export default AddTrailer;