import React from "react";
import { useSelector } from "react-redux";

const AllActivities = () => {
  const allActivities = useSelector((state) => state.allActivities);

  return (
    <div>
      <h1>Actividades</h1>
      {allActivities.map(({ id ,nombre, dificultad, duracion, temporada }) => (
        <div key={id} className="activity-card">
          <h2>Nombre: {nombre}</h2>
          <p>Dificultad: {dificultad}</p>
          <p>Duración: {duracion} horas</p>
          <p>Temporada: {temporada}</p>
        </div>
      ))}
    </div>
  );
};

export default AllActivities;