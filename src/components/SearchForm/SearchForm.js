import { useForm } from "react-hook-form";

export default function SearchForm ( {onSearchSubmit, checkboxFieldName, searchText} ) {
    const { register, handleSubmit, setValue } = useForm();


    return (
        <section className='search-form__container'>
            <form className="search-form__border" onSubmit={handleSubmit(onSearchSubmit)}>
                <div className="search-form__wrap-film">
                    <input className="search-form__input"
                           {...register("text")}
                           type="text"
                           placeholder="Укажите фильм"
                           defaultValue={searchText}
                    />
                    <button className="search-form__button" type="submit"></button>
                </div>
                <div className="search-form__wrap-shortfilm">
                    <div className="search-form__checkbox-wrap">
                        <input className="search-form__checkbox"
                               {...register(checkboxFieldName)}
                               type="checkbox"
                               checked={Boolean(localStorage.getItem(checkboxFieldName))}
                               onChange={(e) => {
                                   setValue(checkboxFieldName, e.target.checked);
                                   handleSubmit(onSearchSubmit)();
                                   localStorage.setItem(checkboxFieldName, e.target.checked ? 'checked' : '');
                               }}
                        />
                    </div>
                    <label className="search-form__text">Короткометражки</label>
                </div>
            </form>
        </section>
    );
}