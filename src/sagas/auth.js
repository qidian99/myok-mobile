// Imports: Dependencies
import {delay, takeEvery, takeLatest, put, call} from 'redux-saga/effects';
import {types} from 'util/types';
import API from 'util/mock';
function* loginParentAsync(action) {
  const {username, password} = action;

  try {
    // Network
    // call
    const {user, token} = yield call(API.loginParentUser, username, password);
    // Dispatch Action To Redux Store
    yield put({
      type: types.LOGIN_PARENT,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
  }
}

function* loginChildAsync(action) {
  const {parentCode, dob} = action;

  try {
    // Network
    // call
    const {user, token} = yield call(API.loginChildUser, parentCode, dob);
    // Dispatch Action To Redux Store
    yield put({
      type: types.LOGIN_CHILD,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* authSaga() {
  yield takeLatest(types.LOGIN_PARENT_ASYNC, loginParentAsync);
  yield takeLatest(types.LOGIN_CHILD_ASYNC, loginChildAsync);
}
