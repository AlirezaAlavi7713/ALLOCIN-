import { Button, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom";



const PeopleCard= ({people}) => {
   const navigate = useNavigate();
   const profileUrl = people.profile_path
    ? "https://image.tmdb.org/t/p/original" + people.profile_path
    : null;


    return <>
        <Card className="col-3" onClick={() => {navigate('/people/' +people.id)}}>
            {profileUrl ?
                <Card.Img variant="top" src={profileUrl} /> :
                <div className="card-image-placeholder">
                    <span>{people.name?.charAt(0) || "?"}</span>
                    <small>Image indisponible</small>
                </div>
            }
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
