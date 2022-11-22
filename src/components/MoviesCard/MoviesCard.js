import { Link } from "react-router-dom";

import imgExample from "../../images/img-example.png";
import {useState} from "react";

export default function MoviesCard ( {withDeleteBtn} ) {

    const [isLiked, setIsLiked] = useState(false);

    const cardLikeButtonClassName = `moviescard__button-like ${isLiked ? "moviescard__button-like_active" : ''}`;

    const handleLikeClick = () => {
        setIsLiked(true);
    }

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
                { withDeleteBtn ? <button className="moviescard__button-delete" type="button"></button> :
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>}
            </div>
        </li>
    );
}