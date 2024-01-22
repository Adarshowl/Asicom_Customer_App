import {
  APP_COLOR,
  LOGIN,
  SHOW_LOADER,
  USER_DATA,
  USER_IMAGE,
  USER_TOKEN,
} from '../type';

export const showProgressBar = data => ({
  type: SHOW_LOADER,
  payload: data,
});

export const showSnackBar = data => ({
  type: SHOW_LOADER,
  payload: data,
});

export const snackBarMsg = data => ({
  type: SHOW_LOADER,
  payload: data,
});

export function loginUserSuccess(payload) {
  return {
    type: USER_DATA,
    payload: payload,
  };
}

export function userTokenSuccess(payload) {
  return {
    type: USER_TOKEN,
    payload: payload,
  };
}

export function changeAppColor(payload) {
  return {
    type: APP_COLOR,
    payload: payload,
  };
}

export function registerUserSuccess(payload) {
  return {
    type: USER_DATA,
    payload: payload,
  };
}

export function fetchUserInfoSuccess(payload) {
  return {
    type: USER_DATA,
    payload: payload,
  };
}

export function updateLoginCount(payload) {
  return {
    type: LOGIN,
    payload: payload,
  };
}

export function updateImage(payload) {
  return {
    type: USER_IMAGE,
    payload: payload,
  };
}
