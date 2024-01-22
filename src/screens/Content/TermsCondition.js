import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import themeContext from '../../constants/themeContext';
import {useTranslation} from 'react-i18next';

const TermsCondition = ({navigation}) => {
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
            backgroundColor: theme?.colors?.toolbar_icon_bg,
            marginEnd: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <VegUrbanCommonToolBar
          title={t('terms_conditions')}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
          }}
        />
      </View>
      {/*<View style={GlobalStyle.flexAlignJustifyCenter}>*/}
      {/*  <Text style={styles.text}>{STRING.terms_conditions} Page</Text>*/}
      {/*</View>*/}
      <ScrollView>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'OpenSans-SemiBold',
            marginStart: 15,
            color: theme?.colors?.textColor,
            marginEnd: 10,
            alignSelf: 'flex-start',
            marginTop: 15,
          }}>
          How we process data Ques 1 ?
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'OpenSans-Regular',
            marginStart: 15,
            marginEnd: 10,
            alignSelf: 'flex-start',
            marginTop: 8,
            color: theme?.colors?.textColor,
          }}>
          n publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available. Wikip
        </Text>
        <View
          style={{
            paddingVertical: 5,
          }}
        />
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'OpenSans-SemiBold',
            marginStart: 15,
            color: theme?.colors?.textColor,
            alignSelf: 'flex-start',
            marginEnd: 10,

            marginTop: 15,
          }}>
          How we process data Ques 2 ?
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'OpenSans-Regular',
            marginStart: 15,
            marginEnd: 10,
            alignSelf: 'flex-start',
            marginTop: 8,
            color: theme?.colors?.textColor,
          }}>
          n publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available. Wikip
        </Text>
        <View
          style={{
            paddingVertical: 5,
          }}
        />

        <Text
          style={{
            fontSize: 16,
            fontFamily: 'OpenSans-SemiBold',
            alignSelf: 'flex-start',
            marginStart: 15,
            color: theme?.colors?.textColor,

            marginEnd: 10,
            marginTop: 15,
          }}>
          How we process data Ques 1 ?
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'OpenSans-Regular',
            marginStart: 15,
            alignSelf: 'flex-start',
            marginEnd: 10,
            marginTop: 8,
            color: theme?.colors?.textColor,
          }}>
          n publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available. Wikip
        </Text>
        <View
          style={{
            paddingVertical: 5,
          }}
        />
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'OpenSans-SemiBold',
            marginStart: 15,
            color: theme?.colors?.textColor,
            alignSelf: 'flex-start',

            marginEnd: 10,
            marginTop: 15,
          }}>
          How we process data Ques 2 ?
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'OpenSans-Regular',
            marginStart: 15,
            marginEnd: 10,
            alignSelf: 'flex-start',
            marginTop: 8,
            color: theme?.colors?.textColor,
          }}>
          n publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available. Wikip
        </Text>
        <View
          style={{
            paddingVertical: 5,
          }}
        />

        <Text
          style={{
            fontSize: 16,
            fontFamily: 'OpenSans-SemiBold',
            marginStart: 15,
            color: theme?.colors?.textColor,
            alignSelf: 'flex-start',
            marginEnd: 10,

            marginTop: 15,
          }}>
          How we process data Ques 1 ?
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'OpenSans-Regular',
            marginStart: 15,
            marginEnd: 10,
            alignSelf: 'flex-start',
            marginTop: 8,
            color: theme?.colors?.textColor,
          }}>
          n publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available. Wikip
        </Text>
        <View
          style={{
            paddingVertical: 5,
          }}
        />
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'OpenSans-SemiBold',
            marginStart: 15,
            color: theme?.colors?.textColor,
            marginEnd: 10,
            alignSelf: 'flex-start',

            marginTop: 15,
          }}>
          How we process data Ques 2 ?
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'OpenSans-Regular',
            marginStart: 15,
            alignSelf: 'flex-start',
            marginEnd: 10,
            marginTop: 8,
            color: theme?.colors?.textColor,
          }}>
          n publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available. Wikip
        </Text>
        <View
          style={{
            paddingVertical: 5,
          }}
        />

        <Text
          style={{
            fontSize: 16,
            alignSelf: 'flex-start',
            fontFamily: 'OpenSans-SemiBold',
            marginStart: 15,
            color: theme?.colors?.textColor,
            marginEnd: 10,

            marginTop: 15,
          }}>
          How we process data Ques 1 ?
        </Text>
        <Text
          style={{
            alignSelf: 'flex-start',
            fontSize: 15,
            fontFamily: 'OpenSans-Regular',
            marginStart: 15,
            marginEnd: 10,
            marginTop: 8,
            color: theme?.colors?.textColor,
          }}>
          n publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available. Wikip
        </Text>
        <View
          style={{
            paddingVertical: 5,
          }}
        />
        <Text
          style={{
            fontSize: 16,
            alignSelf: 'flex-start',
            fontFamily: 'OpenSans-SemiBold',
            marginEnd: 10,
            marginStart: 15,
            color: theme?.colors?.textColor,

            marginTop: 15,
          }}>
          How we process data Ques 2 ?
        </Text>
        <Text
          style={{
            fontSize: 15,
            alignSelf: 'flex-start',
            fontFamily: 'OpenSans-Regular',
            marginStart: 15,
            marginEnd: 10,
            marginTop: 8,
            color: theme?.colors?.textColor,
          }}>
          n publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available. Wikip
        </Text>
        <View
          style={{
            paddingVertical: 5,
          }}
        />

        <Text
          style={{
            fontSize: 16,
            fontFamily: 'OpenSans-SemiBold',
            marginStart: 15,
            color: theme?.colors?.textColor,

            alignSelf: 'flex-start',
            marginEnd: 10,
            marginTop: 15,
          }}>
          How we process data Ques 1 ?
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'OpenSans-Regular',
            marginStart: 15,
            alignSelf: 'flex-start',
            marginEnd: 10,
            marginTop: 8,
            color: theme?.colors?.textColor,
          }}>
          n publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available. Wikip
        </Text>
        <View
          style={{
            paddingVertical: 5,
          }}
        />
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'OpenSans-SemiBold',
            marginStart: 15,
            color: theme?.colors?.textColor,
            marginEnd: 10,
            alignSelf: 'flex-start',

            marginTop: 15,
          }}>
          How we process data Ques 2 ?
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'OpenSans-Regular',
            marginStart: 15,
            alignSelf: 'flex-start',
            marginEnd: 10,
            marginTop: 8,
            color: theme?.colors?.textColor,
          }}>
          n publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available. Wikip
        </Text>
        <View
          style={{
            paddingVertical: 5,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsCondition;
const styles = StyleSheet.create({
  text: {
    marginHorizontal: 15,
    marginTop: 20,
    fontFamily: 'OpenSans-Medium',
    color: COLORS.black,
    fontSize: 18,
  },
});
