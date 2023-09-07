import { ORDER, LOAD_COUNTRIES, CHANGE_PAGE, ORDER_POPULATION, ORDER_ALPHABETICAl, COUNTRIES_FILTER, LOAD_ACTIVITIES, CLOSE_MODAL, OPEN_MODAL, MODAL_CONTENT, POST_ACTIVITY, FILTER_ACTIVITIES } from "./actions-type";

const initialState = {
    allCountries: [],
    allCountriesFilter: [],
    allActivities: [],
    searchCountry: [],
    activitiesFilter: [],
    countriesPerPage: 10,
    isModalOpen: false
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
            console.log(state.allCountries);
            const filteredActivities = state.allCountries.filter(country => {
                for (const activity of country.activities) {
                    console.log(activity);
                    if (activity.id === +payload) {
                        return activity
                    }
                }
                return false
            })
            return {
                ...state,
                allCountriesFilter: filteredActivities
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

        case COUNTRIES_FILTER:
            const filteredCountries = state.allCountries.filter(country => {
                return country.continentes == payload;
            });

            return {
                ...state,
                allCountriesFilter: filteredCountries
            };

        case OPEN_MODAL:
            return {
                ...state,
                isModalOpen: true,
            };
        case CLOSE_MODAL:
            return {
                ...state,
                isModalOpen: false,
            };
        case MODAL_CONTENT:
            return {
                ...state,
                searchCountry: payload
            }

        default:
            return { ...state };
    }
};

export default reducer;