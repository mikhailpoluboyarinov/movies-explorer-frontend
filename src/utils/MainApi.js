const baseUrl = 'https://mpolu.nomoredomains.sbs/';
const movieImageUrl = 'https://api.nomoreparties.co';

function setHeaders() {
    const token = localStorage.getItem('jwt');

    return {
        'Content-Type': 'application/json',
        "Authorization" : token ? `Bearer ${token}` : ''
    }
}

function responseCheck(res) {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(res);
}

export function loginUser(data) {
    return fetch(`${baseUrl}signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(res => responseCheck(res))
}

export function registerUser(data) {
    return fetch(`${baseUrl}signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => responseCheck(res))
}

export function updateUser(data) {
    return fetch(`${baseUrl}users/me`, {
        method: 'PATCH',
        headers: setHeaders(),
        body: JSON.stringify(data)
    })
        .then(res => responseCheck(res))
}

export function getUser() {
    return fetch(`${baseUrl}users/me`, {
        method: 'GET',
        headers: setHeaders()
    })
        .then(res => responseCheck(res))
}

export function saveMovie(movieInfo) {
    return fetch(`${baseUrl}movies`, {
        method: 'POST',
        headers: setHeaders(),
        body: JSON.stringify({
            country: movieInfo.country,
            director: movieInfo.director,
            duration: movieInfo.duration,
            year: movieInfo.year,
            description: movieInfo.description,
            image: movieInfo.image,
            trailerLink: movieInfo.trailerLink,
            thumbnail: movieInfo.thumbnail,
            movieId: movieInfo.id,
            nameRU: movieInfo.nameRU,
            nameEN: movieInfo.nameEN
        })
    })
        .then(res => responseCheck(res))
}

export function getUserMovies() {
    return fetch(`${baseUrl}movies`, {
        method: 'GET',
        headers: setHeaders(),
    })
        .then(res => responseCheck(res))
}

export function deleteMovie(movieId) {
    return fetch(`${baseUrl}movies/${movieId}`, {
        method: 'DELETE',
        headers: setHeaders()
    })
        .then(res => responseCheck(res))
}