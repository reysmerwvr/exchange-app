import {
    GET_CURRENCIES_RATES,
} from './types';

export const getCurrencyRates = (payload) => ({
    type: GET_CURRENCIES_RATES,
    payload
});