import React from 'react';
import { Link } from 'react-router-dom';

import { useForm } from "react-hook-form";

import logoDiploma from "../../images/logo-diploma.svg";

export default function Login({ handleLogin }) {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' } );

    const handleSubmitForm = (data) => {
        handleLogin(data);
    }

    return(
        <main className="login">
            <div className="login__wrap">
                <Link to="/">
                    <img className="login__link" src={logoDiploma} alt="Логотип" />
                </Link>
                <h2 className="login__title">Рады видеть!</h2>
                <form className="login__form" onSubmit={handleSubmit(handleSubmitForm)}>
                    <label className="login__label">E-mail</label>
                    <input className="login__input"
                           {...register("email", {
                               required: "Поле не должно быть пустым",
                               pattern: {
                                   value: /^\S+@\S+$/i,
                                   message: "Введите email"
                               }
                           })}
                           placeholder="Здесь не видно, но нужно ввести e-mail"
                           type="email"
                    />
                    <span className="login__error">
                        {errors?.email && <p>{errors?.email?.message || "Ошибка валидации!"}</p>}
                    </span>
                    <label className='login__label'>Пароль</label>
                    <input className="login__input"
                           {...register("password", {
                               required: "Поле не должно быть пустым",
                           })}
                           placeholder="Здесь не видно, но нужно ввести password"
                           type="password"
                           autoComplete="off"
                    />
                    <span className="login__error">
                        {errors?.password && <p>{errors?.password?.message || "Ошибка валидации!"}</p>}
                    </span>
                    <button className="login__button" type="submit" disabled={!isValid}>Войти</button>
                    <p className="login__caption">
                        Ещё не зарегистрированы?
                        <Link to="/sign-up" className="login__link-registration">Регистрация</Link>
                    </p>
                </form>
            </div>
        </main>
    );
}