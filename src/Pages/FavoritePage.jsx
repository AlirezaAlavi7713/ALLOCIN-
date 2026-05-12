import { useEffect, useState } from "react";
import MoviesService from "../Services/MoviesService";
import { Container, Pagination } from "react-bootstrap";
import MovieCard from "../Components/MovieCard";
import Paginations from "../Components/Paginations";

const FavoritePage = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPages, setMaxPages] = useState(500);

    const fetchFavoriteMovies = async () => {
        try {
            const response = await MoviesService.getFavoriteMovies(currentPage);
            setMovies(response.data.results);
            setMaxPages(response.data.total_pages);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchFavoriteMovies();
    }, [currentPage])


    return <>
        <Container className="d-flex flex-column align-items-center gap-3">
            <div className="allo-cards-grid w-100">
                {movies.length === 0 && <p className="tab-empty">Vos favoris sont vides.</p>}
                {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
            <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage} maxPages={maxPages} />
        </Container>
    </>
}

export default FavoritePage;