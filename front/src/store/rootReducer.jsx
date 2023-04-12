import { combineReducers } from "redux"
import { category } from "./category"
import { user } from "./user"
import { chat } from "./chat"


export const rootReducer = combineReducers({
    category, user, chat
})