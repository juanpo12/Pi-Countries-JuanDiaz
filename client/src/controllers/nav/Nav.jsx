import React from "react"
import SearchBar from "../searchbar/SearchBar"
import { Link } from "react-router-dom"

const Nav = ({ onSearch }) => {

    return (
        <div>
            <SearchBar onSearch={onSearch} />
            <Link to={'/about'}><button>About</button></Link>
            <Link to={'/home'}><button>Home</button></Link>
            <Link to={'/form'}><button>¡Planea tu actividad!</button></Link>
        </div>
    )
}

export default Nav;