import {PURGE} from 'redux-persist';
import {actions} from 'util/actions';

const INITIAL_STATE = {
  announcements: [],
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
        announcements,
      };
    }
    default:
      return state;
  }
};
