import React, {useState, useEffect} from 'react';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';

function RoutesList(){
    const {marginLeft} = useMargin();
    const [data, setData] = useState([]);
    const address = 'http://127.0.0.1:8086/getRoutes';

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');

            try {
                const respone = await fetch(address, {
                    method: 'GET',
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
            <NavButton routes={[{route: '/pages/Home', name: 'Strona główna'}, {route: '/pages/Company', name: 'Firma'}, {route: '/pages/Company/ManageCommissions', name: 'Zarządzaj zleceniami'}, {route: '/pages/Company/RoutesList', name: 'Lista przejazdów'}]}/>
            <div className="commissionshistory-table-container">
                <table className="commissionshistory-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nazwa przejazdu</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.data}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RoutesList;