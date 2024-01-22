// IMPORT ALL CONSTANT STRINGS DEFINED IN action file == ../actions/Camp.js
import {
  APP_COLOR,
  LOGIN,
  SHOW_LOADER,
  SHOW_SNACK,
  SNACK_MESSAGE,
  USER_DATA,
  USER_IMAGE,
  USER_TOKEN,
} from '../type';

const initialState = {
  userData: {},
  loading: false,
  showSnack: false,
  snackMessage: '',
  userToken: '',
  userImage: '',
  appColor: '',
  count: 0,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case USER_TOKEN:
      return {
        ...state,
        userToken: action.payload,
      };
    case APP_COLOR:
      return {
        ...state,
        appColor: action.payload,
      };
    case USER_IMAGE:
      return {
        ...state,
        userImage: action.payload,
      };
    case SHOW_LOADER:
      return {
        ...state,
        loading: action.payload,
      };
    case SHOW_SNACK:
      return {
        ...state,
        showSnack: action.payload,
      };
    case SNACK_MESSAGE:
      return {
        ...state,
        snackMessage: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
};
export default Reducer;
