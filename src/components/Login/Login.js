import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { loginUser } from "../../utils/MainApi";
import { useForm } from "react-hook-form";

import logoDiploma from "../../images/logo-diploma.svg";
import { APP_CONSTANTS } from "../../utils/Constants";

export default function Login({ setCurrentUser }) {

    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({ mode: 'onChange' } );

    const history = useHistory();

    function handleLogin(data) {
       loginUser(data)
            .then((res) => {
                localStorage.setItem('jwt', res.token);
                localStorage.setItem('userId', res.user._id);
                console.log(res);
                setCurrentUser(res.user);
                history.push(APP_CONSTANTS.movies);
            })
            .catch(err => {
                console.log(err)
                /* Сделать обработку ошибки пользователя*/
            })
    }


    const handleSubmitForm = (data) => {
        handleLogin(data);
        reset();
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
    )
}