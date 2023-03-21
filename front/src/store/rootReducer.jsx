import { combineReducers } from "redux"
import { category } from "./category"
import { user } from "./user"


export const rootReducer = combineReducers({
    category, user
})