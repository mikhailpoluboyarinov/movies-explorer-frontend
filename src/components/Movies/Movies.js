import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies () {
    return (
        <main className='movies'>
            <SearchForm/>
            <MoviesCardList>

            </MoviesCardList>
            <section className='movies__more'>
                <button className='movies__button-more'>Ещё</button>
            </section>
        </main>
    );
}