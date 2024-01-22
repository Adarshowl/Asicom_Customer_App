export const SAVE_PRODUCT_TO_CART = 'save_product_to_cart';
export const SAVE_PRODUCT_FAVORITE = 'save_offer';
export const SAVE_IMAGE = 'save_image';
export const APP_IMAGE = 'app_image';

export const SaveCartSchema = {
  name: SAVE_PRODUCT_TO_CART,
  properties: {
    id: 'string',
    listID: 'string',
    amount: 'string',
    quantity: 'string',
    color: 'string',
    size: 'string',
    product_name: 'string',
    thumbnail_image: 'string',
    original_amount: 'string',
    original_quantity: 'string',
    sold: 'string',
  },
  primaryKey: 'id',
};

export const SaveOfferSchema = {
  name: SAVE_PRODUCT_FAVORITE,
  properties: {
    id: 'string',
    _id: 'string',
    listID: 'string',
    product_name: 'string',
    amount: 'string',
    thumbnail_image: 'string',
    fav: 'bool',
  },
  primaryKey: 'id',
};

export const SaveImageSchema = {
  name: SAVE_IMAGE,
  properties: {
    id: 'string',
    image: 'string',
  },
  primaryKey: 'id',
};

export const SaveAppImageSchema = {
  name: APP_IMAGE,
  properties: {
    id: 'string',
    image: 'string',
  },
  primaryKey: 'id',
};
