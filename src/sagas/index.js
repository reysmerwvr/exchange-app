import { all } from 'redux-saga/effects';
import currencySaga from './currency_saga';

export default function* rootSaga() {
  yield all([
    currencySaga()
  ]);
}