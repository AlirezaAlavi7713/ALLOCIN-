import { useEffect, useState } from "react";
import MoviesService from "../Services/MoviesService";
import { Container, Pagination } from "react-bootstrap";
import MovieCard from "./MovieCard";
import Paginations from "./Paginations";


const SimilarMoviesTab = ({ movie }) => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(500);

    const fetchSimilarMovies = async () => {
        try {
            const response = await MoviesService.getSimilarMovies(movie.id, currentPage)
            setMovies(response.data.results);
            setMaxPage(response.data.total_pages);
        } catch (error) {
            console.error(error)

        }

    }
    useEffect(() => {
        if (movie.id) {
            fetchSimilarMovies()
        }
    }, [movie, currentPage])



    return <>
        <Container className="d-flex flex-column align-items-center gap-3">
            <div className="d-flex flex-wrap gap-3 justify-content-center col-10">
                {movies.map((movie) => {
                    return <MovieCard key={movie.id} movie={movie} />
                })}
            </div>
            <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage} maxPages={maxPage} />
        </Container>

    </>;
}

export default SimilarMoviesTab;