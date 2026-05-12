import { useEffect, useState } from "react";
import MoviesService from "../Services/MoviesService";
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
    };

    useEffect(() => {
        if (movie.belongs_to_collection?.id) fetchSagaMovies();
    }, [movie]);

    if (!movie.belongs_to_collection) return <p className="tab-empty">Ce film ne fait pas partie d'une saga.</p>;
    if (!movies.length) return <p className="tab-empty">Chargement...</p>;

    return (
        <div className="tab-section">
            <div className="allo-cards-grid">
                {movies.map((m) => <MovieCard key={m.id} movie={m} />)}
            </div>
        </div>
    );
};

export default SagaMoviesTab;
