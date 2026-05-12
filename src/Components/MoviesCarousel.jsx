import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MoviesCarousel = ({ title, movies }) => {

    const Navigate = useNavigate();
    return <>
        <h2>{title}</h2>
        <Carousel className="w-100 col-lg-8 mx-auto">
            {movies.map((movies) => {
                return <Carousel.Item key={movies.id}>
                    <img onClick={() => Navigate('/movie/' + movies.id)} className="block w-100 rounded cursor" src={"https://image.tmdb.org/t/p/original" + movies.backdrop_path}></img>
                    <Carousel.Caption>
                        <h2>{movies.title}</h2>
                    </Carousel.Caption>
                </Carousel.Item>
            })}

        </Carousel>


    </>;
}

export default MoviesCarousel;