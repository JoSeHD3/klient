import React, {useEffect, useState} from 'react';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';
import Cookies from 'js-cookie';

function ManageVehicles(){
    const {marginLeft} = useMargin();
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [vehicle, setVehicle] = useState("");
    const [trailer, setTrailer] = useState("");
    const address = '';
    const role = Cookies.get('userRole');

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

    const handleAddTrailerButton = () => {
        window.location.href = "/pages/Company/AddTrailer";
    }

    const handleAddVehicleButton = () => {
        window.location.href = "/pages/Company/AddVehicle";
    }
    
    return(
        <div className="site-first-div" style={{marginLeft}}>
            <NavButton routes={[{route: '/pages/Home', name: 'Strona główna'}, {route: '/pages/Company', name: 'Firma'}, {route: '/pages/Company/ManageVehicles', name: 'Zarządzaj pojazdami'}]}/>
            {(role === 'manager' || role === 'logistyk') ? 
            <div>
                <div className='managevehicles-locate'>
                    <button className='deactivateaccount-submit' onClick={handleAddVehicleButton}>Dodaj pojazd</button>
                    <button className='deactivateaccount-submit' onClick={handleAddTrailerButton}>Dodaj naczepę</button>
                </div>
                <div className='managevehicles-locate'>
                    <select className='deactivateaccount-submit' value={name} onChange={(e) => setName(e.target.value)}>
                    <option value="">Imię</option>
                    {data.map((item, index) => (
                        <option key={index} value={item.name}>
                        {item.name}
                        </option>
                    ))}
                    </select>
                    <select className='deactivateaccount-submit' value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
                    <option value="">Pojazd</option>
                    {data.map((item, index) => (
                        <option key={index} value={item.vehicle}>
                        {item.vehicle}
                        </option>
                    ))}
                    </select>
                    <select className='deactivateaccount-submit' value={trailer} onChange={(e) => setTrailer(e.target.value)}>
                    <option value="">Naczepa</option>
                    {data.map((item, index) => (
                        <option key={index} value={item.trailer}>
                        {item.trailer}
                        </option>
                    ))}
                    </select>
                </div>

                <div className="commissionshistory-table-container">
                    <table className="commissionshistory-table">
                        <thead>
                            <tr>
                                <th>Pojazd</th>
                                <th>Kierowca</th>
                                <th>Naczepa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index)=> {
                                <tr key={index}>
                                    <td>{item.vehicle}</td>
                                    <td>{item.driver}</td>
                                    <td>{item.trailer}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            : '' }
        </div>
    );
}

export default ManageVehicles;