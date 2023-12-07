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
		 const errorData = await response.json();
		alert(errorData.message);
		
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
      datePredict: '',
      driver: '',
      description: '',
      zipCodeEnd: '',
      houseNumberEnd: '',
      gpsXEnd: '',
      gpsYEnd: '',
      addressEnd: '',
      cityEnd: ''
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
		  
			<fieldset>
			<div className='commissions-column'>
			<legend className='commissions-label'>Informacje</legend>
            <input
              type="text"
              placeholder="Nazwa przejazdu"
              className="deactivateaccount-password"
              name="name"
              value={rideData.name}
              onChange={handleInputChange}
            />
			
			
			<legend>Data rozpoczęcia przejazdu</legend>
			<input
              type="date"
              placeholder="Data przejazdu"
              className="deactivateaccount-password"
              name="date"
              value={rideData.date}
              onChange={handleInputChange}
            />
			<legend>Przewidywana data zakończenia przejazdu</legend>
			<input
              type="date"
              placeholder="Przewidywana data zakończenia przejazdu"
              className="deactivateaccount-password"
              name="datePredict"
              value={rideData.datePredict}
              onChange={handleInputChange}
            />
			<legend></legend>
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
			
			
			</div>
			</fieldset>
		    <fieldset>
            <div className='commissions-column'>
            <legend className='commissions-label'>Punkt początkowy</legend>

               
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
			
			</div></fieldset>
			
			
			
			
					    <fieldset>
            <div className='commissions-column'>
            <legend className='commissions-label'>Punkt Końcowy</legend>

            <input
              type="text"
              placeholder="Kod pocztowy"
              className="deactivateaccount-password"
              name="zipCodeEnd"
              value={rideData.zipCodeEnd}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Numer domu"
              className="deactivateaccount-password"
              name="houseNumberEnd"
              value={rideData.houseNumberEnd}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Współrzędna X GPS"
              className="deactivateaccount-password"
              name="gpsXEnd"
              value={rideData.gpsXEnd}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Współrzędna Y GPS"
              className="deactivateaccount-password"
              name="gpsYEnd"
              value={rideData.gpsYEnd}
              onChange={handleInputChange}
            />
            </div>
            <div className='announceride-row'>
            <input
              type="text"
              placeholder="Adres"
              className="deactivateaccount-password"
              name="addressEnd"
              value={rideData.addressEnd}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Miasto"
              className="deactivateaccount-password"
              name="cityEnd"
              value={rideData.cityEnd}
              onChange={handleInputChange}
            />
			
			</div></fieldset>
			
			
			
			
	
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
