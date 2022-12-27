import MoviesCard from '../MoviesCard/MoviesCard';
import { APP_CONSTANTS } from "../../utils/Constants";
import convertDuration from  "../../utils/ConvertFunctions";
import useScreenDimensions from "../../hooks/screenSizeHook"
import getInitialCardsNumber from "../../utils/getInitialCardsNumber";
import getAdditionalCardsNumber from "../../utils/getAdditionalCardsNumber";
import {useState} from "react";

export default function MoviesCardList ( { moviesList, handleMovieAction } ) {
    const [counter, setCounter] = useState(0);
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    const screenDimensions = useScreenDimensions();
    const initialCardsNumber = getInitialCardsNumber(screenDimensions.width);
    const additionalCardsNumber = getAdditionalCardsNumber(screenDimensions.width);
    const moviesToRender = moviesList.slice(0, initialCardsNumber + counter);

    function addCounter() {
        setCounter(counter + additionalCardsNumber);
    }

    if (moviesList.length === 0) {
        return <span>Ничего не найдено</span>;
    }

    return (
        <>
            <section className='movies-cardlist__container'>
                <ul className="movies-cardlist__items">
                    {moviesToRender.map(movie =>
                        <MoviesCard
                            id={movie.id}
                            key={movie.id}
                            title={movie.nameRU}
                            movieLink={movie.trailerLink}
                            onButtonClick={handleMovieAction}
                            isSaved={savedMovies.find((item) => {
                                return item.movieId === movie.id
                            })}
                            duration={convertDuration(movie.duration)}
                            image={APP_CONSTANTS.serverPath + movie.image.url}
                        />
                    )}
                </ul>
            </section>
            {moviesList.length > moviesToRender.length ? (<section className='movies__more'>
                <button className='movies__button-more' onClick={addCounter}>Ещё</button>
            </section>) : null}
        </>
    );
}