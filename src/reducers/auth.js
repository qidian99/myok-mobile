import {PURGE} from 'redux-persist';
import {actions} from 'util/actions';

const INITIAL_STATE = {
  user: null,
  token: null,
  cookie: null,
  expires: null,
  securityQuestion: false,
  tos: false,
  schools: [],
  districts: [],
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
    case actions.GET_DISTRICT_BY_STATE: {
      const {districts} = action;
      return {
        ...state,
        districts,
      };
    }
    case actions.GET_SCHOOL_BY_DISTRICT: {
      const {schools} = action;
      return {
        ...state,
        schools,
      };
    }
    default:
      return state;
  }
};
