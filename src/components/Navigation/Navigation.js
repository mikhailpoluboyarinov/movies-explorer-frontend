import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import iconPpl from "../../images/icon-ppl.svg";

export default function Navigation({ loggedIn }) {
    const [isMenuLayoutVisible, setMenuLayoutVisible] = useState(false);

    const openMenu = () => {
        setMenuLayoutVisible(true);
        console.log('ok');
    }

    const closeMenu = () => {
        setMenuLayoutVisible(false);
    }

    return (
        <nav>
            {loggedIn ? (
                <div className="header__nav">
                    <ul className="header__links">
                        <li className="header__link-item">
                            <Link to="/movies" className="header__link-text">Фильмы</Link>
                        </li>
                        <li className="header__link-item">
                            <Link to="/saved-movies" className="header__link-text">Сохраненные фильмы</Link>
                        </li>
                        <li className="header__link-item header__link-item_btn">
                            <Link to="/profile" className="header__link-text">
                                <div className="header__link-container">
                                    <p className="header__link-text">Аккаунт</p>
                                    <img className="header__icon" src={iconPpl} alt="Человечек" />
                                </div>
                            </Link>
                        </li>
                    </ul>
                    <div className="header__menu-icon" onClick={openMenu}></div>
                    <div className={`header__menu-layout${isMenuLayoutVisible ? ' header__menu-layout-visible' : ''}`}>
                        <div className="header__menu-layout-bg"></div>
                        <div className="header__container">
                            <div className="header__menu-icon-close" onClick={closeMenu}></div>
                            <ul className="header__links header__links-touch">
                                <div className="header__links-touch-top">
                                    <li className="header__link-item header__link-touch">
                                        <Link to="/" className="header__link-text header__link-touch-text" onClick={closeMenu}>Главная</Link>
                                    </li>
                                    <li className="header__link-item header__link-touch">
                                        <Link to="/movies" className="header__link-text header__link-touch-text" onClick={closeMenu}>Фильмы</Link>
                                    </li>
                                    <li className="header__link-item header__link-touch">
                                        <Link to="/saved-movies" className="header__link-text header__link-touch-text" onClick={closeMenu}>Сохраненные фильмы</Link>
                                    </li>
                                </div>
                                <div>
                                    <li className="header__link-item header__link-item_btn header__link-touch">
                                        <Link to="/profile" className="header__link-text">
                                            <div className="header__link-container">
                                                <p className="header__link-text header__link-touch-text" onClick={closeMenu}>Аккаунт</p>
                                                <img className="header__icon" src={iconPpl} alt="Человечек" onClick={closeMenu}/>
                                            </div>
                                        </Link>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="header__links-main">
                    <Link to="/sign-up" className="header__signup">Регистрация</Link>
                    <Link to="/sign-in"><button type="button" className="header__signin">Войти</button></Link>
                </div>
            )
            }
        </nav>
    )
}
