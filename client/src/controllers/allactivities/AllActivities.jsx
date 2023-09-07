import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchActivities } from "../../redux/actions";
const AllActivities = () => {
  const dispatch = useDispatch();

  const allActivitiesState =  useSelector((state) => state.allActivities);

  useEffect(() => {

    dispatch(fetchActivities());
  }, [dispatch]);

  if (!allActivitiesState || allActivitiesState.length === 0) {
    return <div>No se encontraron actividades.</div>;
  }




  return (
    <div>
      <h1>Actividades</h1>
      {allActivitiesState?.map(({ id, nombre, dificultad, duracion, temporada, countries }) => (
        <div key={id} className="activity-card">
          <h2>Actividad: {nombre}</h2>
          <p>Dificultad: {dificultad}</p>
          <p>Duración: {duracion} horas</p>
          <p>Temporada: {temporada.join(', ')}</p>
          <p>Paises: {countries?.map(country => [country.name]).join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default AllActivities;