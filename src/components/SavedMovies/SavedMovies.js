import SearchForm from '../SearchForm/SearchForm';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';

export default function SavedMovies ( { moviesList, handleSearchMovies, handleMovieAction } ) {
    return (
        <main className='movies'>
            <SearchForm
                onSearchSubmit={handleSearchMovies}
                checkboxFieldName="isSavedShortMovie"
            />
            <SavedMoviesCardList
                moviesList={moviesList}
                handleMovieAction={handleMovieAction}
            />
        </main>
    );
}