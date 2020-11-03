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
const generateMockDocument = (
  title = 'Mock Document',
  body = 'This is the body of mock document',
) => ({
  title,
  body,
});
const MOCK_DOCUMENTS = [
  generateMockDocument(
    'Mock Document 1',
    'This is the body of mock document 1',
  ),
  generateMockDocument(
    'Mock Document 2',
    'This is the body of mock document 2',
  ),
  generateMockDocument(
    'Mock Document 3',
    'This is the body of mock document 3',
  ),
];
const generateMockChild = (
  firstName = 'Child',
  lastName = 'One',
  dob = new Date(),
) => ({
  first_name: firstName,
  last_name: lastName,
  dob,
});
const MOCK_CHILDREN = [
  generateMockChild('Child', 'One'),
  generateMockChild('Child', 'Two'),
];
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
      securityQuestion: true,
      tos: true,
    };
  }
  static async sendSMSOTP(phone) {
    console.log('sendSMSOTP', phone);
    await timeout(1000);
    await mockFetch(MOCK_ENDPOINT, {phone});
    return {};
  }
  static async checkSMSOTP(phone, code) {
    console.log('checkSMSOTP', phone, code);
    await timeout(1000);
    await mockFetch(MOCK_ENDPOINT, {phone, code});
    return {
      user: MOCK_USER,
      token: MOCK_JWT,
      securityQuestion: false,
      tos: false,
    };
  }
  static async sendEmailOTP(phone) {
    console.log('sendSMSOTP', phone);
    await timeout(1000);
    await mockFetch(MOCK_ENDPOINT, {phone});
    return {};
  }
  static async checkEmailOTP(email, code) {
    console.log('checkSMSOTP', email, code);
    await timeout(1000);
    await mockFetch(MOCK_ENDPOINT, {email, code});
    return {
      user: MOCK_USER,
      token: MOCK_JWT,
      securityQuestion: false,
      tos: false,
    };
  }
  static async loginChildUser(parentCode, dob) {
    console.log('loginChildUser', parentCode, dob);
    await timeout(1000);
    await mockFetch(MOCK_ENDPOINT, {parentCode, dob});
    return {
      user: MOCK_USER,
      token: MOCK_JWT,
    };
  }
  static async onboardChild(parentCode, dob) {
    console.log('signupChildUser', parentCode, dob);
    await timeout(1000);
    await mockFetch(MOCK_ENDPOINT, {parentCode, dob});
    return {
      user: MOCK_USER,
      token: MOCK_JWT,
      securityQuestion: false,
      tos: false,
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
