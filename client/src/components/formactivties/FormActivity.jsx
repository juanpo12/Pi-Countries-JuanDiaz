import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { postBackActivity } from '../../redux/actions'
import './Form.css'
import { disableButton, validateForm } from "../../utils/validate/validate";

const FormActivity = () => {
    const dispatch = useDispatch()
    const [activityData, setActivityData] = useState({
        nombre: "",
        autor: "",
        dificultad: 1,
        duracion: 1,
        temporada: [],
    });

    const [errors, setErrors] = useState({
        nombre: "",
        dificultad: '',
        duracion: '',
        temporada: '',
        paises: '',
        autor: ""
    });

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        disableButton(activityData, setIsFormValid)
    }, [activityData])

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
            validateForm({
                ...activityData,
                temporada: updatedSeasons, // Pasar las temporadas actualizadas
            }, setErrors);
        }
        // Después de actualizar las temporadas, valida el formulario

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
        let updatedCountries;
        
        if (!countriesSelect.includes(selectedCountryId)) {
            updatedCountries = [...countriesSelect, selectedCountryId];
            setCountriesSelect(updatedCountries);
        } else {
            updatedCountries = countriesSelect.filter((country) => country !== selectedCountryId);
            setCountriesSelect(updatedCountries);
        }
    
        // Después de cada cambio en la selección de países, vuelve a validar el formulario
        validateForm({
            nombre: activityData.nombre,
            dificultad: activityData.dificultad,
            duracion: activityData.duracion,
            temporada: seasons,
            paises: updatedCountries
        }, setErrors);
    };


    useEffect(() => {
        const isCountriesEmpty = countriesSelect.length < 1;

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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setActivityData({
            ...activityData,
            [name]: value,
        });
        validateForm({
            ...activityData,
            [name]: value
        }, setErrors);
        setIsFormValid(validateForm({
            ...activityData,
            [name]: value
        }, setErrors));


    };


    useEffect(() => {
        setIsFormValid(!errors.nombre && !errors.dificultad && !errors.duracion && !errors.temporada && !errors.paises);
    }, [errors]);



    const createActivity = async (event) => {
        event.target.value


        const activity = {
            autor: activityData.autor,
            nombre: activityData.nombre,
            dificultad: activityData.dificultad,
            duracion: activityData.duracion,
            temporada: seasons,
            paises: countriesSelect
        };

        if (validateForm(activity, setErrors)) {
            dispatch(postBackActivity(activity));

            setActivityData({
                nombre: "",
                dificultad: 0,
                duracion: 0,
                temporada: [],
                autor: ''

            });
            setCountriesSelect([]);
            setSeasons([]);
            alert("¡Actividad creada con éxito!");

        } else {
            alert("No se pudo crear la actividad");
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
                    {errors.nombre && <p style={{ color: "red" }}>{errors.nombre}</p>}
                </div>
                <div>
                    <label htmlFor="autor">Autor: </label>
                    <input
                        type="text"
                        name="autor"
                        value={activityData.autor}
                        onChange={handleInputChange}
                    />
                    
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
                <button onClick={createActivity} disabled={!isFormValid} >Crear</button>
            </div>
        </div>



    );


}

export default FormActivity