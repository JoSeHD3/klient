import React, {useState, useEffect} from 'react';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';
import Cookies from 'js-cookie';

function SearchCargo(){
    const [routes, setRoutes] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [packageData, setPackages] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [selectedPackages, setSelectedPackages] = useState([]);

    const {marginLeft} = useMargin();

    const address = "http://127.0.0.1:8086/getCommissions";
    const addressRoutes = "http://127.0.0.1:8086/getRoutes";
    const addressSend = "http://127.0.0.1:8086/addCommissionToRoute";
    const token = localStorage.getItem('token');
    const role = Cookies.get('userRole');

    useEffect(() => {
        fetchData();
        fetchData2();
    }, []);
//http://127.0.0.1:8086/getCommissions"
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
                setPackages(data);
            } else {
                console.error("SearchCargo: fetch error", response.statusText);
            }
        } catch (error){
            console.error(error);
        }
    };



    const fetchData2 = async () => {
        try {
            const response = await fetch(addressRoutes, {
                method: "GET",
                headers: {
                    'Content-Type' : 'application/json', 
                    'Authorization' : 'Bearer ' + token
                }
            });
            if(response.ok) {
                const data = await response.json();
                setRoutes(data);

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
            route_id: selectedRoute,
            packages: selectedPackages
        }

        console.log("SearchCargo: sending data ", dataToSend);

        setSelectedRoute('');
 
        setSelectedPackages('');


        try {
            const response = await fetch(addressSend, {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json', 
                    'Authorization' : 'Bearer ' + token
                },
                body: JSON.stringify(dataToSend),
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
            <NavButton         routes={[
          { route: '/pages/Home', name: 'Strona główna' },
          { route: '/pages/Company', name: 'Firma' },
          {
            route: '/pages/Company/ManageCommissions',
            name: 'Zarządzaj zleceniami',
          },
          { route: '/pages/Company/SearchCargo', name: 'Wyszukaj ładunek' },
        ]}/>
            {(role === 'manager' || role === 'logistyk') ? 
            <div className="commissionshistory-table-container">
            
                    <select className="deactivateaccount-password" value={routes.id} onChange={(e) => setSelectedRoute(e.target.value)}>
                        <option value="">Wybierz przejazd</option>
                        {routes.map(routes => (
                            <option  value={routes.id}>
                                {routes.id + " " +routes.name + " " + routes.data}
                            </option>
                        ))}
                    </select>
                <button className="deactivateaccount-submit" onClick={handleAddButtonClick}>Dodaj</button>
                <p />
                    <table className="commissionshistory-table">
                        <thead>
                            <tr>
                                <th>ID paczki</th>
                                <th>Nazwa</th>
                                <th>Zaznacz</th>
                            </tr>
                        </thead>
                        <tbody>
                            {packageData.map(packageItem => (
                                <tr key={packageItem.commission_id}>
                                    <td>{packageItem.commission_id}</td>
                                    <td>{packageItem.description}</td>
                                    <td>
                                        <input 
                                            type="checkbox"
                                            checked={selectedPackages.includes(packageItem.commission_id)}
                                            onChange={() => handlePackageCheckboxChange(packageItem.commission_id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            
            : '' }
        </div>
    );
}

export default SearchCargo;