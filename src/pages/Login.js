import React, {useState} from 'react';
import bcrypt from 'bcryptjs'

const address = '';

async function checkLoginData(cred){
    return fetch(address, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cred)
    }).then(data => data.json())
}

function Login(){
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loginUsername, setLoginUsername] = useState();
    const [loginPassword, setLoginPassword] = useState();

    const handleSubmit = async e => {        //prevent from submit default action
        e.preventDefault();
        let hashedPassword = bcrypt.hashSync(loginPassword, 10);
        const response = await checkLoginData({
            loginUsername,
            hashedPassword
        });
        if('accessToken' in response) {
            //success message
            localStorage.setItem("accessToken", response['accessToken']);
            localStorage.setItem('user', JSON.stringify(response['user']));
            window.location.href = "/pages/home";
            setIsSubmitted(true);
        } else {
            //error message
        }
    }

    return(
        <div className="loginForm">
            <form onSubmit={handleSubmit}>
                <div className="loginInput">
                    <label>Username: </label>
                    <input type="text" name="loginName" required onChange={e => setLoginUsername(e.target.value)}/>
                </div>
                <div className="loginInput">
                    <label>Password: </label>
                    <input type="password" name="loginPassword" required onChange={e => setLoginPassword(e.target.value)}/>
                </div>
                <div className="loginButton">
                    <input type="submit" name="loginSubmit" value="Zaloguj"/>
                </div>
            </form>
        </div>
    );
}

export default Login;