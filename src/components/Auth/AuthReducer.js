import { createReducer } from "dead-simple-redux-helper";
import * as types from "./AuthActions";

const initialState = {
  authenticated: false,
  loading: false,
  shop: null
};

const auth = createReducer(initialState, {
  [types.AUTHENTICATION_REQUEST](state) {
    return { ...state, loading: true };
  },
  [types.AUTHENTICATION_SUCCESS](state, payload) {
    return { ...state, authenticated: true, shop: payload, loading: false };
  },
  [types.AUTHENTICATION_FAILURE](state) {
    return { ...state, authenticated: false, shop: null, loading: false };
  }
});

export default auth;
