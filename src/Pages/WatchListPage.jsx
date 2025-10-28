import React, { useEffect, useState } from "react";
import MoviesService from "../Services/MoviesService";
import { Container } from "react-bootstrap";
import MovieCard from "../Components/MovieCard";
import Paginations from "../Components/Paginations";

const WatchListPage = () => {

    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPages, setMaxPages] = useState(500);

    const fetchWatchListPage = async () => {
        try {
            const response = await MoviesService.getWatchListMovies(currentPage);
            setMovies(response.data.results);
            setMaxPages(response.total_pages)

        } catch (error) {
            console.error(error);

        }
    }

    useEffect(() => {
        fetchWatchListPage();
    }, [currentPage])


    return <>

        <Container className="d-flex flex-column align-items-center gap-3 pt-5">
            <div className="d-flex flex-wrap justify-content-center gap-3 ">
                {movies.map((movie) => {
                    return <MovieCard key={movies.id} movie={movie} />
                })}

            </div>
            <Paginations currentPage={currentPage} setMaxPages={setMaxPages} maxPages={maxPages} />
        </Container>
    </>;
}

export default WatchListPage;