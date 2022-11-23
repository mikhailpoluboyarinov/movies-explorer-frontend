export default function SearchForm () {
    return (
        <section className='search-form__container'>
            <form className="search-form__border">
                <div className="search-form__wrap-film">
                    <input className="search-form__input" type="text" placeholder="Укажите фильм" required/>
                    <button className="search-form__button" type="submit"></button>
                </div>
                <div className="search-form__wrap-shortfilm">
                    <lable className="search-form__checkbox-wrap">
                        <input className="search-form__checkbox" type="checkbox"/>
                    </lable>
                    <p className="search-form__text">Короткометражки</p>
                </div>
            </form>
        </section>
    );
}