import { useParams } from "react-router-dom";
import PeoplesService from "../Services/PeoplesService";
import { useEffect, useState } from "react";
import { Container, Pagination } from "react-bootstrap";
import MoviesService from "../Services/MoviesService";
import MovieCard from "../Components/MovieCard"; //importare PASSAGGIO 5 VERIFICARE SEMPRE LIMPORTO DOPO AVER CREATO
import Paginations from "../Components/Paginations";

const PeoplePage = () => {
    const { id } = useParams();
    const [people, setPeople] = useState({})
    const [movies, setMovies] = useState([]); //PASSAGGIO 3 PER STOCCARE MUOVIS
    const [maxPages, setMaxPages] = useState(500);  // passaggio 6 insieme a la riga sotto
    const [currentPage, setCurrentPage] = useState(1);

    const fetctPeople = async () => {
        try {
            const response = await PeoplesService.getPeople(id);
            setPeople(response.data);

        } catch (error) {
            console.error(error);
        }
    }
    const fetctMoviesByPeople = async () => {    // PASSAGGIO 2 CREIAMO LA FECH
        try {
            const response = await MoviesService.getMoviesByPeople(id, currentPage);
            setMovies(response.data.results);
            setMaxPages(response.data.total_pages)  //passagio 7
        } catch (error) {
            console.error(error);

        }
    }


    useEffect(() => {
        fetctPeople();

    }, [])


    useEffect(() => {
        fetctMoviesByPeople(); //2bis CHIAMIAMO LA FUNZIONE  (creiam un altro use effect)

    }, [currentPage])

    return <>
        <Container fluid className="d-flex flex-column align-items-center gap-3 pt-3">
            {/* parte globale*/}
            <Container className="d-flex ">
                {/* parte sinistra*/}
                <Container className="d-flex flex-column align-items-center gap-3 pt-3 col-6">
                    <img className="col-12" src={"https://image.tmdb.org/t/p/original" + people.profile_path} alt={people.name} />

                </Container>
                {/* parte destra*/}
                <Container className="d-flex flex-column align-items-center gap-1 pt-3 col-6">
                    <h1>{people.name}</h1>
                    <h2 className="text-decoration-underline">Biographie</h2>
                    <p style={{ maxHeight: "30vh", overflow: "auto", textAlign: "justify", paddingRight: "15px" }} >
                        {people.biography == "" ? "Non renseigne" : people.birthday}</p>
                    <h2 className="text-decoration-underline">Date de naissance</h2>
                    <p style={{ maxHeight: "30vh", overflow: "auto", textAlign: "justify", paddingRight: "15px" }} >
                        {people.birthday == "" ? "Non renseigne" : people.birthday}</p>
                    <h2 className="text-decoration-underline">Lieu de naissance</h2>
                    <p style={{ maxHeight: "30vh", overflow: "auto", textAlign: "justify", paddingRight: "15px" }} >
                        {people.place_of_birth == "" ? "Non renseigne" : people.place_of_birth}</p>
                    <h2 className="text-decoration-underline">Connu pour</h2>
                    <p style={{ maxHeight: "30vh", overflow: "auto", textAlign: "justify", paddingRight: "15px" }} >
                        {people.known_for_department == "" ? "Non renseigne" : people.known_for_department}</p>
                    <h2 className="text-decoration-underline">Notes</h2>
                    <p style={{ maxHeight: "30vh", overflow: "auto", textAlign: "justify", paddingRight: "15px" }} >
                        {people.popularity == "" ? "Non renseigne" : people.popularity}</p>

                    <h2 className="text-decoration-underline">Date de décés</h2>
                    <p>{people.deathday == null ? "Pas encore mort" : people.deathday}</p>


                </Container>
            </Container>
            <h2 className="text-decoration-underline"> Filmographie</h2>

            <div className="d-flex flex-wrap justify-content-center gap-3">  {/*pasaggio 4*/}
                {movies.map((movie) => {
                    return <MovieCard movie={movie} key={movie.id} />
                })}


            </div>
            <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage} maxPages={maxPages}></Paginations>


        </Container>


    </>;
}

export default PeoplePage;