import {useEffect, useState} from "react";
import {Route, Switch, useHistory, Redirect, useLocation } from "react-router-dom";
import Header from '../Header/Header';
import Intro from '../Intro/Intro';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import ErrorPage from '../ErrorPage/ErrorPage';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { APP_CONSTANTS } from "../../utils/Constants";

import '../../index.css';
import {getUser} from "../../utils/MainApi";

const PUBLIC_PAGE_URLS = [ APP_CONSTANTS.signIn, APP_CONSTANTS.singUp];

export default function App() {
    const [isLoggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('jwt')));
    const [currentUser, setCurrentUser] = useState('');

    const history = useHistory();
    const location = useLocation();


    useEffect(() => {
        if (!isLoggedIn && !PUBLIC_PAGE_URLS.includes(location.pathname)) {
            history.push("/sign-in");
        }
    })

    useEffect(() => {
        if(!currentUser) {
            getUser().then(res => {
                setCurrentUser(res);
            })
        }
    })

    function handleLogOut() {
        setCurrentUser('');
        localStorage.removeItem('jwt');
        localStorage.removeItem('userId');
        history.push('/');
    }


    /* useState:
    - переменная вошедшего юзера currentUser
    - переменная статуса входа юзера logged
    - переменная первого поиска isFirstSearch
    - переменная фильмов первого запроса isFirstSearchMovie
    - переменная проверки токена на валидность tokenChecked
    - переменная массива фильмов moviesList[]
    - переменная сохраненных фильмов savedMovieslist[]
    - переменная получения списка сохраненных фильмов isSavedMoviesListChecked
    - переменная поиска в сохраненных фильмов savedMoviesListSearch[]
    const navigate= useNavigate()
    * */


    /* Функция выхода юзера из системы
            function handleLogOut() {
            setLoggedIn(false)
            setSavedMoviesList([])
            setMoviesList([])
            setCurrentUser({})
            setIsFirstSearch(true)
            localStorage.removeItem('jwt')
            localStorage.removeItem('req')
            localStorage.removeItem('result')
            navigate('/')
          }
    */


    return (
        <CurrentUserContext.Provider /*value={currentUser}*/>
            <div className="page__content">
                <Switch>
                    <Route exact path="/">
                        <Header
                            loggedIn={isLoggedIn}
                        />
                        <main>
                            <Intro/>
                            <AboutProject/>
                            <Techs/>
                            <AboutMe/>
                            <Portfolio/>
                        </main>
                        <Footer/>
                    </Route>
                    <Route path="/movies">
                        <Header
                            loggedIn={isLoggedIn}
                        />
                        <Movies/>
                        <Footer/>
                    </Route>
                    <Route path="/saved-movies">
                        <Header
                            loggedIn={isLoggedIn}
                        />
                        <Movies
                            isSavedMovies
                        />
                        <Footer/>
                    </Route>
                    <Route path="/sign-up">
                        <Registration/>
                    </Route>
                    <Route path="/sign-in">
                        <Login
                            setCurrentUser={setCurrentUser}
                        />
                    </Route>
                    <Route path="/profile">
                        <Header
                            loggedIn={isLoggedIn}
                        />
                        <Profile
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                            handleLogOut={handleLogOut}
                        />
                    </Route>
                    <Route path="/not-found">
                        <ErrorPage/>
                    </Route>
                    <Route path="/*">
                        <Redirect to="/not-found"/>
                    </Route>
                </Switch>
            </div>
        </CurrentUserContext.Provider>
    );
}