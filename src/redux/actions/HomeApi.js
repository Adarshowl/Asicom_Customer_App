import ApiCall from '../../network/ApiCall';
import {API_END_POINTS, API_TYPE} from '../../network/ApiEndPoints';
import {CART_LENGTH, HOME_BANNER, HOME_PRODUCTS, ITEM_CATEGORY} from '../type';
import {
  loginUserSuccess,
  showProgressBar,
  updateLoginCount,
  userTokenSuccess,
} from './index';
import {clearRealm} from '../../utils/RealmUtility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {ShowConsoleLogMessage} from '../../utils/Utility';

export async function getHomeBanner(
  dispatch,
  navigation,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    // console.log(API_END_POINTS.API_SIGN_UP);
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_HOME_BANNER,
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
        dispatch(homeBanner(response?.data?.response));
        successCallBack(response?.data);
      } else {
        dispatch(homeBanner([]));

        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function getHomeFlashDeal(
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
      API_END_POINTS.API_FLASH_DEAL,
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

export async function getHomeFlashDealProductList(
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
      API_END_POINTS.API_FLASH_DEAL_PRODUCT_LIST,
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

export async function getSearchProduct(
  dispatch,
  navigation,
  search,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    // console.log(API_END_POINTS.API_PRODUCT_SEARCH + search + '');
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_PRODUCT_SEARCH + search + '',
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

export async function getHomeProduct(
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
      API_END_POINTS.API_GET_PRODUCTS,
    );
    ShowConsoleLogMessage(response);
    // if (response?.statusCode == 500) {
    //   // ShowConsoleLogMessage(' if called TokenMisMatchPopup ');
    //   TokenMisMatchPopup(dispatch, navigation, true);
    // } else {
    if (response?.data?.status == true) {
      dispatch(homeProducts(response?.data?.response));
      successCallBack(response?.data);
    } else {
      dispatch(homeProducts([]));
      failureCallBack(response?.data);
    }
    // }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function getPrivacyPolicy(
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
      API_END_POINTS.API_GET_PRIVACY_POLICY,
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
        dispatch(homeProducts(response?.data?.response));
        successCallBack(response?.data);
      } else {
        dispatch(homeProducts([]));
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function getProductQueryByID(
  dispatch,
  navigation,
  id,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_GET_PRODUCT_QUERY_BY_ID + id + '',
      // 'https://masteradmin-zti3.onrender.com/api/ecomapp/user/productquery/list/6564babc767843d60f0f326d',
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

export async function getProductByID(
  dispatch,
  navigation,
  id,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_GET_PRODUCTS_DETAILS + id + '',
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

export async function getItemCategory(
  dispatch,
  navigation,
  successCallBack,
  failureCallBack,
  errorCallBack,
  allCategories = false,
) {
  try {
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_PRODUCTS_CATEGORY,
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
        if (!allCategories) {
          dispatch(itemCategory(response?.data?.response));
        }
        successCallBack(response?.data);
      } else {
        dispatch(itemCategory([]));
        failureCallBack(response?.data);
      }
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function getItemByCategoryName(
  dispatch,
  navigation,
  name,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    ShowConsoleLogMessage(
      API_END_POINTS.API_GET_PRODUCT_BY_SUB_CAT_BY_CAT_ID + name,
    );
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_GET_PRODUCT_BY_SUB_CAT_BY_CAT_ID + name,
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

export async function getSubCatByCategoryName(
  dispatch,
  navigation,
  name,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    // ShowConsoleLogMessage(API_END_POINTS.API_GET_SUB_CAT_BY_CAT_ID + name);
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_GET_SUB_CAT_BY_CAT_ID + name,
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

export async function getSubCatByCategoryNameBySubCatName(
  dispatch,
  navigation,
  id,
  name,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    // ShowConsoleLogMessage(
    //   API_END_POINTS.API_GET_PRODUCT_BY_SUB_CAT_BY_CAT_ID +
    //     id +
    //     '?subcategoryName=' +
    //     name,
    // );
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_GET_PRODUCT_BY_SUB_CAT_BY_CAT_ID +
        id +
        '?subcategoryName=' +
        name,
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

export function homeBanner(payload) {
  return {
    type: HOME_BANNER,
    payload: payload,
  };
}

export function homeProducts(payload) {
  return {
    type: HOME_PRODUCTS,
    payload: payload,
  };
}

export function updateCartDataLength(payload) {
  return {
    type: CART_LENGTH,
    payload: payload,
  };
}

export function itemCategory(payload) {
  return {
    type: ITEM_CATEGORY,
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
