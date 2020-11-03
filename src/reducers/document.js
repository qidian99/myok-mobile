import {PURGE} from 'redux-persist';
import {actions} from 'util/actions';

const INITIAL_STATE = {
  documents: [],
};

export const documentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PURGE: {
      return INITIAL_STATE;
    }
    case actions.FETCH_DOCUMENTS: {
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
