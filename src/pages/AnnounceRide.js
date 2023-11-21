import React, { useEffect, useState } from 'react';
import NavButton from '../components/NavButton';
import { useMargin } from '../components/MarginContext';
import Cookies from 'js-cookie';

function AnnounceRide() {
  const { marginLeft } = useMargin();
  const [data, setData] = useState([]);
  const [driverOptions, setDriverOptions] = useState([]);
  const [rideData, setRideData] = useState({
    name: '',
    zipCode: '',
    houseNumber: '',
    gpsX: '',
    gpsY: '',
    address: '',
    city: '',
    date: '',
    driver: '',
    description: '',
  });
  const address = '';
  const addressSending = 'http://127.0.0.1:8086/startRoute';
  const addressTrucks = 'http://127.0.0.1:8086/getBindedTrucks';
  const role = Cookies.get('userRole');
  const token = localStorage.getItem('token');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRideData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(addressSending, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(rideData),
      });

      if (response.ok) {
        alert('Pomyślnie dodano przejazd!');
      } else {
        alert('Wystąpił błąd');
      }
    } catch (error) {
      console.error('Error: ', error);
    }

    setRideData({
      name: '',
      zipCode: '',
      houseNumber: '',
      gpsX: '',
      gpsY: '',
      address: '',
      city: '',
      date: '',
      driver: '',
      description: '',
    });
  };


 useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };

                const driversResponse = await fetch(addressTrucks, {
                    method: 'GET',
                    headers: headers,
                });
                const driversData = await driversResponse.json();
                setDriverOptions(driversData);


            } catch (error) {
                console.error('Error: ', error);
            }
        };

        fetchData();
    }, []);




  return (
    <div className="site-first-div" style={{ marginLeft }}>
      <NavButton
        routes={[
          { route: '/pages/Home', name: 'Strona główna' },
          { route: '/pages/Company', name: 'Firma' },
          {
            route: '/pages/Company/ManageCommissions',
            name: 'Zarządzaj zleceniami',
          },
          { route: '/pages/Company/AnnounceRide', name: 'Ogłoś przejazd' },
        ]}
      />
      {(role === 'manager' || role === 'logistyk') ? (
        <div className="announceride-locate">
          
          <form onSubmit={handleSubmit} className="deactivateaccount-form">
          <div className='announceride-row'>
          <div className='announceride-column'>
            <input
              type="text"
              placeholder="Nazwa przejazdu"
              className="deactivateaccount-password"
              name="name"
              value={rideData.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Kod pocztowy"
              className="deactivateaccount-password"
              name="zipCode"
              value={rideData.zipCode}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Numer domu"
              className="deactivateaccount-password"
              name="houseNumber"
              value={rideData.houseNumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Współrzędna X GPS"
              className="deactivateaccount-password"
              name="gpsX"
              value={rideData.gpsX}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Współrzędna Y GPS"
              className="deactivateaccount-password"
              name="gpsY"
              value={rideData.gpsY}
              onChange={handleInputChange}
            />
            </div>
            <div className='announceride-row'>
            <input
              type="text"
              placeholder="Adres"
              className="deactivateaccount-password"
              name="address"
              value={rideData.address}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Miasto"
              className="deactivateaccount-password"
              name="city"
              value={rideData.city}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Data przejazdu"
              className="deactivateaccount-password"
              name="date"
              value={rideData.date}
              onChange={handleInputChange}
            />
			<select
			  name="driver"
			  className="deactivateaccount-password"
			  value={rideData.driver}
			  onChange={handleInputChange}
			>
			  <option value="">Wybierz pojazd</option>
			  {driverOptions.map((driver, index) => (
				<option key={index} value={driver.truck_id}>
				  {driver.toString}
				</option>
			  ))}
			</select>
            <input
            type="text"
              name="description"
              placeholder="Opis"
              className="deactivateaccount-password"
              value={rideData.description}
              onChange={handleInputChange}
            />
            </div></div>
            <input
              className="deactivateaccount-submit"
              type="submit"
              value="Dodaj"
            ></input>
          </form>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default AnnounceRide;
