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
    const { commissionId } = useParams();
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function fetchCommissionDetails() {
            const address = `http://127.0.0.1:8086/getUserCommission/${commissionId}`;

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
    }, [commissionId, token]);


    const displayFields = (obj, tableNames = {}) => {
        const allowedFields = [
            'Commission_id', 
            'date_of_placement', 
            'date_of_receipt', 
            'description', 
            'mass', 
            'count', 
            /*'is_loaded', 
            'is_unloaded', */
            'canceled',
            'delivery_pickup',
            'address', 
            'zip_code', 
            'house_number', 
            'city', 
            'delivery_endpoint',
            'x', 
            'y', 
            'z'
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
        'Commission_id' : 'ID Zlecenia', 
        'date_of_placement' : 'Data złożenia', 
        'date_of_receipt' : 'Data dostarczenia', 
        'description' : 'Opis', 
        'mass' : 'Masa', 
        'count' : 'Ilość', 
        /*'is_loaded' : 'Czy załadowane?', 
        'is_unloaded' : 'Czy rozładowane?', */
        'canceled' : 'Czy anulowane?', 
        'delivery_pickup' : 'Odjazd',
        'address' : 'Adres', 
        'zip_code' : 'Kod pocztowy', 
        'house_number' : 'Numer domu', 
        'city' : 'Miasto', 
        'delivery_endpoint' : 'Dojazd',
        'x' : 'Szerokość', 
        'y' : 'Wysokość', 
        'z' : 'Długość'
    };
    
    const renderedFields = displayFields(commissionDetails, customTableNames);
    



    return (
        <div className="site-first-div" style={{ marginLeft }}>
            {/* Przykład nawigacji */}
            <NavButton         routes={[
          { route: '/pages/Home', name: 'Strona główna' },
          { route: '/pages/Company', name: 'Firma' },
          {
            route: '/pages/Company/ManageCommissions',
            name: 'Zarządzaj zleceniami',
          },
          { route: '/pages/Company/SearchCargo', name: 'Wyszukaj ładunek' },
        ]}/>            {/* Warunek wyświetlania komponentu */}
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
                    <br />

                </div>
                </div>
            )}
        </div>
    );
}


export default CommissionDetails;
