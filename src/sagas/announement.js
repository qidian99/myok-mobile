// Imports: Dependencies
import {delay, takeEvery, takeLatest, put, call} from 'redux-saga/effects';
import {actions} from 'util/actions';
import API from 'util/mock';

function* fetchAnnoucementsAsync(action) {
  try {
    const annoucements = yield call(API.fetchAnnoucements);
    // Dispatch Action To Redux Store
    yield put({
      type: actions.FETCH_DOCUMENTS,
      annoucements,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* announcementSaga() {
  yield takeLatest(actions.FETCH_ANNOUNCEMENTS_ASYNC, fetchAnnoucementsAsync);
}
