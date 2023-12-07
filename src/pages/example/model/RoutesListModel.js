const getRoutes = async (token) => {
    try {
        const response = await fetch('http://127.0.0.1:8086/getRoutes', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
        });
  
        if (!response.ok) {
            throw new Error(`Failed to fetch routes: ${response.statusText}`);
        }
  
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching routes: ', error);
        throw error;
    }
};
  
const deleteRoute = async (token, routeId) => {
    try {
        const response = await fetch("http://127.0.0.1:8086/deleteRoute", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
            route_id: routeId
            })
        });
    
        if (response.ok) {
            return true;
        } else {
            console.error("Deleting route error: ", response.statusText);
            throw new Error('Failed to delete route');
        }
    } catch (error) {
        console.error('Error deleting route: ', error);
        throw error;
    }
};
  
export { getRoutes, deleteRoute };
  