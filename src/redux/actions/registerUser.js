import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import {registerUserSuccess, updateLoginCount} from './index';

export async function registerUser(
  data,
  dispatch,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    // console.log(API_END_POINTS.API_SIGN_UP);
    const response = await ApiCall(
      API_END_POINTS.API_SIGN_UP_TEST.type,
      data,
      API_END_POINTS.API_SIGN_UP_TEST.url,
    );
    // ShowConsoleLogMessage(JSON.stringify(response));
    if (response?.data?.status == true) {
      dispatch(registerUserSuccess(response?.data?.response));
      dispatch(updateLoginCount(1));
      successCallBack(response?.data);
    } else {
      failureCallBack(response?.data);
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}
