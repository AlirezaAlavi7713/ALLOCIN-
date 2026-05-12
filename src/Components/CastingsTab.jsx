import { useEffect, useState } from "react";
import MoviesService from "../Services/MoviesService";
import PeopleCard from "./PeopleCard";

const CastingsTab = ({ movie }) => {
    const [castings, setCastings] = useState({});

    const fetchCasting = async () => {
        try {
            const response = await MoviesService.getCasting(movie.id);
            setCastings(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (movie.id) fetchCasting();
    }, [movie]);

    return (
        <div className="tab-section">
            {castings.cast?.length > 0 && (
                <>
                    <h3 className="tab-section__title">Acteurs</h3>
                    <div className="allo-cards-grid">
                        {castings.cast.map((actor) => (
                            <PeopleCard key={actor.credit_id || actor.id} people={actor} />
                        ))}
                    </div>
                </>
            )}
            {castings.crew?.length > 0 && (
                <>
                    <h3 className="tab-section__title">Équipe technique</h3>
                    <div className="allo-cards-grid">
                        {castings.crew.map((member) => (
                            <PeopleCard key={member.credit_id || member.id} people={member} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CastingsTab;
