import {actions} from 'util/actions';

/* Auth */
export const loginAdult = (username, password) => ({
  type: actions.LOGIN_ADULT_ASYNC,
  username,
  password,
});

export const loginChild = (parentCode, dob) => ({
  type: actions.LOGIN_CHILD_ASYNC,
  parentCode,
  dob,
});

export const sendVerificationCode = (method, address) => ({
  type: actions.SEND_VERIFICATION_CODE_ASYNC,
  method,
  address,
});

export const signupAdult = (method, code) => ({
  type: actions.SIGNUP_ADULT_ASYNC,
  method,
  code,
});

export const signupChild = (parentCode, dob) => ({
  type: actions.SIGNUP_CHILD_ASYNC,
  parentCode,
  dob,
});

export const resetPassword = (email) => ({
  type: actions.RESET_PASSWORD_ASYNC,
  email,
});
export const forgetPassword = (email) => ({
  type: actions.FORGET_PASSWORD_ASYNC,
  email,
});

export const fetchSecurityQuestion = (email) => ({
  type: actions.FETCH_SECURITY_QUESTION_ASYNC,
  email,
});
export const submitSecurityQuestion = (email, sqid, answer) => ({
  type: actions.SUMIT_ECURITY_QUESTION_ASYNC,
  email,
  sqid,
  answer,
});
/* User */
export const changeProfile = (profile) => ({
  types: actions.CHANGE_PROFILE_ASYNC,
  profile,
});

/* Documents */
export const fetchDocuments = () => ({
  type: actions.FETCH_DOCUMENTS_ASYNC,
});

export const fetchDocument = (documentId) => ({
  type: actions.FETCH_DOCUMENT_ASYNC,
  documentId,
});
export const signDocument = (documentId) => ({
  type: actions.SIGN_DOCUMENT_ASYNC,
  documentId,
});
export const finishDocumentVideo = (documentId) => ({
  type: actions.FINISH_DOCUMENT_VIDEO_ASYNC,
  documentId,
});
export const submitDocumentQuestions = (documentId, answers) => ({
  type: actions.SUBMIT_DOCUMENT_QUESTIONS_ASYNC,
  documentId,
  answers,
});
export const searchDocuments = (query) => ({
  type: actions.SEARCH_DOCUMENTS_ASYNC,
  query,
});

/* Children */
export const fetchChildren = () => ({
  type: actions.FETCH_CHILDREN_AYSNC,
});
