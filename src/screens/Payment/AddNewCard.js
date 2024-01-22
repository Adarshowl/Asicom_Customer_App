import React, {useContext, useState} from 'react';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FONTS} from '../../constants/Fonts';
import {COLORS} from '../../constants/Colors';
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanEditText from '../../utils/EditText/VegUrbanEditText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import {ShowToastMessage} from '../../utils/Utility';
import themeContext from '../../constants/themeContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const AddNewCard = ({navigation}) => {
  const theme = useContext(themeContext);
  const [addressDefault, setAddressDefault] = useState(false);
  const [show, setShow] = useState(false);
  const error = '';
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPwd, setConfirmPwd] = useState('');

  const [expiryDate, setExpiryDate] = useState('');

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const currentDate = new Date();

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    setSelectedDate(date);
    hideDatePicker();
  };
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const [focused, setFocused] = React.useState(false);
  const [focused2, setFocused2] = React.useState(false);

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
  const getBorderWidth2 = () => {
    if (error) {
      return 1;
    }
    if (focused2) {
      return 1;
    } else {
      return 0.2;
    }
  };

  const getBorderColor2 = () => {
    if (error) {
      return COLORS.red;
    }

    if (focused2) {
      return theme?.colors?.colorPrimary;
    } else {
      return COLORS.bg_color;
    }
  };

  const getBgColor2 = () => {
    if (error) {
      return COLORS.red;
    }
    if (focused2) {
      return theme?.colors?.bg;
    } else {
      // return COLORS.lightest_gray1;
      // return COLORS.bg_color;
      return theme?.colors?.bg;
    }
  };
  const closeSignUpModal = () => {
    setShow(!show);
  };

  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeToggle = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainer,
        {
          backgroundColor: theme?.colors?.colorPrimary,
        },
      ]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          GlobalStyle.loginModalBg,
          {
            backgroundColor: theme.colors?.bg_color_onBoard,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Ionicons
              name="ios-arrow-back"
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
                },
              ]}>
              {!show ? 'Add New Card' : ''}
            </Text>
          </View>
          <MaterialCommunityIcons
            name={'dots-horizontal-circle-outline'}
            size={26}
            // color={COLORS.colorPrimary}
            style={{
              marginEnd: 10,
            }}
            color={theme?.colors?.textColor}
          />
        </View>
        <View
          style={[
            GlobalStyle.loginModalBg,
            {
              backgroundColor: theme.colors?.bg_color_onBoard,
            },
          ]}>
          <Image
            //    source={images.app_logo}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5G4pgiDY9kZxmPh26ojbcRvwyQF9pMjVyOA&usqp=CAU',
            }}
            style={styles.app_logo}
          />

          <View
            style={
              {
                // marginTop: '3%',
                // alignItems: 'center'
              }
            }>
            <VegUrbanEditText
              placeholder="Card Name"
              label="Card Name"
              iconPosition={'left'}
              // value={email}
              style={{
                color: theme?.colors?.white,
              }}
              textStyle={{
                fontFamily: FONTS?.regular,
              }}
              keyBoardType={'email-address'}
              // onChangeText={v => setEmail(v)}
            />
            <VegUrbanEditText
              placeholder="Card Number"
              label="Card Number"
              style={{
                color: theme?.colors?.white,
              }}
              textStyle={{
                fontFamily: FONTS?.regular,
              }}
              keyBoardType={'number-pad'}
              // onChangeText={v => setEmail(v)}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginRight: -18,
                justifyContent: 'space-evenly',
              }}>
              <View
                style={{
                  // width: '30%',
                  flex: 1,
                  marginEnd: 20,
                }}>
                <Text
                  style={[
                    ,
                    // styles.label
                    {
                      color: theme?.colors?.textColor,
                      marginLeft: 6,
                      marginTop: 4,
                      fontSize: 18,
                      // color: COLORS.black,
                      // fontWeight:'bold',
                      fontFamily: FONTS?.regular,
                    },
                  ]}>
                  Expiry Date
                </Text>
                <View
                  style={[
                    styles.textView,
                    {
                      borderColor: getBorderColor2(),
                      // flexDirection: getFlexDirection(),
                    },
                    {
                      shadowOffset: {
                        width: 3,
                        height: 3,
                      },
                    },
                    {
                      backgroundColor: getBgColor2(),
                      borderWidth: getBorderWidth2(),
                      borderRadius: 12,
                      // elevation: getElevation(),
                    },
                  ]}>
                  <TextInput
                    keyboardType="number-pad"
                    maxLength={10}
                    textAlign={I18nManager.isRTL ? 'right' : 'left'}
                    placeholder="Expiry Date"
                    value={
                      selectedDate ? selectedDate.toLocaleDateString() : ''
                    }
                    placeholderTextColor={theme?.colors?.textColor}
                    editable={false}
                    // onChangeText={(v) => setConfirmPwd(v)}
                    style={{
                      flex: 1,
                      // paddingLeft: 20,
                      color: theme?.colors?.textColor,
                      fontFamily: FONTS?.regular,
                    }}
                    onFocus={() => {
                      setFocused2(true);
                    }}
                    onBlur={() => {
                      setFocused2(false);
                    }}
                  />
                  <TouchableOpacity onPress={showDatePicker}>
                    <AntDesign
                      name="calendar"
                      size={22}
                      color={theme?.colors?.grey}
                      style={{
                        paddingEnd: 5,
                      }}
                    />
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    minimumDate={currentDate}
                    onCancel={hideDatePicker}
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  paddingEnd: 0,
                }}>
                <View style={{}}>
                  <Text
                    style={[
                      ,
                      // styles.label
                      {
                        color: theme?.colors?.textColor,
                        marginLeft: 5,
                        marginTop: 4,
                        fontSize: 18,
                        fontFamily: FONTS?.regular,
                      },
                    ]}>
                    CVV
                  </Text>
                </View>
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
                  <TextInput
                    textAlign={I18nManager.isRTL ? 'right' : 'left'}
                    placeholder="CVV"
                    maxLength={3}
                    // value={ConfirmPwd}
                    placeholderTextColor={theme?.colors?.textColor}
                    keyboardType="numeric"
                    // onChangeText={(v) => setConfirmPwd(v)}
                    style={{
                      flex: 1,
                      // paddingLeft: 20,
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
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginBottom: 5,
            marginTop: '35%',
          }}>
          <VegUrbanCommonBtn
            height={40}
            width={'100%'}
            borderRadius={20}
            textSize={18}
            text={'Add'}
            textColor={theme?.colors?.text}
            backgroundColor={theme.colors?.colorPrimary}
            onPress={() => {
              navigation.goBack('Payment');
              ShowToastMessage('Add Card Sccefully');
            }}
            textStyle={{
              fontFamily: FONTS?.bold,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddNewCard;

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
    marginLeft: 20,
  },
  resend: {
    marginTop: 15,
    paddingVertical: 5,
    fontFamily: 'OpenSans-Mulish',
    textAlign: 'center',
    fontSize: 22,
    color: COLORS.black,
    marginTop: 20,
    // marginBottom: 8,
    // marginBottom: 20
  },
  txt: {
    marginTop: 10,
    paddingVertical: 20,
    fontFamily: 'OpenSans-Mulish',
    // textAlign: 'center',
    fontSize: 18,
    color: COLORS.black,
    // marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
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
    height: 180,
    resizeMode: 'stretch',
    alignSelf: 'center',
    width: '100%',
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

  textView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: '90%',

    // borderWidth: 0.2,
    // alignSelf: 'center',
    marginVertical: 12,
    // backgroundColor: theme?.colors?.bg_color,
    // borderColor: COLORS?.bg_color,
    // placeholderTextColor:theme?.colors?.textColor,

    // placeholderTextColor: COLORS.editTextBorder,
    paddingHorizontal: 10,
    height: 55,
    // marginHorizontal: 0,
    // borderRadius: 10,
    fontFamily: 'Quicksand-Regular',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});
