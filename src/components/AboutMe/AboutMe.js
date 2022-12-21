import foto_mpolu from "../../images/foto_mpolu.jpg";

export default function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__info">
                <div className="about-me__info-container">
                    <h3 className="about-me__name">Михаил</h3>
                    <p className="about-me__profession">Фронтенд-зазработчик, 33 года</p>
                    <p className="about-me__about">Я родился и живу в СанктПетербурге, закончил СПБГУАП.
                        Я увлекаюсь бегом и картингом. Начал пробовать кодить в пандемию, решил пройти курсы на ЯПрактикуме
                        по Веб разработке.
                    </p>
                    <a className="about-me__link" href="https://github.com/mikhailpoluboyarinov" target="blank">GitHub</a>
                </div>
                <img className="about-me__image" src={foto_mpolu} alt="Фотогорафия"></img>
            </div>
        </section>
    );
}