import { useState } from "react";
import {Route, Switch, useHistory, Redirect } from "react-router-dom";
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

import '../../index.css';

export default function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const history = useHistory();

    function handleBack () {
        history.goBack();
    }

    return (
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
                        <Footer/>
                    </main>
                </Route>
                <Route path="/movies">
                    <Header
                        loggedIn={!isLoggedIn}
                    />
                    <Movies/>
                    <Footer/>
                </Route>
                <Route path="/saved-movies">
                    <Header
                        loggedIn={!isLoggedIn}
                    />
                    <Movies/>
                    <Footer/>
                </Route>
                <Route path="/sign-up">
                    <Registration/>
                </Route>
                <Route path="/sign-in">
                    <Login/>
                </Route>
                <Route path="/profile">
                    <Header
                        loggedIn={!isLoggedIn}
                    />
                    <Profile/>
                </Route>
                <Route path="/not-found">
                    <ErrorPage/>
                </Route>
                <Route path="/*">
                    <Redirect to="/not-found"/>
                </Route>
            </Switch>
        </div>
    );
}