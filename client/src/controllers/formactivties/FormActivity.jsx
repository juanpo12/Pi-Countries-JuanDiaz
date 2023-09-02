import { useState } from "react";
import { useSelector } from "react-redux"

const FormActivity = () => {

    const allCountries = useSelector(state => state.allCountries)

    const [countriesSelect, setCountriesSelect] = useState([])

    const options = allCountries.map(country => (
        <option key={country.id} value={country.id}>
            {country.name}
        </option>
    ));

    const handleCountryChange = (event) => {
        const selectedCountryId = event.target.value;

        // Verifica si el país ya está en la lista de seleccionados
        if (!countriesSelect.includes(selectedCountryId)) {
            // Agrega el país seleccionado a la lista
            setCountriesSelect([...countriesSelect, selectedCountryId]);
        }
    };

    const removeCountry = (countryId) => {
        // Remueve un país de la lista de seleccionados
        const updatedCountries = countriesSelect.filter(id => id !== countryId);
        setCountriesSelect(updatedCountries);
    };

    const [activityData, setActivityData] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setActivityData({
            ...activityData,
            [name]: value,
        });
    };

    return (
        <div>
            <h1>¡Planea tu actividad!</h1>
            <div>
                <div>
                    <label htmlFor="">Nombre: </label>
                    <input type="text" />
                </div>

                <div>
                    <label htmlFor="">Dificultad: </label>
                    <input type="text" />
                </div>

                <div>
                    <label htmlFor="">Duración: </label>
                    <input type="text" />
                </div>

                <div>
                    <label htmlFor="">Temporada: </label>
                    <input type="text" />
                </div>

                <select >
                    {options}
                </select>
                <p>{countriesSelect}</p>




                <button>Crear</button>

            </div>
        </div>
    )


}

export default FormActivity