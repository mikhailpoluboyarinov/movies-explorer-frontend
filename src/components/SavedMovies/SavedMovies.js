import SavedSearchForm from '../SavedSearchForm/SavedSearchForm';
import {useEffect} from "react";
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';

export default function SavedMovies({
    moviesList,
    handleSearchMovies,
    handleMovieAction,
    setSavedFilteredMoviesList,
    setIsEnabledFilteredSavedMoviesList
}) {
    useEffect(() => {
        return () => {
            setSavedFilteredMoviesList([]);
            setIsEnabledFilteredSavedMoviesList(false);
        }
    }, [setSavedFilteredMoviesList, setIsEnabledFilteredSavedMoviesList])

    return (
        <main className='movies'>
            <SavedSearchForm
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