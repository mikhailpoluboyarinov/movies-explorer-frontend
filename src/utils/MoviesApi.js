const movieUrl = 'https://api.nomoreparties.co/beatfilm-movies';

function responseCheck(res) {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(res);
}

export function getMovies() {
    return fetch(movieUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    })
        .then(res => responseCheck(res))
}

