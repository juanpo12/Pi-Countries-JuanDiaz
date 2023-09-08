import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountryById } from "../../redux/actions";

const Detail = () => {

  const { id } = useParams();

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCountryById(id))
  },[])

  const country = useSelector(state => state.searchCountry)

  const activityCountry = country?.activities?.map(activity => activity.nombre).join(', ')

  return (
    <div>
      <h2>{country?.id}</h2>
      <img src={country?.banderaImagen} alt={country?.name} />
      <h2>{country?.name}</h2>
      <h2>{country?.continentes}</h2>
      <h2>{country?.capital}</h2>
      <h2>{country?.subregion}</h2>
      <h2>Area: {country?.area}</h2>
      <h2>Poblacion: {country?.poblacion}</h2>
      <p>Actividades: {activityCountry ? activityCountry : 'No hay actividades'}</p>
    </div>
  )

}

export default Detail;