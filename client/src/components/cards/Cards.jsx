import React, { useState } from "react";
import { useSelector } from 'react-redux';
import Card from "../card/Card";
import { useEffect } from "react";
import style from './Cards.module.css'
import Filter from "../filter/Filters";
import Order from "../order/Order";

const Cards = () => {
  const allCountriesFilter = useSelector(state => state.allCountriesFilter);
  const [currentPage, setCurrentPage] = useState(1)

  const { countriesPerPage } = useSelector((state) => state)

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const newCountries = allCountriesFilter.slice(indexOfFirstCountry, indexOfLastCountry);

  const handlePageChange = (page) => {
    setCurrentPage(page)
  };

  useEffect(() => {
    setCurrentPage(1)
  }, [allCountriesFilter])

  return (
    
    <div className={style.boxCountry}>
      <div className={style.boxFiltered}>
        <div className={style.boxFilter}>
          <Filter/> 
        </div>
        <div className={style.boxOrder}>
         <Order/>
        </div>
      </div>

      <div className={style.cards}>
        {newCountries.map(({ id, name, banderaImagen, continentes}) => {
          return (
            <Card
              key={id}
              id={id}
              name={name}
              banderaImagen={banderaImagen}
              continentes={continentes}
            />
          );
        })}

      </div>
      <div>
        <div className={style.pagination}>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Anterior
          </button>
          <p>{currentPage} of {Math.ceil(allCountriesFilter.length / countriesPerPage)}</p>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={indexOfLastCountry >= allCountriesFilter.length}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;