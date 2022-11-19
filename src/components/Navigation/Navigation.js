import { Link, NavLink } from 'react-router-dom';
import iconPpl from "../../images/icon-ppl.svg";

export default function Navigation({ loggedIn }) {
    return (
        <nav className="header__nav">
            {loggedIn ? (
                <nav className="header__nav">
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
                </nav>
            ) : (
                <div className="header__links">
                    <Link to="/sign-up" className="header__signup">Регистрация</Link>
                    <Link to="/sign-in"><button type="button" className="header__signin">Войти</button></Link>
                </div>
            )
            }
        </nav>
    )
}
