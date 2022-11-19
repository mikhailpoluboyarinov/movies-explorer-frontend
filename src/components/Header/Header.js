import { Link } from "react-router-dom";
import Navigation from '../Navigation/Navigation';

import logoDiploma from "../../images/logo-diploma.svg";

export default function Header( {loggedIn} ) {
    return (
        <header className="header">
            <Link to="/">
                <img className="header__logo" src={logoDiploma} alt="Логотип" />
            </Link>
            <Navigation loggedIn={loggedIn} />
        </header>
    )
}