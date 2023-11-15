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

    const {marginLeft} = useMargin();

    const address = "";
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
                method: "GET",
                headers: {
                    'Content-Type' : 'application/json', 
                    'Authorization' : 'Bearer ' + token
                },
                body: JSON.stringify({data: dataToSend}),
            });
            if(response.ok) {
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
            <NavButton className="top-nav" routes={[{route: '/pages/Home', name: 'Strona główna'}, {route: '/pages/Test', name: 'Test'}]}/>
            <form>
                <fieldset>
                <legend>Punkt początkowy</legend>
                <label>
                kod pocztowy:
                <input type="text" value={zipCodeStart} onChange={(e) => setZipCodeStart(e.target.value)} />
                </label>

                <label>
                Numer domu:
                <input type="text" value={houseNumberStart} onChange={(e) => setHouseNumberStart(e.target.value)} />
                </label>

                <label>
                X:
                <input type="number" step="0.001" value={gpsXStart} onChange={(e) => setGPSXStart(parseFloat(e.target.value))} />
                </label>

                <label>
                Y:
                <input type="number" step="0.001" value={gpsYStart} onChange={(e) => setGPSYStart(parseFloat(e.target.value))} />
                </label>
                <label>
                Adres:
                <input type="text" value={addressStart} onChange={(e) => setAddressStart(e.target.value)} />
                </label>
                <label>
                Data:
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </label>
                </fieldset>
                <fieldset>
                <legend>Punkt koncowy</legend>
                <label>
                Kod pocztowy:
                <input type="text" value={zipCodeEnd} onChange={(e) => setZipCodeEnd(e.target.value)} />
                </label>

                <label>
                Numer domu:
                <input type="text" value={houseNumberEnd} onChange={(e) => setHouseNumberEnd(e.target.value)} />
                </label>

                <label>
                X:
                <input type="number" step="0.001" value={gpsXEnd} onChange={(e) => setGPSXEnd(parseFloat(e.target.value))} />
                </label>

                <label>
                Y:
                <input type="number" step="0.001" value={gpsYEnd} onChange={(e) => setGPSYEnd(parseFloat(e.target.value))} />
                </label>

                <label>
                Adres:
                <input type="text" value={addressEnd} onChange={(e) => setAddressEnd(e.target.value)} />
                </label>
                <label>
                Data:
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </label>
                </fieldset>

                <fieldset>
                <legend>Paczka
                </legend>
                <label>
                Description:
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>

                <label>
                X (Package):
                <input type="number" step="0.001" value={xPackage} onChange={(e) => setXPackage(parseFloat(e.target.value))} />
                </label>

                <label>
                Y (Package):
                <input type="number" step="0.001" value={yPackage} onChange={(e) => setYPackage(parseFloat(e.target.value))} />
                </label>

                <label>
                Z (Package):
                <input type="number" step="0.001" value={zPackage} onChange={(e) => setZPackage(parseFloat(e.target.value))} />
                </label>

                <label>
                Mass:
                <input type="number" value={mass} onChange={(e) => setMass(parseFloat(e.target.value))} />
                </label>

                <label>
                Stackable:
                <input type="checkbox" checked={stackable} onChange={() => setStackable(!stackable)} />
                </label>

                <label>
                Count:
                <input type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value, 10))} />
                </label>
                </fieldset>

                <button type="button" onClick={handleConfirmClick}>
                Potwierdz
                </button>
            </form>
        </div>
    );
}

export default Commissions;