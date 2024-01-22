import React, {useContext, useRef, useState} from 'react';
import {
  I18nManager,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {STRING} from '../../../constants';
import {FONTS} from '../../../constants/Fonts';

import {COLORS} from '../../../constants/Colors';
import Octicons from 'react-native-vector-icons/Octicons';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import GlobalStyle from '../../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanEditText from '../../../utils/EditText/VegUrbanEditText';
import VegUrbanCommonBtn from '../../../utils/VegUrbanCommonBtn';
import {ShowToastMessage, validateFieldNotEmpty} from '../../../utils/Utility';
import themeContext from '../../../constants/themeContext';
import '../../../assets/i18n/i18n';
import {useTranslation} from 'react-i18next';
import {showProgressBar} from '../../../redux/actions';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_DATA, USER_TOKEN} from '../../../redux/type';
import {loginUser} from '../../../redux/actions/authentication';
import {
  getSavedCartProduct,
  getSavedFavoriteProduct,
} from '../../../utils/RealmUtility';
import {
  addToCartMultipleProduct,
  addToFavoriteMultipleProduct,
} from '../../../redux/actions/CartApi';
import {requestUserPermission} from '../../../firebase/notificationService';
// import {useDispatch} from 'react-redux';

const Login = ({navigation}) => {
  const theme = useContext(themeContext);
  const {t, i18n} = useTranslation();

  const dispatch = useDispatch();

  const [focused, setFocused] = React.useState(false);
  const error = '';
  const [addressDefault, setAddressDefault] = useState(false);

  const getBorderWidth = () => {
    if (error) {
      return 1;
    }
    if (focused) {
      return 1;
    } else {
      return 0.2;
    }
  };

  const isEmail = email => {
    // Regular expression for email validation
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  // const isPasswordValid = (password) => {

  //   return password.length >= 6;
  // };
  const isPasswordValid = password => {
    // Define regex patterns for each requirement
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

    // Check if the password meets all requirements
    const hasLowercase = lowercaseRegex.test(password);
    const hasUppercase = uppercaseRegex.test(password);
    const hasNumber = numberRegex.test(password);
    const hasSpecialCharacter = specialCharacterRegex.test(password);

    // Password is valid if it meets all requirements
    return (
      password.length >= 6 &&
      hasLowercase &&
      hasUppercase &&
      hasNumber &&
      hasSpecialCharacter
    );
  };

  const errorMessage = '';

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [validpwd, setvalidpwd] = useState(true);

  const validateEmail = email => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleButtonPress = () => {
    if (validateFieldNotEmpty(email)) {
      ShowToastMessage('Please enter email');
    } else if (!validateEmail(email)) {
      ShowToastMessage('Please enter valid email');
    } else if (validateFieldNotEmpty(password)) {
      ShowToastMessage('Please enter password');
    } else {
      const data = {
        email: email,
        password: password,
      };
      dispatch(showProgressBar(true));
      dispatch(() =>
        loginUser(
          data,
          dispatch,
          navigation,
          userLoginSuccess,
          userLoginFail,
          errorCallBack,
        ),
      );
    }
  };
  const userLoginSuccess = async data => {
    // ShowConsoleLogMessage(data);
    setTimeout(() => {
      ShowToastMessage(data?.message);
    }, 100);

    dispatch(showProgressBar(false));
    await AsyncStorage.setItem(USER_DATA, JSON.stringify(data?.response));
    await AsyncStorage.setItem(USER_TOKEN, data?.jwtoken);

    (async () => {
      await requestUserPermission();
      await getCartFromLocal(data?.jwtoken);
      await getFavoriteFromLocal(data?.jwtoken);
    })();

    navigation?.replace('MainContainer');
  };

  const getCartFromLocal = async token => {
    getSavedCartProduct()
      .then(res => {
        if (res?.length > 0) {
          addToCartMultipleProduct(
            dispatch,
            navigation,
            token,
            res,
            () => {},
            () => {},
            () => {},
          );
        } else {
        }
      })
      .catch(() => {})
      .finally(() => {});
  };
  const getFavoriteFromLocal = async token => {
    getSavedFavoriteProduct()
      .then(res => {
        if (res?.length > 0) {
          addToFavoriteMultipleProduct(
            dispatch,
            navigation,
            token,
            res,
            () => {},
            () => {},
            () => {},
          );
        } else {
        }
      })
      .catch(() => {})
      .finally(() => {});
  };

  const userLoginFail = async data => {
    dispatch(showProgressBar(false));
    setTimeout(() => {
      ShowToastMessage(data?.message);
    }, 100);
  };

  const errorCallBack = error => {
    ShowToastMessage(error);
    dispatch(showProgressBar(false));
  };

  const getBorderColor = () => {
    if (error) {
      return COLORS.red;
    }

    if (focused) {
      return theme?.colors?.colorPrimary;
    } else {
      return COLORS.bg_color;
    }
  };

  // const getBgColor = () => {
  //   if (error) {
  //     return COLORS.red;
  //   }
  //   if (focused) {
  //     return theme?.colors?.bg_color;
  //   } else {
  //     // return COLORS.lightest_gray1;
  //     // return COLORS.bg_color;
  //     return theme?.colors?.bg_color;

  //   }
  // };
  const getBgColor = () => {
    if (error) {
      return COLORS.red;
    }
    if (focused) {
      return theme?.colors?.bg;
    } else {
      // return COLORS.lightest_gray1;
      // return COLORS.bg_color;
      return theme?.colors?.bg;
    }
  };

  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [refer, setRefer] = useState('');
  const [terms, setTerms] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  // const [focused, setFocused] = useState(false);
  const phoneInput = useRef(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  // const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showAfter, setShowAfter] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeToggle = () => {
    setRememberMe(!rememberMe);
  };
  const closeSignUpModal = () => {
    setShow(!show);
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainer,
        {
          // backgroundColor: theme?.colors?.colorPrimary,
          backgroundColor: COLORS?.white,
        },
      ]}>
      <ScrollView>
        {/* <Ionicons
        name="ios-arrow-back"
        color={COLORS.white}
        size={25}
        style={[
          styles.backIcon,
          {
            opacity: !show ? 1 : 0.0,
            transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
          },
        ]}
        onPress={() => {
          navigation.goBack();
          // ShowToastMessage('Coming Soon!');
        }}
      /> */}
        {/* <Image source={images.app_logo} style={styles.app_logo} /> */}
        <View
          style={[
            GlobalStyle.loginModalBg,
            {
              // alignItems: 'center',
              // paddingHorizontal: 15,
              backgroundColor: theme.colors?.bg_color_onBoard,
            },
          ]}>
          <Ionicons
            name="ios-arrow-back"
            // color={COLORS.black}
            color={theme.colors.textColor}
            size={25}
            style={[
              styles.backIcon,
              {
                opacity: !show ? 1 : 0.0,
                transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
              },
            ]}
            onPress={() => {
              navigation.goBack();
              // ShowToastMessage('Coming Soon!');
            }}
          />

          <View
            style={{
              marginStart: 20,
              marginTop: 25,
              justifyContent: 'center',
              // alignItems:'center'
            }}>
            <Text
              style={[
                styles.heading,
                {
                  marginStart: 5,
                  color: theme.colors.textColor,
                },
              ]}>
              {!show ? t('Create Your') : ' '}
            </Text>
            <Text
              style={[
                styles.heading,
                {
                  marginHorizontal: 10,
                  marginBottom: 30,
                  color: theme.colors.textColor,
                },
              ]}>
              {!show ? t('Account') : ' '}
            </Text>
          </View>

          {/* </View> */}

          <VegUrbanEditText
            placeholder={STRING.emailHint}
            // label={STRING.email}
            iconPosition={'left'}
            value={email}
            style={{
              color: theme?.colors?.textColor,
              // color: isEmailValid ? theme?.colors?.white : 'red', // Red color for invalid email
            }}
            icon={
              <FontAwesome
                name={'user-o'}
                size={20}
                color={theme?.colors?.grey}
                // color={theme?.colors?.white}
                style={{}}
              />
              // <Octicons
              //   name={'check-circle'}
              //   size={20}
              //   style={{
              //     marginHorizontal: 10,
              //   }}
              // />
            }
            keyBoardType={'email-address'}
            onChangeText={v => {
              setEmail(v);
              setIsEmailValid(validateEmail(v)); // Update isEmailValid based on email validity
            }}
          />
          {!isEmailValid && (
            <Text
              style={{
                color: 'red',
                marginStart: 10,
                fontFamily: FONTS?.regular,
                fontSize: 12,
              }}>
              Please Enter Valid Email
            </Text>
          )}

          <View
            style={[
              styles.textView,
              {
                borderColor: getBorderColor(),
                // flexDirection: getFlexDirection(),
              },
              {
                shadowOffset: {
                  width: 3,
                  height: 3,
                },
              },
              {
                backgroundColor: getBgColor(),
                borderWidth: getBorderWidth(),

                borderRadius: 12,
                // elevation: getElevation(),
              },
            ]}>
            <View
              style={{
                width: 40,
                alignItems: 'center',
              }}>
              <SimpleLineIcons
                name="lock"
                size={20}
                color={theme?.colors?.grey}
              />
            </View>
            {/* TextInput */}
            <TextInput
              maxLength={20}
              placeholder={STRING?.pwd}
              secureTextEntry={!showOtp}
              placeholderTextColor={theme?.colors?.textColor}
              textAlign={I18nManager.isRTL ? 'right' : 'left'}
              value={password}
              // onChangeText={(v) => setPassword(v)}
              onChangeText={text => {
                setPassword(text);
                setvalidpwd(isPasswordValid(text)); // Update isEmailValid based on email validity
              }}
              style={{
                flex: 1,
                color: theme?.colors?.textColor,
                fontFamily: FONTS?.regular,
              }}
              onFocus={() => {
                setFocused(true);
              }}
              onBlur={() => {
                setFocused(false);
              }}
            />
            <TouchableOpacity onPress={() => setShowOtp(!showOtp)}>
              <Octicons
                name={showOtp ? 'eye' : 'eye-closed'}
                size={20}
                // onPress={() => setShowOtp(!showOtp)}
                // color={COLORS.primary}
                color={theme?.colors?.grey}
                style={{
                  // marginHorizontal: 20,
                  paddingEnd: 5,
                }}
              />
            </TouchableOpacity>
          </View>
          {/*{!validpwd && (*/}
          {/*  <Text*/}
          {/*    numberOfLines={3}*/}
          {/*    style={{*/}
          {/*      color: 'red',*/}
          {/*      marginStart: 10,*/}
          {/*      fontFamily: FONTS?.regular,*/}
          {/*      fontSize: 13,*/}
          {/*    }}>*/}
          {/*    Password must contain 8-40 character, 1 uppercase(A-Z) 1*/}
          {/*    lowercase(e-z), 1 number(0-9), and a special character except*/}
          {/*    space*/}
          {/*  </Text>*/}
          {/*)}*/}

          {/*<TouchableOpacity*/}
          {/*  activeOpacity={0.8}*/}
          {/*  onPress={() => {*/}
          {/*    setAddressDefault(!addressDefault);*/}
          {/*  }}*/}
          {/*  style={[*/}
          {/*    {*/}
          {/*      flex: 1,*/}
          {/*      marginHorizontal: 25,*/}
          {/*      marginVertical: 15,*/}
          {/*      marginBottom: 25,*/}
          {/*      alignSelf: 'center',*/}
          {/*    },*/}
          {/*    GlobalStyle.flexRowAlignCenter,*/}
          {/*  ]}>*/}
          {/*  <MaterialCommunityIcons*/}
          {/*    name={*/}
          {/*      addressDefault ? 'checkbox-marked' : 'checkbox-blank-outline'*/}
          {/*    }*/}
          {/*    size={22}*/}
          {/*    color={theme.colors.colorPrimary}*/}
          {/*  />*/}

          {/*  <Text*/}
          {/*    style={[*/}
          {/*      GlobalStyle.addUpSelectionText,*/}
          {/*      {*/}
          {/*        color: theme.colors.textColor,*/}
          {/*        fontFamily: FONTS?.bold,*/}
          {/*        // marginBottom:10,*/}
          {/*        marginLeft: 18,*/}
          {/*      },*/}
          {/*    ]}>*/}
          {/*    {t('Remember')}*/}
          {/*  </Text>*/}
          {/*</TouchableOpacity>*/}

          <View
            style={{
              // justifyContent:'center',
              // alignSelf:'center',
              alignItems: 'center',
              marginVertical: 30,
              // textAlign:'center'
            }}>
            <VegUrbanCommonBtn
              height={45}
              width={'100%'}
              borderRadius={20}
              textSize={18}
              text={'Sign In'}
              textColor={theme.colors?.text}
              backgroundColor={theme.colors?.colorPrimary}
              // onPress={() => {
              //   closeSignUpModal();
              // }}
              onPress={() => {
                handleButtonPress();
                // navigation.navigate('ForgotPageNext');

                // if (email) {
                //   // navigation.navigate('MainContainer');
                //   closeSignUpModal();
                // } else {
                //   ShowToastMessage('Please enter mobile number');
                // }
              }}
              textStyle={{
                fontFamily: FONTS?.bold,
              }}
            />
          </View>
          <View
            style={{
              //  marginHorizontal:10,
              marginBottom: 20,
              // marginTop: 20,
              // flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text
              // onPress={() => navigation.navigate('ForgotPassword')}
              onPress={() => ShowToastMessage('Coming soon')}
              style={[
                styles.head,
                {
                  marginLeft: 5,
                  marginTop: 25,
                  color: theme?.colors?.textColor,
                  fontFamily: FONTS?.regular,
                },
              ]}>
              Forgot the password?
              {/* {!show ? ('Dont have an account?') : ' '} */}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} />
          </View>
          <View style={styles.container}>
            <View style={styles.line} />
            <Text
              style={[
                styles.text,
                {
                  alignItems: 'center',
                  textAlign: 'center',

                  fontFamily: FONTS?.regular,
                  color: theme?.colors?.textColor,
                },
              ]}>
              {!show ? t('or Continue with') : ' '}
            </Text>
            <View style={styles.line} />
          </View>

          <View
            style={{
              paddingVertical: 25,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => ShowToastMessage('FB Login')}
              activeOpacity={0.8}
              style={{
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderWidth: 0.5,
                borderColor: theme?.colors?.bg_color,
                backgroundColor: theme?.colors?.bg_color,
                borderRadius: 15,
                marginHorizontal: 15,
              }}>
              <Image
                source={{
                  uri: 'https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png',
                }}
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'cover',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => ShowToastMessage('Google Login')}
              activeOpacity={0.8}
              style={{
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderWidth: 0.5,
                borderColor: theme?.colors?.bg_color,
                backgroundColor: theme?.colors?.bg_color,
                borderRadius: 15,
                marginHorizontal: 15,
              }}>
              <Image
                source={{
                  uri: 'data:image/png;base64,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',
                }}
                style={{
                  resizeMode: 'center',
                  height: 30,
                  width: 30,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => ShowToastMessage('Apple Login')}
              activeOpacity={0.8}
              style={{
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderWidth: 0.5,
                borderColor: theme?.colors?.bg_color,
                backgroundColor: theme?.colors?.bg_color,
                borderRadius: 15,
                marginHorizontal: 15,
              }}>
              <Image
                source={{
                  uri: 'https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png',
                }}
                style={{
                  height: 30,
                  resizeMode: 'cover',
                  width: 30,
                  tintColor: theme.colors?.white,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              //  marginHorizontal:10,
              marginBottom: 20,
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={[
                styles.head,
                {
                  marginLeft: 5,
                  color: theme?.colors?.textColor,
                  fontFamily: FONTS?.regular,
                },
              ]}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text
                style={[
                  styles.head,
                  {
                    marginLeft: 5,
                    color: theme?.colors?.textColor,
                    fontFamily: FONTS?.bold,
                  },
                ]}>
                {!show ? t('Sign Up') : ' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  backIcon: {
    marginTop: 15,
    marginStart: 15,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  heading: {
    // fontFamily: 'OpenSans-Regular',

    fontFamily: FONTS?.bold,
    // textAlign: 'center',
    fontSize: 45,
    color: COLORS.black,
    // marginTop: 5,
  },
  heading11: {
    fontFamily: FONTS?.regular,

    // fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.gray,
    marginTop: 8,
  },
  error: {
    color: COLORS.red,
    paddingTop: 4,
    fontSize: 13,
    fontFamily: FONTS?.bold,

    // fontFamily: 'Quicksand-Regular',
  },
  head: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  app_logo: {
    height: 90,
    resizeMode: 'stretch',
    alignSelf: 'center',
    width: '35%',
    marginTop: 30,
    // resizeMode: 'cover',
    marginBottom: 30,
    // borderRadius: 100,
    // padding: 50,
    // margin: 20
  },
  forgot_text: {
    fontSize: 14,
    fontFamily: FONTS?.regular,

    // fontFamily: 'OpenSans-Medium',
    color: COLORS.gray,
    marginBottom: 20,
    marginEnd: 30,
    marginTop: 10,

    // marginVertical: 25,
    // flexDirection:'flex-end'
    // textDecorationLine: 'underline',
  },
  resendWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  resendWrapperText: {
    fontFamily: 'OpenSans-Medium',
    color: COLORS.colorPrimary,
    marginStart: 5,
  },
  msg_privacy_terms: {
    color: COLORS.black,
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    flex: 1,
  },
  checkboxContainer: {
    // backgroundColor: 'transparent', // Remove the default background color
    borderWidth: 0, // Remove the border
    padding: 0, // Remove padding
    height: 20,
    width: 10,
    borderColor: COLORS?.black, // Line color
  },
  containerRemember: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Center items vertically
    marginVertical: 5,
    marginLeft: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 40,
    marginBottom: 20,
    marginTop: 20,
    // textAlign:'center'
  },
  line: {
    flex: 1,
    height: 0.5,
    backgroundColor: COLORS?.gray,
    alignItems: 'center',
    marginTop: 5,
  },
  text: {
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.black,
    // marginTop: 10,  },
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    // borderWidth: 0.2,
    alignSelf: 'center',
    marginVertical: 12,
    // backgroundColor: theme?.colors?.bg_color,
    // borderColor: COLORS?.bg_color,
    // placeholderTextColor:theme?.colors?.textColor,

    // placeholderTextColor: COLORS.editTextBorder,
    paddingHorizontal: 10,
    height: 55,
    marginHorizontal: 0,
    // borderRadius: 10,
    fontFamily: 'Quicksand-Regular',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});
