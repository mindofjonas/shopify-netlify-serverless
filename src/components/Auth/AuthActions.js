import { createAction } from "dead-simple-redux-helper";
import axios from "axios";

export const AUTHENTICATION_REQUEST = "AUTHENTICATION_REQUEST";
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS";
export const AUTHENTICATION_FAILURE = "AUTHENTICATION_FAILURE";
export const authenticationRequest = createAction(AUTHENTICATION_REQUEST);
export const authenticationSuccess = createAction(AUTHENTICATION_SUCCESS);
export const authenticationFailure = createAction(AUTHENTICATION_FAILURE);

export function authenticateShop() {
  return function(dispatch) {
    dispatch(authenticationRequest());
    axios("/.netlify/functions/verify-token")
      .then(response => {
        response.data.authenticated
          ? dispatch(authenticationSuccess(response.data.shop))
          : dispatch(authenticationFailure());
      })
      .catch(error => dispatch(authenticationFailure()));
  };
}
