import { USER_LOGIN, USER_LOGOUT, USER_REQUEST_ERROR, USER_INFO_SAVE, USER_INFO_REMOVE } from "./types"

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

export const saveUserInfo = (userid, userpw) => ({
  type: USER_INFO_SAVE,
  payload: {
    userid,
    userpw
  }
})

export const removeUserInfo = () => ({
  type: USER_INFO_REMOVE,
})