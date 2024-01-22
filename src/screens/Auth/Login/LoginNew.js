import React, {useContext, useRef, useState} from 'react';
import {
  I18nManager,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {images, STRING} from '../../../constants';
import {COLORS} from '../../../constants/Colors';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import GlobalStyle from '../../../styles/GlobalStyle';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanEditText from '../../../utils/EditText/VegUrbanEditText';
import VegUrbanFloatEditText from '../../../utils/EditText/VegUrbanFloatEditText';
import VegUrbanCommonBtn from '../../../utils/VegUrbanCommonBtn';
import OtpInputs from 'react-native-otp-inputs';
import PhoneInput from 'react-native-phone-number-input';
import {ShowToastMessage} from '../../../utils/Utility';
import themeContext from '../../../constants/themeContext';
import '../../../assets/i18n/i18n';
import {useTranslation} from 'react-i18next';
// import {useDispatch} from 'react-redux';

const Login = ({navigation}) => {
  const theme = useContext(themeContext);
  const {t, i18n} = useTranslation();

  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [refer, setRefer] = useState('');
  const [terms, setTerms] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [focused, setFocused] = useState(false);
  const phoneInput = useRef(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  // const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showAfter, setShowAfter] = useState(false);

  const closeSignUpModal = () => {
    setShow(!show);
  };

  const renderSignUpModal = () => {
    return (
      <Modal
        visible={show}
        animationType="slide"
        style={{flexGrow: 1}}
        transparent={true}
        onRequestClose={() => {
          closeSignUpModal();
        }}>
        <View style={GlobalStyle.signupModalBg}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={GlobalStyle.signupModalBgTrans}
          />
          <View
            style={[
              GlobalStyle.loginModalBg,
              {
                alignItems: 'center',
                paddingHorizontal: 15,
                flex: 0.85,
                backgroundColor: theme.colors?.bg_color_onBoard,
              },
            ]}>
            <Ionicons
              name="close"
              color={theme?.colors?.colorPrimary}
              size={25}
              style={[
                styles.backIcon,
                {
                  alignSelf: 'flex-end',
                  marginBottom: 10,
                  marginEnd: 15,
                },
              ]}
              onPress={() => {
                closeSignUpModal();
              }}
            />
            {showAfter ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  width: '100%',
                }}>
                <Text
                  style={[
                    styles.heading,
                    {
                      color: theme?.colors?.textColor,
                    },
                  ]}>
                  {t('personal_info')}
                </Text>
                <VegUrbanFloatEditText
                  label={t('name')}
                  iconPosition="left"
                  icon={
                    <Fontisto
                      name={'person'}
                      size={20}
                      color={COLORS.gray}
                      style={
                        {
                          // marginStart: 5,
                          // marginEnd: 10,
                          // marginTop: 5,
                          // alignSelf: 'center',
                          // width: 25,
                          // backgroundColor: 'red',
                        }
                      }
                    />
                  }
                  style={{
                    marginTop: 5,
                  }}
                  value={name}
                  onChangeText={value => {
                    setName(value);
                  }}
                  error={''}
                />
                <VegUrbanFloatEditText
                  label={t('email')}
                  iconPosition="left"
                  icon={
                    <MaterialIcons
                      name={'alternate-email'}
                      size={20}
                      color={COLORS.gray}
                      style={
                        {
                          // marginStart: 5,
                          // marginEnd: 10,
                          // marginTop: 5,
                          // alignSelf: 'center',
                          // width: 25,
                          // backgroundColor: 'green',
                        }
                      }
                    />
                  }
                  style={{
                    marginTop: 5,
                  }}
                  value={email}
                  onChangeText={value => {
                    setEmail(value);
                  }}
                  error={''}
                />
                <VegUrbanFloatEditText
                  label={t('refer')}
                  iconPosition="left"
                  icon={
                    <FontAwesome5
                      name={'user-friends'}
                      size={20}
                      color={COLORS.gray}
                      style={
                        {
                          // marginStart: 5,
                          // marginEnd: 15,
                          // marginTop: 5,
                          // alignSelf: 'center',
                          // width: 25,
                          // backgroundColor: 'blue',
                        }
                      }
                    />
                  }
                  style={{
                    marginTop: 5,
                  }}
                  value={refer}
                  onChangeText={value => {
                    setRefer(value);
                  }}
                  error={''}
                />
                <TouchableOpacity
                  activeOpacity={1.0}
                  onPress={() => setTerms(!terms)}
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    marginStart: 10,
                  }}>
                  <MaterialIcons
                    name={terms ? 'check-box' : 'check-box-outline-blank'}
                    size={20}
                    color={
                      terms
                        ? theme?.colors?.colorPrimary
                        : theme?.colors?.textColor
                    }
                    style={{
                      marginEnd: 10,
                      marginTop: 5,
                      alignSelf: 'center',
                    }}
                  />
                  <Text
                    style={[
                      styles.msg_privacy_terms,
                      {
                        color: theme?.colors?.textColor,
                      },
                    ]}>
                    {t('msg_privacy_terms')}
                  </Text>
                </TouchableOpacity>
                <VegUrbanCommonBtn
                  height={60}
                  width={'100%'}
                  borderRadius={5}
                  textSize={16}
                  textColor={theme?.colors?.btnTextColor}
                  text={t('submit')}
                  marginTop={30}
                  backgroundColor={theme?.colors?.colorPrimary}
                  onPress={() => {
                    // setShowAfter(!showAfter);
                    navigation.navigate('MainContainer');
                  }}
                  textStyle={{
                    fontFamily: 'OpenSans-Medium',
                  }}
                />
              </ScrollView>
            ) : (
              <>
                <Text
                  style={[
                    styles.heading,
                    {
                      color: theme.colors?.textColor,
                    },
                  ]}>
                  {t('verify_your_mobile')}
                </Text>
                <PhoneInput
                  ref={phoneInput}
                  containerStyle={[
                    GlobalStyle.phoneContainer,
                    {
                      backgroundColor: theme.colors?.bg_color_onBoard,
                      borderBottomColor: theme?.colors?.colorPrimary,
                    },
                  ]}
                  placeholder={t('mobile')}
                  placeholderTextColor={theme.colors?.white}
                  codeTextStyle={{color: theme.colors?.white}}
                  textInputStyle={{
                    fontFamily: 'OpenSans-Medium',
                    color: theme.colors?.white,
                  }}
                  countryPickerButtonStyle={{
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}
                  textContainerStyle={[
                    GlobalStyle.textContainerStyle,
                    {
                      backgroundColor: theme.colors?.bg_color_onBoard,
                    },
                  ]}
                  defaultValue={mobileNumber}
                  onChangeText={text => {
                    setMobileNumber(text);
                  }}
                  onChangeFormattedText={text => {
                    setMobileNumber(text);
                  }}
                  maxLength={10}
                />
                <View
                  style={{
                    alignItems: 'center',
                    height: 60,
                    marginTop: 10,
                  }}>
                  <OtpInputs
                    handleChange={code => setCode(code)}
                    numberOfInputs={6}
                    inputContainerStyles={[
                      GlobalStyle.inputContainerStyles,
                      {
                        borderColor: theme.colors?.colorPrimary,
                      },
                    ]}
                    selectTextOnFocus={() => {
                      setFocused(true);
                    }}
                    onBlur={() => {
                      setFocused(false);
                    }}
                    inputStyles={[
                      GlobalStyle.otpInputStyles,
                      {
                        color: theme.colors?.white,
                      },
                    ]}
                  />
                </View>
                <View style={styles.resendWrapper}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={GlobalStyle.flexRowAlignCenter}>
                    <MaterialIcons
                      name="message"
                      size={25}
                      color={theme?.colors?.colorPrimary}
                      style={{
                        marginStart: 15,
                      }}
                    />
                    <Text
                      style={[
                        styles.resendWrapperText,
                        {
                          color: theme?.colors?.colorPrimary,
                        },
                      ]}>
                      {t('resend')}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.resendWrapperText,
                      {
                        marginStart: 'auto',
                        marginEnd: 15,
                        color: theme?.colors?.colorPrimary,
                      },
                    ]}>
                    00:00
                  </Text>
                </View>
                <VegUrbanCommonBtn
                  height={60}
                  width={'85%'}
                  borderRadius={5}
                  textSize={16}
                  textColor={theme?.colors?.btnTextColor}
                  text={t('send_otp')}
                  marginTop={30}
                  backgroundColor={theme?.colors?.colorPrimary}
                  onPress={() => {
                    setShowAfter(!showAfter);
                  }}
                  textStyle={{
                    fontFamily: 'OpenSans-Medium',
                  }}
                />
              </>
            )}
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainer,
        {
          // backgroundColor: theme?.colors?.colorPrimary,
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
              paddingHorizontal: 15,
              backgroundColor: theme.colors?.bg_color_onBoard,
            },
          ]}>
          <Image
            source={images.app_logo}
            // source={{
            //   uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSobQQRyoyC5Eis7E-vAWkegS8NM0taHNCncQ&usqp=CAU'
            // }}
            style={styles.app_logo}
          />

          <Text
            style={[
              styles.heading,
              {
                color: theme?.colors?.colorPrimary,
              },
            ]}>
            {!show ? t('Welcome back!') : ' '}
          </Text>
          <Text
            style={[
              styles.heading11,
              {
                color: theme?.colors?.gray,
                marginHorizontal: 10,
                marginBottom: 30,
              },
            ]}>
            {!show ? t('Login to your existing account') : ' '}
          </Text>
          {/* <VegUrbanFloatEditText
          label={t('mobile')}
          iconPosition="left"
          icon={
            <Fontisto
              name={'mobile'}
              size={20}
              color={COLORS.gray}
              style={{
                marginStart: 5,
                marginEnd: 10,
                marginTop: 2,
                alignSelf: 'center',
              }}
            />
          }
          style={{
            marginTop: 5,
          }}
          value={mobile}
          keyBoardType="number-pad"
          maxLength={10}
          onChangeText={value => {
            setMobile(value);
          }}
          error={''}
        /> */}
          {/* {mobile ? (
          <View
            style={{
              alignItems: 'center',
              height: 60,
              marginTop: 10,
            }}>
            <OtpInputs
              handleChange={code => setCode(code)}
              numberOfInputs={6}
              inputContainerStyles={[
                GlobalStyle.inputContainerStyles,
                {
                  borderColor: theme.colors?.colorPrimary,
                },
              ]}
              selectTextOnFocus={() => {
                setFocused(true);
              }}
              onBlur={() => {
                setFocused(false);
              }}
              inputStyles={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                color: theme.colors?.white,
              }}
            />
          </View>
        ) : null} */}
          {/* <VegUrbanCommonBtn
          height={60}
          width={'97%'}
          borderRadius={5}
          textSize={16}
          text={mobile ? t('verify_otp') : t('get_otp')}
          marginTop={20}
          textColor={theme.colors?.btnTextColor}
          backgroundColor={theme.colors?.colorPrimary}
          onPress={() => {
            // if (mobile) {
            navigation.navigate('MainContainer');
            // } else  {
            //   ShowToastMessage('Please enter mobile number');
            // }
            // languageRestart();
          }}
          textStyle={{
            fontFamily: 'OpenSans-Medium',
          }}
        /> */}

          {/* <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: "100%",
            borderWidth: 1, borderColor: COLORS.gray,
            borderRadius: 10,
            marginTop: 10,
            // alinSelf:'center',
            // height:50

          }}>

            <FontAwesome name={"user-o"} size={20} color={COLORS.black} style={{
              marginHorizontal: 15
            }} />
            <VegUrbanEditText
              placeholder={STRING.emailHint}
              // label={STRING.email}
              // iconPosition={'right'}
              value={email}
              // icon={
              //   <Octicons
              //     name={'check-circle'}
              //     size={20}
              //     style={{
              //       marginHorizontal: 10,
              //     }}
              //   />
              // }
              keyBoardType={'email-address'}
              onChangeText={v => setEmail(v)}
            /> */}

          {/* </View> */}

          <VegUrbanEditText
            placeholder={STRING.emailHint}
            // label={STRING.email}
            iconPosition={'left'}
            value={email}
            icon={
              <FontAwesome
                name={'user-o'}
                size={20}
                color={COLORS.primary}
                style={{
                  marginHorizontal: 15,
                }}
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
            onChangeText={v => setEmail(v)}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              width: '90%',
              fontSize: 15,
              fontFamily: 'Gilroy-Bold',
              color: COLORS.primary,
              letterSpacing: 1,
              borderRadius: 20,
              borderWidth: 0.5,
              alignSelf: 'center',
              marginVertical: 12,
              paddingVertical: 2,
              backgroundColor: theme?.colors?.white,
              backgroundColor: COLORS?.white,

              // marginHorizontal:12,
              fontFamily: 'Quicksand-Regular',
              textAlign: I18nManager.isRTL ? 'right' : 'left',
            }}>
            {/* Left side lock icon */}
            <SimpleLineIcons
              name="lock"
              size={20}
              color={COLORS.primary}
              style={{
                marginHorizontal: 15,
                paddingLeft: 10,
              }}
            />
            {/* TextInput */}
            <TextInput
              placeholder={STRING?.pwd}
              secureTextEntry={!showOtp}
              value={password}
              onChangeText={v => setPassword(v)}
              style={{
                flex: 1, // To make the TextInput take up the remaining space
                paddingHorizontal: 6,
                // Adjust padding as needed
              }}
            />
            {/* Right side eye icon */}
            <TouchableOpacity onPress={() => setShowOtp(!showOtp)}>
              <Octicons
                name={showOtp ? 'eye' : 'eye-closed'}
                size={20}
                // onPress={() => setShowOtp(!showOtp)}
                color={COLORS.primary}
                style={{
                  marginHorizontal: 20,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text
            onPress={() => navigation.navigate('ForgotPassword')}
            style={[
              styles.forgot_text,
              {
                // color: theme.colors?.textColor,
                textAlign: 'right',
                color: '#1C65B1',
                fontWeight: 'bold',
              },
            ]}>
            {t('forgot_text')}
          </Text>

          <View
            style={{
              // justifyContent:'center',
              // alignSelf:'center',
              alignItems: 'center',
              // textAlign:'center'
            }}>
            <VegUrbanCommonBtn
              height={45}
              width={'90%'}
              borderRadius={10}
              textSize={18}
              fontWeight={'bold'}
              text={'Login'}
              textColor={theme.colors?.btnTextColor}
              backgroundColor={theme.colors?.colorPrimary}
              // onPress={() => {
              //   closeSignUpModal();
              // }}
              onPress={() => {
                // closeSignUpModal();
                navigation.navigate('MainContainer');
              }}
              textStyle={{
                fontFamily: 'OpenSans-Mulish',
                // textAlign:'center',
                // alinItem:'center'
              }}
            />
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
                  color: theme?.colors?.gray,
                  // marginHorizontal:10,
                  // marginBottom:20,
                  // marginTop:20
                  fontWeight: '600',
                },
              ]}>
              Don't have an account?
              {/* {!show ? ('Dont have an account?') : ' '} */}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text
                style={[
                  styles.head,
                  {
                    color: COLORS?.black,
                    marginLeft: 5,
                    // marginHorizontal:10,
                    // marginBottom:20,
                    // marginTop:20
                    fontWeight: 'bold',
                    color: theme?.colors?.textColor,
                  },
                ]}>
                {!show ? t('Sign Up') : ' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.line} />
            <Text
              //  style={styles.text}
              style={[
                styles.text,
                {
                  color: theme.colors?.textColor,
                  // textAlign: 'right',
                  // color: "#4B97F2",
                  fontWeight: '500',
                  fontSize: 16,
                  textAlign: 'center',
                  // marginLeft:15,
                },
              ]}>
              OR
            </Text>
            <View style={styles.line} />
          </View>
          <Text
            style={[
              styles.head,
              {
                color: theme?.colors?.gray,
                // marginHorizontal:10,
                // marginBottom:20,
                // marginTop:20
                fontWeight: '600',
              },
            ]}>
            SignUp with social networks
            {/* {!show ? t('SignUp with social networks') : ' '} */}
          </Text>
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
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderWidth: 0.5,
                borderColor: COLORS.gray,
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
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderWidth: 0.5,
                borderColor: COLORS.gray,
                marginHorizontal: 15,
                borderRadius: 15,
              }}>
              <Image
                source={{
                  uri: 'https://blog.hubspot.com/hubfs/image8-2.jpg',
                }}
                style={{
                  resizeMode: 'center',
                  height: 30,
                  width: 30,
                }}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => ShowToastMessage('Apple Login')}
              activeOpacity={0.8}
              style={{
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderWidth: 0.5,
                borderColor: COLORS.gray,
                marginHorizontal: 15,
                borderRadius: 15,
              }}>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png',
                }}
                style={{
                  height: 30,
                  resizeMode: 'cover',
                  width: 30,
                  tintColor: theme.colors?.white,
                }}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => ShowToastMessage('Twitter Login')}
              activeOpacity={0.8}
              style={{
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderWidth: 0.5,
                borderColor: COLORS.gray,
                marginHorizontal: 15,
                borderRadius: 15,
              }}>
              <Image
                source={{
                  uri: 'https://thumbs.dreamstime.com/b/twitter-logo-icon-voronezh-russia-january-light-blue-square-soft-shadow-171161281.jpg',
                }}
                style={{
                  resizeMode: 'center',
                  height: 30,
                  width: 30,
                }}
              />
            </TouchableOpacity>
          </View>
          {/* <VegUrbanCommonBtn
          height={50}
          width={'97%'}
          borderRadius={5}
          borderWidth={1}
          marginTop={5}
          borderColor={COLORS.colorPrimary}
          textSize={16}
          textColor={theme.colors?.textColor}
          text={t('continue_as_guest')}
          backgroundColor={theme.colors?.transparent}
          onPress={() => {
            navigation.navigate('MainContainer');
            // languageRestart();
          }}
          textStyle={{
            fontFamily: 'OpenSans-Medium',
            color: COLORS.colorPrimary,
          }}
        /> */}
        </View>

        {renderSignUpModal()}
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
    fontFamily: 'OpenSans-Regular',

    // fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
    fontSize: 25,
    color: COLORS.black,
    fontWeight: 'bold',
    marginTop: 8,
  },
  heading11: {
    fontFamily: 'OpenSans-Regular',

    // fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.gray,
    // fontWeight:'bold',
    marginTop: 8,
  },
  head: {
    // fontFamily: 'OpenSans-Regular',

    fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.black,
    // fontWeight:'bold',
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
    fontFamily: 'OpenSans-Regular',

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
  container: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Center items vertically
    marginHorizontal: 40,
    marginBottom: 20,
    marginTop: 20,
  },
  line: {
    flex: 1, // To make the line expand and fill available space
    height: 1, // Adjust the height of the line as needed
    backgroundColor: COLORS?.gray, // Line color
  },
  text: {
    paddingHorizontal: 10, // Add horizontal padding to the text
  },
});
