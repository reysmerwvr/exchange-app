import { combineReducers } from 'redux';
import currencyReducer from './currency_reducer';

const rootReducer = combineReducers({
    currencies: currencyReducer
});

export default rootReducer;