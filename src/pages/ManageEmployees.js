import React, {useState, useEffect} from 'react';

import NavButton from '../components/NavButton';
import {useMargin} from '../components/MarginContext';
import Cookies from 'js-cookie';

function ManageEmployees(){
    const {marginLeft} = useMargin();

    const addressA = 'http://127.0.0.1:8086/companyAddUser';
    const addressB = 'http://127.0.0.1:8086/companyGetUsers';
    const addressC = '';
    const addressD = '';
    const token = localStorage.getItem('token');
    const role = Cookies.get('userRole');

    const [login, setLogin] = useState();
    const [employees, setEmployees] = useState([]);
    const [selectedRole, setSelectedRole] = useState();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch(addressB, {
                method: "GET",
                headers: {
                    'Content-Type' : 'application/json', 
                    'Authorization' : 'Bearer '+ token
                }
            });
            if(response.ok) {
                const data = await response.json();
                setEmployees(data);
            } else {
                console.error("emloyees fetch error", response.statusText);
            }
        } catch (error){
            console.error(error);
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try { 
            const reponse = await fetch(addressA, {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json', 
                    'Authorization' : 'Bearer '+ token
                },
                body: JSON.stringify({login})
            });
            if(reponse.ok ){
                alert("Pomyślnie dodano użytkownika do firmy");
            }
            else {
                alert("Wystąpił błąd");
            }
        } catch(error) {
            console.error(error);
        }
    };

    const handleRoleChange = async (employee, newRole) => {
        try {
            const response = await fetch(addressC, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({token: token, name: employee.name, surname: employee.surname, role: newRole}),
            });

            if(response.ok){
                alert('Pomyślnie zmieniono rolę użytkownika');
            } else {
                console.error('role change not completed successfully ');
            }
        } catch(error){
            console.error(error);
        }
    };

    const handleDeleteUser = async (employee) => {
        try {
            const response = await fetch(addressD, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token: token, name: employee.name, surname: employee.surname})
            });

            if(response.ok){
                alert("Pomyślnie usunięto użytkownika z firmy");
                fetchEmployees();
            } else {
                alert("Wystąpił błąd");
                console.error("deleting user error", response.statusText);
            }
        } catch (error) {console.error(error);}
    }

    return(
        <div className="site-first-div" style={{marginLeft}}>
            <NavButton routes={[{route: '/pages/Home', name: 'Strona główna'}, {route: '/pages/Company', name: 'Firma'}, {route: '/pages/Company/ManageEmployees', name: 'Zarządzaj pracownikami'}]}/>
            {role === 'manager' ? 
            <div>
                <form className='manageemployees-locate' onSubmit={handleLoginSubmit}>
                    <input className='deactivateaccount-password' type='text' required placeholder='LOGIN UŻYTKOWNIKA' onChange={e => setLogin(e.target.value)}></input>
                    <input className='deactivateaccount-submit' type='submit' value='Dodaj użytkownika'></input>
                </form>
                <div className="commissionshistory-table-container">
                <table className="commissionshistory-table">
                    <thead>
                        <tr>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Stanowisko</th>
                        </tr>
                    </thead>
						<tbody>
							{employees.map((employee, index) => (
								<tr key={index}>
									<td>{employee.name}</td>
									<td>{employee.name"}</td>
									<td>
										<select
											value={employee.role}
											onChange={(e) => handleRoleChange(employee, e.target.value)}
										>
											<option value="logistician">Logistyk</option>
											<option value="employee">Pracownik</option>
											<option value="manager">Menadżer</option>
										</select>
										<button onClick={() => handleDeleteUser(employee)}>-</button>
									</td>
								</tr>
							))}
						</tbody>
                </table>
                </div>
            </div>
            : ''}
        </div>
    );
}

export default ManageEmployees;