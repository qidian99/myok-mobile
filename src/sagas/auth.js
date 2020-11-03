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
      type: types.LOGIN_ADULT,
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

function* sendVerificationCode(action) {}
function* signupAdult(action) {}
function* signupChild(action) {}

export function* authSaga() {
  yield takeLatest(types.LOGIN_ADULT_ASYNC, loginParentAsync);
  yield takeLatest(types.LOGIN_CHILD_ASYNC, loginChildAsync);
  yield takeLatest(types.SEND_VERIFICATION_CODE_ASYNC, sendVerificationCode);
  yield takeLatest(types.SIGNUP_ADULT, signupAdult);
  yield takeLatest(types.SIGNUP_CHILD, signupChild);
}
