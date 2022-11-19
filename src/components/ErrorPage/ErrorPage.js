import { useHistory } from 'react-router-dom';

export default function ErrorPage () {
    const history = useHistory();

    return (
        <main className="error-page">
            <h2 className="error-page__title">404</h2>
            <p className="error-page__text">Страница не найдена</p>
            <button className="err-page__btn" onClick={() => history.goBack()} type="button">Назад</button>
        </main>
    )
}