import { ORDER, LOAD_COUNTRIES, CHANGE_PAGE, ORDER_POPULATION, ORDER_ALPHABETICAl, COUNTRIES_FILTER, LOAD_ACTIVITIES, OPEN_MODAL, MODAL_CONTENT, CLOSE_MODAL, POST_ACTIVITY, FILTER_ACTIVITIES } from "./actions-type";
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

export const filterActvities = (filter) => ({
    type: FILTER_ACTIVITIES,
    payload: filter
});


export const loadActivities = (activities) => ({
    type: LOAD_ACTIVITIES,
    payload: activities,
});

export const fetchActivities = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios('http://localhost:3001/activities');

            dispatch(loadActivities(data));
        } catch (error) {
            console.error(error);
        }
    };
}

export const fetchContent = (name) => {
    return async (dispatch) => {
        const endpoint = `http://localhost:3001/countries?name=${name}`;
        const { data } = await axios(endpoint);
        return dispatch({
            type: MODAL_CONTENT,
            payload: data[0]
        });
    };
}

export const postActivity = (data) => ({
    type: POST_ACTIVITY,
    payload: data
})

export const postBackActivity = (activityData) => {
    return async (dispatch) => {
        try {
            const {data} = await axios.post('http://localhost:3001/activities', activityData);
            dispatch(postActivity(data));
        } catch (error) {

            console.error('Error al crear la actividad:', error);
        }
    };
};

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
