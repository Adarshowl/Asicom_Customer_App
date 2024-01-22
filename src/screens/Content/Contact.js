import {I18nManager, SafeAreaView, Text, TextInput, View} from 'react-native';
import React, {useContext} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import {ShowToastMessage} from '../../utils/Utility';
import themeContext from '../../constants/themeContext';
import {useTranslation} from 'react-i18next';

const Contact = ({navigation}) => {
  const theme = useContext(themeContext);
  const {t} = useTranslation();

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
        <ToolBarIcon
          title={Ionicons}
          iconName={'chevron-back'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            marginEnd: 10,
            backgroundColor: theme?.colors?.toolbar_icon_bg,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <VegUrbanCommonToolBar
          title={t('contact_us')}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
          }}
        />
      </View>
      <TextInput
        style={{
          width: '95%',
          height: 56,
          marginTop: 15,
          backgroundColor: theme?.colors?.toolbar_icon_bg,
          textAlign: I18nManager.isRTL ? 'right' : 'left',

          color: theme.colors.white,

          fontFamily: 'OpenSans-Regular',
          alignSelf: 'center',
          paddingHorizontal: 10,
          fontSize: 16,
        }}
        placeholder={t('enter_your_email')}
        placeholderTextColor={theme?.colors?.gray}
      />
      <TextInput
        style={{
          width: '95%',
          height: 180,
          backgroundColor: theme?.colors?.toolbar_icon_bg,
          color: theme.colors.white,
          marginTop: 15,

          fontFamily: 'OpenSans-Regular',
          alignSelf: 'center',
          textAlign: I18nManager.isRTL ? 'right' : 'left',
          fontSize: 16,
          paddingHorizontal: 10,
          paddingVertical: 10,
          textAlignVertical: 'top',
        }}
        placeholderTextColor={theme?.colors?.gray}
        maxLength={300}
        placeholder={t('enter_your_query')}
        multiline={true}
      />
      <Text
        style={{
          fontSize: 12,
          fontFamily: 'OpenSans-Regular',
          color: theme?.colors?.gray,

          marginStart: 15,
          marginEnd: 15,
          marginTop: 15,
        }}>
        {t('max_300_words')}
      </Text>

      <VegUrbanCommonBtn
        height={60}
        width={'95%'}
        borderRadius={5}
        textSize={16}
        marginHorizontal={10}
        textColor={theme?.colors?.text}
        text={t('submit')}
        marginTop={20}
        backgroundColor={theme?.colors?.colorPrimary}
        onPress={() => {
          ShowToastMessage('Thanks for contacting us');
          ShowToastMessage('We will contant you soon!');
          navigation.goBack();
        }}
        textStyle={{
          fontFamily: 'OpenSans-Medium',
        }}
      />
    </SafeAreaView>
  );
};

export default Contact;
