import React, {useState} from 'react';
import './auth.css'


const getUser = async (login, password) => {
    try {
        const link = 'http://localhost:3050/auth?'+ 'login=' + login + '&' + 'password=' + password;

        const response = await fetch(
            link,
        );

        return await response.json();
    } catch (err) {
        console.error(err.message);
    }
}
const Auth = (props) => {

    const [denied, setDenied] = useState(false);
    const submit = async () => {

        const login = document.getElementsByClassName("login")[0].value;
        const password = document.getElementsByClassName("password")[0].value;

        const user = await getUser(login, password);
        if(!user) setDenied(true);
        props.authorize(user);
    }

    return (
        <div className={"auth"}>
            <h1> Авторизация </h1>
            <div className={"inputs"}>
                <input type="text" className={"login"} placeholder={"Логин"}/>
                <input type="password"className={"password"} placeholder={"Пароль"}/>
            </div>
            <div style={{display: "inline-flex", gap: '20px', alignItems: 'center'}}>
                <div className={"confirm"} onClick={submit}> Подтвердить </div>
                {
                    denied ? <p> Неверный логин или пароль! </p> : ''
                }
            </div>
        </div>
    );
};

export default Auth;