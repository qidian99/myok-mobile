// Imports: Dependencies
import {delay, takeEvery, takeLatest, put, call} from 'redux-saga/effects';
import {actions} from 'util/actions';
import API from 'util/mock';

function* changeProfileAsync(action) {}

export function* userSaga() {
  yield takeLatest(actions.CHANGE_PROFILE_ASYNC, changeProfileAsync);
}
