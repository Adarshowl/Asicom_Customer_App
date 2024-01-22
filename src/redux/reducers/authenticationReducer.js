import {LOGIN} from '../type';

const initialState = {
  count: 0,
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      const m = {
        ...state,
        count: state.count + 1,
      };
      return m;

    default:
      return state;
  }
};

export default authenticationReducer;
