import React from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Detail = () => {

    const [country, setCountry] = useState({
        id: "",
        banderaImagen: "",
        name: "",
        continentes: "",
        capital: "",
        subregion: "",
        area: "",
        poblacion: "",
    });
    const {id} = useParams();

    useEffect(() => {
        async function fetchData() {
          try {
            const { data } = await axios(`http://localhost:3001/countries/${id}`);
            if (data.name) {
              setCountry(data);
            }
          } catch (error) {
            window.alert('Error al obtener los detalles del país');
          }
        }
      
        fetchData();
      }, [id]);

    return(
        <div>
            <h2>{country?.id}</h2>
            <img src={country?.banderaImagen} alt={country?.name} />
            <h2>{country?.name}</h2>
            <h2>{country?.continentes}</h2>
            <h2>{country?.capital}</h2>
            <h2>{country?.subregion}</h2>
            <h2>Area: {country?.area}</h2>
            <h2>Poblacion: {country?.poblacion}</h2>
        </div>
    )

}

export default Detail;