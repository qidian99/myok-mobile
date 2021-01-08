import {store} from 'reducers';
import {timeout} from './general';
import moment from 'moment';
import Chance from 'chance';

const chance = new Chance();

export const MOCK_ENDPOINT = 'http://localhost:8886/api/myok';
export const MOCK_JWT =
  'eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0';
export const MOCK_USER = {
  first_name: 'First',
  last_name: 'Last',
  email: 'test@isafeventures.com',
  username: 'test@isafeventures.com',
};
export const generateMockChild = (
  firstName = 'Child',
  lastName = 'One',
  dob = '04/18/2007',
  parentCode = 'empty001',
) => ({
  student_id: '_' + Math.random().toString(36).substr(2, 9),
  first_name: firstName,
  last_name: lastName,
  parent_code: parentCode,
  dob,
  organization: 'Del Mar Union',
  grade: 2,
});
export const MOCK_CHILDREN = [
  generateMockChild('Susanna', 'Bryant', '04/18/2007', 'lightning436'),
  generateMockChild('Mark', 'Bryant', '04/18/2007', 'chair831'),
];
export const generateMockDocument = (
  title = 'Mock Document',
  body = 'This is the body of mock document',
) => ({
  title,
  body,
  document_id: '_' + Math.random().toString(36).substr(2, 9),
  document_type_id: 1,
  inserted: 'October 15, 2020',
  has_responded: Math.random() >= 0.5,
  has_agreed: Math.random() >= 0.5,
  ...generateMockChild('Susanna', 'Bryant', '04/18/2007', 'lightning436'),
});
export const MOCK_DOCUMENTS = [
  generateMockDocument(
    'Acceptable Use Policy Agreement',
    'This is the body of mock document 1',
  ),
  generateMockDocument(
    'Zoo Field Trip Period 5',
    'This is the body of mock document 2',
  ),
  generateMockDocument(
    'Google Apps and Education',
    'This is the body of mock document 3',
  ),
];

let announcementId = 0;

export const generateMockAnnouncement = () => ({
  id: announcementId++,
  title: chance.sentence({words: chance.integer({min: 2, max: 5})}),
  body: chance.paragraph({sentences: chance.integer({min: 1, max: 5})}),
  date: moment()
    .subtract(chance.integer({min: 0, max: 10}), 'days')
    .format(),
});

export const MOCK_ANNOUNCEMENTS = Array(7)
  .fill(null)
  .map((_) => generateMockAnnouncement());

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
  /* Auth */
  static async loginAdult(username, password) {
    console.log('loginAdult', username, password);
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
  static async forgetPassword(email) {
    console.log('forgetPassword', email);
    await timeout(1000);
    await mockFetch(MOCK_ENDPOINT, {email});
    return;
  }
  static async resetPassword(email) {
    console.log('resetPassword', email);
    await timeout(1000);
    await mockFetch(MOCK_ENDPOINT, {email});
    return;
  }
  static async fetchSecurityQuestion(email) {
    console.log('fetchSecurityQuestion', email);
    await timeout(1000);
    await mockFetch(MOCK_ENDPOINT, {email});
    return;
  }
  static async submitSecurityQuestion(email, sqid, answer) {
    console.log('submitSecurityQuestion', email, sqid, answer);
    await timeout(1000);
    await mockFetch(MOCK_ENDPOINT, {email, sqid, answer});
    return;
  }
  /* User */
  static async changeProfile(profile) {
    console.log('changeProfile', profile);
    await timeout(1000);
    await mockFetch(MOCK_ENDPOINT, {profile});
    return MOCK_USER;
  }

  /* Documents */
  static async fetchDocuments() {
    console.log('fetchDocuments');
    await timeout(1000);
    await mockFetch(MOCK_ENDPOINT);
    return MOCK_DOCUMENTS;
  }

  static async fetchDocument(documentId) {
    console.log('fetchDocument', documentId);
    await timeout(1000);
    await mockFetch(MOCK_ENDPOINT);
    return generateMockDocument();
  }
  static async signDocument(documentId) {
    console.log('signDocument', documentId);
    await timeout(1000);
    await mockFetch(MOCK_ENDPOINT);
    return generateMockDocument();
  }
  static async finishDocumentVideo(documentId) {
    console.log('finishDocumentVideo', documentId);
    await timeout(1000);
    await mockFetch(MOCK_ENDPOINT);
    return generateMockDocument();
  }
  static async submitDocumentQuestions(documentId, answers) {
    console.log('submitDocumentQuestions', documentId, answers);
    await timeout(1000);
    await mockFetch(MOCK_ENDPOINT, {answers});
    return generateMockDocument();
  }
  static async searchDocuments(query) {
    console.log('searchDocuments', query);
    await timeout(1000);
    await mockFetch(MOCK_ENDPOINT, {query});
    return [generateMockDocument()];
  }

  /* Children */
  static async fetchChildren() {
    console.log('fetchChildren');
    await timeout(1000);
    await mockFetch(MOCK_ENDPOINT);
    return MOCK_CHILDREN;
  }

  /* Announcement */
  static async fetchAnnoucements() {
    console.log('fetchAnnoucements', MOCK_ANNOUNCEMENTS);
    await timeout(10000);
    await mockFetch(MOCK_ENDPOINT);
    return MOCK_ANNOUNCEMENTS;
  }
}

export default API;
