import {store} from 'reducers';

export const timeout = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const fetchWithToken = async (url, body = null, method = 'POST') => {
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

  return fetch(url, options);
};

export const mapDocumentTypeToIcon = (documentTypeId) => {
  return require('assets/image/aup_icon.png');
};

export const mapDocumentStatus = (has_responded, has_agreed) => {
  if (has_responded) {
    if (has_agreed) {
      return {statusText: 'Signed', statusColor: '#28A885'};
    } else {
      return {statusText: 'Denied', statusColor: '#E55151'};
    }
  }

  return {statusText: 'Pending', statusColor: '#E1AA4B'};
};
