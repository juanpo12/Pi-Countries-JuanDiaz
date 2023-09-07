import React, { useState } from "react";
import { useSelector } from 'react-redux';
import Card from "../card/card";
import { useEffect } from "react";

const Cards = () => {
  const countries = useSelector(state => state.allCountries);
  const allCountriesFilter = useSelector(state => state.allCountriesFilter);
  const [currentPage, setCurrentPage] = useState(1)





  const { countriesPerPage } = useSelector((state) => state)

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);
  const newCountries = allCountriesFilter.slice(indexOfFirstCountry, indexOfLastCountry);

  const handlePageChange = (page) => {
    setCurrentPage(page)
  };


  const countriesToDisplay = allCountriesFilter.length > 0 ? newCountries : currentCountries;

  const buttonCountries = countriesToDisplay === newCountries ? allCountriesFilter : countries

  useEffect(() => {
    setCurrentPage(1)
  }, [allCountriesFilter])

  return (

    <div className="boxCountry">
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={indexOfLastCountry >= buttonCountries.length}>
          Siguiente
        </button>
      </div>
      {countriesToDisplay.map(({ id, name, banderaImagen, continentes, capital, subregion, area, poblacion, activities }) => {
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
            // activities={activities.name}
            activities={activities}
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