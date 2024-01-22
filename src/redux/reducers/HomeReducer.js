import {CART_LENGTH, HOME_BANNER, HOME_PRODUCTS, ITEM_CATEGORY} from '../type';

const initialState = {
  data: [],
  productData: [],
  categoryData: [],
  allCategoryData: [],
  cartDataLength: 0,
  error: false,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOME_BANNER:
      const m = {
        ...state,
        data: action.payload,
      };
      return m;
    case HOME_PRODUCTS:
      return {
        ...state,
        productData: action.payload,
      };

    case CART_LENGTH:
      return {
        ...state,
        cartDataLength: action.payload,
      };
    case ITEM_CATEGORY:
      return {
        ...state,
        categoryData: action.payload,
        allCategoryData: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducer;
