import React from "react"
import SearchBar from "../searchbar/SearchBar"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

const Nav = ({ onSearch }) => {

    const {pathname} = useLocation()

    

    return (
        <div>
            <SearchBar onSearch={onSearch} />
            <Link to={'/about'}><button disabled={pathname === '/about'}>About</button></Link>
            <Link to={'/home'}><button disabled={pathname === '/home'}>Home</button></Link>
            <Link to={'/form'}><button disabled={pathname === '/form'}>¡Planea tu actividad!</button></Link>
            <Link to={'/activities'}><button disabled={pathname === '/activities'}>¡actividades!</button></Link>
        </div>
    )
}

export default Nav;