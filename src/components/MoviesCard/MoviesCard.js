import { Link } from "react-router-dom";

import imgExample from "../../images/img-example.png";

export default function MoviesCard () {
    return (
        <li className="movies__item">
            <Link to="/movie" className='moviescard__link'>
                <img className='moviescard__image' src={imgExample} alt="Movie"/>
            </Link>
            <div className="moviescard__info-wrap">
                <div className="moviescard__info">
                    <h2 className="moviescard__title">33 слова о дизайне</h2>
                    <p className="moviescard__text">1ч 47м</p>
                </div>
                <button className="moviescard__button" type="button"></button>
            </div>
        </li>
    );
}