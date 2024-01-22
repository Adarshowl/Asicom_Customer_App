import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import images from '../../../constants/images';
import {SIZES, STRING} from '../../../constants';
import {USER_DATA, USER_TOKEN} from '../../../redux/type';
import {useDispatch} from 'react-redux';
import {
  changeAppColor,
  loginUserSuccess,
  updateLoginCount,
  userTokenSuccess,
} from '../../../redux/actions';
import ApiCall from '../../../network/ApiCall';
import {API_END_POINTS, API_TYPE} from '../../../network/ApiEndPoints';
import {ShowConsoleLogMessage} from '../../../utils/Utility';
import AppColors from '../../../constants/AppColors';
import {doSaveAppImage, getSavedAppImage} from '../../../utils/RealmUtility';
import {COLORS} from '../../../constants/Colors';
// import FastImage from 'react-native-fast-image';
const Splash = ({navigation}) => {
  const [image, setImage] = useState('');

  // useEffect(() => {
  //   setTimeout(async () => {
  //     getSavedAppImage()
  //       .then(res => {
  //         ShowConsoleLogMessage('success value change' + res[0]?.image);
  //
  //         setImage(res[0]?.image);
  //       })
  //       .catch(error => {
  //         ShowConsoleLogMessage(error);
  //       })
  //       .finally(() => {});
  //
  //     await getUserFromStorage();
  //     await getAppConfiguration();
  //     navigation.replace('MainContainer');
  //   }, 1000);
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedImage = await getSavedAppImage();
        // ShowConsoleLogMessage('success value change' + savedImage[0]?.image);
        setImage(savedImage[0]?.image);
      } catch (error) {
        await getAppConfiguration();
        await getAppCurrencyConfiguration();
        await getUserFromStorage();
        navigation.replace('MainContainer');
        ShowConsoleLogMessage(error);
      } finally {
        await getUserFromStorage();
        await getAppCurrencyConfiguration();
        await getAppConfiguration();
        navigation.replace('MainContainer');
      }
    };

    const timeoutId = setTimeout(fetchData, 1000);

    return () => clearTimeout(timeoutId); // Cleanup the timer on unmount
  }, []);

  // useEffect(() => {
  //   // ShowConsoleLogMessage('value change');
  // }, [image]);

  const getAppConfiguration = async () => {
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_APP_SETTING,
    );
    if (response?.statusCode == 500) {
    } else {
      if (response?.data?.status == true) {
        dispatch(changeAppColor(response?.data?.data?.app_primary_color));
        AppColors.dark.colors.colorPrimary =
          response?.data?.data?.app_primary_color;
        AppColors.light.colors.colorPrimary =
          response?.data?.data?.app_primary_color;
        ShowConsoleLogMessage(
          JSON.stringify(AppColors.dark.colors.colorPrimary),
        );
        images.app_logo = response?.data?.data?.app_default_image;
        doSaveAppImage('1', response?.data?.data?.app_logo);
      } else {
        // dispatch(changeAppColor('#FF6600'));
      }
    }
  };

  const getAppCurrencyConfiguration = async () => {
    const response = await ApiCall(
      API_TYPE.GET,
      null,
      API_END_POINTS.API_APP_CURRENCY_SETTING,
    );
    if (response?.statusCode == 500) {
    } else {
      if (response?.data?.status == true) {
        if (response?.data?.data?.currency_symbol != undefined) {
          STRING.APP_CURRENCY = response?.data?.data?.currency_symbol;
        } else {
          STRING.APP_CURRENCY = '$';
        }
      } else {
        STRING.APP_CURRENCY = '$';
      }
    }
  };

  const dispatch = useDispatch();
  const getUserFromStorage = async () => {
    try {
      // await AsyncStorage.getItem(STRING.app_cur, (error, value) => {
      //   if (error) {
      //   } else {
      //     if (value !== null) {
      //       STRING.APP_CURRENCY = value;
      //     } else {
      //       STRING.APP_CURRENCY = '$';
      //     }
      //   }
      // });
      await AsyncStorage.getItem(USER_TOKEN, async (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            dispatch(userTokenSuccess(value));
          } else {
            // navigation.replace('Login');
          }
        }
      });
      await AsyncStorage.getItem(USER_DATA, async (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            dispatch(loginUserSuccess(JSON.parse(value)));
            dispatch(updateLoginCount(1));
          } else {
            // navigation.replace('Login');
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

  return (
    <View style={[styles.background]}>
      {image ? (
        <Image
          style={styles.image}
          source={image ? {uri: image} : images.splash}
        />
      ) : // <FastImage
      //   style={styles.image}
      //   source={image ? {uri: image} : images.newlogo}
      // />
      null}
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  image: {
    width: SIZES.width,
    height: SIZES.height,
    resizeMode: 'cover',
  },
  background: {
    backgroundColor: COLORS.white,
    width: SIZES.width,
    height: SIZES.height,
  },
});
