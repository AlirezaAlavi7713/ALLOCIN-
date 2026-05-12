import { useNavigate } from "react-router-dom";

const PeopleCard = ({ people }) => {
    const navigate = useNavigate();
    const profileUrl = people.profile_path
        ? "https://image.tmdb.org/t/p/w185" + people.profile_path
        : null;

    return (
        <div className="allo-card allo-card--people" onClick={() => navigate("/people/" + people.id)}>
            <div className="allo-card__img-wrap">
                {profileUrl ? (
                    <img src={profileUrl} alt={people.name} className="allo-card__img" />
                ) : (
                    <div className="allo-card__no-img">
                        <span>{people.name?.charAt(0) || "?"}</span>
                        <small>Image indisponible</small>
                    </div>
                )}
            </div>
            <div className="allo-card__body">
                <p className="allo-card__title">{people.name}</p>
                {people.character && <p className="allo-card__year">{people.character}</p>}
                {people.job && !people.character && <p className="allo-card__year">{people.job}</p>}
            </div>
        </div>
    );
};

export default PeopleCard;
