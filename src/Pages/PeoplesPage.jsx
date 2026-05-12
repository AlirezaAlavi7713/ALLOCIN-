import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PeoplesService from "../Services/PeoplesService";
import PeopleCard from "../Components/PeopleCard";
import Paginations from "../Components/Paginations";

const PeoplesPage = () => {
    const [peoples, setPeoples] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPages, setMaxPages] = useState(500);



    const fetchPeoples = async () => {
        try {
            const response = await PeoplesService.getPeoples(currentPage);
            setPeoples(response.data.results);
        } catch (error) {
            console.error(error)
        }
    }
    //crea yb useeff ke chiama la funzione fectpeople
    useEffect(() => {
        fetchPeoples();
        window.scrollTo({top: 0, behavior: "instant"})
    }, [currentPage])


    return <>


        <Container fluid className="d-flex flex-column align-items-center pt-3 gap-3">
            <h1>Personnalités</h1>
            {/* fare un map su etai people e affiche le nom per ogni persone
             */}
            <div className="allo-cards-grid w-100">
                {peoples.map((people) => <PeopleCard people={people} key={people.id} />)}
            </div>
            <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage} maxPages={maxPages}/>


        </Container>





    </>;



}
export default PeoplesPage;