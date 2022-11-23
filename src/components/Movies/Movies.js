import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies ( {isSavedMovies} ) {
    return (
        <main className='movies'>
            <SearchForm/>
            <MoviesCardList
                isSavedMoviesList={isSavedMovies}
            />
            <section className='movies__more'>
                <button className='movies__button-more'>Ещё</button>
            </section>
        </main>
    );
}