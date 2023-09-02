import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { postActivity } from '../../redux/actions'

const FormActivity = () => {
    const dispatch = useDispatch()

    const allCountries = useSelector(state => state.allCountries)

    const [countriesSelect, setCountriesSelect] = useState([])

    const options = allCountries.map(country => (
        <option key={country.name} value={country.name}>
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
        nombre: "",
        dificultad: "",
        duracion: "",
        temporada: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setActivityData({
            ...activityData,
            [name]: value,
        });
    };

    const createActivity = (event) => {
        event.preventDefault()
        // Aquí puedes crear la actividad utilizando activityData y countriesSelect
        // Luego, puedes enviar la actividad al servidor
        const activity = {
            nombre: activityData.nombre,
            dificultad: activityData.dificultad,
            duracion: activityData.duracion,
            temporada: activityData.temporada,
            paises: countriesSelect, // Lista de países seleccionados
        };

        dispatch(postActivity(activity));
        // Aquí puedes enviar la actividad al servidor utilizando una función o una solicitud HTTP
        // Por ejemplo: enviarActivityAlServidor(activity);
        // Recuerda implementar la lógica de enviarActivityAlServidor.
        setActivityData({
            nombre: "",
            dificultad: "",
            duracion: "",
            temporada: "",
        });
        
        setCountriesSelect([]);
        
        
        alert("¡Actividad creada con éxito!")
        // Luego, puedes reiniciar los campos del formulario o mostrar un mensaje de éxito.
        // También puedes limpiar la lista de países seleccionados.
    };

    return (
        <div>
            <h1>¡Planea tu actividad!</h1>
            <div>
                <div>
                    <label htmlFor="nombre">Nombre: </label>
                    <input
                        type="text"
                        name="nombre"
                        value={activityData.nombre}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="dificultad">Dificultad: </label>
                    <input
                        type="text"
                        name="dificultad"
                        value={activityData.dificultad}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="duracion">Duración: </label>
                    <input
                        type="text"
                        name="duracion"
                        value={activityData.duracion}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="temporada">Temporada: </label>
                    <input
                        type="text"
                        name="temporada"
                        value={activityData.temporada}
                        onChange={handleInputChange}
                    />
                </div>

                <select onChange={handleCountryChange}>
                    {options}
                </select>
                <p>Países seleccionados: {countriesSelect.join(", ")}</p>

                <button onClick={createActivity}>Crear</button>
            </div>
        </div>



    );


}

export default FormActivity