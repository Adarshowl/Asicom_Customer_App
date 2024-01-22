import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import Reducer from '../reducers';
import homeReducer from '../reducers/HomeReducer';
import cartReducer from '../reducers/CartReducer';

const rootReducer = combineReducers({
  // authenticationReducer,
  // userInfoReducer,
  state: Reducer,
  homeReducer: homeReducer,
  cartReducer: cartReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
