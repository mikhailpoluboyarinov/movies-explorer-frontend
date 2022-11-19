import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList () {
    return (
        <section className='movies-cardlist__container'>
            <ul className="movies-cardlist__items">
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
            </ul>
        </section>
    );
}