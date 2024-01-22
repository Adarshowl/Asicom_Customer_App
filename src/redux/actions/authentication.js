import ApiCall from '../../network/ApiCall';
import {API_END_POINTS, API_TYPE} from '../../network/ApiEndPoints';
import {ShowConsoleLogMessage} from '../../utils/Utility';
import {
  loginUserSuccess,
  updateImage,
  updateLoginCount,
  userTokenSuccess,
} from './index';
import {getUserProfile} from './CartApi';
import {doSaveImage} from '../../utils/RealmUtility';

export async function loginUser(
  data,
  dispatch,
  navigation,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    const response = await ApiCall(
      API_TYPE.POST,
      data,
      API_END_POINTS.API_LOGIN,
    );
    ShowConsoleLogMessage(JSON.stringify(response));

    // if (response.statusCode === 200) {
    //   const responseData = response.data;
    //
    //   if (responseData.data.message === 'invalid username or password') {
    //     errorCallBack();
    //   } else {
    //     dispatch(loginUserSuccess(responseData.data));
    //     successCallBack(responseData);
    //   }
    // } else {
    //   const responseData = response.data;
    //   errorCallBack(responseData);
    // }

    if (response?.data?.status == true) {
      dispatch(userTokenSuccess(response?.data?.jwtoken));
      dispatch(loginUserSuccess(response?.data?.response));
      dispatch(updateLoginCount(1));
      dispatch(() => {
        getUserProfile(
          dispatch,
          navigation,
          response?.data?.jwtoken,
          async data => {
            // ShowConsoleLogMessage(data?.response?._id + ' get profile ');
            // await AsyncStorage.setItem(USER_IMAGE, data?.response?.image);

            doSaveImage(data?.response?._id, data?.response?.image);

            dispatch(updateImage(data?.response?.image));
          },
          async data => {
            // await AsyncStorage.setItem(USER_IMAGE, '');
            doSaveImage(data?.response?._id, '');
          },
          () => {},
        );
      });

      successCallBack(response?.data);
    } else {
      failureCallBack(response?.data);
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}
