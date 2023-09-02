import { ORDER, LOAD_COUNTRIES, CHANGE_PAGE, ORDER_POPULATION, ORDER_ALPHABETICAl, COUNTRIES_FILTER, LOAD_ACTIVITIES, OPEN_MODAL, MODAL_CONTENT, CLOSE_MODAL } from "./actions-type";
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
            const response = await axios('http://localhost:3001/countries');
            const countries = response.data;
            dispatch(loadCountries(countries));
        } catch (error) {
            console.error(error);
        }
    };
};


export const loadActivities = (activities) => ({
    type: LOAD_ACTIVITIES,
    payload: activities,
});

export const fetchActivities = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3001/activities'); 
            const activities = response.data;
            console.log(response.data)
            dispatch(loadActivities(activities));
        } catch (error) {
            console.error(error);
        }
    };
}

export const fetchContent = (name) => {
    return async (dispatch) => {
       const endpoint = `http://localhost:3001/countries?name=${name}`;
       const {data} = await axios(endpoint);
       return dispatch({
          type: MODAL_CONTENT,
          payload: data[0]
       });
    };
}

export const openModal = () => ({
    type: OPEN_MODAL,
});

export const closeModal = () => ({
    type: CLOSE_MODAL,
});

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

export const filterCountries = (filter) => {
    return {
        type: COUNTRIES_FILTER,
        payload: filter
    }
}
