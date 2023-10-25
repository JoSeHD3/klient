import React, {useState} from 'react';
import bcrypt from 'bcryptjs';

const address = "http://127.0.0.1:8086/userRegister";

async function sendRegisterData(cred){
    return fetch(address, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cred)
    }).then(data => data.json());
}

function Register(){
    const [isOkay, setIsOkay] = useState();
    const [registerUsername, setRegisterUsername] = useState();
    const [registerPassword, setRegisterPassword] = useState();
    const [registerEmail, setRegisterEmail] = useState();
    const [registerName, setRegisterName] = useState();
    const [registerSurname, setRegisterSurname] = useState();
    const [registerWrongPassword, setRegisterWrongPassword] = useState();

    const comparePasswords = password => {
        if(password === registerPassword) {
            setIsOkay(true);
            setRegisterWrongPassword("");
        } else {
            setIsOkay(false);
            setRegisterWrongPassword("Hasła nie są takie same.");
        }
        //error na zle haslo
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if(isOkay){
            let hashedPassword = bcrypt.hashSync(registerPassword, 10);
            const response = await sendRegisterData({
                registerUsername,
                //hashedPassword,
                registerPassword,
                registerEmail,
                registerName,
                registerSurname
            });
            //if(response.success) {    
            //    window.location.href = "/";
            //}
        }
    }

    return (
        <div className="registerForm">
            <form onSubmit={handleSubmit}>
                <div className="registerInput">
                    <label>Name: </label>
                    <input type="text" name="registerName" required onChange={e => setRegisterName(e.target.value)}/>
                </div>
                <div className="registerInput">
                    <label>Surname: </label>
                    <input type="text" name="registerSurname" required onChange={e => setRegisterSurname(e.target.value)}/>
                </div>
                <div className="registerInput">
                    <label>Login: </label>
                    <input type="text" name="registerUsername" required onChange={e => setRegisterUsername(e.target.value)}/>
                </div>
                <div className="registerInput">
                    <label>E-mail: </label>
                    <input type="email" name="registerEmail" required onChange={e => setRegisterEmail(e.target.value)}/>
                </div>
                <div className="registerInput">
                    <label>Password: </label>
                    <input type="password" name="registerPassword" required onChange={e => setRegisterPassword(e.target.value)}/>
                </div>
                <div className="registerInput">
                    <label>Confirm Password: </label>
                    <input type="password" name="registerRepeatPassword" required onChange={e => comparePasswords(e.target.value)}/>
                    
                </div>
                <div>
                    <label className="registerWrongPassword">{registerWrongPassword}</label>
                </div>
                <div className="registerButton">
                    <input type="submit" name="registerSubmit" value="Zarejestruj"/>
                </div>
            </form>
        </div>
    );
}

export default Register;