import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../card/card";
import { changePage } from '../../redux/actions'

const Cards = ({ onClose }) => {
  const countries = useSelector(state => state.allCountries);
  const dispatch = useDispatch();
  const { currentPage, countriesPerPage } = useSelector((state) => state)

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

  const handlePageChange = (page) => {
    dispatch(changePage(page));
  };

  return (
    <div>
      {currentCountries.map(({ id, name, banderaImagen, continentes, capital, subregion, area, poblacion }) => {
        return (
          <Card
            key={id}
            id={id}
            name={name}
            banderaImagen={banderaImagen}
            continentes={continentes}
            capital={capital}
            subregion={subregion}
            area={area}
            poblacion={poblacion}
          />
        );
      })}
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={indexOfLastCountry >= countries.length}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Cards;