import {I18nManager, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useContext, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import themeContext from '../../constants/themeContext';
import TabOfferScreen from './TabOfferScreen';

const FlashSale = ({navigation}) => {
  const theme = useContext(themeContext);
  const [show, setShow] = useState(false);

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
            backgroundColor: theme.colors.bg_color_onBoard,
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
              marginStart: 10,
            },
          ]}
          onPress={() => {
            navigation.goBack();
            // ShowToastMessage('Coming Soon!');
          }}
        />
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
        <VegUrbanCommonToolBar
          title="Most Popular"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
          }}
          textStyle={{
            color: theme.colors.textColor,
            fontSize: 20,
          }}
        />
        <AntDesign
          name={'search1'}
          size={26}
          // color={COLORS.colorPrimary}
          style={{
            marginEnd: 10,
          }}
          onPress={() => {
            navigation.navigate('Search');
            // ShowToastMessage('Coming Soon!');
          }}
          color={theme?.colors?.black}
        />
      </View>
      <TabOfferScreen />

      {/* <View
        style={{
          minHeight: '100%',
          width: '100%',
          marginTop: 5,
          marginBottom:30

        }}>
        <TopTabNav />
      </View> */}
    </SafeAreaView>
  );
};

export default FlashSale;

const styles = StyleSheet.create({});
