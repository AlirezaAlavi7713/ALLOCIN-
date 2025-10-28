import axios from "axios";
import { HEADER } from "./config";


function getGenres(id){
    return axios.get("https://api.themoviedb.org/3/genre/movie/list", HEADER)
}

export default {
    getGenres
}