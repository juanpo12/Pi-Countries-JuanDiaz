import { ORDER, LOAD_COUNTRIES, CHANGE_PAGE, ORDER_POPULATION, ORDER_ALPHABETICAl, COUNTRIES_FILTER, LOAD_ACTIVITIES, CLOSE_MODAL, OPEN_MODAL, MODAL_CONTENT, POST_ACTIVITY } from "./actions-type";

const initialState = {
    allCountries: [],
    allCountriesFilter: [],
    allActivities: [],
    searchCountry: [],
    currentPage: 1,
    countriesPerPage: 10,
    isModalOpen: false
};


const reducer = (state = initialState, { type, payload }) => {console.log(payload);
    switch (type) {
        case ORDER:
            const allCountriesCopy = [...state.allCountries];
            return {
                ...state,
                allCountries: payload === "A"
                    ? allCountriesCopy.sort((a, b) => a.id.localeCompare(b.id))
                    : allCountriesCopy.sort((a, b) => b.id.localeCompare(a.id)),
            };

        case ORDER_ALPHABETICAl:
            const allCountriesOrderAlp = [...state.allCountries];
            return {
                ...state,
                allCountries: payload === 'O'
                    ? allCountriesOrderAlp.sort((a, b) => a.name.localeCompare(b.name))
                    : allCountriesOrderAlp.sort((a, b) => b.name.localeCompare(a.name))
            }

        case ORDER_POPULATION:
            const allCountriesOrder = [...state.allCountries]
            return {
                ...state,
                allCountries: payload === 'P'
                    ? allCountriesOrder.sort((a, b) => a.poblacion - b.poblacion)
                    : allCountriesOrder.sort((a, b) => b.poblacion - a.poblacion)
            }
        case POST_ACTIVITY:
            return{
                ...state,
                allActivities: payload
            }

        case LOAD_COUNTRIES:
            return {
                ...state,
                allCountries: payload,
            };

        case LOAD_ACTIVITIES:
            return {
                ...state,
                allActivities: payload,
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