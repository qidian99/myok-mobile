// Imports: Dependencies
import {delay, takeEvery, takeLatest, put, call} from 'redux-saga/effects';
import {actions} from 'util/actions';
import API from 'util/mock';
function* fetchDocumentsAsync(action) {
  try {
    const documents = yield call(API.fetchDocuments);
    // Dispatch Action To Redux Store
    yield put({
      type: actions.FETCH_DOCUMENTS,
      documents,
    });
  } catch (error) {
    console.log(error);
  }
}

function* fetchDocumentAsync(action) {}
function* signDocumentAsync(action) {}
function* finishDocumentVideoAsync(action) {}
function* submitDocumentQuestionsAsync(action) {}
function* searchDocumentsAsync(action) {}

export function* documentSaga() {
  yield takeLatest(actions.FETCH_DOCUMENTS_ASYNC, fetchDocumentsAsync);
  yield takeLatest(actions.FETCH_DOCUMENT_ASYNC, fetchDocumentAsync);
  yield takeLatest(actions.SIGN_DOCUMENT_ASYNC, signDocumentAsync);
  yield takeLatest(
    actions.FINISH_DOCUMENT_VIDEO_ASYNC,
    finishDocumentVideoAsync,
  );
  yield takeLatest(
    actions.SUBMIT_DOCUMENT_QUESTIONS_ASYNC,
    submitDocumentQuestionsAsync,
  );
  yield takeLatest(actions.SEARCH_DOCUMENTS_ASYNC, searchDocumentsAsync);
}
