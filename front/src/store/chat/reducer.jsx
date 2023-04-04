import {
  // USER_LOGIN,
} from "./types";

const initialState = {
  isLoading: true,
  isError: null,
};

export const chat = (state = initialState, action) => {
  switch (action.type) {
    // case USER_LOGIN:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     isLogin: action.payload.isLogin,
    //     user: action.payload.user,
    //   };
    default:
      return state;
  }
};
