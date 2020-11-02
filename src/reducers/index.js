import {authReducer} from 'reducers/auth';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from 'sagas';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  auth: authReducer,
});

export const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware, createLogger()),
);

sagaMiddleware.run(rootSaga);

export const action = (type) => store.dispatch({type});
