import React from 'react';
import NavButton from '../components/NavButton';
import { useMargin } from '../components/MarginContext';
import { Link } from 'react-router-dom';
import useRoutesListController from '../controllers/RoutesListController';

function RoutesListView() {
    const { marginLeft } = useMargin();
    const { data, handleDeleteRoute } = useRoutesListController();

    return (
        <div className="site-first-div" style={{ marginLeft }}>
        <NavButton routes={[{ route: '/pages/Home', name: 'Strona główna' }, { route: '/pages/Company', name: 'Firma' }, { route: '/pages/Company/ManageCommissions', name: 'Zarządzaj zleceniami' }, { route: '/pages/Company/RoutesList', name: 'Lista przejazdów' }]} />
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
                    <td>
                    <Link to={`/pages/Company/RoutesList/RouteDetails/${item.id}`}>
                        {item.name}
                    </Link>
                    </td>
                    <td>{item.data + " | " + item.dataEnd}</td>
                    <td><button onClick={() => handleDeleteRoute(item.id)}>-</button></td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
}

export default RoutesListView;
