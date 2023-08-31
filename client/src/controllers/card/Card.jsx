import React from "react";
import { Link } from "react-router-dom";



const Card = ({id, name, banderaImagen, continentes, capital, subregion, area, poblacion, onClose}) => {

    
    return (

        <div>
            <div>
                <Link to={`/detail/${id}`}><h2>{name}</h2></Link>
                <img src={banderaImagen} alt={name} />
                <div>
                    <h2>{continentes}</h2>
                </div>
            </div>
        </div>
    )

}


export default Card