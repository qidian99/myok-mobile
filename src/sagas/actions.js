import {types} from 'util/types';

export const login = (username, password) => ({
  type: types.LOGIN_ASYNC,
  username,
  password,
});
