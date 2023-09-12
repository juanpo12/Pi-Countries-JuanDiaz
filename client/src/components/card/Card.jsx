import React from "react";
import { Link } from "react-router-dom";
import './card.css';

const Card = ({ id, name, banderaImagen, continentes}) => {

    return (


        <div className="box">
            <img src={banderaImagen} alt={name} className="img" />
            <Link to={`/detail/${id}`}><h2>{name}</h2></Link>
            <div>
                <h2 className='continentes'>{continentes}</h2>
            </div>
        </div>

    )

}


export default Card