import React from "react"
import SearchBar from "../searchbar/SearchBar"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import './nav.css'

const Nav = () => {

    const {pathname} = useLocation()

    

    return (
        <div className="nav">
            <div className="buttonsLeft">
                <Link to={'/about'}><button className="about" disabled={pathname === '/about'}>About</button></Link>
                <Link to={'/home'}><button className="home" disabled={pathname === '/home'}>Home</button></Link>
            </div>
            <div className="search">
                <Link to={'/home'}><SearchBar className="searchBar"/></Link>
            </div>
            <div className="buttonsRight">
                <Link to={'/form'}><button className="form" disabled={pathname === '/form'}>¡Planea tu actividad!</button></Link>
                <Link to={'/activities'}><button className="activities" disabled={pathname === '/activities'}>¡actividades!</button></Link>
            </div>
        </div>
    )
}

export default Nav;