import React from "react";
import { Link } from "react-router-dom";



const CardActivity = ({id, name, dificultad, duracion, temporada}) => {

    
    return (

        <div>
            <div>
                <h2>{name}</h2>
                <img src={banderaImagen} alt={name} />
                <div>
                    <h2>{continentes}</h2>
                </div>
            </div>
        </div>
    )

}


export default Card