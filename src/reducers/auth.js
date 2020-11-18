import {PURGE} from 'redux-persist';
import {actions} from 'util/actions';

const INITIAL_STATE = {
  user: null,
  token: null,
  cookie: null,
  expires: null,
  securityQuestion: false,
  tos: false,
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PURGE: {
      return INITIAL_STATE;
    }
    case actions.LOGIN_ADULT: {
      const {user, token, cookie, expires, securityQuestion, tos} = action;
      return {
        ...state,
        user,
        token,
        cookie,
        expires,
        securityQuestion,
        tos,
      };
    }
    case actions.LOGIN_CHILD: {
      const {user, token} = action;
      return {
        ...state,
        user,
        token,
      };
    }
    case actions.LOGOOUT: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};
