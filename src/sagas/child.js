// Imports: Dependencies
import {delay, takeEvery, takeLatest, put, call} from 'redux-saga/effects';
import {actions} from 'util/actions';
import API from 'util/mock';
function* fetchChildrenAsync(action) {
  try {
    const children = yield call(API.fetchChildren);
    yield put({
      type: actions.FETCH_CHILDREN,
      children,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* childSaga() {
  yield takeLatest(actions.FETCH_CHILDREN_AYSNC, fetchChildrenAsync);
}
