import {authReducer} from 'reducers/auth';
import {combineReducers, createStore} from 'redux';

const reducers = combineReducers({
  auth: authReducer,
});

export const store = createStore(reducers);
