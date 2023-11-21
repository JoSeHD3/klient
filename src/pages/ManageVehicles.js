import React, {useEffect, useState} from 'react';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';
import Cookies from 'js-cookie';

function ManageVehicles(){
    const {marginLeft} = useMargin();
    const [data, setData] = useState([]);
    const [user_id, setName] = useState("");
    const [truck_id, setVehicle] = useState("");
    const [trailer_id, setTrailer] = useState("");
    const address = '';
	
    const addressBind = "http://127.0.0.1:8086/bindDriverTruckTrailer";
	
	const addressDriver = 'http://127.0.0.1:8086/getUnbindedDrivers';
	const addressTruck = 'http://127.0.0.1:8086/getTrucks';
	const addressTrailer = 'http://127.0.0.1:8086/getTrailers';

	const addressGetBidned = 'http://127.0.0.1:8086/companyGetBindedDrivers';

	const addressUnbind = 'http://127.0.0.1:8086/unbindDriverTruckTrailer';


	
    const role = Cookies.get('userRole');
    const token = localStorage.getItem('token');
	
	
	
	const [drivers, setDrivers] = useState([]);
    const [trucks, setTrucks] = useState([]);
    const [trailers, setTrailers] = useState([]);

    const [binded, setBinded] = useState([]);
	

    const handleCreatingRide = async () => {
    try {
        const response = await fetch(addressBind, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                user_id: user_id, 
                truck_id: truck_id,
                trailer_id: trailer_id
            }),
        });

        if (response.ok) {
            alert('Pomyślnie stworzono zespół!');
        } else {
            alert('Wystąpił błąd');
        }
    } catch (error) {
        console.error('Error: ', error);
    }
        
        setName("");
        setTrailer("");
        setVehicle("");
    };


	//pobierz dane
 useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };

                const driversResponse = await fetch(addressDriver, {
                    method: 'GET',
                    headers: headers,
                });
                const driversData = await driversResponse.json();
                setDrivers(driversData);

                const trucksResponse = await fetch(addressTruck, {
                    method: 'GET',
                    headers: headers,
                });
                const trucksData = await trucksResponse.json();
                setTrucks(trucksData);

                const trailersResponse = await fetch(addressTrailer, {
                    method: 'GET',
                    headers: headers,
                });
                const trailersData = await trailersResponse.json();
                setTrailers(trailersData);
            } catch (error) {
                console.error('Error: ', error);
            }
        };

        fetchData();
    }, []);



 useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };

                const bindedResponse = await fetch(addressGetBidned, {
                    method: 'GET',
                    headers: headers,
                });

                const bindedData = await bindedResponse.json();
                setBinded(bindedData);



            } catch (error) {
                console.error('Error: ', error);
            }
        };

        fetchData();
    }, []);
	


    const handleDeleteBind = async (bind) => {
        try {
            const response = await fetch(addressUnbind, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
					user_id: bind.user_id,
					truck_id: bind.truck_id,
					trailer_id: bind.trailer_id,

				})
            });

            if(response.ok){
                alert("Pomyślnie usunięto powiązanie");
            } else {
                alert("Wystąpił błąd");
                console.error("deleting user error", response.statusText);
            }
        } catch (error) {console.error(error);}
    }




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
                    <select className='deactivateaccount-password' value={user_id} onChange={(e) => setName(e.target.value)}>
                    <option value="">Imię</option>
                    {drivers.map((item, index) => (
                        <option key={index} value={item.user_id}>
                        {item.name}
                        </option>
                    ))}
                    </select>
                    <select className='deactivateaccount-password' value={truck_id} onChange={(e) => setVehicle(e.target.value)}>
                    <option value="">Pojazd</option>
                    {trucks.map((item, index) => (
                        <option key={index} value={item.truck_id}>
                        {item.model + " " +item.registration_number}
                        </option>
                    ))}
                    </select>
                    <select className='deactivateaccount-password' value={trailer_id} onChange={(e) => setTrailer(e.target.value)}>
                    <option value="">Naczepa</option>
                    {trailers.map((item, index) => (
                        <option key={index} value={item.trailer_id}>
                        {item.description}
                        </option>
                    ))}
                    </select>
                </div>
                <div className='managevehicles-locate'>
                    <button className='deactivateaccount-submit' onClick={handleCreatingRide}>Dodaj</button>
                </div>

                <div className="commissionshistory-table-container">
                    <table className="commissionshistory-table">
                        <thead>
                            <tr>
                                <th>Kierowca</th>
                                <th>Pojazd</th>
                                <th>Naczepa</th>
                                <th>Usun</th>
                            </tr>
                        </thead>
                        <tbody>
                            {binded.map((item, index)=> (
                                <tr key={index}>
                                    <td>{item.userName}</td>
                                    <td>{item.truckModel + " " + item.truckReg}</td>
                                    <td>{item.trailerDesc}</td>
                                    <td><button onClick={() => handleDeleteBind(item)}>-</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            : '' }
        </div>
    );
}

export default ManageVehicles;