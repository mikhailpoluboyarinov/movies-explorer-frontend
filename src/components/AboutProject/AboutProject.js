export default function AboutProject() {
    return (
        <section className="about-project">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__features">
                <div className="about-project__feature">
                    <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__feature">
                    <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__timeline">
                <div className="about-project__timeline-backend"><span>1 неделя</span></div>
                <div className="about-project__timeline-frontend"><span>4 недели</span></div>
                <div className="about-project__timeline-task"><span>Back-end</span></div>
                <div className="about-project__timeline-task"><span>Front-end</span></div>
            </div>
        </section>
    );
}