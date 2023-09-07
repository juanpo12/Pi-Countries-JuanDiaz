import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { postBackActivity } from '../../redux/actions'

const FormActivity = () => {
    const dispatch = useDispatch()

    const allCountries = useSelector(state => state.allCountries)

    const [countriesSelect, setCountriesSelect] = useState([])
    const [seasons, setSeasons] = useState([])    
    
    
    const options = allCountries.sort((a,b) => a.name.localeCompare(b.name)).map(country => (
        <option key={country.id} value={country.id}>
            {country.name}
        </option>
    ));
    
    // const optionsTemporada = temporadas.map(temporada => (
    //     <option key={temporada} value={temporada}>
    //         {temporada}
    //     </option>
    // ));
    const handleSeasonChange = (event) => {
        const selectedSeason = event.target.value;
        if(seasons.includes(selectedSeason)){
            const seasonFiltered = seasons.filter((season) => season !== selectedSeason)
            setSeasons(seasonFiltered);
        }else{
            setSeasons([...seasons, selectedSeason])
        }

    }
    
    const temporadas = [
        'Primavera', 'Verano', 'Otoño', 'Invierno'
    ].map((temporada) => (
        <label key={temporada}>
            <input
                type="checkbox"
                value={temporada}
                onChange={handleSeasonChange}
            />
            {temporada}
        </label>
    ));

    const handleCountryChange = (event) => {
        const selectedCountryId = event.target.value;


        if (!countriesSelect.includes(selectedCountryId)) {

            setCountriesSelect([...countriesSelect, selectedCountryId]);
        }
    };

    // const removeCountry = (countryId) => {

    //     const updatedCountries = countriesSelect.filter(id => id !== countryId);
    //     setCountriesSelect(updatedCountries);
    // };

    const [activityData, setActivityData] = useState({
        nombre: "",
        dificultad: 0,
        duracion: 0,
        temporada: [],
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        validations({
            ...activityData,
            [name]: value,
        })
        setActivityData({
            ...activityData,
            [name]: value,
        });
    };

    const [errors, setErrors] = useState({
        nombre: false,
        dificultad: false,
        duracion: false,
        temporada: false
    })

    // const validations = () => {
    //     setErrors({
    //         ...errors,
    //         nombre: false,
    //         dificultad: false,
    //         duracion: false
    //     })
    //     if (activityData.nombre.trim() === "") {
    //         setErrors({
    //           ...errors,
    //           nombre: true
    //         })
    //       }
    //     //regex to check for numbers
    //     const regex = /^[0-9]+$/;

    //     if (regex.test(activityData.dificultad)) {
    //         setErrors({
    //             ...errors,
    //             dificultad: true
    //         })

    //     }

    //     if (regex.test(activityData.duracion)) {
    //         setErrors({
    //             ...errors,
    //             duracion: true
    //         })
    //     }
    // }

    const validations = () => {
        let newErrors = {
            ...errors,
            nombre: false,
            dificultad: false,
            duracion: false
        };

        if (activityData.nombre.trim() === ""){
            newErrors = {
                ...newErrors,
                nombre: true
            };
        }

        if (isNaN(activityData.dificultad) || activityData.dificultad === 0) {
            newErrors = {
                ...newErrors,
                dificultad: true
            };
        }

        if (isNaN(activityData.duracion) || activityData.duracion === 0) {
            newErrors = {
                ...newErrors,
                duracion: true
            };
        }

        setErrors(newErrors);
    };

    const createActivity = async (event) => {
        event.preventDefault()

        const activity = {
            nombre: activityData.nombre,
            dificultad: activityData.dificultad,
            duracion: activityData.duracion,
            temporada: seasons,
            paises: countriesSelect
        };




        dispatch(postBackActivity(activity));

        setActivityData({
            nombre: "",
            dificultad: 0,
            duracion: 0,
            temporada: [],
        });
        setCountriesSelect([]);
        setSeasons([]);
        alert("¡Actividad creada con éxito!")

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
                    <p>{errors.nombre && "El nombre es obligatorio"}</p>
                </div>

                <div>
                    <label htmlFor="dificultad">Dificultad: </label>
                    <input
                        type="text"
                        name="dificultad"
                        value={activityData.dificultad}
                        onChange={handleInputChange}
                    />
                    <p>{errors.dificultad && "La dificultad es obligatoria y tiene que ser un numero"}</p>
                </div>

                <div>
                    <label htmlFor="duracion">Duración: </label>
                    <input
                        type="text"
                        name="duracion"
                        value={activityData.duracion}
                        onChange={handleInputChange}
                    />
                    <p>{errors.duracion && "La duración es obligatoria y tiene que ser un numero"}</p>
                </div>

                <div>
                    <label>Temporadas:</label>
                    {temporadas}
                </div>
                

                {/* <div>
                    <label htmlFor="temporada">Temporada: </label>
                    <input
                        type="text"
                        name="temporada"
                        value={activityData.temporada}
                        onChange={handleInputChange}
                    />
                </div> */}

                <select onChange={handleCountryChange}>
                    <option value="">Selecciona un país</option>
                    {options}
                </select>
                <p>Países seleccionados: {countriesSelect.join(", ")}</p>

                <button onClick={createActivity}>Crear</button>
            </div>
        </div>



    );


}

export default FormActivity