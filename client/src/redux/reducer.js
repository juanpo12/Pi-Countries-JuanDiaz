import { ORDER, LOAD_COUNTRIES, CHANGE_PAGE, ORDER_POPULATION, ORDER_ALPHABETICAl} from "./actions-type";

const initialState = {
    allCountries: [],
    currentPage: 1,
    countriesPerPage: 10,
};

const reducer = (state = initialState, { type, payload }) => {
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
            return{
                ...state,
                allCountries: payload === 'O'
                ? allCountriesOrderAlp.sort((a, b) => a.localeCompare(b))
                : allCountriesOrderAlp.sort((a, b) => b.localeCompare(a))
            }

        case ORDER_POPULATION:
            const allCountriesOrder = [ ...state.allCountries ]
            return{
                ...state,
                allCountries: payload === 'P'
                ? allCountriesOrder.sort((a,b) => a.poblacion - b.poblacion)
                : allCountriesOrder.sort((a,b) => b.poblacion - a.poblacion)
            }

        case LOAD_COUNTRIES:
            return {
                ...state,
                allCountries: payload,
            };

        case CHANGE_PAGE:
            return {
                ...state,
                currentPage: payload,
            };

        default:
            return { ...state };
    }
};

export default reducer;