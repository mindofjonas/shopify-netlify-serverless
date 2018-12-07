import { createReducer } from "dead-simple-redux-helper";
//import * as types from "./AuthActions";

const initialState = {
  shop: null
};

const auth = createReducer(initialState, {});

export default auth;
