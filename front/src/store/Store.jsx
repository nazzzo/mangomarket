import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"


const persistConfig = {
  key: 'root',
  // 세션 or 로컬 스토리지
  storage: storage,
  whitelist:['user']
}

// 첫번째 인자는 config 객체, 두번째 인자는 reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

const enhancer =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(thunk)
    : composeWithDevTools(applyMiddleware(thunk));

export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store)
