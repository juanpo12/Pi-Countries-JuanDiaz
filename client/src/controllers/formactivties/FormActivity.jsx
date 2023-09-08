import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { postBackActivity } from '../../redux/actions'
import './Form.css'

const FormActivity = () => {
    const dispatch = useDispatch()
    const [activityData, setActivityData] = useState({
        nombre: "",
        dificultad: 0,
        duracion: 0,
        temporada: [],
    });

    const allCountries = useSelector(state => state.allCountries)

    const [countriesSelect, setCountriesSelect] = useState([])
    const [seasons, setSeasons] = useState([])

    const deleteCountry = (id) => {
        const updatedCountries = countriesSelect.filter((country) => country !== id)
        setCountriesSelect(updatedCountries);
    }


    const options = allCountries.sort((a, b) => a.name.localeCompare(b.name)).map(country => (
        <option key={country.id} value={country.id}>
            {country.name}
        </option>
    ));


    const handleSeasonChange = (event) => {
        const selectedSeason = event.target.value;
        if (seasons.includes(selectedSeason)) {
            const seasonFiltered = seasons.filter((season) => season !== selectedSeason)
            setSeasons(seasonFiltered);
        } else {
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



    const handleStarClick = (starValue) => {
        setActivityData({
            ...activityData,
            dificultad: starValue,
        })
    }

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={`star ${i <= activityData.dificultad ? "selected" : ""}`}
                    onClick={() => handleStarClick(i)}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setActivityData({
            ...activityData,
            [name]: value,
        });
    };

    const [errors, setErrors] = useState('');
    // const validations = () => {
    //     let newErrors = {
    //         ...errors,
    //         nombre: false,
    //         dificultad: false,
    //         duracion: false
    //     };

    //     if (activityData.nombre.trim() === "") {
    //         newErrors = {
    //             ...newErrors,
    //             nombre: true
    //         };
    //     }

    //     if (isNaN(activityData.dificultad) || activityData.dificultad === 0) {
    //         newErrors = {
    //             ...newErrors,
    //             dificultad: true
    //         };
    //     }

    //     if (isNaN(activityData.duracion) || activityData.duracion === 0) {
    //         newErrors = {
    //             ...newErrors,
    //             duracion: true
    //         };
    //     }

    //     setErrors(newErrors);
    // };

    const createActivity = async (event) => {
        event.preventDefault()

        const activity = {
            nombre: activityData.nombre,
            dificultad: activityData.dificultad,
            duracion: activityData.duracion,
            temporada: seasons,
            paises: countriesSelect
        };

        if (activityData.nombre === "") {
            setErrors(" El nombre no puede estar vacio.");
        }else if(activityData.dificultad < 1 || activityData.dificultad > 5 ){
            setErrors("La dificultad debe estar entre 1 y 5.");

        } else if (activityData.duracion > 8 || activityData.duracion < 1) {
            setErrors("La duración no puede exceder las 8 horas o valor invalido.");
        } else if( activity.temporada.length === 0){
            setErrors("Debes seleccionar una temporada.");

        }else if(activity.paises.length === 0){
            setErrors("Debes seleccionar al menos un pais.");

        }else {
            
            setErrors("");
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

        }
    };










    

    const countriesSelectMap = countriesSelect.map((countryId, index) => (
        <button key={index} value={countryId.id} onClick={() => deleteCountry(countryId)}> {countryId} </button>
    ))

    return (
        <div className="containerForm">
            <div className="form1">
                <h1>¡Planea tu actividad!</h1>
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
                    <label>Dificultad: </label><div className="star-rating">{renderStars()}</div>
                </div>

                <div>
                    <label htmlFor="duracion">Duración: </label>
                    <input
                        type="number"
                        name="duracion"
                        value={activityData.duracion}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label>Temporadas:</label>
                    {temporadas}
                </div>

                <select onChange={handleCountryChange}>
                    <option value="">Selecciona un país</option>
                    {options}
                </select>
                <p>Países seleccionados: {countriesSelectMap}</p>

                <button onClick={createActivity}>Crear</button>
                {errors && <p style={{ color: "red" }}>{errors}</p>}
            </div>
        </div>



    );


}

export default FormActivity