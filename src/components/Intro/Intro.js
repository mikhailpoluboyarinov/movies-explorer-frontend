export default function Intro() {
    return (
        <section className="intro">
            <div className="intro__background">
                <h1 className="intro__title">Учебный проект студента факультета Веб-разработки.</h1>
                <ul className="intro__links">
                    <li className="intro__link">
                        <a className="intro__link-text" href="#">О проекте</a>
                    </li>
                    <li className="intro__link">
                        <a className="intro__link-text" href="#">Технологии</a>
                    </li>
                    <li className="intro__link">
                        <a className="intro__link-text" href="#">Студент</a>
                    </li>
                </ul>
            </div>
        </section>
    );
}