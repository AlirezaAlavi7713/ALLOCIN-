import { useEffect, useState } from "react";
import { Container, Pagination } from "react-bootstrap";
import MoviesService from "../Services/MoviesService";
import MovieCard from "../Components/MovieCard";
import Paginations from "../Components/Paginations";


const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const[maxPages, setMaxPages] = useState(500);
    const[currentPage, setCurrentPage] = useState(1);

    const fetchMovies = async () => {
        try {
            const response = await MoviesService.getMovies(currentPage);
            setMovies(response.data.results);           
            //setMaxPages(response.data.total_pages);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchMovies();
        window.scrollTo({top : 0, behavior : "auto"})
    }, [currentPage])

    return <>
        {/* d flex= display flex */}
        {/* flex direction column */}
        {/* align-items- center =  align- item: centre*/}
        {/* pt padding-top: valore  */}
        <Container fluid className="d-flex flex-column align-items-center pt-3 gap-3">
            <h1>Films</h1>

            <div className="d-flex flex-wrap gap-3 justify-content-center">
                {movies.map((movie) => {
                    return <MovieCard movie={movie} key={movie.id}></MovieCard>
                })}
            </div>
            <Paginations currentPage={currentPage} maxPages={maxPages} setCurrentPage={setCurrentPage}/>
        </Container>
    </>;
}

export default MoviesPage;