import './App.css'
import Nav from './controllers/nav/Nav'
import Cards from './controllers/cards/Cards'
import LandingPage from './controllers/lading/LandingPage'
import { Route, Routes, useLocation } from 'react-router-dom'
import Detail from './controllers/detail/Detail'
import Order from './controllers/order/Order'
import Filter from './controllers/filter/Filters'
import {useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { fetchCountries } from './redux/actions'


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCountries());
  }, []);
  

  const { pathname } = useLocation()

  return (
    <>
      <div>
        {pathname !== '/' && <Nav  />}
        {pathname !== '/' && <Order/>}
        {pathname !== '/' && <Filter/>}

        <Routes>
          <Route path='/home' element={<Cards/>} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/' element={<LandingPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
