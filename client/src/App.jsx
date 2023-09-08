import './App.css';
import Nav from './controllers/nav/Nav';
import Cards from './controllers/cards/Cards';
import LandingPage from './controllers/lading/LandingPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import Detail from './controllers/detail/Detail';
import Order from './controllers/order/Order';
import Filter from './controllers/filter/Filters';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCountries, fetchActivities } from './redux/actions';
import FormActivity from './controllers/formactivties/FormActivity';
import AllActivities from './controllers/allactivities/AllActivities';
import About from './controllers/about/About';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchActivities());
  }, [dispatch]);



  const { pathname } = useLocation()

  return (
    <>
      <div className="landing">
        {pathname !== '/' && <Nav />}
        {/* {pathname === '/home' && <Order />} */}
        {/* <div className={pathname === '/home' ? 'show-filter' : 'hide-filter'}>
          <Filter  />
        </div> */}





        <Routes>
          <Route path='/form' element={<FormActivity />} />
          <Route path='/home' element={<Cards />} />
          <Route path='/detail/:id' element={<Detail />} />          
          <Route path='/' element={<LandingPage />} />
          <Route path='/activities' element={<AllActivities />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </>
  )
}

export default App
