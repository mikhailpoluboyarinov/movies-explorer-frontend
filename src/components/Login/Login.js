import React from 'react';
import { Link } from 'react-router-dom';

import logoDiploma from "../../images/logo-diploma.svg";

export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return(
        <main className="login">
            <div className="login__wrap">
                <Link to="/">
                    <img className="login__link" src={logoDiploma} alt="Логотип" />
                </Link>
                <h2 className="login__title">Рады видеть!</h2>
                <form className="login__form">
                    <label className="login__label">E-mail</label>
                    <input className="login__input" placeholder="Здесь не видно, но нужно ввести e-mail" type="email" onChange={handleEmailChange} value={email} required />
                    <span className="login__error"></span>
                    <label className='login__label'>Пароль</label>
                    <input className="login__input" placeholder="Здесь не видно, но нужно ввести password" type="password" onChange={handlePasswordChange} value={password} autoComplete="off" required />
                    <span className="login__error"></span>
                    <button className="login__button" type="submit">Войти</button>
                    <p className="login__caption">
                        Ещё не зарегистрированы?
                        <Link to="/sign-up" className="login__link-registration">Регистрация</Link>
                    </p>
                </form>
            </div>
        </main>
    )
}