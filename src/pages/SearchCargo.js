import React, {useState, useEffect} from 'react';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom'; 
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
function SearchCargo(){
    const [routes, setRoutes] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [packageData, setPackages] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [selectedPackages, setSelectedPackages] = useState([]);
    const [shouldRefresh, setShouldRefresh] = useState(true);

    const samplePackages = [
        { commission_id: 101, description: 'Package 101' },
        { commission_id: 102, description: 'Package 102' },
        { commission_id: 103, description: 'Package 103' },
      ];

    const {marginLeft} = useMargin();

    const address = "http://127.0.0.1:8086/getCommissions";
    const addressRoutes = "http://127.0.0.1:8086/getRoutes";
    const addressSend = "http://127.0.0.1:8086/addCommissionToRoute";
    const token = localStorage.getItem('token');
    const role = Cookies.get('userRole');

    useEffect(() => {
        fetchData();
        fetchData2();
    }, [shouldRefresh]);
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
        setPackages(samplePackages);
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
                alert("Pomyślnie zmieniono dane!");
                setShouldRefresh(!shouldRefresh);
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

    const DragAndDropHandle = (droppedItem) => {
        if (!droppedItem.destination) return;

        const updatedList = [...packageData];
        const [movedItem] = updatedList.splice(droppedItem.source.index, 1);
        updatedList.splice(droppedItem.destination.index, 0, movedItem);
    
        setPackages(updatedList);
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

                            <table className="commissionshistory-table" >
                                <thead>
                                    <tr>
                                        <th>ID paczki</th>
                                        <th>Nazwa</th>
                                        <th>Zaznacz</th>
                                    </tr>
                                </thead>
                                <DragDropContext onDragEnd={DragAndDropHandle}>
                                <Droppable droppableId='droppable'>
                                    {(provided) => (
                                        <tbody {...provided.droppableProps} ref={provided.innerRef} className='droppable'>
                                            {packageData.map((packageItem, index) => (
                                                <Draggable key={packageItem} draggableId={packageItem} index={index}>
                                                    {(provided) => (
                                                        <tr
                                                            ref={provided.innerRef}
                                                            {...provided.dragHandleProps}
                                                            {...provided.draggableProps}
                                                        >
                                                            <td>{packageItem.commission_id}</td>
                                                            <td>
                                                                <a href={`/pages/Company/SearchCargo/SearchCargoDetails/${packageItem.commission_id}`} target="_blank" rel="noopener noreferrer">
                                                                    {packageItem.description}
                                                                </a>
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedPackages.includes(packageItem.commission_id)}
                                                                    onChange={() => handlePackageCheckboxChange(packageItem.commission_id)}
                                                                />
                                                            </td>
                                                        </tr>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </tbody>
                                    )}
                                </Droppable>
                                    </DragDropContext>
                                                      
                            </table>

                </div>
            
            : '' }
        </div>
    );
}

export default SearchCargo;