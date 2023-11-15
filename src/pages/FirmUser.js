import React, { useState } from 'react';

function FirmUser(){
    const [nip, setNip] = useState();
    const [companyName, setCompanyName] = useState();
    const address = "";
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch (address, {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify({companyName, nip}),
            });

            if(response.ok){
                alert('Pomyślnie stworzono firmę!');
            } else {
                alert('Wystąpił błąd');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div className='firmuser-locate'>
            <form onSubmit={handleSubmit} className='deactivateaccount-form'>
                <input className='deactivateaccount-password' type='text' required placeholder='NAZWA FIRMY' onChange={e => setCompanyName(e.target.value)}></input>
                <input className='deactivateaccount-password' type='number' required placeholder='NIP' onChange={e => setNip(e.target.value)}></input>
                <input className='deactivateaccount-submit' type='submit' value='Stwórz firmę'></input>
            </form>
        </div>
    );
}

export default FirmUser;