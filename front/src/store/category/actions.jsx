import {
  CATEGORY_REQUEST_START,
  CATEGORY_REQUEST_SUCCESS,
  CATEGORY_REQUEST_ERROR,
} from "./types";
import request from "../../utils/request";

export const RequestSuccess = (payload) => ({
  type: CATEGORY_REQUEST_SUCCESS,
  payload,
});

export const RequestError = (payload) => ({
  type: CATEGORY_REQUEST_ERROR,
  payload,
});

export const CategoryRequest = (props) => {
  return async (dispatch) => {
    dispatch({ type: CATEGORY_REQUEST_START });
    try {
      const response = await request.get("/categories");
      console.log(response.data);
      dispatch(RequestSuccess(response.data));
    } catch (e) {
      dispatch(RequestError(e));
    }
  };
};
