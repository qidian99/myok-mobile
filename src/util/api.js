import {store} from 'reducers';
import CookieManager from '@react-native-community/cookies';
import AsyncStorage from '@react-native-community/async-storage';
import {DRUPAL_USER, DRUPAL_PASSWORD, API_ENDPOINT, API_VERSION} from '@env';
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
import moment from 'moment';
import setCookieParser from 'set-cookie-parser';
import {ApiError} from './error';

const RESPONSE_CODE = {
  UNAUTHORIZED: 401,
  ACESS_DENIED: 403,
};

const CSRF_ERROR_MSG = 'CSRF validation failed';

const API_V = API_ENDPOINT + '/' + API_VERSION;
const LOGIN_ENDPOINT = API_ENDPOINT + '/user/login';
const VERIFICATION_ENDPOINT = API_V + '/verification';

const parseSetCookie = (response) => {
  const combinedCookieHeader = response.headers.get('Set-Cookie');
  if (!combinedCookieHeader) {
    return {};
  }
  const splitCookieHeaders = setCookieParser.splitCookiesString(
    combinedCookieHeader,
  );
  const setCookies = setCookieParser.parse(splitCookieHeaders);

  let setCookie = {cookie: combinedCookieHeader};

  let expires;
  setCookies.forEach((c) => {
    console.log(c);
    const {expires: e} = c;
    if (!expires) {
      expires = e;
      return;
    }
    expires = moment(expires) < moment(e) ? expires : e;
  });

  setCookie.expires = expires;
  return setCookie;
};

const authorizedFetch = async (url, body = null, method = 'POST') => {
  let headers;
  await CookieManager.clearAll();
  const test = await CookieManager.getAll();
  console.log({test});

  const {token, cookie, expires} = store.getState().auth;

  if (token && cookie && moment(expires) > moment()) {
    headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-CSRF-Token': token,
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

  console.log(url, options);
  const response = await fetch(url, options);
  const responsePaylod = await response.json();

  const setCookie = parseSetCookie(response);
  const {status, headers: responseHeaders} = response;
  console.log(responseHeaders, responseHeaders.get('set-cookie'));

  if (
    status === RESPONSE_CODE.ACESS_DENIED ||
    status === RESPONSE_CODE.UNAUTHORIZED
  ) {
    throw new ApiError(
      'Authentication error: ' + getErrorMessgage(responsePaylod),
    );
  }

  return {...responsePaylod, ...setCookie};
};
const getErrorMessgage = (res) => {
  if (Array.isArray(res)) {
    return res[0];
  }

  return res;
};

class API {
  /* Auth */
  static async loginAdult(username, password) {
    console.log('loginAdult', username, password);
    const loginResponsePaylod = await authorizedFetch(LOGIN_ENDPOINT, {
      username,
      password,
    });

    await CookieManager.clearAll();
    return loginResponsePaylod;
    // return {
    //   user: MOCK_USER,
    //   token: MOCK_JWT,
    //   securityQuestion: true,
    //   tos: true,
    // };
  }
  static async sendSMSOTP(phone) {
    console.log('sendSMSOTP', phone);
    await authorizedFetch(VERIFICATION_ENDPOINT, {email: 1, mobile: 1});
    return {};
  }
  static async checkSMSOTP(phone, code) {
    console.log('checkSMSOTP', phone, code);
    await timeout(1000);
    await authorizedFetch(API_ENDPOINT, {phone, code});
    return {
      user: MOCK_USER,
      token: MOCK_JWT,
      securityQuestion: false,
      tos: false,
    };
  }
  static async sendEmailOTP(email) {
    console.log('sendEmailOTP', email);
    const otpReponsePayload = await authorizedFetch(VERIFICATION_ENDPOINT, {
      email: 1,
      mobile: 1,
    });
    console.log(otpReponsePayload);
    return {};
  }
  static async checkEmailOTP(email, code) {
    console.log('checkSMSOTP', email, code);
    await timeout(1000);
    await authorizedFetch(API_ENDPOINT, {email, code});
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
    await authorizedFetch(API_ENDPOINT, {parentCode, dob});
    return {
      user: MOCK_USER,
      token: MOCK_JWT,
    };
  }
  static async onboardChild(parentCode, dob) {
    console.log('signupChildUser', parentCode, dob);
    await timeout(1000);
    await authorizedFetch(API_ENDPOINT, {parentCode, dob});
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
    await authorizedFetch(API_ENDPOINT, {email});
    return;
  }
  static async resetPassword(email) {
    console.log('resetPassword', email);
    await timeout(1000);
    await authorizedFetch(API_ENDPOINT, {email});
    return;
  }
  static async fetchSecurityQuestion(email) {
    console.log('fetchSecurityQuestion', email);
    await timeout(1000);
    await authorizedFetch(API_ENDPOINT, {email});
    return;
  }
  static async submitSecurityQuestion(email, sqid, answer) {
    console.log('submitSecurityQuestion', email, sqid, answer);
    await timeout(1000);
    await authorizedFetch(API_ENDPOINT, {email, sqid, answer});
    return;
  }
  /* User */
  static async changeProfile(profile) {
    console.log('changeProfile', profile);
    await timeout(1000);
    await authorizedFetch(API_ENDPOINT, {profile});
    return MOCK_USER;
  }

  /* Documents */
  static async fetchDocuments() {
    console.log('fetchDocuments');
    await timeout(1000);
    await authorizedFetch(API_ENDPOINT);
    return MOCK_DOCUMENTS;
  }

  static async fetchDocument(documentId) {
    console.log('fetchDocument', documentId);
    await timeout(1000);
    await authorizedFetch(API_ENDPOINT);
    return generateMockDocument();
  }
  static async signDocument(documentId) {
    console.log('signDocument', documentId);
    await timeout(1000);
    await authorizedFetch(API_ENDPOINT);
    return generateMockDocument();
  }
  static async finishDocumentVideo(documentId) {
    console.log('finishDocumentVideo', documentId);
    await timeout(1000);
    await authorizedFetch(API_ENDPOINT);
    return generateMockDocument();
  }
  static async submitDocumentQuestions(documentId, answers) {
    console.log('submitDocumentQuestions', documentId, answers);
    await timeout(1000);
    await authorizedFetch(API_ENDPOINT, {answers});
    return generateMockDocument();
  }
  static async searchDocuments(query) {
    console.log('searchDocuments', query);
    await timeout(1000);
    await authorizedFetch(API_ENDPOINT, {query});
    return [generateMockDocument()];
  }

  /* Children */
  static async fetchChildren() {
    console.log('fetchChildren');
    await timeout(1000);
    await authorizedFetch(API_ENDPOINT);
    return MOCK_CHILDREN;
  }
}

export default API;
