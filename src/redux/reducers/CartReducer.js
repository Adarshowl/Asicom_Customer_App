import {CART_PRODUCTS, COUPON_ITEM} from '../type';

const initialState = {
  cartProductData: [],
  couponItem: {},
  error: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_PRODUCTS:
      return {
        ...state,
        cartProductData: action.payload,
      };
    case COUPON_ITEM:
      return {
        ...state,
        couponItem: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
