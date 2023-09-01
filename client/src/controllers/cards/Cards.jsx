import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../card/card";
import { changePage } from '../../redux/actions'

const Cards = () => {
  const countries = useSelector(state => state.allCountries);
  const allCountriesFilter = useSelector(state => state.allCountriesFilter);

  
  
  
  const dispatch = useDispatch();
  const { currentPage, countriesPerPage } = useSelector((state) => state)
  
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);
  const newCountries = allCountriesFilter.slice(indexOfFirstCountry, indexOfLastCountry);
  
  const handlePageChange = (page) => {
    dispatch(changePage(page));
  };
  
  const countriesToDisplay = allCountriesFilter.length > 0 ? newCountries : currentCountries;
  
  const buttonCountries = countriesToDisplay === newCountries ?  allCountriesFilter : countries
  return (
    <div className="boxCountry">
      {countriesToDisplay.map(({ id, name, banderaImagen, continentes, capital, subregion, area, poblacion }) => {
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
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={indexOfLastCountry >= buttonCountries.length}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Cards;