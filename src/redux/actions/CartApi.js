import ApiCall from '../../network/ApiCall';
import {
  API_END_POINTS,
  API_TYPE,
  IMAGE_BASE_URL,
} from '../../network/ApiEndPoints';
import {CART_PRODUCTS, COUPON_ITEM} from '../type';
import {ShowConsoleLogMessage} from '../../utils/Utility';
import {
  clearRealm,
  doSaveOfferOfflineRealm,
  isProductSavedFavorite,
} from '../../utils/RealmUtility';
import {
  loginUserSuccess,
  showProgressBar,
  updateLoginCount,
  userTokenSuccess,
} from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export async function removeProductFromCart(
  dispatch,
  navigation,
  apiToken,
  cartId,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_CART_REMOVE + cartId,
      {
        'x-access-token': apiToken,
      },
    );
    // ShowConsoleLogMessage(JSON.stringify(response));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        successCallBack(response?.data);
      } else {
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function emptyCartInOneShot(
  dispatch,
  navigation,
  apiToken,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_CART_ALL_EMPTY,
      {
        'x-access-token': apiToken,
      },
    );
    // ShowConsoleLogMessage(JSON.stringify(response));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        successCallBack(response?.data);
      } else {
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function addToFavoriteMultipleProduct(
  dispatch,
  navigation,
  apiToken,
  productArray,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  productArray?.map(async item => {
    try {
      const body = {
        product_id: item?.listID,
      };
      console.log(body, ' ---------------');
      const response = await ApiCall(
        API_TYPE.POST,
        body,
        API_END_POINTS.API_ADD_FAVORITE,
        {
          'x-access-token': apiToken,
        },
      );
      ShowConsoleLogMessage(JSON.stringify(response));
      if (response?.statusCode == 500) {
        // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
        if (
          response?.data?.message == 'Token Mismatch' ||
          'Unauthorized Access'
        ) {
          TokenMisMatchPopup(dispatch, navigation, true);
        } else {
          TokenMisMatchPopup(dispatch, navigation, false);
        }
      } else {
        if (response?.data?.status == true) {
          successCallBack(response?.data);
        } else {
          failureCallBack(response?.data);
        }
      }
    } catch (error) {
      console.error(error);
      errorCallBack(error);
    }
  });
}

export async function addToFavoriteProduct(
  dispatch,
  navigation,
  apiToken,
  productId,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    const body = {
      product_id: productId,
    };
    // console.log(body, ' ---------------');
    const response = await ApiCall(
      API_TYPE.POST,
      body,
      API_END_POINTS.API_ADD_FAVORITE,
      {
        'x-access-token': apiToken,
      },
    );
    ShowConsoleLogMessage(JSON.stringify(response));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        successCallBack(response?.data);
      } else {
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function getFavoriteProductList(
  dispatch,
  navigation,
  apiToken,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  if (apiToken) {
    try {
      // ShowConsoleLogMessage('getFavoriteProductList');
      const response = await ApiCall(
        API_TYPE.GET,
        null,
        API_END_POINTS.API_FAVORITE_LIST,
        {
          'x-access-token': apiToken,
        },
      );
      ShowConsoleLogMessage(
        'getFavoriteProductList response?.statusCode ==  == > ' +
          JSON.stringify(response),
      );
      if (response?.statusCode == 500) {
        // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
        if (
          response?.data?.message == 'Token Mismatch' ||
          'Unauthorized Access'
        ) {
          TokenMisMatchPopup(dispatch, navigation, true);
        } else {
          TokenMisMatchPopup(dispatch, navigation, false);
        }
      } else {
        if (response?.data?.status == true) {
          successCallBack(response?.data);
          storeOfflineFavorite(response?.data?.response);
        } else {
          failureCallBack(response?.data);
        }
      }
    } catch (error) {
      console.error(error);
      errorCallBack(error);
    }
  }
}

const storeOfflineFavorite = data => {
  data?.forEach(async item => {
    let is_offer_save = await isProductSavedFavorite(item?.product_id?._id);
    if (is_offer_save === false) {
      // ShowConsoleLogMessage('if part storeOfflineFavorite');
      doSaveOfferOfflineRealm(
        item?.product_id?._id,
        item?.product_id?.thumbnail_image
          ? IMAGE_BASE_URL + item?.product_id?.thumbnail_image
          : item?.product_id?.thumbnail_image,
        item?.product_id?.product_name,
        '',
      );
    } else {
      // ShowConsoleLogMessage('else part storeOfflineFavorite');
    }
  });
};

export async function getUserOrderList(
  dispatch,
  navigation,
  apiToken,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  if (apiToken) {
    try {
      // ShowConsoleLogMessage(apiToken);
      const response = await ApiCall(
        API_TYPE.GET,
        null,
        API_END_POINTS.API_USER_ORDER_LIST,
        {
          'x-access-token': apiToken,
        },
      );
      // ShowConsoleLogMessage(JSON.stringify(response));
      if (response?.statusCode == 500) {
        // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
        if (
          response?.data?.message == 'Token Mismatch' ||
          'Unauthorized Access'
        ) {
          TokenMisMatchPopup(dispatch, navigation, true);
        } else {
          TokenMisMatchPopup(dispatch, navigation, false);
        }
      } else {
        if (response?.data?.status == true) {
          successCallBack(response?.data);
        } else {
          failureCallBack(response?.data);
        }
      }
    } catch (error) {
      console.error(error);
      errorCallBack(error);
    }
  }
}

export async function createUserProductQuery(
  dispatch,
  navigation,
  apiToken,
  productId,
  ques,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  if (apiToken) {
    try {
      const body = {
        product_id: productId,
        question: ques,
      };
      // ShowConsoleLogMessage(JSON.stringify(body));
      const response = await ApiCall(
        API_TYPE.POST,
        body,
        API_END_POINTS.API_CREATE_PRODUCT_QUERY_BY_ID,
        {
          'x-access-token': apiToken,
        },
      );
      // ShowConsoleLogMessage(JSON.stringify(response));
      if (response?.statusCode == 500) {
        // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
        if (
          response?.data?.message == 'Token Mismatch' ||
          'Unauthorized Access'
        ) {
          TokenMisMatchPopup(dispatch, navigation, true);
        } else {
          TokenMisMatchPopup(dispatch, navigation, false);
        }
      } else {
        if (response?.data?.status == true) {
          successCallBack(response?.data);
        } else {
          failureCallBack(response?.data);
        }
      }
    } catch (error) {
      console.error(error);
      errorCallBack(error);
    }
  }
}

export async function cancelUserOrder(
  dispatch,
  navigation,
  apiToken,
  orderId,
  reason,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  if (apiToken) {
    try {
      const body = {
        order_id: orderId,
        cancellation_reason: reason,
      };
      // ShowConsoleLogMessage(JSON.stringify(body));
      const response = await ApiCall(
        API_TYPE.POST,
        body,
        API_END_POINTS.API_USER_CANCEL_ORDER,
        {
          'x-access-token': apiToken,
        },
      );
      // ShowConsoleLogMessage(JSON.stringify(response));
      if (response?.statusCode == 500) {
        // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
        if (
          response?.data?.message == 'Token Mismatch' ||
          'Unauthorized Access'
        ) {
          TokenMisMatchPopup(dispatch, navigation, true);
        } else {
          TokenMisMatchPopup(dispatch, navigation, false);
        }
      } else {
        if (response?.data?.status == true) {
          successCallBack(response?.data);
        } else {
          failureCallBack(response?.data);
        }
      }
    } catch (error) {
      console.error(error);
      errorCallBack(error);
    }
  }
}

export async function returnUserOrder(
  dispatch,
  navigation,
  apiToken,
  orderId,
  returnReason,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  if (apiToken) {
    try {
      const body = {
        order_id: orderId,
        return_reason: returnReason,
      };
      // ShowConsoleLogMessage(JSON.stringify(body));
      const response = await ApiCall(
        API_TYPE.POST,
        body,
        API_END_POINTS.API_USER_RETURN_ORDER,
        {
          'x-access-token': apiToken,
        },
      );
      ShowConsoleLogMessage(JSON.stringify(response));
      if (response?.statusCode == 500) {
        // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
        if (
          response?.data?.message == 'Token Mismatch' ||
          'Unauthorized Access'
        ) {
          TokenMisMatchPopup(dispatch, navigation, true);
        } else {
          TokenMisMatchPopup(dispatch, navigation, false);
        }
      } else {
        if (response?.data?.status == true) {
          successCallBack(response?.data);
        } else {
          failureCallBack(response?.data);
        }
      }
    } catch (error) {
      console.error(error);
      errorCallBack(error);
    }
  }
}

export async function createReviewForOrder(
  dispatch,
  navigation,
  apiToken,
  orderId,
  productId,
  rating,
  review,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  if (apiToken) {
    try {
      const body = {
        productId: productId,
        orderId: orderId,
        rating: rating,
        review: review,
      };
      // ShowConsoleLogMessage(JSON.stringify(body));
      const response = await ApiCall(
        API_TYPE.POST,
        body,
        API_END_POINTS.API_WRITE_REVIEW_PRODUCT,
        {
          'x-access-token': apiToken,
        },
      );
      // ShowConsoleLogMessage(JSON.stringify(response));
      if (response?.statusCode == 500) {
        // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
        if (
          response?.data?.message == 'Token Mismatch' ||
          'Unauthorized Access'
        ) {
          TokenMisMatchPopup(dispatch, navigation, true);
        } else {
          TokenMisMatchPopup(dispatch, navigation, false);
        }
      } else {
        if (response?.data?.status == true) {
          successCallBack(response?.data);
        } else {
          failureCallBack(response?.data);
        }
      }
    } catch (error) {
      console.error(error);
      errorCallBack(error);
    }
  }
}

export async function getReviewForOrder(
  dispatch,
  navigation,
  apiToken,
  orderId,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  if (apiToken) {
    try {
      const body = {
        orderId: orderId,
      };
      // ShowConsoleLogMessage(JSON.stringify(body));
      const response = await ApiCall(
        API_TYPE.POST,
        body,
        API_END_POINTS.API_GET_REVIEW_PRODUCT,
        {
          'x-access-token': apiToken,
        },
      );
      // ShowConsoleLogMessage(JSON.stringify(response));
      if (response?.statusCode == 500) {
        // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
        if (
          response?.data?.message == 'Token Mismatch' ||
          'Unauthorized Access'
        ) {
          TokenMisMatchPopup(dispatch, navigation, true);
        } else {
          TokenMisMatchPopup(dispatch, navigation, false);
        }
      } else {
        if (response?.data?.status == true) {
          successCallBack(response?.data);
        } else {
          failureCallBack(response?.data);
        }
      }
    } catch (error) {
      console.error(error);
      errorCallBack(error);
    }
  }
}

export async function getUserOrderById(
  dispatch,
  navigation,
  apiToken,
  orderId,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    // ShowConsoleLogMessage(apiToken);
    // ShowConsoleLogMessage(API_END_POINTS.API_USER_ORDER_BY_ID + orderId);
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_USER_ORDER_BY_ID + orderId,
      {
        'x-access-token': apiToken,
      },
    );
    // ShowConsoleLogMessage(JSON.stringify(response));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        successCallBack(response?.data);
      } else {
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function getUserOrderRefundById(
  dispatch,
  navigation,
  apiToken,
  orderId,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    // ShowConsoleLogMessage(apiToken);
    // ShowConsoleLogMessage(API_END_POINTS.API_USER_ORDER_BY_ID + orderId);
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_GET_REFUND_DETAILS_BY_ID + orderId,
      {
        'x-access-token': apiToken,
      },
    );
    // ShowConsoleLogMessage(JSON.stringify(response?.data?.response?.length));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        successCallBack(response?.data);
      } else {
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function getUserOrderReturnById(
  dispatch,
  navigation,
  apiToken,
  orderId,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    // ShowConsoleLogMessage(apiToken);
    // ShowConsoleLogMessage(API_END_POINTS.API_USER_ORDER_BY_ID + orderId);
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_USER_RETURN_DETAILS_BY_ID + orderId,
      {
        'x-access-token': apiToken,
      },
    );
    // ShowConsoleLogMessage(JSON.stringify(response?.data?.response?.length));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        successCallBack(response?.data);
      } else {
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function getUserTransactionDetailById(
  dispatch,
  navigation,
  apiToken,
  id,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    // ShowConsoleLogMessage(apiToken);
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_USER_TRANSACTION_HISTORY_DETAIL_BY_ID + id,
      {
        'x-access-token': apiToken,
      },
    );
    // ShowConsoleLogMessage(JSON.stringify(response?.data?.response?.length));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        successCallBack(response?.data);
      } else {
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function updateUser(
  dispatch,
  navigation,
  apiToken,
  name,
  image,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    // ShowConsoleLogMessage(apiToken);
    const body = {
      name: name,
      image: image,
    };
    const response = await ApiCall(
      API_TYPE.POST,
      body,
      API_END_POINTS.API_UPDATE_USER_PROFILE,
      {
        'x-access-token': apiToken,
      },
    );
    // ShowConsoleLogMessage(JSON.stringify(response?.data));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        successCallBack(response?.data);
      } else {
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function deleteUser(
  dispatch,
  navigation,
  apiToken,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    // ShowConsoleLogMessage(apiToken);

    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_DELETE_USER,
      {
        'x-access-token': apiToken,
      },
    );
    // ShowConsoleLogMessage(JSON.stringify(response?.data));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        successCallBack(response?.data);
      } else {
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function getUserProfile(
  dispatch,
  navigation,
  apiToken,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    // ShowConsoleLogMessage(apiToken);
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_GET_PROFILE,
      {
        'x-access-token': apiToken,
      },
    );
    // ShowConsoleLogMessage(JSON.stringify(response?.data));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        successCallBack(response?.data);
      } else {
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function getUserNotificationList(
  dispatch,
  navigation,
  apiToken,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    ShowConsoleLogMessage(apiToken);
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_GET_USER_NOTIFICATION,
      {
        'x-access-token': apiToken,
      },
    );
    // ShowConsoleLogMessage(JSON.stringify(response?.data?.data?.length));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        successCallBack(response?.data);
      } else {
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function getUserRefundList(
  dispatch,
  navigation,
  apiToken,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_GET_USER_REFUND_LIST,
      {
        'x-access-token': apiToken,
      },
    );
    // ShowConsoleLogMessage(JSON.stringify(response?.data));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        successCallBack(response?.data);
      } else {
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function getUserReturnList(
  dispatch,
  navigation,
  apiToken,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_USER_RETURN_LIST,
      {
        'x-access-token': apiToken,
      },
    );
    // ShowConsoleLogMessage(JSON.stringify(response?.data));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        successCallBack(response?.data);
      } else {
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function updateNotificationById(
  dispatch,
  navigation,
  apiToken,
  id,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    // ShowConsoleLogMessage(apiToken);
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_GET_USER_NOTIFICATION,
      {
        'x-access-token': apiToken,
      },
    );
    // ShowConsoleLogMessage(JSON.stringify(response?.data));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        successCallBack(response?.data);
      } else {
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function addToCartProduct(
  dispatch,
  navigation,
  apiToken,
  productId,
  quantity,
  amount,
  color,
  size,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    const body = {
      product_id: productId,
      quantity: quantity,
      amount: amount,
      size: size,
      color: color,
    };

    const response = await ApiCall(
      API_TYPE.POST,
      body,
      API_END_POINTS.API_ADD_TO_CART,
      {
        'x-access-token': apiToken,
      },
    );
    ShowConsoleLogMessage(JSON.stringify(response));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        // dispatch(cartProducts(response?.data?.response));
        successCallBack(response?.data);
      } else {
        // dispatch(cartProducts([]));
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function increaseProductQtyCart(
  dispatch,
  navigation,
  apiToken,
  productId,
  cartId,
  quantity,
  amount,
  color,
  size,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    const body = {
      product_id: productId,
      cart_id: cartId,
    };

    const response = await ApiCall(
      API_TYPE.POST,
      body,
      API_END_POINTS.API_INCREASE_CART_QTY,
      {
        'x-access-token': apiToken,
      },
    );
    ShowConsoleLogMessage(JSON.stringify(response));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        // dispatch(cartProducts(response?.data?.response));
        successCallBack(response?.data);
      } else {
        // dispatch(cartProducts([]));
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function decreaseProductQtyCart(
  dispatch,
  navigation,
  apiToken,
  productId,
  cartId,
  quantity,
  amount,
  color,
  size,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    const body = {
      product_id: productId,
      cart_id: cartId,
    };

    const response = await ApiCall(
      API_TYPE.POST,
      body,
      API_END_POINTS.API_DECREASE_CART_QTY,
      {
        'x-access-token': apiToken,
      },
    );
    ShowConsoleLogMessage(JSON.stringify(response));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        // dispatch(cartProducts(response?.data?.response));
        successCallBack(response?.data);
      } else {
        // dispatch(cartProducts([]));
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function addToCartMultipleProduct(
  dispatch,
  navigation,
  apiToken,
  productArray,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  productArray?.map(async item => {
    // console.log(item);
    try {
      const body = {
        product_id: item?.listID,
        quantity: item?.quantity,
        amount: item?.amount,
        size: item?.size,
        color: item?.color,
      };
      console.log(body, ' ---------------');

      const response = await ApiCall(
        API_TYPE.POST,
        body,
        API_END_POINTS.API_ADD_TO_CART,
        {
          'x-access-token': apiToken,
        },
      );
      // ShowConsoleLogMessage('cart response -=> ' + JSON.stringify(response));

      if (response?.statusCode == 500) {
        // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
        if (
          response?.data?.message == 'Token Mismatch' ||
          'Unauthorized Access'
        ) {
          TokenMisMatchPopup(dispatch, navigation, true);
        } else {
          TokenMisMatchPopup(dispatch, navigation, false);
        }
      } else {
        if (response?.data?.status == true) {
          successCallBack(response?.data);
        } else {
          failureCallBack(response?.data);
        }
      }
    } catch (error) {
      console.error(error);
      errorCallBack(error);
    }
  });
}

export async function createUserOrder(
  dispatch,
  navigation,
  apiToken,
  productArray,
  type,
  addressId,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    const body = {
      // product_array: productArray,
      // totalamount: amount,
      // cart_id: [productArray],
      payment: type,
      address_id: addressId,
    };
    // const body = new FormData();
    // body.append('cart_id', productArray);
    // body.append('address_id', addressId);
    // body.append('payment', type);

    console.log(body, ' ---------------');

    const response = await ApiCall(
      API_TYPE.POST,
      body,
      API_END_POINTS.API_CREATE_ORDER,
      {
        'x-access-token': apiToken,
        // 'Content-Type': 'multipart/form-data',
      },
    );

    ShowConsoleLogMessage('createUserOrder ->> \n\n\n');

    ShowConsoleLogMessage(JSON.stringify(response));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        // dispatch(cartProducts(response?.data?.response));
        successCallBack(response?.data);
      } else {
        // dispatch(cartProducts([]));
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function getSecretForStripe(
  dispatch,
  navigation,
  apiToken,
  email,
  amount,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    const body = {
      amount: amount,
      email: email,
    };
    // console.log(body, ' ---------------');

    const response = await ApiCall(
      API_TYPE.POST,
      body,
      API_END_POINTS.API_USER_STRIPE,
      {
        'x-access-token': apiToken,
      },
    );
    // ShowConsoleLogMessage(JSON.stringify(response));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        // dispatch(cartProducts(response?.data?.response));
        successCallBack(response);
      } else {
        // dispatch(cartProducts([]));
        failureCallBack(response);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function getUserCartProduct(
  dispatch,
  navigation,
  apiToken,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  if (apiToken) {
    try {
      const response = await ApiCall(
        API_TYPE.GET,
        null,
        API_END_POINTS.API_USER_CART_LIST,
        {
          'x-access-token': apiToken,
        },
      );
      // ShowConsoleLogMessage(JSON.stringify(response));
      if (response?.statusCode == 500) {
        // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
        if (
          response?.data?.message == 'Token Mismatch' ||
          'Unauthorized Access'
        ) {
          TokenMisMatchPopup(dispatch, navigation, true);
        } else {
          TokenMisMatchPopup(dispatch, navigation, false);
        }
      } else {
        if (response?.data?.status == true) {
          dispatch(cartProducts(response?.data?.response));
          successCallBack(response?.data);
        } else {
          dispatch(cartProducts([]));
          failureCallBack(response?.data);
        }
      }
    } catch (error) {
      console.error('error \n');
      console.error(error);
      errorCallBack(error);
    }
  }
}

export async function getUserSavedAddress(
  dispatch,
  navigation,
  apiToken,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_USER_ADDRESS_LIST,
      {
        'x-access-token': apiToken,
      },
    );
    // ShowConsoleLogMessage(JSON.stringify(response));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        successCallBack(response?.data);
      } else {
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function getAvailablePaymentMethods(
  dispatch,
  navigation,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_GET_PAYMENT_METHODS,
    );
    // ShowConsoleLogMessage(JSON.stringify(response));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        successCallBack(response?.data);
      } else {
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function generatePaymentToken(
  dispatch,
  navigation,
  apiToken,
  amount,
  currency,
  token,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    const body = {
      amount: amount,
      currency: currency,
      token: token,
    };

    const response = await ApiCall(
      API_TYPE.POST,
      body,
      API_END_POINTS.API_PAYMENT_GENERATE_BY_TOKEN,
      {
        'x-access-token': apiToken,
      },
    );
    ShowConsoleLogMessage('generatePaymentToken ->> \n\n\n');
    ShowConsoleLogMessage(JSON.stringify(response));

    if (response?.statusCode == 500) {
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        successCallBack(response?.data);
      } else {
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function getUserTransactionHistory(
  dispatch,
  navigation,
  apiToken,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_USER_TRANSACTION_HISTORY,
      {
        'x-access-token': apiToken,
      },
    );
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        successCallBack(response?.data);
      } else {
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function addUserAddress(
  dispatch,
  navigation,
  apiToken,
  name,
  email,
  mobile,
  addressDetail,
  defaultAddress,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  const body = {
    name: name,
    phone: mobile,
    email: email,
    address: addressDetail,
    defaultAddress: defaultAddress ? '1' : '0',
  };
  // console.log(body, ' ==============');
  try {
    const response = await ApiCall(
      API_TYPE.POST,
      body,
      API_END_POINTS.API_ADD_USER_ADDRESS,
      {
        'x-access-token': apiToken,
      },
    );
    // ShowConsoleLogMessage(JSON.stringify(response));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        successCallBack(response?.data);
      } else {
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function updateUserAddress(
  dispatch,
  navigation,
  apiToken,
  id,
  name,
  email,
  mobile,
  addressDetail,
  defaultAddress,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  const body = {
    updateId: id,
    name: name,
    phone: mobile,
    email: email,
    address: addressDetail,
    defaultAddress: defaultAddress ? '1' : '0',
  };
  // console.log(body, ' ==============');
  try {
    const response = await ApiCall(
      API_TYPE.POST,
      body,
      API_END_POINTS.API_UPDATE_USER_ADDRESS,
      {
        'x-access-token': apiToken,
      },
    );
    // ShowConsoleLogMessage(JSON.stringify(response));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        successCallBack(response?.data);
      } else {
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function removeUserAddress(
  dispatch,
  navigation,
  apiToken,
  addressId,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_USER_ADDRESS_REMOVE_BY_ID + addressId,
      {
        'x-access-token': apiToken,
      },
    );
    // ShowConsoleLogMessage(JSON.stringify(response));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        successCallBack(response?.data);
      } else {
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function getCouponList(
  dispatch,
  navigation,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_GET_COUPON_LIST,
    );
    // ShowConsoleLogMessage(JSON.stringify(response));
    if (response?.statusCode == 500) {
      // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
      if (
        response?.data?.message == 'Token Mismatch' ||
        'Unauthorized Access'
      ) {
        TokenMisMatchPopup(dispatch, navigation, true);
      } else {
        TokenMisMatchPopup(dispatch, navigation, false);
      }
    } else {
      if (response?.data?.status == true) {
        successCallBack(response?.data);
      } else {
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export function cartProducts(payload) {
  return {
    type: CART_PRODUCTS,
    payload: payload,
  };
}

export function couponItem(payload) {
  return {
    type: COUPON_ITEM,
    payload: payload,
  };
}

const TokenMisMatchPopup = async (dispatch, navigation, message = true) => {
  try {
    // ShowConsoleLogMessage('called TokenMisMatchPopup ');
    // const navigation = useNavigation();
    if (message) {
      dispatch(loginUserSuccess({}));
      dispatch(userTokenSuccess(''));
      dispatch(updateLoginCount(0));
      dispatch(showProgressBar(false));

      await clearRealm();
      await AsyncStorage.clear();
      navigation.replace('Auth');

      Alert.alert(
        'Session Expire',
        'Your session is expired because you have logged in to another device. Please login to continue.',
        [
          {
            text: 'OK',
            onPress: () => {
              return null;
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      dispatch(showProgressBar(false));
      navigation.goBack();
      Alert.alert(
        'Something went wrong!',
        'Please try again after some time.',
        [
          {
            text: 'OK',
            onPress: () => {
              return null;
            },
          },
        ],
        {cancelable: false},
      );
    }
  } catch (e) {
    ShowConsoleLogMessage('called TokenMisMatchPopup error ' + e);
  }
};
