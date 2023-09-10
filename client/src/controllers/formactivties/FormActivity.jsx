import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { postBackActivity } from '../../redux/actions'
import './Form.css'

const FormActivity = () => {
    const dispatch = useDispatch()
    const [activityData, setActivityData] = useState({
        nombre: "",
        dificultad: 1,
        duracion: 1,
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
        console.log(seasons.length);
        if (seasons.includes(selectedSeason)) {
            const seasonFiltered = seasons.filter((season) => season !== selectedSeason)
            setSeasons(seasonFiltered);
        } else {
            const updatedSeasons = [...seasons, selectedSeason]
            setSeasons(updatedSeasons);
        }

    }

    useEffect(() => {
        const isSeasonsEmpty = seasons.length === 0;
        setErrors({
            ...errors,
            temporada: isSeasonsEmpty ? "Debe seleccionar al menos una temporada" : "",
        });
    }, [seasons]);

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
            validateForm([...countriesSelect, selectedCountryId])
        }
    };


    useEffect(() => {
        const isCountriesEmpty = countriesSelect.length === 0;

        setErrors({
            ...errors,
            paises: isCountriesEmpty ? "Debe seleccionar al menos un pais" : "",
        });

    }, [countriesSelect]);



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

    const validateForm = (input) => {
        const newErrors = {
            nombre: "",
            dificultad: "",
            duracion: "",
            temporada: "",
            paises: "",
        };

        if (input.nombre === "") {
            newErrors.nombre = "El nombre no puede estar vacío.";
        }

        // if (input.dificultad < 1 || input.dificultad > 5) {
        //     newErrors.dificultad = "La dificultad debe estar entre 1 y 5.";
        // }

        if (input.duracion > 8 || input.duracion < 1) {
            newErrors.duracion = "La duración no puede exceder las 8 horas o ser un valor inválido.";
        }
        setErrors(newErrors);

        return (
            !newErrors.nombre &&
            !newErrors.dificultad &&
            !newErrors.duracion &&
            !newErrors.temporada &&
            !newErrors.paises
        );
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setActivityData({
            ...activityData,
            [name]: value,
        });
        validateForm({
            [name]: value
        });


    };

    const [errors, setErrors] = useState({
        nombre: "",
        dificultad: '',
        duracion: '',
        temporada: '',
        paises: '',
    });


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
                    {errors.nombre && <p style={{ color: "red" }}>{errors.nombre}</p>}
                </div>

                <div>
                    <label>Dificultad: </label><div className="star-rating">{renderStars()}</div>
                    {errors.dificultad && <p style={{ color: "red" }}>{errors.dificultad}</p>}
                </div>

                <div>
                    <label htmlFor="duracion">Duración: </label>
                    <input
                        type="number"
                        name="duracion"
                        value={activityData.duracion}
                        onChange={handleInputChange}
                    />
                    {errors.duracion && <p style={{ color: "red" }}>{errors.duracion}</p>}
                </div>

                <div>
                    <label>Temporadas:</label>
                    {temporadas}
                    {errors.temporada && <p style={{ color: "red" }}>{errors.temporada}</p>}
                </div>

                <select onChange={handleCountryChange}>
                    <option value="">Selecciona un país</option>
                    {options}
                </select>
                <p>Países seleccionados: {countriesSelectMap}</p>
                {errors.paises && <p style={{ color: "red" }}>{errors.paises}</p>}
                <button onClick={createActivity}>Crear</button>
            </div>
        </div>



    );


}

export default FormActivity