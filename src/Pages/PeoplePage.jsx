import { useParams } from "react-router-dom";
import PeoplesService from "../Services/PeoplesService";
import MoviesService from "../Services/MoviesService";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import MovieCard from "../Components/MovieCard";
import Paginations from "../Components/Paginations";

const TMDB_IMG = "https://image.tmdb.org/t/p/w342";

const PeoplePage = () => {
    const { id } = useParams();
    const [people, setPeople] = useState({});
    const [movies, setMovies] = useState([]);
    const [maxPages, setMaxPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const response = await PeoplesService.getPeople(id);
                setPeople(response.data);
            } catch (error) { console.error(error); }
        };
        fetchPeople();
    }, [id]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await MoviesService.getMoviesByPeople(id, currentPage);
                setMovies(response.data.results);
                setMaxPages(response.data.total_pages);
            } catch (error) { console.error(error); }
        };
        fetchMovies();
    }, [id, currentPage]);

    return (
        <Container className="movie-detail py-4">
            {/* Photo + Info */}
            <div className="movie-detail__top">
                {/* Photo */}
                <div className="movie-detail__poster-wrap">
                    {people.profile_path ? (
                        <img
                            className="movie-detail__poster"
                            src={TMDB_IMG + people.profile_path}
                            alt={people.name}
                        />
                    ) : (
                        <div className="movie-detail__no-image">
                            <span>🎭</span>
                            <p>Image non disponible</p>
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="movie-detail__info">
                    <h1 className="movie-detail__title">{people.name || "Nom non renseigné"}</h1>

                    <div className="movie-detail__meta">
                        {people.known_for_department && <span>🎬 {people.known_for_department}</span>}
                        {people.birthday && <span>📅 {people.birthday}</span>}
                        {people.place_of_birth && <span>📍 {people.place_of_birth}</span>}
                        {people.deathday && <span>✝️ {people.deathday}</span>}
                        {people.popularity > 0 && <span>⭐ Popularité : {people.popularity?.toFixed(1)}</span>}
                    </div>

                    {people.biography && (
                        <div className="movie-detail__overview">
                            <h3>Biographie</h3>
                            <p>{people.biography}</p>
                        </div>
                    )}

                    {!people.biography && (
                        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>Biographie non disponible.</p>
                    )}
                </div>
            </div>

            {/* Filmographie */}
            {movies.length > 0 && (
                <div className="tab-section mt-4">
                    <h3 className="tab-section__title">Filmographie</h3>
                    <div className="allo-cards-grid">
                        {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
                    </div>
                    <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage} maxPages={maxPages} />
                </div>
            )}
        </Container>
    );
};

export default PeoplePage;
