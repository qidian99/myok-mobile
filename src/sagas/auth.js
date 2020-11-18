// Imports: Dependencies
import {delay, takeEvery, takeLatest, put, call} from 'redux-saga/effects';
import {actions} from 'util/actions';
// import API from 'util/mock';
import API from 'util/api';
import {OTP_METHODS} from 'util/actions';
function* loginAdultAsync(action) {
  const {username, password} = action;
  console.log(action);
  try {
    const loginResponse = yield call(API.loginAdult, username, password);
    console.log(loginResponse);
    const {cookie, expires, token, user} = loginResponse;
    yield put({
      type: actions.LOGIN_ADULT,
      user,
      token,
      cookie,
      expires,
    });
  } catch (error) {
    console.log(error);
  }
}

function* onboardChildAsync(action) {
  const {parentCode, dob} = action;
  try {
    const {user, token, securityQuestion, tos} = yield call(
      API.loginChildUser,
      parentCode,
      dob,
      securityQuestion,
      tos,
    );
    yield put({
      type: actions.LOGIN_CHILD,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
  }
}

function* sendVerificationCodeAsync(action) {
  const {method, address} = action;
  if (method !== OTP_METHODS.SMS && method !== OTP_METHODS.EMAIL) {
    throw new Error('OTP method not allowed');
  }
  try {
    let res;
    if (method === OTP_METHODS.SMS) {
      res = yield call(API.sendSMSOTP, address);
    } else {
      res = yield call(API.sendEmailOTP, address);
    }
    yield put({
      type: actions.SEND_VERIFICATION_CODE,
      method,
      address,
    });
  } catch (error) {
    console.log(error);
  }
}
function* signupAdultAsync(action) {
  const {method, code} = action;
  if (method !== OTP_METHODS.SMS && method !== OTP_METHODS.EMAIL) {
    throw new Error('Sign up method not allowed');
  }
  try {
    let res;
    if (method === OTP_METHODS.SMS) {
      res = yield call(API.checkSMSOTP, code);
    } else {
      res = yield call(API.checkEmailOTP, code);
    }
    yield put({
      type: actions.SIGNUP_ADULT,
    });
  } catch (error) {
    console.log(error);
  }
}
// function* signupChildAsync(action) {}
function* resetPasswordAsync(action) {
  const {email} = action;
  try {
    const res = yield call(API.resetPassword, email);
  } catch (e) {
    console.log(e);
  }
}
function* forgetPasswordAsync(action) {
  const {email} = action;
  try {
    const res = yield call(API.forgetPassword, email);
  } catch (e) {
    console.log(e);
  }
}

function* fetchSecurityQuestionAsync(action) {
  const {email} = action;
  try {
    const res = yield call(API.fetchSecurityQuestion, email);
  } catch (e) {
    console.log(e);
  }
}
function* submitSecurityQuestionAsync(action) {
  const {email, sqid, answer} = action;
  try {
    const res = yield call(API.submitSecurityQuestion, email, sqid, answer);
  } catch (e) {
    console.log(e);
  }
}

export function* authSaga() {
  yield takeLatest(actions.LOGIN_ADULT_ASYNC, loginAdultAsync);
  yield takeLatest(actions.LOGIN_CHILD_ASYNC, onboardChildAsync);
  yield takeLatest(
    actions.SEND_VERIFICATION_CODE_ASYNC,
    sendVerificationCodeAsync,
  );
  yield takeLatest(actions.SIGNUP_ADULT_ASYNC, signupAdultAsync);
  yield takeLatest(actions.SIGNUP_CHILD_ASYNC, onboardChildAsync);
  yield takeLatest(actions.RESET_PASSWORD_ASYNC, resetPasswordAsync);
  yield takeLatest(actions.SIGNUP_CHILD_ASYNC, forgetPasswordAsync);

  yield takeLatest(
    actions.FETCH_SECURITY_QUESTION_ASYNC,
    fetchSecurityQuestionAsync,
  );
  yield takeLatest(
    actions.SUBMIT_SECURITY_QUESTION_ASYNC,
    submitSecurityQuestionAsync,
  );
}
