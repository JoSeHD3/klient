import React, {useEffect, useState} from 'react';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';
import Cookies from 'js-cookie';

function AnnounceRide(){
    const {marginLeft} = useMargin();
    const [data, setData] = useState([]);
    const [driverOptions, setDriverOptions] = useState([]);
    const [rideData, setRideData] = useState({
      name: "",
      destination: "",
      date: "",
      driver: "",
      description: "",
    });
    const address = '';
    const addressSending = '';
    const role = Cookies.get('userRole');
    const token = localStorage.getItem('token');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRideData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch (addressSending, {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify(rideData),
            });

            if(response.ok){
                alert('Pomyślnie dodano przejazd!');
            } else {
                alert('Wystąpił błąd');
            }
        } catch (error) {
            console.error('Error: ', error);
        }
        
        setRideData({
          name: "",
          destination: "",
          date: "",
          driver: "",
          description: "",
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');

            try {
                const respone = await fetch(address, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${token}`
                    },
                });

                const res = await respone.json();

                setData(res);
            } catch(error) {
                console.error('Error: ', error);
            }
        };

        fetchData();
    }, []);

    return(
        <div className="site-first-div" style={{marginLeft}}>
            <NavButton routes={[{route: '/pages/Home', name: 'Strona główna'},{route: '/pages/Company', name: 'Firma'}, {route: '/pages/Company/ManageCommissions', name: 'Zarządzaj zleceniami'}, {route: '/pages/Company/AnnounceRide', name: 'Ogłoś przejazd'}]}/>
            {(role === 'manager' || role === 'logistyk') ? 
            <div className='addtrailer-locate'>
            <form onSubmit={handleSubmit} className='deactivateaccount-form'>
                <input type="text" placeholder='Nazwa przejazdu' className='deactivateaccount-password' name="name" value={rideData.name} onChange={handleInputChange} />
                <input type="text" placeholder='Miejsce docelowe' className='deactivateaccount-password' name="destination" value={rideData.destination} onChange={handleInputChange}/>
                <input type="text" placeholder='Data przejazdu' className='deactivateaccount-password' name="date" value={rideData.date} onChange={handleInputChange} />
                <select name="driver" className='deactivateaccount-password' value={rideData.driver} onChange={handleInputChange}>
                    <option value="">Wybierz kierowcę</option>
                    {driverOptions.map((driver, index) => (
                        <option key={index} value={driver}>
                        {driver}
                        </option>
                    ))}
                </select>
                <textarea name="description" placeholder='Opis' className='deactivateaccount-password' value={rideData.description} onChange={handleInputChange}/>
                <input className='deactivateaccount-submit' type='submit' value='Dodaj'></input>
            </form>
            </div>
            :''}
        </div>
    );
}

export default AnnounceRide;