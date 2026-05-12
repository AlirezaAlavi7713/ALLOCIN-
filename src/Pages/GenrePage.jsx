import { useParams } from "react-router-dom";
import MoviesService from "../Services/MoviesService";
import { useEffect, useState } from "react";
import { Container, Pagination } from "react-bootstrap";
import MovieCard from "../Components/MovieCard";
import Paginations from "../Components/Paginations";

const GenrePage = () => {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPages, setMaxPages] = useState(500);


    const fetchMoviesByGenre = async () => {
        try {
            const response = await MoviesService.getMoviesByGenre(id, currentPage);
            setMovies(response.data.results);
            setMaxPages(response.data.total_pages);

        } catch (error) {
            console.error(error);

        }
    }


    useEffect(() => {
        fetchMoviesByGenre();
        window.scrollTo({ top: 0, behavior: "instant" })
    }, [id, currentPage])


    return <>
        <Container className="d-flex flex-column align-items-center gap-3 pt-5">
            <div className="allo-cards-grid w-100">
                {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
            <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage} maxPages={maxPages} />
        </Container>


    </>
}

export default GenrePage;