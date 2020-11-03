// Imports: Dependencies
import {delay, takeEvery, takeLatest, put, call} from 'redux-saga/effects';
import {types} from 'util/types';
import API from 'util/mock';
function* fetchDocumentsAsync(action) {
  try {
    const documents = yield call(API.fetchDocuments);
    // Dispatch Action To Redux Store
    yield put({
      type: types.FETCH_DOCUMENTS,
      documents,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* documentSaga() {
  yield takeLatest(types.FETCH_DOCUMENTS_ASYNC, fetchDocumentsAsync);
}
