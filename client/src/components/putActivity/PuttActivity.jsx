import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchActivities, putActivity } from '../../redux/actions';
import { disableButton, validateForm } from "../../utils/validate/validate";
import { useParams } from "react-router-dom";

const PuttActivity = () => {
  const {activityId} = useParams();

  const dispatch = useDispatch();
  const [activityData, setActivityData] = useState({
    nombre: "",
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
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const allCountries = useSelector(state => state.allCountries);
  const [countriesSelect, setCountriesSelect] = useState([]);
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    disableButton(activityData, setIsFormValid);
  }, [activityData]);

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
      const updatedSeasons = [...seasons, selectedSeason]
      setSeasons(updatedSeasons);
      validateForm({
        ...activityData,
        temporada: updatedSeasons,
      }, setErrors);
    }
  };

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
      paises: isCountriesEmpty ? "Debe seleccionar al menos un país" : "",
    });

  }, [countriesSelect]);

  const handleStarClick = (starValue) => {
    setActivityData({
      ...activityData,
      dificultad: starValue,
    });
  };

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


  const countriesSelectMap = countriesSelect.map((countryId, index) => (
    <button key={index} value={countryId.id} onClick={() => deleteCountry(countryId)}> {countryId} </button>
  ));

  const updateActivityData = () => {
    console.log(countriesSelect);
    const updatedActivity = {
      nombre: activityData.nombre,
      dificultad: activityData.dificultad,
      duracion: activityData.duracion,
      temporada: seasons,
      paises: countriesSelect
    };


    dispatch(fetchActivities())
    dispatch(putActivity(activityId, updatedActivity));

    setActivityData({
      nombre: "",
      dificultad: 1,
      duracion: 1,
      temporada: [],
    });
    setCountriesSelect([]);
    setSeasons([]);
    alert("¡Actividad actualizada con éxito!");

  };

  return (
    <div className="containerForm">
      <div className="form1">
        <h1>¡Actualiza tu actividad!</h1>
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
        <button onClick={updateActivityData} disabled={!isFormValid} >Actualizar</button>
      </div>
    </div>
  );
};

export default PuttActivity;