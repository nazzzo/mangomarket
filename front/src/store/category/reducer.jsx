import {
  CATEGORY_REQUEST_START,
  CATEGORY_REQUEST_SUCCESS,
  CATEGORY_REQUEST_ERROR,
} from "./types";


const initialState = {
  isLoading: true,
  isError: null,
  data: [],
};

export const category = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_REQUEST_START:
      return { ...state, isLoading: true, isError: null };
    case CATEGORY_REQUEST_SUCCESS:
      return { ...state, isLoading: false, isError: null, data: action.payload };
    case CATEGORY_REQUEST_ERROR:
      return { ...state, isLoading: false, isError: action.payload.message };
    default:
      return state;
  }
};
