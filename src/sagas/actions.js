import {types} from 'util/types';

export const loginAction = (username, password) => ({
  type: types.LOGIN_ASYNC,
  username,
  password,
});
