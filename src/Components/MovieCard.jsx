import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
    const posterUrl = movie.poster_path
        ? "https://image.tmdb.org/t/p/w342" + movie.poster_path
        : null;

    return (
        <div className="allo-card" onClick={() => navigate("/movie/" + movie.id)}>
            <div className="allo-card__img-wrap">
                {posterUrl ? (
                    <img src={posterUrl} alt={movie.title} className="allo-card__img" />
                ) : (
                    <div className="allo-card__no-img">
                        <span>{movie.title?.charAt(0) || "?"}</span>
                        <small>Image indisponible</small>
                    </div>
                )}
                {movie.vote_average > 0 && (
                    <div className="allo-card__badge">⭐ {movie.vote_average?.toFixed(1)}</div>
                )}
            </div>
            <div className="allo-card__body">
                <p className="allo-card__title">{movie.title}</p>
                {movie.release_date && (
                    <p className="allo-card__year">{movie.release_date.slice(0, 4)}</p>
                )}
            </div>
        </div>
    );
};

export default MovieCard;
