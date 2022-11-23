import React from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
    return(
        <main className="profile">
            <form className="profile__form">
                <h2 className="profile__title">Привет, Виталий!</h2>
                <label className="profile__label">
                    <span className="profile__label-text">Имя</span>
                    <input className="profile__input" type="text" name="name" placeholder="Укажите имя" required/>
                </label>
                <label className="profile__label">
                    <span className="profile__label-text">E-mail</span>
                    <input className="profile__input" type="email" name="email" placeholder="Укажите email" required/>
                </label>
                <button className="profile__button" type="submit">Редактировать</button>
                <button className="profile__button-exit" type="button">Выйти из аккаунта</button>
            </form>
        </main>
    )
}