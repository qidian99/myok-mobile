import {store} from 'reducers';
import {timeout} from './general';

const MOCK_ENDPOINT = 'http://localhost:8886/api/myok';
const MOCK_JWT =
  'eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0';
const MOCK_USER = {
  first_name: 'First',
  last_name: 'Last',
  email: 'test@isafeventures.com',
  username: 'test@isafeventures.com',
};
const MOCK_DOCUMENT = {
  title: 'Mock Document',
  body: 'This is a mock document',
};
const MOCK_DOCUMENTS = [MOCK_DOCUMENT, MOCK_DOCUMENT, MOCK_DOCUMENT];
const MOCK_CHILD = {
  first_name: 'Child',
  last_name: 'One',
  dob: new Date(),
};
const MOCK_CHILDREN = [MOCK_CHILD, MOCK_CHILD];
const mockFetch = async (url, body = null, method = 'POST') => {
  let headers;

  const token = store.getState().auth.token;

  console.log('getting token', token);

  if (token) {
    headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
  } else {
    headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  const options = {
    method,
    headers,
    body: JSON.stringify(body),
  };

  return options;
};

class API {
  static async loginParentUser(username, password) {
    console.log('loginParentUser', username, password);
    await timeout(1000);
    await mockFetch(MOCK_ENDPOINT, {username, password});
    return {
      user: MOCK_USER,
      token: MOCK_JWT,
    };
  }
  static async loginChildUser(parentCode, dob) {
    console.log('loginChildUser', parentCode, dob);
    await timeout(1000);
    await mockFetch(MOCK_ENDPOINT, {username: parentCode, password: dob});
    return {
      user: MOCK_USER,
      token: MOCK_JWT,
    };
  }
  static async fetchDocuments() {
    console.log('fetchDocuments');
    await timeout(1000);
    await mockFetch(MOCK_ENDPOINT);
    return MOCK_DOCUMENTS;
  }
  static async fetchChildren() {
    console.log('fetchChildren');
    await timeout(1000);
    await mockFetch(MOCK_ENDPOINT);
    return MOCK_CHILDREN;
  }
}

export default API;
