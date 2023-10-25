import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import './cardActividades.css'


const CardActivities = ({ id, nombre, duracion, temporada, dificultad }) => {


    function difficultyStars(difficulty) {
        return "⭐".repeat(difficulty);
    }

    return (
        <div key={id} className='activitycard'>
            <div>
                <Link to={`/activities/${id}`}><div></div></Link>

            </div>
            <h3>{nombre}</h3>
            <p>Dificultad: {difficultyStars(dificultad)}</p>
            <p>Duración: {duracion} Horas</p>
            <p>Temporada: {temporada?.join(", ")}</p>
        </div>
    )


}

export default CardActivities
