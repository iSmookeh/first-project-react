import { createStore, applyMiddleware, combineReducers} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";

//reducers
import auth from "modules/auth/redux/auth/auth.reducer";
export const getToken = () => localStorage.getItem("token_ecommerce");
export const rootReducer = combineReducers({auth}) 

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    /* "auth" */
  ],
  whitelist: [
    `auth`
  ]
};

const middleware = [];

if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer, applyMiddleware(...middleware));
let persistor = persistStore(store);

export { store, persistor };
