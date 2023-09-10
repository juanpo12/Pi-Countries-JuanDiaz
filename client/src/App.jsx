import './App.css';
import Nav from './components/nav/Nav';
import Cards from './components/cards/Cards';
import LandingPage from './components/lading/LandingPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import Detail from './components/detail/Detail';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCountries, fetchActivities } from './redux/actions';
import FormActivity from './components/formactivties/FormActivity';
import AllActivities from './components/allactivities/AllActivities';
import About from './components/about/About';

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
