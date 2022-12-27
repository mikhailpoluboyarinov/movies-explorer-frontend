import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from "../Preloader/Preloader";

export default function Movies ( { moviesList, handleSearchMovies, handleMovieAction, isLoading } ) {
    const searchText = localStorage.getItem('searchText');
    const hasSearchText = Boolean(searchText);

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
                searchText={searchText}
            />
            {hasSearchText ? content : null}
        </main>
    );
}