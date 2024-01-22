import React, { useContext, useRef, useState } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  I18nManager,
  ScrollView
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Snackbar from 'react-native-snackbar';
import { FONTS } from '../../../constants/Fonts';

import { STRING, images } from '../../../constants';
import { COLORS } from '../../../constants/Colors';
import GlobalStyle from '../../../styles/GlobalStyle';
import VegUrbanEditText from '../../../utils/EditText/VegUrbanEditText'
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import VegUrbanFloatEditText from '../../../utils/EditText/VegUrbanFloatEditText';
import VegUrbanCommonBtn from '../../../utils/VegUrbanCommonBtn';
import OtpInputs from 'react-native-otp-inputs';
import { ShowToastMessage } from '../../../utils/Utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import themeContext from '../../../constants/themeContext';
import { useTranslation } from 'react-i18next';

const ForgotPassword = ({ navigation }) => {
  const theme = useContext(themeContext);
  const { t, i18n } = useTranslation();

  const [mobile, setMobile] = useState('');
  const [refer, setRefer] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [focused, setFocused] = useState(false);
  const phoneInput = useRef(null);
  const [mobileNumber, setMobileNumber] = useState('');

  const [show, setShow] = useState(false);
 
  const isEmailValid = (email) => {
    // Regular expression for email validation
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const handleButtonPress = () => {
    if (isEmailValid(email)) {
      navigation.navigate('ForgotPageNext' ,{ userEmail: email })
      // Email is valid, proceed to the next step or action
      // For example, navigate to 'ForgotPageNext'
    } else {
      Snackbar.show({
        text: 'Invalid Email',
        duration: Snackbar.LENGTH_LONG, 
      });
    }
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
      
      style={[
        GlobalStyle.loginModalBg,
        {
          backgroundColor: theme.colors?.bg_color_onBoard,
        },
      ]}
      >
        <View style={{
          flexDirection:"row",
          alignItems:'center'
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
                fontFamily:FONTS?.bold

              },
            ]}>
            {!show ? t('Forgot the password?') : ''}
          </Text>
        </View>
        <View
          style={[
            GlobalStyle.loginModalBg,
            {
              
              marginHorizontal:-10,
              backgroundColor: theme.colors?.bg_color_onBoard,

            },
          ]}>
        
          <Image
            source={images.forgot} 
            // source={{
            //   uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcW4iOEiQTXemUWb3nSbbXCsWQOAFo3QyWRw&usqp=CAU"
            // }}
            style={styles.app_logo}
          />
          <Text
            style={[
              styles.heading,
              {
                color: theme?.colors?.textColor,
              },
            ]}>
            {!show ? t('Forgot password') : ''}
            {/* {!show ? t(' use to reset your password') : ''} */}

          </Text>
          <VegUrbanEditText
            placeholder="Enter Your Email"
            // label={STRING.email}
            iconPosition={'left'}
            style={{
              color: theme?.colors?.white

            }}
            value={email}
            icon={
              <Fontisto name={"email"} size={20}
              color={theme?.colors?.grey}
                style={{

                  marginHorizontal: 15,

                }} />
            }
            keyBoardType={'email-address'}
            onChangeText={v => setEmail(v)}
          />
        
          <VegUrbanCommonBtn
              height={45}
              width={'100%'}
              borderRadius={20}
              textSize={18}
              fontWeight={'bold'}
              marginTop={20}
              // marginTop={'80%'}

              text={"Continue"}
              // text={email ? t('verify_otp') : t('get_otp')}
              textColor={theme.colors?.btnTextColor}
              backgroundColor={theme.colors?.colorPrimary}
              onPress={() => {
                handleButtonPress()
                // navigation.navigate('ForgotPageNext');
              }}

              textStyle={{
                fontFamily:FONTS?.bold

              }}
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  backIcon: {
    // marginTop: 18,
    marginStart: 15,
    paddingVertical: 5,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  head:{
    // marginTop: 15,
    paddingVertical: 5,
    textAlign: 'center',
    fontSize: 22,
    color: COLORS.black,
    marginLeft:18
  },
  heading: {
    // textAlign: 'center',
    fontSize: 20,
    color: COLORS.gray,
    marginTop: 8,
    marginBottom: 8,
    // fontWeight: 'bold',
    marginBottom: 20,
    fontFamily:FONTS?.medium

  },
  app_logo: {
    height: 250,
    resizeMode: 'stretch',
    alignSelf: 'center',
    width: '70%',
    marginTop: 30,
    marginBottom: 20,
    borderRadius:15

  },
  forgot_text: {
    fontSize: 14,
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
});
