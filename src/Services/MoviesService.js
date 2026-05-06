import axios from "axios"// usiamo al post di fetch
import { ACCOUNT_ID, HEADER} from './config';

function getMoviesPlaying() {
    return axios.get('https://api.themoviedb.org/3/movie/now_playing?language=fr-FR', HEADER) //importiamo il link
}

function getMoviesUpComing() {
    return axios.get('https://api.themoviedb.org/3/movie/upcoming?language=fr-FR', HEADER)
}

function getMoviesTopRated() {
    return axios.get("https://api.themoviedb.org/3/movie/top_rated?language=fr-FR", HEADER)

}

function getMovies(page) {
    return axios.get("https://api.themoviedb.org/3/discover/movie?language=fr-FR&page=" + page, HEADER)
}

function getMoviesByPeople(idPeople, page) {    //PASSAGGIO UNO. PARTIAMO DALLA FUNZIONE CON LA PARTE FINALE DA CERCARE
    return axios.get("https://api.themoviedb.org/3/discover/movie?language=fr-FR&with_cast" + idPeople + "&page=" + page, HEADER)
}
function getMovie(id) {
    return axios.get("https://api.themoviedb.org/3/movie/" + id + "?language=fr-FR", HEADER)


}
function getCasting(id) {
    return axios.get("https://api.themoviedb.org/3/movie/" + id + "/credits?language=fr-FR", HEADER)


}

function getSimilarMovies(id, page) {
    return axios.get("https://api.themoviedb.org/3/movie/" + id + "/similar?language=fr-FR&page=" + page, HEADER)


}


function getSagaMovies(id) {
    return axios.get("https://api.themoviedb.org/3/collection/" + id + "?language=fr-FR", HEADER)


}

function getMoviesByGenre(id, page) {
    return axios.get("https://api.themoviedb.org/3/discover/movie?language=fr-FR&with_genres=" + id + "&page=" + page, HEADER)


}

function addToFavorite(data) {
    return axios.post("https://api.themoviedb.org/3/account/" + ACCOUNT_ID + "/favorite", data, HEADER)
}


function addToWatchList(data) {
    return axios.post("https://api.themoviedb.org/3/account/" + ACCOUNT_ID + "/watchlist", data, HEADER)
}


function getFavoriteMovies(page) {
    return axios.get("https://api.themoviedb.org/3/account/" + ACCOUNT_ID + "/favorite/movies?page=" + page, HEADER)
}

function getWatchListMovies(page) {
    return axios.get("https://api.themoviedb.org/3/account/" + ACCOUNT_ID + "/watchlist/movies?page=" + page, HEADER)
}

function searchAll(search, page){
    return axios.get("https://api.themoviedb.org/3/search/multi?query="+search+"&page="+page, HEADER)
}

export default {
    getMoviesPlaying,
    getMoviesUpComing,
    getMoviesTopRated,
    getMovies,
    getMoviesByPeople,
    getMovie,
    getCasting,
    getSimilarMovies,
    getSagaMovies,
    getMoviesByGenre,
    addToFavorite,
    getFavoriteMovies,
    addToWatchList,
    getWatchListMovies,
    searchAll

}