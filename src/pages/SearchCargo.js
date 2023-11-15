import React, {useState, useEffect} from 'react';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';
import Cookies from 'js-cookie';

function SearchCargo(){
    const [drivers, setDrivers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [packages, setPackages] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [selectedPackages, setSelectedPackages] = useState([]);

    const {marginLeft} = useMargin();

    const address = "";
    const addressSend = "";
    const token = localStorage.getItem('token');
    const role = Cookies.get('userRole');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(address, {
                method: "GET",
                headers: {
                    'Content-Type' : 'application/json', 
                    'Authorization' : 'Bearer ' + token
                }
            });
            if(response.ok) {
                const data = await response.json();
                setDrivers(data.drivers);
                setPackages(data.packages);
                setVehicles(data.vehicles);
            } else {
                console.error("SearchCargo: fetch error", response.statusText);
            }
        } catch (error){
            console.error(error);
        }
    };

    const sendData = async () => {

    };

    const handleAddButtonClick = async () => {
        const dataToSend = {
            driver: selectedDriver,
            vehicle: selectedVehicle,
            packages: selectedPackages
        }

        console.log("SearchCargo: sending data ", dataToSend);

        setSelectedDriver('');
        setSelectedVehicle('');
        setSelectedPackages('');


        try {
            const response = await fetch(addressSend, {
                method: "GET",
                headers: {
                    'Content-Type' : 'application/json', 
                    'Authorization' : 'Bearer ' + token
                },
                body: JSON.stringify({data: dataToSend}),
            });
            if(response.ok) {
                const data = await response.json();
            } else {
                console.error("SearchCargo: send error", response.statusText);
            }
        } catch (error){
            console.error(error);
        }
    }

    const handlePackageCheckboxChange = (packageId) => {
        const updatedPackages = selectedPackages.includes(packageId) ? selectedPackages.filter(id => id !== packageId) : [...selectedPackages, packageId];
        setSelectedPackages(updatedPackages);
    }


    return(
        <div className="site-first-div" style={{marginLeft}}>
            <NavButton routes={[{route: '/pages/Home', name: 'Strona główna'}]}/>
            {(role === 'manager' || role === 'logistyk') ? 
            <div>
                <label>
                    Wybierz kierowce:
                    <select value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)}>
                        <option value="">Wybierz kierowce</option>
                        {drivers.map(driver => (
                            <option key={driver.id} value={driver.name}>
                                {driver.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Wybierz pojazd:
                    <select value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)}>
                        <option value="">Wybierz pojazd</option>
                        {vehicles.map(vehicle => (
                            <option key={vehicle.id} value={vehicle.name}>
                                {vehicle.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button onClick={handleAddButtonClick}>Dodaj</button>
                <table className="commissionshistory-table">
                    <thead>
                        <tr>
                            <th>ID paczki</th>
                            <th>Nazwa</th>
                            <th>Zaznacz</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.map(packageItem => {
                            <tr key={packageItem.id}>
                                <td>{packageItem.id}</td>
                                <td>{packageItem.name}</td>
                                <td>
                                    <input 
                                        type="checkbox"
                                         checked={selectedPackages.includes(packageItem.id)}
                                        onChange={() => handlePackageCheckboxChange(packageItem.id)}
                                    />
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            : '' }
        </div>
    );
}

export default SearchCargo;