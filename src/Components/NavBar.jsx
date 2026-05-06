import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import GenresService from '../Services/GenresService';
import { Button, Form } from 'react-bootstrap';



const NavBar = () => {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState('');

  const fetchGenres = async () => {
    try {
      const response = await GenresService.getGenres();
      setGenres(response.data.genres);

    } catch (error) {
      console.error(error);

    }
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    const cleanSearch = search.trim();

    if (!cleanSearch) {
      return;
    }

    try {
      navigate('/search', { state: { search: cleanSearch } })

    } catch (error) {
      console.error(error);

    }
  }

  useEffect(() => {
    fetchGenres();
  }, [])

  return <>
    <Navbar expand="lg" className="allo-navbar" variant='dark' sticky='top'>
      <Container fluid>
        <Navbar.Brand className='allo-navbar-brand cursor' onClick={() => { navigate('/') }}>AlloCiné</Navbar.Brand>
        <Navbar.Toggle className='allo-navbar-toggle' aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className='allo-navbar-collapse' id="basic-navbar-nav">
          <Nav className="allo-navbar-links me-auto">
            <Nav.Link className='allo-nav-link' onClick={() => { navigate('/') }}>Accueil</Nav.Link>
            <Nav.Link className='allo-nav-link' onClick={() => { navigate('/peoples') }}>Acteurs</Nav.Link>
            <Nav.Link className='allo-nav-link' onClick={() => { navigate('/movies') }}>Films</Nav.Link>
            <Nav.Link className='allo-nav-link' onClick={() => { navigate('/favorite') }}>Mes Favoris</Nav.Link>
            <Nav.Link className='allo-nav-link' onClick={() => { navigate('/watchlist') }}>Ma watchlist</Nav.Link>
            <NavDropdown className='allo-nav-link allo-genre-dropdown' title="Genres" id='basic-nav-dropdown'>
              {genres.map((genre) => {
                return <NavDropdown.Item key={genre.id} onClick={() => { navigate('/genre/' + genre.id) }}>
                  {genre.name}
                </NavDropdown.Item>
              })}
            </NavDropdown>
          </Nav>
          <Form className='allo-search-form' onSubmit={handlesubmit}>
            <Form.Control
              type='search'
              placeholder='Rechercher un film...'
              className='allo-search-input'
              value={search}
              onChange={(e) => { setSearch(e.target.value) }}
            />
            <Button className='allo-search-button' type='submit'>Rechercher</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  </>
}

export default NavBar;
