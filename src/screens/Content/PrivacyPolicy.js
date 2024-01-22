import {
  I18nManager,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import themeContext from '../../constants/themeContext';
import {useTranslation} from 'react-i18next';
import {FONTS} from '../../constants/Fonts';
import {useDispatch} from 'react-redux';
import {getPrivacyPolicy} from '../../redux/actions/HomeApi';
import {SIZES} from '../../constants';
import HTMLRender from 'react-native-render-html';
import {showProgressBar} from '../../redux/actions';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';

const PrivacyPolicy = ({navigation}) => {
  const [show, setShow] = useState('');
  const theme = useContext(themeContext);
  const {t} = useTranslation();
  const [privacyPolicy, setPrivacyPolicy] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showProgressBar(true));
    dispatch(() =>
      getPrivacyPolicy(
        dispatch,
        navigation,
        successCallback,
        failureCallback,
        errorCallback,
      ),
    );
  }, []);

  const successCallback = data => {
    dispatch(showProgressBar(false));
    setPrivacyPolicy(data?.response?.privacy_policy);
  };
  const failureCallback = data => {
    dispatch(showProgressBar(false));
    setPrivacyPolicy(data?.response?.privacy_policy);
  };
  const errorCallback = error => {
    dispatch(showProgressBar(false));
    ShowToastMessage(error);
    ShowConsoleLogMessage(error);
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme?.colors?.bg_color_onBoard,
          },
        ]}>
        {/* <ToolBarIcon
          title={Ionicons}
          iconName={'chevron-back'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            backgroundColor: theme?.colors?.toolbar_icon_bg,
            marginEnd: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        /> */}
        <Ionicons
          name="ios-arrow-back"
          // color={COLORS.black}
          color={theme.colors.white}
          size={25}
          style={[
            styles.backIcon,
            {
              opacity: !show ? 1 : 0.0,
              transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
              marginStart: 10,
            },
          ]}
          onPress={() => {
            navigation.goBack();
            // ShowToastMessage('Coming Soon!');
          }}
        />
        <VegUrbanCommonToolBar
          title={t('privacy_policy')}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.white,
            marginStart: 20,
            fontFamily: FONTS?.bold,
          }}
        />
      </View>
      {/*<View style={GlobalStyle.flexAlignJustifyCenter}>*/}
      {/*  <Text style={styles.text}>{STRING.terms_conditions} Page</Text>*/}
      {/*</View>*/}
      <ScrollView
        style={{
          flex: 1,
        }}>
        <View style={styles.container}>
          <HTMLRender
            source={{html: privacyPolicy}}
            contentWidth={SIZES.width} // Adjust the width as needed
            baseStyle={styles.plainTextContent}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
const styles = StyleSheet.create({
  text: {
    marginHorizontal: 15,
    marginTop: 20,
    fontFamily: 'OpenSans-Medium',
    color: COLORS.black,
    fontSize: 18,
  },
  container: {flex: 1},
  plainTextContent: {
    fontSize: 16,
    lineHeight: 25,
    padding: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
});
