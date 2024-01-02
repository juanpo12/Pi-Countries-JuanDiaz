import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountryById } from "../../redux/actions";
import CardActivities from "../cardActivities/CardActivities";
import './Detail.css';

const Detail = () => {

  const { id } = useParams();

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCountryById(id))
  },[])

  const country = useSelector(state => state.searchCountry)

  // const activityCountry = country?.activities?.map(activity => activity.nombre).join(', ')

  return (
    <div className="boxDetail">
      <div className="boxDetailIn">
        <div>
          <h2>{country?.id}</h2>
          <img src={country?.banderaImagen} alt={country?.name} />
          <h2>Nombre: {country?.name}</h2>
          <h2>Continente: {country?.continentes}</h2>
          <h2>Capital: {country?.capital}</h2>
          <h2>Subregion: {country?.subregion}</h2>
          <h2>Area: {country?.area}</h2>
          <h2>Poblacion: {country?.poblacion}</h2>
        </div>
        {/* <p>Actividades: {activityCountry ? activityCountry : 'No hay actividades'}</p> */}
        <div className="divAct">
          <h2>ACTIVIDADES:</h2>
          <div className="divMapAct">
            {
            country?.activities?.map((activity) => (
              <CardActivities key={activity.id} 
              nombre={activity.nombre}
              duracion={activity.duracion}
              temporada={activity.temporada}
              dificultad={activity.dificultad}
              />
            ))
          }

          </div>
        </div>
        

      </div>
    </div>
  )

}

export default Detail;