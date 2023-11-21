import React, {useState} from 'react';
import '../App.css';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';
import Cookies from 'js-cookie';

function Commissions(){
    const [zipCodeStart, setZipCodeStart] = useState();
    const [houseNumberStart, setHouseNumberStart] = useState();
    const [gpsXStart, setGPSXStart] = useState();
    const [gpsYStart, setGPSYStart] = useState();
    const [addressStart, setAddressStart] = useState();
    const [zipCodeEnd, setZipCodeEnd] = useState();
    const [houseNumberEnd, setHouseNumberEnd] = useState();
    const [gpsXEnd, setGPSXEnd] = useState();
    const [gpsYEnd, setGPSYEnd] = useState();
    const [addressEnd, setAddressEnd] = useState();
    const [description, setDescription] = useState();
    const [xPackage, setXPackage] = useState();
    const [yPackage, setYPackage] = useState();
    const [zPackage, setZPackage] = useState();
    const [mass, setMass] = useState();
    const [stackable, setStackable] = useState();
    const [count, setCount] = useState();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
	
	const [message, setMessage] = useState();

    const {marginLeft} = useMargin();

    const address = "http://127.0.0.1:8086/commissionCreate";
    const token = localStorage.getItem('token');
    const role = Cookies.get('userRole');

    const handleConfirmClick = async () => {
        const dataToSend = {
            zipCodeStart,
            houseNumberStart,
            gpsXStart,
            gpsYStart,
            addressStart,
            zipCodeEnd,
            houseNumberEnd,
            gpsXEnd,
            gpsYEnd,
            addressEnd,
            description,
            xPackage,
            yPackage,
            zPackage,
            mass,
            stackable,
            count,
            startDate,
            endDate
        };
    
        console.log('Commissions: sending data ', dataToSend);
    
        try {
            const response = await fetch(address, {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json', 
                    'Authorization' : 'Bearer ' + token
                },
                body: JSON.stringify({data: dataToSend}),
            });
            if(response.ok) {
				setMessage("Pomyślnie dodano paczke");
                const data = await response.json();
            } else {
                console.error("SearchCargo: send error", response.statusText);
            }
        } catch (error){
            console.error(error);
        }

      };

    return (
        <div className="site-first-div" style={{marginLeft}}>
            <NavButton className="top-nav" routes={[{route: '/pages/Home', name: 'Strona główna'}, {route: '/pages/Commision', name: 'Zlecenie'}]}/>
            <div className="commissions-locate">
            <form>
                <div className='commissions-row'>
                    <fieldset>
                <div className='commissions-column'>
                <legend className='commissions-label'>Punkt początkowy</legend>
                
                <input placeholder="Kod pocztowy" className="deactivateaccount-password" type="text" value={zipCodeStart} onChange={(e) => setZipCodeStart(e.target.value)} />

                
                <input placeholder='Numer domu' className="deactivateaccount-password" type="text" value={houseNumberStart} onChange={(e) => setHouseNumberStart(e.target.value)} />

                
                <input placeholder='X' className="deactivateaccount-password" type="number" step="0.001" value={gpsXStart} onChange={(e) => setGPSXStart(parseFloat(e.target.value))} />

                
                <input placeholder="Y" className="deactivateaccount-password" type="number" step="0.001" value={gpsYStart} onChange={(e) => setGPSYStart(parseFloat(e.target.value))} />
                
                <input placeholder='Adres' className="deactivateaccount-password" type="text" value={addressStart} onChange={(e) => setAddressStart(e.target.value)} />
                </div></fieldset><fieldset>
                <div className='commissions-column'>
                <legend className='commissions-label'>Punkt koncowy</legend>
                <input placeholder="Kod pocztowy" className="deactivateaccount-password" type="text" value={zipCodeEnd} onChange={(e) => setZipCodeEnd(e.target.value)} />

                <input placeholder='Numer domu' className="deactivateaccount-password" type="text" value={houseNumberEnd} onChange={(e) => setHouseNumberEnd(e.target.value)} />

                <input placeholder='X' className="deactivateaccount-password" type="number" step="0.001" value={gpsXEnd} onChange={(e) => setGPSXEnd(parseFloat(e.target.value))} />

                <input placeholder="Y" className="deactivateaccount-password" type="number" step="0.001" value={gpsYEnd} onChange={(e) => setGPSYEnd(parseFloat(e.target.value))} />

                <input placeholder='Adres' className="deactivateaccount-password" type="text" value={addressEnd} onChange={(e) => setAddressEnd(e.target.value)} />
                </div></fieldset><fieldset>

                <div className='commissions-column2'>

                <legend className='commissions-label'>Paczka
                </legend>
                <input placeholder='Opis' className="deactivateaccount-password" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

                <input placeholder='Wysokość' className="deactivateaccount-password" type="number" step="0.001" value={xPackage} required onChange={(e) => setXPackage(parseFloat(e.target.value))} />

                <input placeholder='Szerokość' className="deactivateaccount-password" type="number" step="0.001" value={yPackage} required onChange={(e) => setYPackage(parseFloat(e.target.value))} />

                <input placeholder='Długość' className="deactivateaccount-password" type="number" step="0.001" value={zPackage} required onChange={(e) => setZPackage(parseFloat(e.target.value))} />

                <input placeholder='Masa' className="deactivateaccount-password" type="number" value={mass} required onChange={(e) => setMass(parseFloat(e.target.value))} />
                

                <input placeholder='Ilość' className="deactivateaccount-password" type="number" value={count} required onChange={(e) => setCount(parseInt(e.target.value, 10))} />
                <label class="toggler-wrapper style-1">
                Czy można sztaplować?:
                <input type="checkbox" checked={stackable} onChange={() => setStackable(!stackable)} />
                <div class="toggler-slider">
                    <div class="toggler-knob"></div>
                </div>
                </label>
                </div></fieldset>

                </div>
                
                <button className="deactivateaccount-submit" type="button" onClick={handleConfirmClick}>
                Potwierdz
                </button>
            </form>
            </div>
			{message && <div className='message'>{message}</div>}
        </div>
    );
}

export default Commissions;