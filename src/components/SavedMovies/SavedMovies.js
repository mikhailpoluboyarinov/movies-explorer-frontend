import SearchForm from '../SearchForm/SearchForm';
import {useEffect} from "react";
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';

export default function SavedMovies ( { moviesList, handleSearchMovies, handleMovieAction, setSavedFilteredMoviesList } ) {
    const searchText = localStorage.getItem('searchSavedMoviesText');

    useEffect(() => {
        return () => {
            setSavedFilteredMoviesList([])
        }
    }, [setSavedFilteredMoviesList])

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