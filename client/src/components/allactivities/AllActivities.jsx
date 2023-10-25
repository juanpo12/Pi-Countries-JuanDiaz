import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchActivities, deleteActivity } from "../../redux/actions";
import './AllActivities.css'
import { Link } from "react-router-dom";


const AllActivities = () => {
  const dispatch = useDispatch();
  const [deleteActivities, setDeleteActivities] = useState(false);

  const allActivitiesState = useSelector((state) => state.allActivities);
  // const { activitiesFilter } = useSelector(state => state)

  useEffect(() => {
    dispatch(fetchActivities());
  }, [deleteActivities])




  if (allActivitiesState.length === 0) {
    return <div>No se encontraron actividades.</div>;
  }

  function difficultyStars(difficulty) {
    return "⭐".repeat(difficulty);
  }

  const deleteActivityById = (event) => {

    const id = event.target.value
    setDeleteActivities(!deleteActivities)
    dispatch(deleteActivity(id));
    dispatch(fetchActivities());
  }






  return (
    <div className="allActivities">
      <div className="allActivities2">
        <h1>Actividades</h1>
        <div className="allActivities3">
          {allActivitiesState?.map(({ id, nombre, dificultad, duracion, temporada, countries }) => (
            <div key={id} className="activity-card">
              <Link to={`/update/${id}`}><div className="update"></div></Link>
              <h2>Actividad: {nombre}</h2>
              <p>Dificultad: {difficultyStars(dificultad)}</p>
              <p>Duración: {duracion} horas</p>
              <p>Temporada: {temporada.join(', ')}</p>
              <p>Paises: {countries?.map(country => [country.name]).join(', ')}</p>
              <button onClick={deleteActivityById} value={id}>ELIMINAR</button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default AllActivities;