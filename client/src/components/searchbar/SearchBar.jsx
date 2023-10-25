import { useEffect, useState  } from "react";
import {  fetchCountriesSearchBar } from "../../redux/actions";
import { useDispatch } from 'react-redux'
import style from './SearchBar.module.css'

const SearchBar = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    
    useEffect(() => {
        dispatch(fetchCountriesSearchBar(name))
    }, [name]); 

    const handleChange = (event) => {
        setName(event.target.value)

    }


    return(
        <div>
            <input className={style.input} type="search" placeholder="Nombre del pais" value={name} onChange={handleChange}/>

        </div>
    )
    
}

export default SearchBar