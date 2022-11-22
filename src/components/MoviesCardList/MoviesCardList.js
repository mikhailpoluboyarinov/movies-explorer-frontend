import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList ( {isSavedMoviesList} ) {
    return (
        <section className='movies-cardlist__container'>
            <ul className="movies-cardlist__items">
                <MoviesCard
                    withDeleteBtn={isSavedMoviesList}
                />
                <MoviesCard
                    withDeleteBtn={isSavedMoviesList}
                />
                <MoviesCard
                    withDeleteBtn={isSavedMoviesList}
                />
                <MoviesCard
                    withDeleteBtn={isSavedMoviesList}
                />
                <MoviesCard
                    withDeleteBtn={isSavedMoviesList}
                />
                <MoviesCard
                    withDeleteBtn={isSavedMoviesList}
                />
                <MoviesCard
                    withDeleteBtn={isSavedMoviesList}
                />
                <MoviesCard
                    withDeleteBtn={isSavedMoviesList}
                />
                <MoviesCard
                    withDeleteBtn={isSavedMoviesList}
                />
                <MoviesCard
                    withDeleteBtn={isSavedMoviesList}
                />
                <MoviesCard
                    withDeleteBtn={isSavedMoviesList}
                />
                <MoviesCard
                    withDeleteBtn={isSavedMoviesList}
                />
            </ul>
        </section>
    );
}