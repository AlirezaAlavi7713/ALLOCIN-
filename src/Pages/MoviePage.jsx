import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MoviesService from "../Services/MoviesService";
import { Container, Tab, Tabs } from "react-bootstrap";
import CastingsTab from "../Components/CastingsTab";
import SimilarMoviesTab from "../Components/SimilarMoviesTab";
import SagaMoviesTab from "../Components/SagaMoviesTab";

const TMDB_IMG = "https://image.tmdb.org/t/p/w500";

const MoviePage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [key, setKey] = useState("casting");
    const [isInFavorite, setIsInFavorite] = useState(false);
    const [isInWatchList, setIsInWatchList] = useState(false);
    const navigate = useNavigate();

    const fetchMovie = async () => {
        try {
            const response = await MoviesService.getMovie(id);
            setMovie(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addToFavorite = async () => {
        try {
            await MoviesService.addToFavorite({ media_type: "movie", media_id: id, favorite: true });
            setIsInFavorite(true);
        } catch (error) { console.error(error); }
    };

    const removeToFavorite = async () => {
        try {
            await MoviesService.addToFavorite({ media_type: "movie", media_id: id, favorite: false });
            setIsInFavorite(false);
        } catch (error) { console.error(error); }
    };

    const addToWatchList = async () => {
        try {
            await MoviesService.addToWatchList({ media_type: "movie", media_id: id, watchlist: true });
            setIsInWatchList(true);
        } catch (error) { console.error(error); }
    };

    const removeToWatchList = async () => {
        try {
            await MoviesService.addToWatchList({ media_type: "movie", media_id: id, watchlist: false });
            setIsInWatchList(false);
        } catch (error) { console.error(error); }
    };

    const checkFavorite = async () => {
        try {
            let page = 1;
            while (true) {
                const response = await MoviesService.getFavoriteMovies(page);
                const exist = response.data.results.find((m) => m.id == id);
                if (exist) setIsInFavorite(true);
                if (page >= response.data.total_pages) break;
                page++;
            }
        } catch (error) { console.error(error); }
    };

    const checkWatchList = async () => {
        try {
            let page = 1;
            while (true) {
                const response = await MoviesService.getWatchListMovies(page);
                const exist = response.data.results.find((m) => m.id == id);
                if (exist) setIsInWatchList(true);
                if (page >= response.data.total_pages) break;
                page++;
            }
        } catch (error) { console.error(error); }
    };

    useEffect(() => {
        fetchMovie();
        checkFavorite();
        checkWatchList();
    }, [id]);

    return (
        <Container className="movie-detail py-4">
            {/* Poster + Info */}
            <div className="movie-detail__top">
                {/* Poster */}
                <div className="movie-detail__poster-wrap">
                    {movie.poster_path ? (
                        <img
                            className="movie-detail__poster"
                            src={TMDB_IMG + movie.poster_path}
                            alt={movie.title}
                        />
                    ) : (
                        <div className="movie-detail__no-image">
                            <span>🎬</span>
                            <p>Image non disponible</p>
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="movie-detail__info">
                    <h1 className="movie-detail__title">{movie.title || "Titre non renseigné"}</h1>

                    {movie.vote_average > 0 && (
                        <div className="movie-detail__rating">
                            ⭐ {movie.vote_average?.toFixed(1)}<span>/10</span>
                        </div>
                    )}

                    <div className="movie-detail__actions">
                        {isInFavorite
                            ? <button className="btn btn-danger btn-sm" onClick={removeToFavorite}>Retirer des favoris</button>
                            : <button className="btn btn-success btn-sm" onClick={addToFavorite}>Ajouter aux favoris</button>}
                        {isInWatchList
                            ? <button className="btn btn-danger btn-sm" onClick={removeToWatchList}>Retirer de la watchlist</button>
                            : <button className="btn btn-success btn-sm" onClick={addToWatchList}>Ajouter à la watchlist</button>}
                    </div>

                    {movie.genres?.length > 0 && (
                        <div className="movie-detail__genres">
                            {movie.genres.map((g) => (
                                <span key={g.id} className="movie-detail__genre" onClick={() => navigate("/genre/" + g.id)}>
                                    {g.name}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="movie-detail__meta">
                        {movie.release_date && <span>📅 {movie.release_date}</span>}
                        {movie.status && <span>📌 {movie.status}</span>}
                        {movie.belongs_to_collection && <span>🎬 {movie.belongs_to_collection.name}</span>}
                    </div>

                    {movie.overview && (
                        <div className="movie-detail__overview">
                            <h3>Synopsis</h3>
                            <p>{movie.overview}</p>
                        </div>
                    )}

                    {movie.production_companies?.length > 0 && (
                        <div className="movie-detail__companies">
                            <h3>Productions</h3>
                            <div className="movie-detail__tags">
                                {movie.production_companies.map((c) => (
                                    <span key={c.id} className="movie-detail__tag">{c.name}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3 mt-4">
                <Tab eventKey="casting" title="Casting">
                    <CastingsTab movie={movie} />
                </Tab>
                <Tab eventKey="similar-movies" title="Films similaires">
                    <SimilarMoviesTab movie={movie} />
                </Tab>
                <Tab eventKey="saga-movies" title="Saga">
                    <SagaMoviesTab movie={movie} />
                </Tab>
            </Tabs>
        </Container>
    );
};

export default MoviePage;
