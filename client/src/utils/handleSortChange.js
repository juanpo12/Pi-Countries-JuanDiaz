import { useDispatch } from "react-redux";
import { orderCards } from '../redux/actions'; 
const handleSortChange = (event) => {
  const dispatch = useDispatch()
  const value = event.target.value;
  let field = null;
  let order = null;

  if (value === 'A') {
    field = 'name'; // Puedes ajustar el campo en el que deseas ordenar
    order = 'asc';
  } else if (value === 'D') {
    field = 'name'; // Puedes ajustar el campo en el que deseas ordenar
    order = 'desc';
  } else if (value === 'P') {
    field = 'poblacion'; // Ajusta el campo para ordenar por población
    order = 'desc';
  } else if (value === 'O') {
    field = 'name'; // Puedes ajustar el campo en el que deseas ordenar
    order = 'asc';
  }

  dispatch(orderCards({ field, order })); // Cambia setSorting por orderCards
};

  export default handleSortChange;