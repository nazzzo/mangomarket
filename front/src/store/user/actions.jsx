import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_REQUEST_ERROR,
  USER_IMAGE_UPLOAD,
  USER_INFO_SAVE,
  USER_INFO_REMOVE,
  USER_LIKE_ADD,
  USER_LIKE_REMOVE,
  USER_KEYWORD_ADD,
  USER_KEYWORD_REMOVE,
} from "./types";

export const userLogin = (isLogin, user) => ({
  type: USER_LOGIN,
  payload: {
    isLogin,
    user,
  },
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});

export const userRequestError = (payload) => ({
  type: USER_REQUEST_ERROR,
  payload,
});

export const userImageUpload = (payload) => ({
  type: USER_IMAGE_UPLOAD,
  payload,
});

export const userLikeAdd = (payload) => ({
  type: USER_LIKE_ADD,
  payload,
});
export const userLikeRemove = (payload) => ({
  type: USER_LIKE_REMOVE,
  payload,
});


export const userKeywordAdd = (data) => ({
  type: USER_KEYWORD_ADD,
  payload: data,
});
export const userKeywordRemove = (data) => ({
  type: USER_KEYWORD_REMOVE,
  payload: data,
});


export const saveUserInfo = (email, userpw) => ({
  type: USER_INFO_SAVE,
  payload: {
    email,
    userpw,
  },
});
export const removeUserInfo = () => ({
  type: USER_INFO_REMOVE,
});

