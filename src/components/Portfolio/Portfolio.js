export default function Portfolio() {

    return (
        <section className="portfolio">
            <h4 className="portfolio__title">Портфолио</h4>
            <ul className="portfolio__items">
                <li className="portfolio__item">
                    <a className="portfolio__link" href="https://github.com/mikhailpoluboyarinov/how-to-learn" target="blank">Статичный сайт
                        <span className="portfolio__arrow">↗</span>
                    </a>
                </li>
                <li className="portfolio__item">
                    <a className="portfolio__link" href="https://mikhailpoluboyarinov.github.io/russian-travel/index.html" target="blank">Адаптивный сайт
                        <span className="portfolio__arrow">↗</span>
                    </a>
                </li>
                <li className="portfolio__tem">
                    <a className="portfolio__link" href="https://github.com/mikhailpoluboyarinov/react-mesto-api-full" target="blank">Одностраничное приложение
                        <span className="portfolio__arrow">↗</span>
                    </a>
                </li>
            </ul>
        </section>
    );
}