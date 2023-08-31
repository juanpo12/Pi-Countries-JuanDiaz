import { ORDER, LOAD_COUNTRIES, CHANGE_PAGE, ORDER_POPULATION, ORDER_ALPHABETICAl } from "./actions-type";
import axios from 'axios';

export const changePage = (page) => ({
    type: CHANGE_PAGE,
    payload: page,
  });
export const loadCountries = (countries) => ({
    type: LOAD_COUNTRIES,
    payload: countries,
});

export const fetchCountries = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3001/countries');
            const countries = response.data;
            dispatch(loadCountries(countries));
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };
};

export const orderPopulation = (order) => {
    return {
        type: ORDER_POPULATION,
        payload: order
    }

}

export const orderAlphabetical = (order) => {
    return {
        type: ORDER_ALPHABETICAl,
        payload: order
    }
}

export const orderCards = (order) => {
    return {
        type: ORDER,
        payload: order
    }
}
