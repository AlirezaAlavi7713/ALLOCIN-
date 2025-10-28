import axios from "axios"
import { HEADER } from "./config"

function getPeoples(page) {    // funzione get peoples
    return axios.get("https://api.themoviedb.org/3/person/popular?page=" + page, HEADER)
}

function getPeople(id) {
    return axios.get("https://api.themoviedb.org/3/person/" + id, HEADER)
}

export default {
    getPeoples,
    getPeople
}