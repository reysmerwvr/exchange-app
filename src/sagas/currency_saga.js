import { put, call, takeLatest } from 'redux-saga/effects';
import { getRates } from '../endpoints';
import {
    GET_CURRENCIES_RATES,
    GET_CURRENCIES_RATES_SUCCESS,
    GET_CURRENCIES_RATES_ERROR,
} from '../actions/types';
import { 
    handleError, 
    retrieveActionCreator
} from '../helpers/general';

function* fetchRates(action) {
    try {
       const { data } = yield call(getRates, action.payload);
       const { rates, success, error } = data;
       if (success) {
        yield put(retrieveActionCreator(GET_CURRENCIES_RATES_SUCCESS, rates));
       } else {
        handleError(error);
        yield put(retrieveActionCreator(GET_CURRENCIES_RATES_ERROR, error));
       }
    } catch (error) {
       handleError(error);
       yield put(retrieveActionCreator(GET_CURRENCIES_RATES_ERROR, error));
    }
}

function* currencySaga() {
    yield takeLatest(GET_CURRENCIES_RATES, fetchRates);
}

export default currencySaga;

