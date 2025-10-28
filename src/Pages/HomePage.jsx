import { Container } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import MoviesService from "../Services/MoviesService";
import { useEffect, useState } from "react";
import MoviesCarousel from "../Components/MoviesCarousel";

const HomePage = () => {
    const [movies, setMovies] = useState([])
    const[moviesUpComing, setMoviesUpComing] = useState([]);
    const [moviesTopRated, setMoviesTopRated] = useState([]);
   
    const fetchMoviesPlaying = async () => { // ci sn dei trattamenti ke devono attender

        try {
            const response = await MoviesService.getMoviesPlaying();
            setMovies(response.data.results)
        } catch (error) {
            console.error(error);
        }
    }

    const fetchMoviesUpComing = async () => {
        try {
            const response = await MoviesService.getMoviesUpComing();
            setMoviesUpComing(response.data.results);
            
        } catch (error) {
           console.error(error) 
        }
    }

    const fetchMoviesTopRat = async () =>{
        try {
            const response = await MoviesService.getMoviesTopRated();
            setMoviesTopRated(response.data.results);
        } catch (error) {
            console.error(error);
            
        }
    }

    
    useEffect(() => {                    //con delle dipendenze vuote [] linea 18, allora il codice entre
        fetchMoviesPlaying();
        fetchMoviesUpComing();
        fetchMoviesTopRat();
        
    }, [])


    return <>
        <Container fluid className="d-flex flex-column align-items-center pt-3">
            <h1>AlloCiné</h1>
            <MoviesCarousel title={"Film à l'affiche"} movies={movies}/>
            <MoviesCarousel title={"Film à venir"} movies={moviesUpComing}/>
             <MoviesCarousel title={"Film mieux notés"} movies={moviesUpComing}/>
             
            
        </Container>
    </>;
}

export default HomePage