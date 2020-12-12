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

const MOCK_STATE = {
  user: {
    uid: '1',
    name: 'qidian',
    mail: 'diqi@isafeventures.com',
    theme: '',
    signature: '',
    signature_format: null,
    created: '1603740710',
    access: '1607102545',
    login: 1607103436,
    status: '1',
    timezone: 'America/Los_Angeles',
    language: '',
    picture: null,
    init: 'diqi@isafeventures.com',
    data: false,
    roles: {2: 'authenticated user', 3: 'administrator'},
    rdf_mapping: {
      rdftype: ['sioc:UserAccount'],
      name: {predicates: ['foaf:name']},
      homepage: {predicates: ['foaf:page'], type: 'rel'},
    },
  },
  token: 'MUABxWQgm90VD5jHqA3FGh-9jxqoAZSbIFXagYraMG0',
  cookie:
    'SESS75f4857b53f26f3e1c4dbfe5fb960454=qm5Cwz5wJae8z2mFsyGJljbiWTdMXT80uesg-L9mBgA; expires=Sun, 27-Dec-2020 21:10:37 GMT; Max-Age=2000000; path=/; HttpOnly',
  expires: '2020-12-27T21:10:37.000Z',
  schools: [],
  districts: [],
};

export const authReducer = (
  // state = INITIAL_STATE,
  state = MOCK_STATE,
  action,
) => {
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
