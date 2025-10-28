import { useEffect, useState } from "react"
import MoviesService from "../Services/MoviesService";
import { Container } from "react-bootstrap";
import MovieCard from "./MovieCard";

const SagaMoviesTab = ({ movie }) => {
    const [movies, setMovies] = useState([]);

    const fetchSagaMovies = async () => {
        try {
            const response = await MoviesService.getSagaMovies(movie.belongs_to_collection.id);
            setMovies(response.data.parts);

        } catch (error) {
            console.error(error);

        }
    }

    useEffect(() => {
        if (movie.belongs_to_collection && movie.belongs_to_collection.id) {
            fetchSagaMovies();
        }
    }, [movie])

    return <>
        <Container className="d-flex flex-wrap justify-content-center gap-3">
            {movies.map((movie) => {
                return <MovieCard key={movie.id} movie={movie} />
            })}
        </Container>
    </>;
}

export default SagaMoviesTab;