import SearchForm from '../SearchForm/SearchForm';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';

export default function SavedMovies ( { moviesList, handleSearchMovies, handleMovieAction } ) {
    const searchText = localStorage.getItem('searchSavedMoviesText');

    return (
        <main className='movies'>
            <SearchForm
                searchText={searchText}
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