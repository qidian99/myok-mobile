import {types} from 'util/types';

export const loginAdult = (username, password) => ({
  type: types.LOGIN_ADULT_ASYNC,
  username,
  password,
});

export const loginChild = (parentCode, dob) => ({
  type: types.LOGIN_CHILD_ASYNC,
  parentCode,
  dob,
});

export const sendVerificationCode = (method, address) => ({
  type: types.SEND_VERIFICATION_CODE_ASYNC,
  method,
  address,
});

export const signupAdult = (method, code) => ({
  type: types.SIGNUP_ADULT_ASYNC,
  method,
  code,
});

export const signupChild = (parentCode, dob) => ({
  type: types.SIGNUP_CHILD,
  parentCode,
  dob,
});

export const fetchDocuments = () => ({
  type: types.FETCH_DOCUMENTS_ASYNC,
});

export const fetchChildren = () => ({
  type: types.FETCH_CHILDREN_AYSNC,
});
