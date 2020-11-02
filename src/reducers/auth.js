import {types} from 'util/types';

const INITIAL_STATE = {
  user: null,
  token: null,
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOGIN: {
      const {user, token} = action;
      return {
        ...state,
        user,
        token,
      };
    }
    default:
      return state;
  }
};
