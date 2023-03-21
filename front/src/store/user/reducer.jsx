import { USER_LOGIN, USER_LOGOUT, USER_REQUEST_ERROR, USER_INFO_SAVE, USER_INFO_REMOVE } from "./types";

const initialState = {
  isLoading: true,
  isError: null,
  isLogin: false,
  user: {
    email: "",
    username: "",
  },
  auth: {
    email: "",
    userpw: "",
  },
};

export const user = (state = initialState, action) => {
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
        user: { email: "", username: "" },
      };
    case USER_REQUEST_ERROR:
      return { ...state, isLoading: false, isError: action.payload.message };
      case USER_INFO_SAVE:
        return {
          ...state,
          auth: action.payload,
        };
      case USER_INFO_REMOVE:
        return {
          ...state,
          auth: { email: "", userpw: "" },
        };
    default:
      return state;
  }
};
