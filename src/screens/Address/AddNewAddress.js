import React, {useContext, useState} from 'react';
import {
  I18nManager,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FONTS} from '../../constants/Fonts';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import {images} from '../../constants';
import {COLORS} from '../../constants/Colors';
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanEditText from '../../utils/EditText/VegUrbanEditText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import {
  ShowConsoleLogMessage,
  ShowToastMessage,
  validateEmail,
  validateFieldNotEmpty,
} from '../../utils/Utility';
import themeContext from '../../constants/themeContext';
import {useTranslation} from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {addUserAddress} from '../../redux/actions/CartApi';
import {showProgressBar} from '../../redux/actions';

const AddNewAddress = ({navigation}) => {
  const theme = useContext(themeContext);
  const [addressDefault, setAddressDefault] = useState(false);

  const {t, i18n} = useTranslation();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [addressDetail, setAddressDetail] = useState('');

  const dispatch = useDispatch();
  const userToken = useSelector(state => state?.state?.userToken);

  const handleSubmit = () => {
    if (validateFieldNotEmpty(name)) {
      ShowToastMessage('Please enter name');
    } else if (validateFieldNotEmpty(email)) {
      ShowToastMessage('Please enter email');
    } else if (!validateEmail(email)) {
      ShowToastMessage('Please enter valid email');
    } else if (validateFieldNotEmpty(mobile)) {
      ShowToastMessage('Please enter mobile');
    } else if (mobile?.length < 10) {
      ShowToastMessage('Please enter valid mobile number');
    } else if (validateFieldNotEmpty(addressDetail)) {
      ShowToastMessage('Please enter address detail');
    } else {
      dispatch(showProgressBar(true));

      dispatch(() => {
        addUserAddress(
          dispatch,
          navigation,
          userToken,
          name,
          email,
          mobile,
          addressDetail,
          addressDefault,
          successCallback,
          errorCallback,
          BannerErrorCallback,
        );
      });
    }
  };

  const successCallback = async data => {
    // ShowConsoleLogMessage('successCallback called after');
    dispatch(showProgressBar(false));
    navigation.goBack();
    ShowToastMessage(data?.message || 'Something went wrong.');
  };

  const errorCallback = async data => {
    dispatch(showProgressBar(false));
    setTimeout(() => {
      ShowToastMessage(data?.message || 'Something went wrong.');
    }, 100);
  };

  const BannerErrorCallback = error => {
    ShowConsoleLogMessage('Banner call back called');
    dispatch(showProgressBar(false));
    ShowConsoleLogMessage(error);
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainer,
        {
          backgroundColor: theme?.colors?.colorPrimary,
        },
      ]}>
      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme.colors.bg_color_onBoard,
          },
        ]}>
        <Ionicons
          name="ios-arrow-back"
          color={theme.colors.textColor}
          size={25}
          style={[
            styles.backIcon,
            {
              transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
              marginStart: 18,
              marginTop: 10,
            },
          ]}
          onPress={() => {
            navigation.goBack();
          }}
        />

        <VegUrbanCommonToolBar
          title="Add New Address"
          // title={route?.params?.item?.name + ''}

          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 20,
          }}
          textStyle={{
            color: theme.colors.textColor,
            fontSize: 20,
          }}
        />
      </View>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        style={[
          {
            backgroundColor: theme.colors?.bg_color_onBoard,
            flex: 1,
          },
        ]}>
        <Image source={images.address} style={styles.app_logo} />
        <View
          style={[
            GlobalStyle.loginModalBg,
            {
              backgroundColor: theme.colors?.bg_color_onBoard,
            },
          ]}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              styles.head,
              {
                color: theme?.colors?.colorPrimary,
                marginTop: 10,
                textAlign: 'center',
              },
            ]}>
            Address Detail
          </Text>
          <View style={styles.divLine} />

          <View
            style={{
              marginTop: 10,
            }}>
            <VegUrbanEditText
              placeholder="Enter your name"
              label="Name"
              iconPosition={'left'}
              style={{
                color: theme?.colors?.white,
                fontFamily: FONTS?.regular,
              }}
              lableStyle={{
                fontFamily: FONTS?.regular,
              }}
              textStyle={{}}
              value={name}
              keyBoardType={'default'}
              maxLength={100}
              onChangeText={v => setName(v)}
            />

            <VegUrbanEditText
              placeholder="Enter email address"
              label="Email Address"
              iconPosition={'left'}
              style={{
                color: theme?.colors?.white,
                fontFamily: FONTS?.regular,
              }}
              lableStyle={{
                fontFamily: FONTS?.regular,
              }}
              textStyle={{}}
              value={email}
              keyBoardType={'email-address'}
              maxLength={100}
              onChangeText={v => setEmail(v)}
            />

            <VegUrbanEditText
              placeholder="Enter mobile number"
              label="Mobile Number"
              iconPosition={'left'}
              style={{
                color: theme?.colors?.white,
                fontFamily: FONTS?.regular,
              }}
              lableStyle={{
                fontFamily: FONTS?.regular,
              }}
              textStyle={{}}
              value={mobile}
              keyBoardType={'number-pad'}
              maxLength={10}
              onChangeText={v => setMobile(v)}
            />
            <VegUrbanEditText
              placeholder="Address Detail"
              label="Address Detail"
              style={{
                color: theme?.colors?.white,
                fontFamily: FONTS?.regular,
              }}
              value={addressDetail}
              maxLength={100}
              onChangeText={v => setAddressDetail(v)}
              textStyle={{}}
              multiline={true}
              keyBoardType={'default'}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setAddressDefault(!addressDefault);
              }}
              style={[
                {
                  flex: 1,
                  marginVertical: 15,
                  marginBottom: 25,
                },
                GlobalStyle.flexRowAlignCenter,
              ]}>
              <MaterialCommunityIcons
                name={
                  addressDefault ? 'checkbox-marked' : 'checkbox-blank-outline'
                }
                size={22}
                color={theme.colors.colorPrimary}
              />
              <Text
                style={[
                  GlobalStyle.addUpSelectionText,
                  {
                    color: theme.colors.textColor,
                    fontFamily: FONTS?.medium,
                    // marginBottom:10,
                    marginLeft: 18,
                  },
                ]}>
                {t('Make this as the default address')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 10,
          }}>
          <VegUrbanCommonBtn
            height={45}
            width={'100%'}
            borderRadius={20}
            textSize={16}
            textColor={theme?.colors?.text}
            text={'Add '}
            backgroundColor={theme?.colors?.colorPrimary}
            onPress={() => {
              handleSubmit();
              // navigation.goBack('Address');
              // ShowToastMessage('Add Address');
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

export default AddNewAddress;

const styles = StyleSheet.create({
  backIcon: {
    // marginTop: 18,
    marginStart: 15,
    paddingVertical: 5,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  divLine: {
    height: 0.5,
    width: '95%',
    backgroundColor: COLORS.gray,
    alignSelf: 'center',
    marginVertical: 5,
    marginTop: 10,
  },
  head: {
    // marginTop: 15,
    paddingVertical: 5,
    fontFamily: FONTS?.bold,
    // textAlign: 'center',
    fontSize: 20,
    color: COLORS.black,
    // marginTop: 8,
    // marginBottom: 8,
    // marginBottom: 20
    // marginLeft: 20
  },
  resend: {
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
    fontFamily: FONTS.medium,
    // textAlign: 'center',
    fontSize: 18,
    color: COLORS.black,
    // marginTop: 20,
    marginBottom: 10,
    // marginBottom: 20
  },
  heading: {
    fontFamily: 'OpenSans-Mulish',
    // textAlign: 'center',
    fontSize: 20,
    color: COLORS.gray,
    marginTop: 8,
    // fontWeight: 'bold',
    marginBottom: 20,
  },
  app_logo: {
    height: 320,
    resizeMode: 'cover',
    // alignSelf: 'center',
    width: '100%',
    // marginTop: 30,
    // marginBottom: 20
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
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: '90%',
    marginVertical: 12,
    paddingHorizontal: 10,
    height: 55,
    fontFamily: 'Quicksand-Regular',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});
