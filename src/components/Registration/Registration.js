import React from 'react';
import { Link } from 'react-router-dom';

import logoDiploma from "../../images/logo-diploma.svg";

export default function Registration() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    return(
        <main className="registration">
            <div className="registration__wrap">
                <Link to="/">
                    <img className="registration__link" src={logoDiploma} alt="Логотип" />
                </Link>
                <h2 className="registration__title">Рады видеть!</h2>
                <form className="registration__form">
                    <label className="registration__label">Имя</label>
                    <input className="registration__input" placeholder="Здесь не видно, но нужно ввести Name" type="text" onChange={handleNameChange} value={name} required />
                    <span className="registration__error"></span>
                    <label className="registration__label">E-mail</label>
                    <input className="registration__input" placeholder="Здесь не видно, но нужно ввести e-mail" type="email" onChange={handleEmailChange} value={email} required />
                    <span className="registration__error"></span>
                    <label className='registration__label'>Пароль</label>
                    <input className="registration__input" placeholder="Здесь не видно, но нужно ввести password" type="password" onChange={handlePasswordChange} value={password} autoComplete="off" required />
                    <span className="registration__error"></span>
                    <button className="registration__button" type="submit">Зарегистрироваться</button>
                    <p className="registration__caption">
                        Уже зарегистрированы?
                        <Link to="/sign-in" className="registration__link-registration">Войти</Link>
                    </p>
                </form>
            </div>
        </main>
    )
}