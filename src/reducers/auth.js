import {PURGE} from 'redux-persist';
import {actions} from 'util/actions';

const INITIAL_STATE = {
  user: null,
  token: null,
  securityQuestion: false,
  tos: false,
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PURGE: {
      return INITIAL_STATE;
    }
    case actions.LOGIN_ADULT: {
      const {user, token, securityQuestion, tos} = action;
      return {
        ...state,
        user,
        token,
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
