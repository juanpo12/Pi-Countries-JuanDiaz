import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderCards, orderPopulation, orderAlphabetical, loadCountries } from '../../redux/actions';
import style from '../cards/Cards.module.css'

const Order = () => {
  const { orderPage } = useSelector(state => state)
  const dispatch = useDispatch();

  useEffect(() => {
    handleOrder({ target: { value: orderPage } });
  }, [orderPage]);
  
  const handleOrder = (event) => {
    const value = event.target.value;

    switch (value) {
      case "A":
      case "D":
        dispatch(orderCards(value));
        break;

      case "P":
        dispatch(orderPopulation(value));
        break;

      case "O":
        dispatch(orderAlphabetical(value));
        break;

      default:
        break;
    }
  };


  return (
    <div className={style.order}>
      <select onChange={handleOrder}>
        <option value="A">Ascendente</option>
        <option value="D">Desendente</option>
        <option value="P">Poblacion</option>
        <option value="O">Orden Alfabetico</option>
      </select>
    </div>
  );
};

export default Order;