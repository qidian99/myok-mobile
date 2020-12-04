import {Dimensions, Platform} from 'react-native';
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

const PENDING_COLOR = '#E1AA4B';
const DENIED_COLOR = '#E55151';
const SIGNED_COLOR = '#28A885';
const EXPIRED_COLOR = '#A8A8A8';

export const mapDocumentStatus = (has_responded, has_agreed) => {
  if (has_responded) {
    if (has_agreed) {
      return {statusText: 'Signed', statusColor: SIGNED_COLOR};
    } else {
      return {statusText: 'Denied', statusColor: DENIED_COLOR};
    }
  }

  return {statusText: 'Pending', statusColor: PENDING_COLOR};
};
export const isAndroid = Platform.OS === 'android';

export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;
