import {PURGE} from 'redux-persist';
import {types} from 'util/types';

const INITIAL_STATE = {
  user: null,
  token: null,
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PURGE: {
      return INITIAL_STATE;
    }
    case types.LOGIN_PARENT: {
      const {user, token} = action;
      return {
        ...state,
        user,
        token,
      };
    }
    case types.LOGIN_CHILD: {
      const {user, token} = action;
      return {
        ...state,
        user,
        token,
      };
    }
    case types.LOGOOUT: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};
