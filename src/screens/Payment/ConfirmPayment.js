import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FONTS} from '../../constants/Fonts';

import {icons, STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import GlobalStyle from '../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import OtpInputs from 'react-native-otp-inputs';
import {ShowToastMessage, validateFieldNotEmpty} from '../../utils/Utility';
import themeContext from '../../constants/themeContext';
import {useTranslation} from 'react-i18next';
import {useRoute} from '@react-navigation/native';

const ConfirmPayment = ({navigation}) => {
  const route = useRoute();
  const userEmail = route.params?.userEmail || '';

  const theme = useContext(themeContext);
  const {t, i18n} = useTranslation();
  const [focused, setFocused] = React.useState(false);
  const [isOTPValid, setIsOTPValid] = useState(false);

  const [mobile, setMobile] = useState('');
  const [refer, setRefer] = useState('');
  const [email, setEmail] = useState('');
  // const [focused, setFocused] = useState(false);
  const phoneInput = useRef(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [focusedInput, setFocusedInput] = useState(-1); // Initialize with an invalid value

  const [show, setShow] = useState(false);
  const [showAfter, setShowAfter] = useState(false);
  const [newPassShow, setNewPassShow] = useState(true);
  const [conPassShow, setConPassShow] = useState(true);
  const [newPass, setNewPass] = useState('');
  const [conPass, setConPass] = useState('');

  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30); // Set the initial timer value
  const [isTimerActive, setIsTimerActive] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(false);
  };

  // Close function (optional)
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const formatEmail = userEmail => {
    if (userEmail.length <= 3) {
      return userEmail;
    }
    const firstThree = userEmail.substring(0, 3);
    const dotDots = '*****';
    const atIndex = userEmail.indexOf('@');
    const domain = userEmail.substring(atIndex);
    return `${firstThree}${dotDots}${domain}`;
  };
  const error = '';
  const [code, setCode] = useState('');
  const handleInputFocus = index => {
    setFocusedInput(index);
  };

  // Function to handle input blur
  const handleInputBlur = () => {
    setFocusedInput(-1); // Reset to an invalid value when the input is blurred
  };

  const getBorderWidth = () => {
    if (error) {
      return 1;
    }
    if (focused) {
      return 1.5;
    } else {
      return 0.2;
    }
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
  // const closeSignUpModal = () => {
  //   setShow(!show);

  // };

  const onSubmitClick = () => {
    handleOTPpassword();
  };
  const handleOTPpassword = () => {
    if (validateFieldNotEmpty(code)) {
      ShowToastMessage('OTP is required');
    } else {
      navigation.navigate('PasswordConform');
    }
  };
  const handleOTPChange = otp => {
    setOtp(otp);
    setIsOTPValid(code.length === 4 && /^\d{4}$/.test(code));
  };

  // Function to start the timer
  const startTimer = () => {
    setIsTimerActive(true);
    setTimer(30); // Reset the timer to the initial value
  };

  // Function to handle OTP resend
  const handleResendOTP = () => {
    // Add your logic to resend OTP here
    // You can stop the timer, send a new OTP, and start the timer again
    startTimer();
  };

  useEffect(() => {
    let interval;
    if (isTimerActive) {
      interval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          setIsTimerActive(false);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    // Cleanup function
    return () => clearInterval(interval);
  }, [timer, isTimerActive]);

  const renderModal = () => {
    return (
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
        // onBackdropPress={closeModal}
        animationIn="slideInUp" // Specify the desired animation
        animationOut="slideOutDown"
        backdropOpacity={0.5} // Adjust the backdrop opacity
        style={styles.modal}>
        <View
          style={[
            styles.modalBackground,
            {
              // backgroundColor: theme.colors.transparent,
            },
          ]}>
          <View
            style={[
              styles.activityIndicatorWrapper,
              {
                // backgroundColor:'#1F222B',
                backgroundColor: theme.colors.orderplace,
              },
            ]}>
            <Image
              style={{
                width: 120,
                height: 120,
                alignItems: 'center',
                // alignSelf: 'center',
                // resizeMode: 'center',
                borderRadius: 10,
                marginTop: 50,
              }}
              // style={styles.itemImage}
              // source={{
              //     uri:'blob:https://web.whatsapp.com/56ca0fa5-b9ad-4739-8383-3db809a55475'
              // }}
              source={icons.order_successful}
            />
            {/* <Lottie
                            source={require('../../assets/animation/successful_order.json')}
                            autoPlay
                            loop={false}
                            style={{
                                height: 150,
                            }}
                        /> */}
            <Text
              style={[
                styles.order_placed,
                {
                  color: theme?.colors?.textColor,
                  marginTop: 20,
                  fontFamily: FONTS?.bold,
                },
              ]}>
              {STRING.order_placed1}
            </Text>
            <Text
              style={[
                styles.success_order,
                {
                  color: theme?.colors?.textColor,
                  marginBottom: 5,
                  marginTop: 20,
                },
              ]}>
              {STRING.success_order}
            </Text>

            <VegUrbanCommonBtn
              height={40}
              width={'80%'}
              borderRadius={30}
              textSize={16}
              marginTop={20}
              text={STRING.summary}
              textColor={theme?.colors?.text}
              backgroundColor={theme?.colors?.colorPrimary}
              // onPress={closeModal}

              onPress={() => {
                navigation.replace('Order');
              }}
              textStyle={{
                fontFamily: FONTS?.bold,
              }}
            />
            <VegUrbanCommonBtn
              height={40}
              width={'80%'}
              borderRadius={30}
              textSize={16}
              text={STRING.continue_shopping}
              textColor={theme?.colors?.text}
              backgroundColor={theme?.colors?.addtocart}
              marginTop={20}
              // onPress={closeModal}

              onPress={() => {
                navigation.replace('ERecipt', {
                  params: {
                    screen: 'Home',
                  },
                });
              }}
              textStyle={{
                fontFamily: FONTS?.bold,
              }}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      <ScrollView
        style={[
          GlobalStyle.loginModalBg,
          {
            // alignItems: 'center',
            // paddingHorizontal: 15,
            // backgroundColor: theme?.colors?.bg_gray,
            backgroundColor: theme.colors?.bg_color_onBoard,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Ionicons
            name="ios-arrow-back"
            // color={COLORS.black}
            color={theme.colors.textColor}
            size={25}
            style={[
              styles.backIcon,
              {
                opacity: !show ? 1 : 0.0,
              },
            ]}
            onPress={() => {
              navigation.goBack();
              // ShowToastMessage('Coming Soon!');
            }}
          />
          <Text
            style={[
              styles.head,
              {
                color: theme?.colors?.textColor,
                fontFamily: FONTS?.bold,
              },
            ]}>
            {!show ? t('Enter Your PIN') : ''}
          </Text>
        </View>
        <View
          style={[
            GlobalStyle.loginModalBg,
            {
              backgroundColor: theme.colors?.bg_color_onBoard,
            },
          ]}>
          <View
            style={{
              marginTop: '60%',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                numberOfLines={1}
                style={[
                  styles.txt,
                  {
                    color: theme?.colors?.textColor,
                    fontFamily: FONTS?.regular,
                  },
                ]}>
                {show ? '' : 'Enter your PIN to confirm payment'}

                {/* Code has been sent to {userEmail} */}
                {/* {!show ? '' : `Code has been sent to ${userEmail}`} */}
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  styles.txt,
                  {
                    color: theme?.colors?.textColor,
                    fontWeight: 'bold',
                    // marginHorizontal: 10
                    // paddingHorizontal:2
                  },
                ]}>
                {show ? '' : ` ${formatEmail(userEmail)}`}

                {/* Code has been sent to {userEmail} */}
                {/* {!show ? '' : `Code has been sent to ${userEmail}`} */}
              </Text>
            </View>

            <OtpInputs
              // code={otp}
              // handleChange={handleOTPChange}
              secureTextEntry={true}
              handleChange={code => setCode(code)}
              numberOfInputs={4}
              inputContainerStyles={{
                // borderWidth: 0.5,
                borderColor: focused
                  ? theme?.colors?.colorPrimary
                  : theme?.colors.grey,
                marginHorizontal: 3,
                height: 53,
                width: '22%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
                borderWidth: 1,
                // borderColor: getBorderColor(),

                backgroundColor: getBgColor(),
                // borderWidth: getBorderWidth(),

                // backgroundColor: focused ? COLORS.gray : COLORS.bg_color,
                // elevation: 5,
                color: theme?.colors?.blaxk,
                fontFamily: FONTS?.regular,
              }}
              selectTextOnFocus={() => {
                setFocused(false);
              }}
              onBlur={() => {
                setFocused(true);
              }}
              inputStyles={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                color: theme?.colors?.textColor,
              }}
            />
          </View>
        </View>
        {renderModal()}
      </ScrollView>
      <View
        style={{
          alignItems: 'center',
          marginTop: 10,
          marginBottom: 10,
        }}>
        <VegUrbanCommonBtn
          height={40}
          width={'90%'}
          borderRadius={20}
          textSize={18}
          fontWeight={'bold'}
          // marginTop={'70%'}
          text={t('Continue')}
          // justifyContent={'flex-end'}
          // alignItems={'flex-end'}
          textColor={theme?.colors?.text}
          backgroundColor={theme.colors?.colorPrimary}
          onPress={() => {
            setIsModalVisible(!isModalVisible);
          }}
          textStyle={{
            fontFamily: FONTS?.bold,
            fontWeight: 'bold',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ConfirmPayment;

const styles = StyleSheet.create({
  backIcon: {
    // marginTop: 18,
    marginStart: 15,
    paddingVertical: 5,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  head: {
    // marginTop: 15,
    paddingVertical: 5,
    fontFamily: 'OpenSans-Mulish',
    textAlign: 'center',
    fontSize: 22,
    color: COLORS.black,
    // marginTop: 8,
    // marginBottom: 8,
    fontWeight: 'bold',
    // marginBottom: 20
    marginLeft: 15,
  },
  resend: {
    marginTop: 15,
    paddingVertical: 5,
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    fontSize: 22,
    color: COLORS.black,
    marginTop: 20,
    // marginBottom: 8,
    // marginBottom: 20
  },
  txt: {
    marginTop: 15,
    paddingVertical: 20,
    textAlign: 'center',
    fontSize: 18,
    color: COLORS.black,
    // marginTop: 20,
    marginBottom: 20,
    // fontWeight: 'bold',
    // marginBottom: 20
  },
  heading: {
    fontFamily: 'OpenSans-Mulish',
    // textAlign: 'center',
    fontSize: 20,
    color: COLORS.gray,
    marginTop: 8,
    marginBottom: 8,
    // fontWeight: 'bold',
    marginBottom: 20,
  },
  app_logo: {
    height: 200,
    resizeMode: 'stretch',
    alignSelf: 'center',
    width: '60%',
    marginTop: 30,
    marginBottom: 20,
  },
  forgot_text: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: COLORS.black,
    marginVertical: 25,
    textDecorationLine: 'underline',
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
  textBox: {
    // borderWidth:0.2,
    width: '20%',
    height: 50,
    marginHorizontal: 4,
    borderRadius: 10,
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
  },
  textBoxes: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // textBox: {
  //   width: 50, // Adjust the width as needed
  //   height: 50, // Adjust the height as needed
  //   borderWidth: 1,
  //   borderColor: 'gray',
  //   textAlign: 'center',
  //   fontSize: 20,
  // },
  order_placed: {
    color: COLORS.black,
    fontSize: 22,
    fontFamily: FONTS?.regular,
    textAlign: 'center',
    marginTop: 10,
  },
  success_order: {
    color: COLORS.grey,
    fontSize: 16,
    fontFamily: FONTS?.medium,
    textAlign: 'center',
    marginTop: 10,
  },
  modal: {
    justifyContent: 'flex-end', // Position modal at the bottom
    marginHorizontal: 20, // Horizontal margin,
    // backgroundColor: 'blue',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000080',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    // width: SIZES.width - 20,
    paddingHorizontal: 20,
    alignSelf: 'center',
    // padding: 5,
    alignItems: 'center',
    width: '80%',
    height: 450,

    // marginHorizontal:80,
  },
});
