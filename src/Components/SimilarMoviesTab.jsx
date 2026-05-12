import { useEffect, useState } from "react";
import MoviesService from "../Services/MoviesService";
import MovieCard from "./MovieCard";
import Paginations from "./Paginations";

const SimilarMoviesTab = ({ movie }) => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const fetchSimilarMovies = async () => {
        try {
            const response = await MoviesService.getSimilarMovies(movie.id, currentPage);
            setMovies(response.data.results);
            setMaxPage(response.data.total_pages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (movie.id) fetchSimilarMovies();
    }, [movie, currentPage]);

    if (!movies.length) return <p className="tab-empty">Aucun film similaire trouvé.</p>;

    return (
        <div className="tab-section">
            <div className="allo-cards-grid">
                {movies.map((m) => <MovieCard key={m.id} movie={m} />)}
            </div>
            <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage} maxPages={maxPage} />
        </div>
    );
};

export default SimilarMoviesTab;
