import {
    GET_CURRENCIES_RATES,
    GET_CURRENCIES_RATES_SUCCESS,
    GET_CURRENCIES_RATES_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
    rates: {},
    loading: false,
    error: null
};

const currencyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CURRENCIES_RATES:
            return { ...state, loading: true, error: null };
        case GET_CURRENCIES_RATES_SUCCESS:
            return { ...state, rates: action.payload, loading: false, error: null };
        case GET_CURRENCIES_RATES_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default currencyReducer;