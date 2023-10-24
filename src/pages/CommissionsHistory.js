import React from 'react';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';
import { useState } from 'react';
import { useEffect } from 'react';

const address = '';

function CommissionsHistory(){
    const {marginLeft} = useMargin();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');

            try {
                const respone = await fetch(address, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({token})
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
            <NavButton routes={[{route: '/pages/Home', name: 'Strona główna'}, {route: '/pages/Profile', name: 'Profil'}, {route: '/pages/Profile/CommissionsHistory', name: 'Paczki'}]}/>
            <div className="commissionshistory-table-container">
                <table className="commissionshistory-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nazwa</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => {
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.status}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CommissionsHistory;