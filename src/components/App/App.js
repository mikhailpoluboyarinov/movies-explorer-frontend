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

const PRIVATE_PAGE_URLS = [ APP_CONSTANTS.movies, APP_CONSTANTS.savedMovies, APP_CONSTANTS.profile ];
const REGISTRATION_LOGIN_URLS = [ APP_CONSTANTS.signIn, APP_CONSTANTS.singUp ];

export default function App() {
    const [isLoggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('jwt')));
    const [currentUser, setCurrentUser] = useState('');
    const [moviesList, setMoviesList] = useState(JSON.parse(localStorage.getItem('filteredMovies')) || []);
    const [savedMoviesList, setSavedMoviesList] = useState(JSON.parse(localStorage.getItem('savedMovies')) || []);
    const [savedFilteredMoviesList, setSavedFilteredMoviesList] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [popupText, setPopupText] = useState('');
    const [popupType, setPopupType] = useState('success');
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();
    const location = useLocation();
    const isMoviesPage = location.pathname === APP_CONSTANTS.movies;

    useEffect(() => {
        if ((!isLoggedIn && PRIVATE_PAGE_URLS.includes(location.pathname)) ||
            (isLoggedIn && REGISTRATION_LOGIN_URLS.includes(location.pathname))
        ) {
            history.push("/");
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
            }).catch((err) => {
                handleUserMovieError(err)
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
        }, APP_CONSTANTS.showPopupDuration)
    }

    function handleError(error) {
        if (error.code === APP_CONSTANTS.errorCode401) {
            handleLogOut();
        }

        showErrorPopup(error.message)
    }

    function handleUserMovieError(error) {
        if (error.code === APP_CONSTANTS.errorCode401) {
            handleLogOut();
        }

        showErrorPopup('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. ' +
            'Подождите немного и попробуйте ещё раз')
    }

    function showErrorPopup(text) {
        showResultPopup(text, 'error');
    }

    function showSuccessPopup(text) {
        showResultPopup(text, 'success');
    }

    function handleLogin(data) {
        setIsLoading(true);
        loginUser(data)
            .then((res) => {
                setIsLoading(false);
                localStorage.setItem('jwt', res.token);
                localStorage.setItem('userId', res.user._id);
                setCurrentUser(res.user);
                setLoggedIn(true);
                history.push(APP_CONSTANTS.movies);
            })
            .catch(err => {
                handleError(err);
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
        localStorage.removeItem('searchText');
        localStorage.removeItem('isShortMovie');
        localStorage.removeItem('isSavedShortMovie');
        localStorage.removeItem('filteredSavedMovies');
        setMoviesList([]);
        setSavedMoviesList([]);
        history.push('/');
    }

    function handleRegister(data) {
        setIsLoading(true)
        registerUser(data)
            .then(() => {
                setIsLoading(false)
                handleLogin({ email:data.email, password: data.password})
            })
            .catch((err) => {
                handleError(err);
            })
    }

    function editProfile(data) {
        updateUser(data)
            .then((res) => {
                setCurrentUser(res);
                showSuccessPopup('Данные пользователя успешно изменены');
            })
            .catch(err => {
                handleError(err);
            })
    }

    function filterMovies(movies, data) {
        const filteredMovies = movies.filter((item) => {
            const isMatchedByName = item.nameRU.toLowerCase().includes(data.text.toLowerCase());
            if (data.isShortMovie) {
                return isMatchedByName && item.duration <= APP_CONSTANTS.filmDuration;
            }
            return isMatchedByName;
        });

        localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
        setMoviesList(filteredMovies);
    }

    function handleSearchMovies(data) {
        localStorage.setItem('searchText', data.text);

        const movies = JSON.parse(localStorage.getItem('movies')) || [];

        if (!movies.length) {
            setIsLoading(true);
            getMovies().then(res => {
                setIsLoading(false);
                localStorage.setItem('movies', JSON.stringify(res));

                filterMovies(res, data);
            }).catch((err) => {
                handleUserMovieError(err);
            })
        } else {
            filterMovies(movies, data);
        }
    }

    function handleSearchSavedMovies(data) {

        const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        const filteredSavedMovies = savedMovies.filter((item) => {
            const isMatchedByName = item.nameRU.toLowerCase().includes(data.text.toLowerCase());
            if (data.isSavedShortMovie) {
                return isMatchedByName && item.duration <= APP_CONSTANTS.filmDuration;
            }
            return isMatchedByName;
        });

        setSavedFilteredMoviesList(filteredSavedMovies);
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
                handleError(err);
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
                handleError(err);
            })
        }
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page__content">
                <Switch>
                    <Route exact path="/">
                        <Header loggedIn={isLoggedIn}/>
                        <main>
                            <Intro/>
                            <AboutProject/>
                            <Techs/>
                            <AboutMe/>
                            <Portfolio/>
                        </main>
                        <Footer/>
                    </Route>
                    <ProtectedRoute path="/movies" loggedIn={isLoggedIn}>
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
                    </ProtectedRoute>
                    <ProtectedRoute path="/saved-movies" loggedIn={isLoggedIn}>
                        <Header
                            loggedIn={isLoggedIn}
                        />
                        <SavedMovies
                            moviesList={savedFilteredMoviesList.length > 0 ? savedFilteredMoviesList : savedMoviesList}
                            setSavedFilteredMoviesList={setSavedFilteredMoviesList}
                            handleSearchMovies={handleSearchSavedMovies}
                            handleMovieAction={handleMovieAction}
                        />
                        <Footer/>
                    </ProtectedRoute>
                    <Route path="/sign-up">
                        <Registration
                            isLoading={isLoading}
                            handleRegister={handleRegister}
                        />
                    </Route>
                    <Route path="/sign-in">
                        <Login
                            isLoading={isLoading}
                            handleLogin={handleLogin}
                        />
                    </Route>
                    <ProtectedRoute path="/profile" loggedIn={isLoggedIn}>
                        <Header
                            loggedIn={isLoggedIn}
                        />
                        <Profile
                            currentUser={currentUser}
                            editProfile={editProfile}
                            handleLogOut={handleLogOut}
                        />
                    </ProtectedRoute>
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