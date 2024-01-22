export const BASE_URL = 'https://nervous-jang.212-227-236-230.plesk.page/api/'; // with ssl
export const IMAGE_BASE_URL =
  'https://nervous-jang.212-227-236-230.plesk.page/uploads/images/'; // with ssl
export const SERVER_KEY = '';

export const API_END_POINTS = {
  // App settings
  API_APP_SETTING: `${BASE_URL}appsetting/list`,
  API_APP_CURRENCY_SETTING: `${BASE_URL}currency/get-admin-currency`,
  // USER Profile Section
  API_LOGIN: `${BASE_URL}appauth/app_login`,
  API_SIGN_UP: `${BASE_URL}appauth/app_signup`,
  API_SIGN_UP_TEST: {
    url: `${BASE_URL}appauth/app_signup`,
    type: 'POST',
    params: {name: '', email: '', phone: '', password: ''},
    data_type: 'raw/multipart',
  },
  API_GET_PROFILE: `${BASE_URL}appauth/app_getprofile`,
  API_UPDATE_USER_PROFILE: `${BASE_URL}appauth/app_user_update`,
  API_CHANGE_PASSWORD: `${BASE_URL}appauth/app_changepassword`,
  API_DELETE_USER: `${BASE_URL}appauth/delete_user`,

  // product api
  API_GET_PRODUCTS: `${BASE_URL}product/list`,
  API_PRODUCTS_CATEGORY: `${BASE_URL}product/category_list`,
  API_PRODUCTS_BY_CATEGORY_NAME: `${BASE_URL}product/category/`, // APPEND Category name
  API_GET_PRODUCTS_DETAILS: `${BASE_URL}product/show/`, // APPEND PRODUCT ID
  API_GET_SUB_CAT_BY_CAT_ID: `${BASE_URL}web/frontend/subcategory-by-category/`, // APPEND CATEGORY ID
  API_GET_PRODUCT_BY_SUB_CAT_BY_CAT_ID: `${BASE_URL}web/frontend/products/`, // APPEND CATEGORY ID AND ?subcategoryName={SUB_CAT_NAME}
  // Home Section
  API_HOME_BANNER: `${BASE_URL}home/banner`,
  //FLASH DEAL
  // API_FLASH_DEAL: `${BASE_URL}product/flashdeal_list`,
  API_FLASH_DEAL: `${BASE_URL}product/get-flashsale-detail`,
  API_FLASH_DEAL_PRODUCT_LIST: `${BASE_URL}product/flashsale_product_list`,

  // Search
  API_PRODUCT_SEARCH: `${BASE_URL}product/search/`, // append word in last
  // Favorite
  API_ADD_FAVORITE: `${BASE_URL}productfavorite/add_favorite_product`,
  API_FAVORITE_LIST: `${BASE_URL}productfavorite/fav_product_list`,
  // CART
  API_ADD_TO_CART: `${BASE_URL}productCart/add_to_cart`,
  API_INCREASE_CART_QTY: `${BASE_URL}productCart/increase_cart_qty`,
  API_DECREASE_CART_QTY: `${BASE_URL}productCart/decrease_cart_qty`,
  API_USER_CART_LIST: `${BASE_URL}productCart/list`,
  API_CART_REMOVE: `${BASE_URL}productCart/remove/`, // APPEND CART ID
  API_CART_ALL_EMPTY: `${BASE_URL}productCart/empty_all`,

  // COUPON
  API_GET_COUPON_LIST: `${BASE_URL}coupon/list`,

  // User Address
  API_ADD_USER_ADDRESS: `${BASE_URL}users/add_user_address`,
  API_UPDATE_USER_ADDRESS: `${BASE_URL}users/update-user-address`,
  API_USER_ADDRESS_LIST: `${BASE_URL}users/user_address_list`,
  API_USER_ADDRESS_REMOVE_BY_ID: `${BASE_URL}users/remove_user_address/`, // APPEND ID IN LAST

  //Notification
  API_USER_NOTIFICATION: `${BASE_URL}notification/notification_list`,
  // Privacy Policy / Terms and Conditions
  API_PRIVACY_POLICY: `${BASE_URL}privacyAndTerms/detail`,
  // Fcm Token
  API_FCM_DETAIL: `${BASE_URL}fcmToken/detail`,
  API_FCM_TOKEN_UPDATE: `${BASE_URL}fcmToken/update_fcm_token`,
  API_FCM_TOKEN_DELETE: `${BASE_URL}fcmToken/delete_fcm_token`,
  // Add Review / Rating
  API_ADD_PRODUCT_REVIEW: `${BASE_URL}ratingReview/add_ratingReview`,
  API_USER_PARTICULAR_PRODUCT_REVIEW_LIST: `${BASE_URL}ratingReview/detail/`, // APPEND PRODUCT ID IN LAST
  // Payment Method
  API_GET_PAYMENT_METHODS: `${BASE_URL}home/active_payment_method_list`,
  API_PAYMENT_GENERATE_BY_TOKEN: `${BASE_URL}user/payment/app_payment_generate_by_token`,
  API_USER_TRANSACTION_HISTORY: `${BASE_URL}user/payment/payment-history-list`,
  API_USER_TRANSACTION_HISTORY_DETAIL_BY_ID: `${BASE_URL}user/payment/payment-history/show/`, // APPEND  ID IN LAST
  // Create Order
  API_CREATE_ORDER: `${BASE_URL}order/create_order`,
  API_USER_ORDER_LIST: `${BASE_URL}order/order_list`,
  API_USER_ORDER_BY_ID: `${BASE_URL}order/show/`, // APPEND ORDER ID IN LAST
  // Privacy Policy / Terms and Conditions
  API_GET_PRIVACY_POLICY: `${BASE_URL}privacyAndTerms/detail`,
  //   Notification
  API_GET_USER_NOTIFICATION: `${BASE_URL}notification/notification_list`,
  API_UPDATE_NOTIFICATION: `${BASE_URL}notification/show/`, // APPEND  ID IN LAST
  API_USER_STRIPE: `${BASE_URL}user/payment/app_stripe_payment`,
  //   CANCEL ORDER
  API_USER_CANCEL_ORDER: `${BASE_URL}order/cancel/cancel_order`,
  // RETURN
  API_USER_RETURN_ORDER: `${BASE_URL}order/return/create`,
  API_USER_RETURN_LIST: `${BASE_URL}order/return/list`,
  API_USER_RETURN_DETAILS_BY_ID: `${BASE_URL}order/return/show/`, // APPEND  ID IN LAST
  // REFUND LIST
  API_GET_USER_REFUND_LIST: `${BASE_URL}order/refund/list`,
  API_GET_REFUND_DETAILS_BY_ID: `${BASE_URL}order/refund/show/`, // APPEND  ID IN LAST
  // review
  API_WRITE_REVIEW_PRODUCT: `${BASE_URL}ratingReview/create`,
  API_GET_REVIEW_PRODUCT: `${BASE_URL}ratingReview/order-review`,

  // GET PRODUCT QUERY
  API_GET_PRODUCT_QUERY_BY_ID: `${BASE_URL}ecomapp/user/productquery/list/`, // APPEND PRODUCT ID IN LAST
  API_CREATE_PRODUCT_QUERY_BY_ID: `${BASE_URL}ecomapp/user/productquery/create`,
};

export const API_TYPE = {
  POST: 'post',
  GET: 'get',
};
