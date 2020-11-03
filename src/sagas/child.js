// Imports: Dependencies
import {delay, takeEvery, takeLatest, put, call} from 'redux-saga/effects';
import {types} from 'util/types';
import API from 'util/mock';
function* fetchChildrenAsync(action) {
  try {
    const children = yield call(API.fetchChildren);
    yield put({
      type: types.FETCH_CHILDREN,
      children,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* childSaga() {
  yield takeLatest(types.FETCH_CHILDREN_AYSNC, fetchChildrenAsync);
}
