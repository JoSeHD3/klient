import { useState, useEffect } from 'react';
import { getRoutes, deleteRoute } from '../models/RoutesListModel';

const useRoutesListController = () => {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
        try {
            const routesData = await getRoutes(token);
            setData(routesData);
        } catch (error) {
            console.error('Error fetching routes data: ', error);
        }
    };

    fetchData();
}, [token]);

const handleDeleteRoute = async (routeId) => {
    try {
        const success = await deleteRoute(token, routeId);
        if (success) {
            alert("Pomyślnie usunięto trasę");
            window.location.reload();
        }
        } catch (error) {
        alert("Wystąpił błąd");
        console.error("Error handling delete route: ", error);
        }
    };

    return { data, handleDeleteRoute };
};

export default useRoutesListController;
