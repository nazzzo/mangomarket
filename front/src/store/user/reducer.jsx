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
  USER_SET_ALARM,
  USER_SET_SEARCH,
  USER_SET_RESERVATION,
} from "./types";

const initialState = {
  isLoading: true,
  isError: null,
  isLogin: false,
  isAlarm: false,
  user: {
    email: "",
    username: "",
    userImg: "",
    address: "",
    level: "",
  },
  auth: {
    email: "",
    userpw: "",
  },
  like: {
    email: "",
    boardid: "",
  },
  search: "",
  keyword: [],
  reservation: {},
  chats: [],
};

export const user = (state = initialState, action) => {
  // console.log(`action:::`, action)
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLoading: false,
        isLogin: action.payload.isLogin,
        user: action.payload.user,
      };
    case USER_LOGOUT:
      return {
        ...state,
        isLoading: false,
        isLogin: false,
        user: {
          email: "",
          username: "",
          userImg: "",
          address: "",
          level: "",
        },
      };
    case USER_REQUEST_ERROR:
      return { ...state, isLoading: false, isError: action.payload.message };
    case USER_IMAGE_UPLOAD:
      return { ...state, user: { userImg: action.payload } };
    case USER_INFO_SAVE:
      return {
        ...state,
        auth: action.payload,
      };
    case USER_INFO_REMOVE:
      return {
        ...state,
        auth: {
          email: "",
          userpw: "",
          userImg: "",
          address: "",
          level: "",
        },
      };
    case USER_LIKE_ADD:
      return {
        ...state,
        like: action.payload,
      };
    case USER_LIKE_REMOVE:
      return {
        ...state,
        like: {
          email: "",
          boardid: "",
        },
      };
    case USER_KEYWORD_ADD:
      return {
        ...state,
        keyword: [...state.keyword, ...action.payload],
      };
    case USER_KEYWORD_REMOVE:
      return {
        ...state,
        keyword: [...action.payload],
      };
    case USER_SET_ALARM:
      return {
        ...state,
        isAlarm: action.payload,
      };
    case USER_SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };  
    case USER_SET_RESERVATION:
      return {
        ...state,
        reservation: action.payload,
      };
    default:
      return state;
  }
};
