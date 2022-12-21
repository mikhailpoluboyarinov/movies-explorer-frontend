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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Notification from "../Notification/Notification";
import {getUser, loginUser, saveMovie, deleteMovie, getUserMovies, registerUser, updateUser} from "../../utils/MainApi";
import {getMovies} from "../../utils/MoviesApi";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { APP_CONSTANTS } from "../../utils/Constants";

import '../../index.css';
import SavedMovies from "../SavedMovies/SavedMovies";

const PUBLIC_PAGE_URLS = [ APP_CONSTANTS.signIn, APP_CONSTANTS.singUp, APP_CONSTANTS.main ];

export default function App() {
    const [isLoggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('jwt')));
    const [currentUser, setCurrentUser] = useState('');
    const [moviesList, setMoviesList] = useState(JSON.parse(localStorage.getItem('filteredMovies')) || []);
    const [savedMoviesList, setSavedMoviesList] = useState(JSON.parse(localStorage.getItem('savedMovies')) || []);
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [popupText, setPopupText] = useState('');
    const [popupType, setPopupType] = useState('success');
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();
    const location = useLocation();
    const isMoviesPage = location.pathname === APP_CONSTANTS.movies;

    useEffect(() => {
        if (!isLoggedIn && !PUBLIC_PAGE_URLS.includes(location.pathname)) {
            history.push("/sign-in");
        }
    })

    useEffect(() => {
        if(isLoggedIn && !currentUser) {
            getUser().then(res => {
                setCurrentUser(res);
            })
        }
    })

    useEffect(() => {
        if(isMoviesPage) {
            getUserMovies().then(res => {
                localStorage.setItem('savedMovies', JSON.stringify(res));
                setSavedMoviesList(res);
            }).catch(() => {
                showErrorPopup('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. ' +
                    'Подождите немного и попробуйте ещё раз');
            })
        }
    }, [isLoggedIn])

    function showResultPopup(text, type) {
        setIsPopupOpen(true);
        setPopupText(text);
        setPopupType(type);
        setTimeout(() => {
            setIsPopupOpen(false)
            setPopupText('');
        }, 2000)
    }

    function showErrorPopup(text) {
        showResultPopup(text, 'error');
    }

    function showSuccessPopup(text) {
        showResultPopup(text, 'success');
    }

    function handleLogin(data) {
        loginUser(data)
            .then((res) => {
                localStorage.setItem('jwt', res.token);
                localStorage.setItem('userId', res.user._id);
                setCurrentUser(res.user);
                setLoggedIn(true);
                history.push(APP_CONSTANTS.movies);
            })
            .catch(err => {
                showErrorPopup(err.message);
            })
    }

    function handleLogOut() {
        setCurrentUser('');
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        localStorage.removeItem('userId');
        localStorage.removeItem('movies');
        localStorage.removeItem('savedMovies');
        localStorage.removeItem('filteredMovies');
        localStorage.removeItem('filteredSavedMovies');
        localStorage.removeItem('searchText');
        localStorage.removeItem('searchSavedMoviesText');
        localStorage.removeItem('isShortMovie');
        localStorage.removeItem('isSavedShortMovie');
        setMoviesList([]);
        setSavedMoviesList([]);
        history.push('/');
    }

    function handleRegister(data) {
        registerUser(data)
            .then(() => {
                history.push(APP_CONSTANTS.signIn);
            })
            .catch((err) => {
                showErrorPopup(err.message);
            })
    }

    function editProfile(data) {
        updateUser(data)
            .then((res) => {
                setCurrentUser(res);
                showSuccessPopup('Данные пользователя успешно изменены');
            })
            .catch(err => {
                showErrorPopup(err.message);
            })
    }

    function handleSearchMovies(data) {
        setIsLoading(true)
        localStorage.setItem('searchText', data.text);
        getMovies().then(res => {
            setIsLoading(false);
            localStorage.setItem('movies', JSON.stringify(res));
            const movies = JSON.parse(localStorage.getItem('movies'));
            const filteredMovies = movies.filter((item) => {
                const isMatchedByName = item.nameRU.toLowerCase().includes(data.text.toLowerCase());
                if (data.isShortMovie) {
                    return isMatchedByName && item.duration <= 40;
                }
                return isMatchedByName;
            });

            localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
            setMoviesList(filteredMovies);
        }).catch(() => {
            showErrorPopup('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. ' +
                'Подождите немного и попробуйте ещё раз');
        })
    }

    function handleSearchSavedMovies(data) {
        localStorage.setItem('searchSavedMoviesText', data.text);

        const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        const filteredSavedMovies = savedMovies.filter((item) => {
            const isMatchedByName = item.nameRU.toLowerCase().includes(data.text.toLowerCase());
            if (data.isSavedShortMovie) {
                return isMatchedByName && item.duration <= 40;
            }
            return isMatchedByName;
        });

        localStorage.setItem('filteredSavedMovies', JSON.stringify(filteredSavedMovies));
        setSavedMoviesList(filteredSavedMovies);
    }

    function handleMovieAction(movieId, isSaveAction) {
        if (isSaveAction) {
            const movies = JSON.parse(localStorage.getItem('movies'));
            const movieToSave = movies.find((item) => {
                return movieId === item.id;
            });

            if (!movieToSave) {
                return;
            }

            const preparedMovieToSave = {
                ...movieToSave,
                image: APP_CONSTANTS.serverPath + movieToSave.image.url,
                thumbnail: APP_CONSTANTS.serverPath + movieToSave.image.url
            };

            saveMovie(preparedMovieToSave).then(res => {
                const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
                savedMovies.push(res);
                localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
                setSavedMoviesList(savedMovies);
            }).catch((err) => {
                showErrorPopup(err.message);
            })
        } else {
            const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
            const foundMovieById = savedMovies.find((item) => {
                return item.movieId === movieId;
            })
            deleteMovie(foundMovieById._id).then(() => {
                const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
                const filteredSavedMovies = savedMovies.filter((item) => {
                    return item.movieId !== movieId;
                })
                localStorage.setItem('savedMovies', JSON.stringify(filteredSavedMovies));
                setSavedMoviesList(filteredSavedMovies);
            }).catch((err) => {
                showErrorPopup(err.message);
            })
        }
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
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
                    <ProtectedRoute
                        path="/movies"
                        loggedIn={isLoggedIn}
                        component={() => (
                            <>
                                <Header
                                    loggedIn={isLoggedIn}
                                />
                                <Movies
                                    isLoading={isLoading}
                                    moviesList={moviesList}
                                    handleSearchMovies={handleSearchMovies}
                                    handleMovieAction={handleMovieAction}
                                />
                                <Footer/>
                            </>
                        )}
                    />
                    <ProtectedRoute
                        path="/saved-movies"
                        loggedIn={isLoggedIn}
                        component={() => (
                            <>
                                <Header
                                    loggedIn={isLoggedIn}
                                />
                                <SavedMovies
                                    moviesList={savedMoviesList}
                                    handleSearchMovies={handleSearchSavedMovies}
                                    handleMovieAction={handleMovieAction}
                                />
                                <Footer/>
                            </>
                        )}
                    />
                    <Route path="/sign-up">
                        <Registration
                            handleRegister={handleRegister}
                        />
                    </Route>
                    <Route path="/sign-in">
                        <Login
                            handleLogin={handleLogin}
                        />
                    </Route>
                    <ProtectedRoute
                        path="/profile"
                        loggedIn={isLoggedIn}
                        component={() => (
                            <>
                                <Header
                                    loggedIn={isLoggedIn}
                                />
                                <Profile
                                    currentUser={currentUser}
                                    setCurrentUser={setCurrentUser}
                                    editProfile={editProfile}
                                    handleLogOut={handleLogOut}
                                />
                            </>
                        )}
                    />
                    <Route path="/not-found">
                        <ErrorPage/>
                    </Route>
                    <Route path="/*">
                        <Redirect to="/not-found"/>
                    </Route>
                </Switch>
                <Notification
                    messageText={popupText}
                    active={isPopupOpen}
                    type={popupType}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}