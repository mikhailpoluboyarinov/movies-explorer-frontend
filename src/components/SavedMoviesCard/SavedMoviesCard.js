export default function SavedMoviesCard ( { title, image, duration, onButtonClick, id, movieLink } ) {

    const handleDeleteClick = () => {
        onButtonClick(id, false);
    }

    return (
        <li className="movies__item">
            <a href={movieLink} target="_blank" className='moviescard__link'>
                <img className='moviescard__image' src={image} alt={title} />
            </a>
            <div className="moviescard__info-wrap">
                <div className="moviescard__info">
                    <h2 className="moviescard__title">{title}</h2>
                    <p className="moviescard__text">{duration}</p>
                </div>
                <button className="moviescard__button-delete" type="button" onClick={handleDeleteClick}></button>
            </div>
        </li>
    );
}