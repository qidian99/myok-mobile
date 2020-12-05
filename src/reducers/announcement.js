import {PURGE} from 'redux-persist';
import {actions} from 'util/actions';

const INITIAL_STATE = {
  announcements: [],
  loading: false,
};

export const announcementReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PURGE: {
      return INITIAL_STATE;
    }
    case actions.FETCH_ANNOUNCEMENTS: {
      const {announcements} = action;
      console.log(
        'Getting announcements in announcements reducer',
        announcements,
      );
      return {
        ...state,
        loading: false,
        announcements,
      };
    }
    case actions.FETCH_ANNOUNCEMENTS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
};
