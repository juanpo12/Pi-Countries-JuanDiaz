import { useEffect, useState  } from "react";
import {  fetchCountriesSearchBar, fetchCountries } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux'
import style from './SearchBar.module.css'

const SearchBar = () => {
    // const dispatch = useDispatch()
    // const [name, setName] = useState('')
    // const handleChange = (event) => {
    //     setName(event.target.value)
    // }
    // const isModalOpen = useSelector(state => state.isModalOpen)
    // const searchCountry = useSelector(state => state.searchCountry)
    
    // const dispatchSearch = (name) => {
    //     dispatch(openModal())
    //     dispatch(fetchContent(name))
    // }
    
    
    
    
    
    
    // const handleKeyUp = (event) => {
    //     if (event.key === 'Enter') {
    //         onSearch(name);
    //         setName('');
    //     }
    // };
    
    // return (
    //     <div>
    //         <div><Modal isOpen={isModalOpen} children={searchCountry}/></div>
    //         <input className={style.input} type="search" placeholder="Nombre del pais" value={name} onChange={handleChange} onKeyUp={handleKeyUp} />
    //         {/* <button onClick={() => {dispatchSearch(name), setName('')}}>Buscar</button> */}
    //     </div>
    // )
    
    
    
    // return(
    //     <div>
    //         {
        //             <><input type="search" onChange={handleChange} value={name} placeholder="Nombre del pais" onKeyUp={handleKeyUp}/>
        //             <button onClick={() => {onSearch(name); setName('')}}>Buscar</button></>
        //         }
    //     </div>
    // )
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    
    useEffect(() => {
        if (name === '') {
            dispatch(fetchCountries())
        } 
        else{
            dispatch(fetchCountriesSearchBar(name));
        }
    }, [name]); 

    const handleChange = (event) => {
        setName(event.target.value)

    }

        const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            dispatch(fetchCountriesSearchBar(name));
            setName('');
        }
    };


    return(
        <div>
            <input className={style.input} type="search" placeholder="Nombre del pais" value={name} onChange={handleChange} onKeyUp={handleKeyUp} />

        </div>
    )
    
}

export default SearchBar