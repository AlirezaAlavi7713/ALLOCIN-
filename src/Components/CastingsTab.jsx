import { useEffect, useState } from "react";
import MoviesService from "../Services/MoviesService";
import { Container } from "react-bootstrap";
import PeopleCard from "./PeopleCard";

const CastingsTab = ({movie}) => {
    const[castings, setCastings]= useState([]);
    
    
    const fetchCasting = async ()=> {
        try {
            const response = await MoviesService.getCasting(movie.id)
            setCastings(response.data)
        } catch (error) {
            console.error(error);
            
        }
    }

    useEffect(() =>{
        if(movie.id){
        fetchCasting();
        }
    }, [movie])
    
    
    
    return <>
       <Container className="d-flex flex-column gap -3 align-items-center">
        <h2 className="text-decoration-underline">Acteurs</h2>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
        {castings.cast && castings.cast.map((actor) =>{
            return <PeopleCard key={actor.id} people={actor}/>
        })}
        </div>
        <h2 className="text-decoration-underline">équipes</h2>
        <h2 className="text-decoration-underline">Acteurs</h2>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
        {castings.cast && castings.crew.map((crew) =>{
            return <PeopleCard key={crew.id} people={crew}/>
        })}
        </div>

       </Container>
    </>;
}
 
export default CastingsTab;