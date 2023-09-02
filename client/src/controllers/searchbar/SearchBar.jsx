import { useState  } from "react";
import { openModal, fetchContent } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../modal/Modal'

const SearchBar = ({onSearch}) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const handleChange = (event) => {
        setName(event.target.value)
    }
    const isModalOpen = useSelector(state => state.isModalOpen)
    const searchCountry = useSelector(state => state.searchCountry)

    const dispatchSearch = (name) => {
        dispatch(openModal())
        dispatch(fetchContent(name))
    }




    

    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            onSearch(name);
            setName('');
        }
    };

    return (
        <div>
            <div><Modal isOpen={isModalOpen} children={searchCountry}/></div>
            <input type="search" placeholder="Nombre del pais" value={name} onChange={handleChange} onKeyUp={handleKeyUp} />
            <button onClick={() => {dispatchSearch(name), setName('')}}>Buscar</button>
        </div>
    )



    // return(
    //     <div>
    //         {
    //             <><input type="search" onChange={handleChange} value={name} placeholder="Nombre del pais" onKeyUp={handleKeyUp}/>
    //             <button onClick={() => {onSearch(name); setName('')}}>Buscar</button></>
    //         }
    //     </div>
    // )

}

export default SearchBar