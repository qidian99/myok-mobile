// Imports: Dependencies
import {all, fork} from 'redux-saga/effects';
// Imports: Redux Sagas
import {watchLogin} from './auth';
// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([fork(watchLogin)]);
}
