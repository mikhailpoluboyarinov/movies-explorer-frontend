import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";

import logoDiploma from "../../images/logo-diploma.svg";
import { registerUser } from "../../utils/MainApi";
import { APP_CONSTANTS } from "../../utils/Constants";

export default function Registration() {

    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({ mode: 'onChange' } );

    const history = useHistory();

    function handleRegister(data) {
        registerUser(data)
            .then((res) => {
                history.push(APP_CONSTANTS.signIn)
            })
            .catch((err) => {
                console.log(err)
                /* Сделать обработку ошибки пользователя*/
            })
    }

    const handleSubmitForm = (data) => {
        handleRegister(data);
        reset();
    }

    return(
        <main className="registration">
            <div className="registration__wrap">
                <Link to="/">
                    <img className="registration__link" src={logoDiploma} alt="Логотип" />
                </Link>
                <h2 className="registration__title">Рады видеть!</h2>
                <form className="registration__form" onSubmit={handleSubmit(handleSubmitForm)}>
                    <label className="registration__label">Имя</label>
                    <input className="registration__input"
                           {...register("name", {
                               required: "Поле не должно быть пустым",
                               minLength: {
                                   value: 2,
                                   message: "Минимум 2 символа"
                               },
                               maxLength: {
                                   value: 30,
                                   message: "Максимум 30 символов"
                               }
                           })}
                           placeholder="Здесь не видно, но нужно ввести Name"
                           type="text"
                    />
                    <span className="registration__error">
                        {errors?.name && <p>{errors?.name?.message || "Ошибка валидации!"}</p>}
                    </span>
                    <label className="registration__label">E-mail</label>
                    <input className="registration__input"
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
                    <span className="registration__error">
                        {errors?.email && <p>{errors?.email?.message || "Ошибка валидации!"}</p>}
                    </span>
                    <label className='registration__label'>Пароль</label>
                    <input className="registration__input"
                           {...register("password", {
                               required: "Поле не должно быть пустым",
                           })}
                           placeholder="Здесь не видно, но нужно ввести password"
                           type="password"
                           autoComplete="off"
                    />
                    <span className="registration__error">
                        {errors?.password && <p>{errors?.password?.message || "Ошибка валидации!"}</p>}
                    </span>
                    <button className="registration__button" type="submit" disabled={!isValid}>Зарегистрироваться</button>
                    <p className="registration__caption">
                        Уже зарегистрированы?
                        <Link to="/sign-in" className="registration__link-registration">Войти</Link>
                    </p>
                </form>
            </div>
        </main>
    )
}