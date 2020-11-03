// Imports: Dependencies
import {all, fork} from 'redux-saga/effects';
// Imports: Redux Sagas
import {authSaga} from './auth';
import {documentSaga} from './document';
import {childSaga} from './child';
// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([fork(authSaga), fork(documentSaga), fork(childSaga)]);
}
