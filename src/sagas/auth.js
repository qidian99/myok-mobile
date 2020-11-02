// Imports: Dependencies
import {delay, takeEvery, takeLatest, put} from 'redux-saga/effects';
import {types} from 'util/types';
// Worker: Increase Counter Async (Delayed By 4 Seconds)
function* loginAsync() {
  try {
    // Delay 4 Seconds
    yield delay(1000);

    const user = {name: 'mock user'};
    const token = 'MOCK_TOKEN';
    // Dispatch Action To Redux Store
    yield put({
      type: types.LOGIN,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
  }
}
// Watcher: Increase Counter Async
export function* watchLogin(action) {
  console.log(action);
  yield takeLatest(types.LOGIN_ASYNC, loginAsync);
}
