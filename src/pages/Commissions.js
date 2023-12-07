import React, {useState} from 'react';
import '../App.css';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';
import Cookies from 'js-cookie';

function Commissions(){
    const [zip_codestart, setZipCodeStart] = useState();
    const [house_numberstart, setHouseNumberStart] = useState();
    const [gps_xstart, setGPSXStart] = useState();
    const [gps_ystart, setGPSYStart] = useState();
    const [addressstart, setAddressStart] = useState();
    const [zip_codeend, setZipCodeEnd] = useState();
    const [house_numberend, setHouseNumberEnd] = useState();
    const [gps_xend, setGPSXEnd] = useState();
    const [gps_yend, setGPSYEnd] = useState();
    const [addressend, setAddressEnd] = useState();
    const [description, setDescription] = useState();
    const [xpackage, setXPackage] = useState();
    const [ypackage, setYPackage] = useState();
    const [zpackage, setZPackage] = useState();
    const [mass, setMass] = useState();
    const [stackable, setStackable] = useState();
    const [count, setCount] = useState();
    const [startdate, setStartDate] = useState('');
    const [enddate, setEndDate] = useState('');
    const [citystart, setCityStart] = useState('');
    const [cityend, setCityEnd] = useState('');
	
	const [message, setMessage] = useState();

    const {marginLeft} = useMargin();

    const address = "http://127.0.0.1:8086/commissionCreate";
    const token = localStorage.getItem('token');
    const role = Cookies.get('userRole');

    const handleConfirmClick = async () => {
        const dataToSend = {
            zip_codestart,
            house_numberstart,
            gps_xstart,
            gps_ystart,
            addressstart,
            zip_codeend,
            house_numberend,
            gps_xend,
            gps_yend,
            addressend,
            description,
            xpackage,
            ypackage,
            zpackage,
            mass,
            stackable,
            count,
            startdate,
            enddate,
            citystart,
            cityend
        };
    
        console.log('Commissions: sending data ', dataToSend);
    
        try {
            const response = await fetch(address, {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json', 
                    'Authorization' : 'Bearer ' + token
                },
                body: JSON.stringify(dataToSend),
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
                
                <input placeholder="Kod pocztowy" className="deactivateaccount-password" type="text" value={zip_codestart} onChange={(e) => setZipCodeStart(e.target.value)} />

                
                <input placeholder='Numer domu' className="deactivateaccount-password" type="text" value={house_numberstart} onChange={(e) => setHouseNumberStart(e.target.value)} />

                
                <input placeholder='X' className="deactivateaccount-password" type="number" step="0.001" value={gps_xstart} onChange={(e) => setGPSXStart(parseFloat(e.target.value))} />

                
                <input placeholder="Y" className="deactivateaccount-password" type="number" step="0.001" value={gps_ystart} onChange={(e) => setGPSYStart(parseFloat(e.target.value))} />
                
                <input placeholder='Adres' className="deactivateaccount-password" type="text" value={addressstart} onChange={(e) => setAddressStart(e.target.value)} />
				
				<input placeholder='Miasto' className="deactivateaccount-password" type="text" value={citystart} onChange={(e) => setCityStart(e.target.value)} />
				
                </div></fieldset><fieldset>
                <div className='commissions-column'>
                <legend className='commissions-label'>Punkt koncowy</legend>
                <input placeholder="Kod pocztowy" className="deactivateaccount-password" type="text" value={zip_codeend} onChange={(e) => setZipCodeEnd(e.target.value)} />

                <input placeholder='Numer domu' className="deactivateaccount-password" type="text" value={house_numberend} onChange={(e) => setHouseNumberEnd(e.target.value)} />

                <input placeholder='X' className="deactivateaccount-password" type="number" step="0.001" value={gps_xend} onChange={(e) => setGPSXEnd(parseFloat(e.target.value))} />

                <input placeholder="Y" className="deactivateaccount-password" type="number" step="0.001" value={gps_yend} onChange={(e) => setGPSYEnd(parseFloat(e.target.value))} />

                <input placeholder='Adres' className="deactivateaccount-password" type="text" value={addressend} onChange={(e) => setAddressEnd(e.target.value)} />
				
				<input placeholder='Miasto' className="deactivateaccount-password" type="text" value={cityend} onChange={(e) => setCityEnd(e.target.value)} />
				
                </div></fieldset><fieldset>

                <div className='commissions-column2'>

                <legend className='commissions-label'>Paczka
                </legend>
                <input placeholder='Opis' className="deactivateaccount-password" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

                <input placeholder='Wysokość' className="deactivateaccount-password" type="number" step="0.001" value={xpackage} required onChange={(e) => setXPackage(parseFloat(e.target.value))} />

                <input placeholder='Szerokość' className="deactivateaccount-password" type="number" step="0.001" value={ypackage} required onChange={(e) => setYPackage(parseFloat(e.target.value))} />

                <input placeholder='Długość' className="deactivateaccount-password" type="number" step="0.001" value={zpackage} required onChange={(e) => setZPackage(parseFloat(e.target.value))} />

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