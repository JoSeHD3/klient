import React, {useState, useEffect} from 'react';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';
import { Link } from 'react-router-dom'; 
function RoutesList(){
    const {marginLeft} = useMargin();
    const [data, setData] = useState([]);
    const address = 'http://127.0.0.1:8086/getRoutes';
	const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            

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
	
	
	
	
	    const handleDeleteBind = async (bind) => {
        try {
            const response = await fetch("http://127.0.0.1:8086/deleteRoute", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify({
					route_id: bind.id

				})
            });

            if(response.ok){
                alert("Pomyślnie usunięto trasę");
                window.location.reload();
            } else {
                alert("Wystąpił błąd");
                console.error("deleting route error", response.statusText);
            }
        } catch (error) {console.error(error);}
    }

	
	
	

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
                            <th>Usuń</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
									<Link to={`/pages/Company/RoutesList/RouteDetails/${item.id}`}>
                                        {item.name}
                                    </Link>
                                <td>{item.data +" | " + item.dataEnd}</td>
								<td><button onClick={() => handleDeleteBind(item)}>-</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RoutesList;