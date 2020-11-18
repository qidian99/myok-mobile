import {store} from 'reducers';
import CookieManager from 'react-native-cookies';
import AsyncStorage from '@react-native-community/async-storage';

import {timeout} from './general';
import {
  MOCK_ENDPOINT,
  MOCK_JWT,
  MOCK_USER,
  generateMockChild,
  MOCK_CHILDREN,
  generateMockDocument,
  MOCK_DOCUMENTS,
} from './mock';
const ENDPOINT = 'http://localhost:8886/api/v1/';

const authorizedFetch = async (url, body = null, method = 'POST') => {
  let headers;

  const token = store.getState().auth.token;
  console.log('getting token', token);

  await CookieManager.clearAll();
  const cookie = await AsyncStorage.getItem('cookie');
  console.log('getting cookie', cookie);

  if (token) {
    headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      cookie,
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
  /* Auth */
  static async loginParentUser(username, password) {
    console.log('loginParentUser', username, password);
    await timeout(1000);
    await authorizedFetch(ENDPOINT, {username, password});
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
    await authorizedFetch(ENDPOINT, {phone});
    return {};
  }
  static async checkSMSOTP(phone, code) {
    console.log('checkSMSOTP', phone, code);
    await timeout(1000);
    await authorizedFetch(ENDPOINT, {phone, code});
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
    await authorizedFetch(ENDPOINT, {phone});
    return {};
  }
  static async checkEmailOTP(email, code) {
    console.log('checkSMSOTP', email, code);
    await timeout(1000);
    await authorizedFetch(ENDPOINT, {email, code});
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
    await authorizedFetch(ENDPOINT, {parentCode, dob});
    return {
      user: MOCK_USER,
      token: MOCK_JWT,
    };
  }
  static async onboardChild(parentCode, dob) {
    console.log('signupChildUser', parentCode, dob);
    await timeout(1000);
    await authorizedFetch(ENDPOINT, {parentCode, dob});
    return {
      user: MOCK_USER,
      token: MOCK_JWT,
      securityQuestion: false,
      tos: false,
    };
  }
  static async forgetPassword(email) {
    console.log('forgetPassword', email);
    await timeout(1000);
    await authorizedFetch(ENDPOINT, {email});
    return;
  }
  static async resetPassword(email) {
    console.log('resetPassword', email);
    await timeout(1000);
    await authorizedFetch(ENDPOINT, {email});
    return;
  }
  static async fetchSecurityQuestion(email) {
    console.log('fetchSecurityQuestion', email);
    await timeout(1000);
    await authorizedFetch(ENDPOINT, {email});
    return;
  }
  static async submitSecurityQuestion(email, sqid, answer) {
    console.log('submitSecurityQuestion', email, sqid, answer);
    await timeout(1000);
    await authorizedFetch(ENDPOINT, {email, sqid, answer});
    return;
  }
  /* User */
  static async changeProfile(profile) {
    console.log('changeProfile', profile);
    await timeout(1000);
    await authorizedFetch(ENDPOINT, {profile});
    return MOCK_USER;
  }

  /* Documents */
  static async fetchDocuments() {
    console.log('fetchDocuments');
    await timeout(1000);
    await authorizedFetch(ENDPOINT);
    return MOCK_DOCUMENTS;
  }

  static async fetchDocument(documentId) {
    console.log('fetchDocument', documentId);
    await timeout(1000);
    await authorizedFetch(ENDPOINT);
    return generateMockDocument();
  }
  static async signDocument(documentId) {
    console.log('signDocument', documentId);
    await timeout(1000);
    await authorizedFetch(ENDPOINT);
    return generateMockDocument();
  }
  static async finishDocumentVideo(documentId) {
    console.log('finishDocumentVideo', documentId);
    await timeout(1000);
    await authorizedFetch(ENDPOINT);
    return generateMockDocument();
  }
  static async submitDocumentQuestions(documentId, answers) {
    console.log('submitDocumentQuestions', documentId, answers);
    await timeout(1000);
    await authorizedFetch(ENDPOINT, {answers});
    return generateMockDocument();
  }
  static async searchDocuments(query) {
    console.log('searchDocuments', query);
    await timeout(1000);
    await authorizedFetch(ENDPOINT, {query});
    return [generateMockDocument()];
  }

  /* Children */
  static async fetchChildren() {
    console.log('fetchChildren');
    await timeout(1000);
    await authorizedFetch(ENDPOINT);
    return MOCK_CHILDREN;
  }
}

export default API;
