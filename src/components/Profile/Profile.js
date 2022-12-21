import React from 'react';
import { useForm } from "react-hook-form";

export default function Profile( {currentUser, handleLogOut, editProfile } ) {
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({ mode: 'onChange' } );

    const handleSubmitForm = (data) => {
        editProfile(data);
        reset();
    }

    return(
        <main className="profile">
            <form className="profile__form" onSubmit={handleSubmit(handleSubmitForm)}>
                <h2 className="profile__title">Привет, {currentUser.name}!</h2>
                <label className="profile__label">
                    <span className="profile__label-text">{currentUser.name}</span>
                    <input className="profile__input"
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
                           type="text"
                           placeholder="Укажите имя"
                    />
                </label>
                <span className="registration__error">
                        {errors?.name && <p>{errors?.name?.message || "Ошибка валидации!"}</p>}
                </span>
                <label className="profile__label">
                    <span className="profile__label-text">{currentUser.email}</span>
                    <input className="profile__input"
                           {...register("email", {
                               required: "Поле не должно быть пустым",
                               pattern: {
                                   value: /^\S+@\S+$/i,
                                   message: "Введите email"
                               }
                           })}
                           type="email"
                           placeholder="Укажите email"
                    />
                </label>
                <span className="registration__error">
                        {errors?.email && <p>{errors?.email?.message || "Ошибка валидации!"}</p>}
                </span>
                <button className="profile__button" type="submit" disabled={!isValid}>Редактировать</button>
                <button className="profile__button-exit" type="button" onClick={handleLogOut}>Выйти из аккаунта</button>
            </form>
        </main>
    );
}