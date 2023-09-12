import {SEARCH_COUNTRIES ,ORDER, LOAD_COUNTRIES, CHANGE_PAGE, ORDER_POPULATION, ORDER_ALPHABETICAl, COUNTRIES_FILTER, LOAD_ACTIVITIES, POST_ACTIVITY, FILTER_ACTIVITIES, COUNTRY_BY_ID } from "./actions-type";

const initialState = {
    allCountries: [],
    allCountriesFilter: [],
    searchCountry: [],
    allActivities: [],
    activitiesFilter: [],
    countriesActivitiesFiltered: [],
    countriesPerPage: 10,
};


const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ORDER:
            const allCountriesCopy = [...state.allCountriesFilter];
            return {
                ...state,
                allCountriesFilter: payload === "A"
                    ? allCountriesCopy.sort((a, b) => a.id.localeCompare(b.id))
                    : allCountriesCopy.sort((a, b) => b.id.localeCompare(a.id)),
            };

        case ORDER_ALPHABETICAl:
            const allCountriesOrderAlp = [...state.allCountriesFilter];
            return {
                ...state,
                allCountriesFilter: payload === 'O'
                    ? allCountriesOrderAlp.sort((a, b) => a.name.localeCompare(b.name))
                    : allCountriesOrderAlp.sort((a, b) => b.name.localeCompare(a.name))
            }

        case ORDER_POPULATION:
            const allCountriesOrder = [...state.allCountriesFilter]
            return {
                ...state,
                allCountriesFilter: payload === 'P'
                    ? allCountriesOrder.sort((a, b) => a.poblacion - b.poblacion)
                    : allCountriesOrder.sort((a, b) => b.poblacion - a.poblacion)
            }
        case POST_ACTIVITY:
            return{
                ...state,
                allActivities: [payload, ...state.allActivities]
            }

        case FILTER_ACTIVITIES:
            const filteredActivities = state.allCountries.filter(country => {
                if(payload === 'Seleccione una actividad'){
                    return true
                }
                for (const activity of country.activities) {
                    if (activity.id === +payload) {
                        return activity
                    }
                }
                return false
            })
            return {
                ...state,
                allCountriesFilter: filteredActivities,
                countriesActivitiesFiltered: filteredActivities
            }

        case LOAD_COUNTRIES:
            return {
                ...state,
                allCountries: payload,
                allCountriesFilter: payload
            };

        case LOAD_ACTIVITIES:
            return {
                ...state,
                allActivities: payload,
                activitiesFilter: payload
            };

        case CHANGE_PAGE:
            return {
                ...state,
                currentPage: payload,
            };

        case COUNTRY_BY_ID:
            return {
                ...state,
                searchCountry: payload
            }

        case COUNTRIES_FILTER:
            if(payload == 'All'){
                return {
                    ...state,
                    allCountriesFilter: state.allCountries
                }
            }
            //para filtrar en los countries da las actividades
            const countryAfiltered = state.countriesActivitiesFiltered.length > 0 ? state.countriesActivitiesFiltered : state.allCountries

            
            const filteredCountries = countryAfiltered.filter(country => {
                return country.continentes == payload;
            });

            return {
                ...state,
                allCountriesFilter: filteredCountries.length > 0 ? filteredCountries : []

            };

        case SEARCH_COUNTRIES:
            return {
                ...state,
                allCountriesFilter: payload
            }

        default:
            return { ...state };
    }
};

export default reducer;