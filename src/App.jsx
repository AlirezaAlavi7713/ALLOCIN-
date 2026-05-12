
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import HomePage from './Pages/HomePage'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './Components/NavBar';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
import MoviesPage from './Pages/MoviesPage';
import PeoplesPage from './Pages/PeoplesPage';
import PeoplePage from './Pages/PeoplePage';
import MoviePage from './Pages/MoviePage';
import GenrePage from './Pages/GenrePage';
import FavoritePage from './Pages/FavoritePage';
import WatchListPage from './Pages/WatchListPage';
import SearchPage from './Pages/SearchPage';


function App() {


  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <NavBar></NavBar>
        <Routes>

          <Route path='/' element={<HomePage />}></Route>
          <Route path='/movies' element={<MoviesPage />}></Route>   {/* route dentro le routes*/}
          <Route path='/peoples' element={<PeoplesPage />}></Route>
          <Route path='/people/:id' element={<PeoplePage />}></Route>
          <Route path='/movie/:id' element={<MoviePage />}></Route>
          <Route path='/genre/:id' element={<GenrePage />}></Route>
          <Route path='/favorite' element={<FavoritePage />}></Route>
          <Route path='/watchlist' element={<WatchListPage />}></Route>
          <Route path='/search' element={<SearchPage />}></Route>


        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App;
