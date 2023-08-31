import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { orderCards, orderPopulation, orderAlphabetical } from '../../redux/actions';

const Order = () => {
  const dispatch = useDispatch();

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
    <div>
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