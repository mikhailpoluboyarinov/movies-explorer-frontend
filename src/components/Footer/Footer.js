export default function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__wrap">
                <p className="footer__year">© 2022</p>
                <ul className="footer__links">
                    <li className="footer__link">
                        <a className="footer__link-text" href="https://practicum.yandex.ru/" target="blank">Яндекс.Практикум</a>
                    </li>
                    <li className="footer__link">
                        <a className="footer__link-text" href="https://github.com/mikhailpoluboyarinov" target="blank">Github</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}