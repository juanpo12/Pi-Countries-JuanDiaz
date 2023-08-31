import { useState  } from "react";

const SearchBar = ({onSearch}) => {
    const [name, setName] = useState('')
    const handleChange = (event) => {
        setName(event.target.value)
    }

    

    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            onSearch(name);
            setName('')
        }
    };

    return(
        <div>
            {
                <><input type="search" onChange={handleChange} value={name} placeholder="Nombre del pais" onKeyUp={handleKeyUp}/>
                <button onClick={() => {onSearch(name); setName('')}}>Buscar</button></>
            }
        </div>
    )

}

export default SearchBar