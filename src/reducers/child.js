import {PURGE} from 'redux-persist';
import {types} from 'util/types';

const INITIAL_STATE = {
  children: [],
};

export const childReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PURGE: {
      return INITIAL_STATE;
    }
    case types.FETCH_CHILDREN: {
      const {children} = action;
      console.log('Getting children in child reducer', children);
      return {
        ...state,
        children,
      };
    }
    default:
      return state;
  }
};
