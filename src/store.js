import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import auth from "./components/Shared/AuthReducer";

const defaultState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({ auth });

const store = createStore(
  reducers,
  defaultState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
