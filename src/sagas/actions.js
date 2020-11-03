import {types} from 'util/types';

export const loginParent = (username, password) => ({
  type: types.LOGIN_PARENT_ASYNC,
  username,
  password,
});

export const loginChild = (parentCode, dob) => ({
  type: types.LOGIN_CHILD_ASYNC,
  parentCode,
  dob,
});

export const fetchDocuments = () => ({
  type: types.FETCH_DOCUMENTS_ASYNC,
});

export const fetchChildren = () => ({
  type: types.FETCH_CHILDREN_AYSNC,
});
