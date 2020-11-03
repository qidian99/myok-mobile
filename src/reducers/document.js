import {PURGE} from 'redux-persist';
import {types} from 'util/types';

const INITIAL_STATE = {
  documents: [],
};

export const documentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PURGE: {
      return INITIAL_STATE;
    }
    case types.FETCH_DOCUMENTS: {
      const {documents} = action;
      console.log('Getting documents in document reducer', documents);
      return {
        ...state,
        documents,
      };
    }
    default:
      return state;
  }
};
