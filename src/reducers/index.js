import {authReducer} from 'reducers/auth';
import {documentReducer} from 'reducers/document';
import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from 'sagas';

import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {childReducer} from './child';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  document: documentReducer,
  child: childReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
  // applyMiddleware(sagaMiddleware, createLogger()),
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export const action = (type) => store.dispatch({type});

// Uncomment to purge all redux state
// persistor.purge();
