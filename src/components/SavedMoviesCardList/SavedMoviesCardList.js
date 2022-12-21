import SavedMoviesCard from '../SavedMoviesCard/SavedMoviesCard';
import convertDuration from  "../../utils/ConvertFunctions";
import useScreenDimensions from "../../hooks/screenSizeHook"
import getInitialCardsNumber from "../../utils/getInitialCardsNumber";
import getAdditionalCardsNumber from "../../utils/getAdditionalCardsNumber";
import {useState} from "react";

export default function SavedMoviesCardList ( { moviesList, handleMovieAction } ) {
    const [counter, setCounter] = useState(0);
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
                        <SavedMoviesCard
                            id={movie.movieId}
                            key={movie.movieId}
                            title={movie.nameRU}
                            image={movie.image}
                            movieLink={movie.trailerLink}
                            duration={convertDuration(movie.duration)}
                            onButtonClick={handleMovieAction}
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