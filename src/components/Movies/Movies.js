import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from "../Preloader/Preloader";

export default function Movies ( { moviesList, handleSearchMovies, handleMovieAction, isLoading } ) {
    const hasSearchText = Boolean(localStorage.getItem('searchText'));
    const content = isLoading ? <Preloader /> : (
        <MoviesCardList
            moviesList={moviesList}
            handleMovieAction={handleMovieAction}
        />
    );

    return (
        <main className='movies'>
            <SearchForm
                onSearchSubmit={handleSearchMovies}
                checkboxFieldName="isShortMovie"
            />
            {hasSearchText ? content : null}
        </main>
    );
}