import React, { useState, useEffect } from 'react';
import '../App.css';

import NavButton from '../components/NavButton';
import { useMargin } from '../components/MarginContext';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';


function CommissionDetails() {
    const [commissionDetails, setCommissionDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const { marginLeft } = useMargin();
    const { routeId } = useParams();
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function fetchCommissionDetails() {
            const address = `http://127.0.0.1:8086/getRoute/${routeId}`;

            try {
                const response = await fetch(address, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCommissionDetails(data);
                    setLoading(false);
                } else {
                    console.error('CommissionDetails: fetch error', response.statusText);
                }
            } catch (error) {
                console.error('CommissionDetails: fetch error', error);
            }
        }

        fetchCommissionDetails();
    }, [routeId, token]);



	    const handleDeleteBind = async (bind) => {
        try {
            const response = await fetch("http://127.0.0.1:8086/dropCommission", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify({
					"commission_id": bind.commission_id,
					"route_id": routeId

				})
            });

            if(response.ok){
                alert("Pomyślnie usunięto przesyłkę z trasy");
                window.location.reload();
            } else {
                alert("Wystąpił błąd");
                console.error("deleting commission error", response.statusText);
            }
        } catch (error) {console.error(error);}
    }


    const displayFields = (obj, tableNames = {}) => {
        const allowedFields = [
            'addressStart', 
            'route', 
            'date_start', 
            'date_end', 
            'name', 
            'status'
        ];
    
        return Object.keys(obj)
            .filter(key => allowedFields.includes(key))
            .map((key, index) => {
                const displayName = tableNames[key] || key;

                if (key.includes('.')) {
                    const [parentKey, subKey] = key.split('.');
                    const parentDisplayName = tableNames[parentKey] || parentKey;

                    if (!obj[parentKey]) {
                        return null;
                    }

                    return (
                        <React.Fragment key={index}>
                            <tr>
                                <td colSpan="2">
                                    <h4>{parentDisplayName}</h4>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <table className="nested-table">
                                        <tbody>
                                            {displayFields(obj[parentKey], tableNames)}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </React.Fragment>
                    );
                } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                    return (
                        <tr key={index}>
                            <td colSpan="2">
                                <h4>{displayName}</h4>
                                <table className="nested-table">
                                    <tbody>
                                        {displayFields(obj[key], tableNames)}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    );
                } else {
                    return (
                        <tr key={index}>
                            <td>{displayName}:</td>
                            <td>{obj[key]}</td> 
                        </tr>
                    );
                }
            })
            .filter(Boolean);
    };
    
    const customTableNames = {
        'addressStart' : 'Adres początkowy', 
        'route' : 'Trasa', 
        'date_start' : 'Data wyjazdu', 
        'date_end' : 'Data dojazdu', 
        'name' : 'Nazwa', 
        'status' : 'Status'
    };
    
    const renderedFields = displayFields(commissionDetails, customTableNames);

    return (
        <div className="site-first-div" style={{ marginLeft }}>
            {}
            <NavButton routes={[{route: '/pages/Home', name: 'Strona główna'}, {route: '/pages/Company', name: 'Firma'}, {route: '/pages/Company/ManageCommissions', name: 'Zarządzaj zleceniami'}, {route: '/pages/Company/RoutesList', name: 'Lista przejazdów'}]}/>
            {}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className='announceride-locate'>
                <div className="commissionhistory-table-container">
                    <table className="commissiondetails-table">
                        <h2>Szczegóły zlecenia</h2>
                        <div >
                            {renderedFields}
                        </div>
						
                    </table>
			<div className="commissionshistory-table-container">
                <table className="commissionshistory-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nazwa</th>
                            <th>Kolejność dostarczania</th>
							<th>Usuń</th>
                        </tr>
                    </thead>
						<tbody>
                        {commissionDetails.commissions.map(item => (
                            <tr key={item.commission_id}>
                                <td>{item.commission_id}</td>
                                <td>

									<a href={`/pages/Company/SearchCargo/SearchCargoDetails/${item.commission_id}`} target="_blank" rel="noopener noreferrer">
										{item.description}
									</a>
								</td>
								<td>
								{item.point_number}
								</td>
								<td><button onClick={() => handleDeleteBind(item)}>-</button></td>
                            </tr>
                        ))}
                    </tbody>
					                </table>
            </div>
                </div>
                </div>
            )}
        </div>
    );
}


export default CommissionDetails;
