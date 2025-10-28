import { Button, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom";



const PeopleCard= ({people}) => {
   const navigate = useNavigate();


    return <>
        <Card className="col-3" onClick={() => {navigate('/people/' +people.id)}}>
            <Card.Img variant="top" src={"https://image.tmdb.org/t/p/original" + people.profile_path } />
            <Card.Body>
                <Card.Title className="text-truncate">{people.name}</Card.Title>
               
                <div className="d-flex flex-column align-items-center">
                <Button variant="primary" onClick={() => {navigate('/people/' +people.id)}}>Voir plus</Button>
                </div>
            </Card.Body>
        </Card>
          

  
    </>
}

export default PeopleCard;