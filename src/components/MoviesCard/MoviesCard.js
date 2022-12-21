import {useState} from "react";

export default function MoviesCard ( { title, image, duration, onButtonClick, id, isSaved, movieLink } ) {
    const [isLiked, setIsLiked] = useState(isSaved);
    const cardLikeButtonClassName = `moviescard__button-like ${isLiked ? "moviescard__button-like_active" : ''}`;
    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        onButtonClick(id, !isLiked);
    }

    return (
        <li className="movies__item">
            <a href={movieLink} className="moviescard__link" target='_blank'>
                <img className='moviescard__image' src={image} alt={title} />
            </a>
            <div className="moviescard__info-wrap">
                <div className="moviescard__info">
                    <h2 className="moviescard__title">{title}</h2>
                    <p className="moviescard__text">{duration}</p>
                </div>
                <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
            </div>
        </li>
    );
}