import './App.css'
import Nav from './controllers/nav/Nav'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Cards from './controllers/cards/Cards'
import LandingPage from './controllers/lading/LandingPage'
import { Route, Routes, useLocation } from 'react-router-dom'
import Detail from './controllers/detail/Detail'
import Order from './controllers/order/Order'
import { useDispatch } from 'react-redux';
import { fetchCountries } from './redux/actions';
import Filter from './filter/Filters'

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);
  
  const [countries, setCountries] = useState([])

  const onClose = (id) => {
    const filteredCountries = countries.filter(country =>
      country.id !== +id
    )
    setCharacters(filteredCountries)
  }


  const onSearch = async (name) => {
    try {
      const { data } = await axios(`http://localhost:3001/countries?name=${name}`);
      if (data.length > 0) {
        const isCountryInList = countries.some((country) => country.id === data[0].id);
  
        if (isCountryInList) {
          console.log('¡El país ya está en la lista!');
        } else {
          setCountries((prevCountries) => [...prevCountries, data[0]]);
        }
      } else {
        console.log('¡No hay país con este nombre!');
      }
    } catch (error) {
      console.error('Error al buscar el país:', error);
    }
  };

  const { pathname } = useLocation()

  return (
    <>
      <div>
        {pathname !== '/' && <Nav onSearch={onSearch} />}
        {pathname !== '/' && <Order/>}

        <Routes>
          <Route path='/home' element={<Cards onClose={onClose} countries={countries} />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/' element={<LandingPage />} />
        </Routes>


      </div>

    </>
  )
}

export default App
