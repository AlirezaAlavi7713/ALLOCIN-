import { Pagination } from "react-bootstrap";

const Paginations = ({currentPage,maxPages,setCurrentPage}) => {
    return <>
    <Pagination>
                {currentPage -1 > 0 && <>
                 <Pagination.First onClick={() =>{setCurrentPage(1)}} />
                <Pagination.Prev onClick={() =>{setCurrentPage(currentPage - 1)}} />
                <Pagination.Item onClick={() =>{setCurrentPage(1)}}>1</Pagination.Item>
                
                
                </>}
                {currentPage - 5 > 0 &&

                <Pagination.Ellipsis onClick={() =>{setCurrentPage(currentPage - 5)}}  />}
                

                {currentPage -1 > 0 && <>
             
                <Pagination.Item onClick={() =>{setCurrentPage(currentPage - 1)}}> {currentPage - 1}</Pagination.Item>
                </>}
                <Pagination.Item active>{currentPage}</Pagination.Item>
                {currentPage + 1 <= maxPages && <>
                <Pagination.Item onClick={() =>{setCurrentPage(currentPage + 1)}}> {currentPage + 1}</Pagination.Item>
               </>}
                
                {currentPage + 5 <= maxPages && <>
                <Pagination.Ellipsis onClick={() => { setCurrentPage(currentPage + 5)}} />
                    </>}

                {currentPage + 1 <= maxPages && <>
                <Pagination.Item onClick={() =>{setCurrentPage(maxPages)}}>{maxPages}</Pagination.Item>
                <Pagination.Next onClick={() =>{setCurrentPage(currentPage + 1)}} />
                <Pagination.Last onClick={() =>{setCurrentPage(maxPages)}} />
            </>}
            </Pagination>
      
    
    
    </>;



}

export default Paginations