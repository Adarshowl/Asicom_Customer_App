import {
  FlatList,
  I18nManager,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import themeContext from '../../constants/themeContext';
import {SIZES} from '../../constants';
import {
  getDateDiff,
  ShowConsoleLogMessage,
  ShowToastMessage,
} from '../../utils/Utility';
import {useDispatch} from 'react-redux';
import {getHomeFlashDealProductList} from '../../redux/actions/HomeApi';
import {showProgressBar} from '../../redux/actions';
import FlashDealProductItem from '../Home/FlashDealProductItem';
import LinearGradient from 'react-native-linear-gradient';
import {FONTS} from '../../constants/Fonts';
import CountDown from 'react-native-countdown-component';
import {IMAGE_BASE_URL} from '../../network/ApiEndPoints';

const FlashDealSale = ({navigation, route}) => {
  const theme = useContext(themeContext);
  const [receivedItem, setReceivedItem] = useState(null);
  const [counterTime, setCounterTime] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    let {item} = route?.params;
    setReceivedItem(item);
    const counter = getDateDiff(item?.enddate);

    setCounterTime(counter);
    dispatch(showProgressBar(true));
    getFlashDeal();
  }, []);
  const [flashDeal, setFlashDeal] = useState([]);
  const BannerErrorCallback = error => {
    dispatch(showProgressBar(false));
    ShowToastMessage(error);
    ShowConsoleLogMessage(error);
  };

  const successFlashDealCallBack = async data => {
    // ShowConsoleLogMessage(
    //   'successFlashDealCallBack flash call' + Object.values(data?.data).length,
    // );
    dispatch(showProgressBar(false));
    setFlashDeal(data?.data);
  };
  const errorFlashDealCallBack = async data => {
    dispatch(showProgressBar(false));
    setFlashDeal([]);
  };
  const getFlashDeal = () => {
    dispatch(() =>
      getHomeFlashDealProductList(
        dispatch,
        navigation,
        successFlashDealCallBack,
        errorFlashDealCallBack,
        BannerErrorCallback,
      ),
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
          title="Flash Deal"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
          }}
          textStyle={{
            color: theme.colors.textColor,
            fontSize: 20,
          }}
        />
      </View>

      <FlatList
        ListHeaderComponent={() => {
          return (
            <View>
              <View
                onPress={() => {}}
                style={[
                  GlobalStyle.sliderMainWrapper,
                  {
                    height: 170,
                  },
                ]}>
                <ImageBackground
                  source={{
                    uri: IMAGE_BASE_URL + receivedItem?.flashsale_image,
                    // uri: receivedItem?.homepage_image,
                  }}
                  style={[styles.sliderImage]}
                />

                <LinearGradient
                  style={{
                    // flex: 1,
                    alignSelf: 'flex-end',
                    justifyContent: 'flex-end',
                    borderBottomRightRadius: 15,
                    borderBottomLeftRadius: 15,
                    marginHorizontal: 10,
                    right: 5,
                    left: 5,
                    bottom: 10,
                    // top: 0,
                    position: 'absolute',
                  }}
                  colors={['#00000009', '#00000999', '#00000999']}>
                  <Text
                    style={[
                      {
                        color: theme?.colors?.text,

                        fontFamily: FONTS.medium,
                        marginBottom: 5,
                        fontSize: 16,
                        marginHorizontal: 15,
                      },
                    ]}
                    numberOfLines={2}>
                    {receivedItem?.title}
                    {/*sad asd sa dsa d sad sa d sad sa d sad sa d sa*/}
                  </Text>
                  <Text
                    style={[
                      {
                        color: theme?.colors?.text,
                        fontFamily: FONTS.regular,
                        marginBottom: 5,
                        fontSize: 12,
                        marginHorizontal: 15,
                      },
                    ]}
                    numberOfLines={2}>
                    {receivedItem?.description}
                  </Text>
                </LinearGradient>
              </View>
              <View
                style={[
                  GlobalStyle.flexRowAlignCenter,
                  {
                    alignItems: 'center',
                  },
                ]}>
                <Text
                  style={[
                    GlobalStyle.headingText,
                    {
                      color: theme?.colors?.white,
                      // marginTop: 25,
                      alignItems: 'center',
                      fontSize: 18,
                      fontFamily: FONTS?.semi_old,
                      marginStart: 10,
                    },
                  ]}>
                  Deal ends in
                </Text>
                <View
                  style={{
                    flex: 1,
                  }}
                />
                {counterTime > 0 ? (
                  <CountDown
                    digitStyle={{
                      // backgroundColor: theme?.colors?.colorPrimary,
                      padding: 0,
                    }}
                    until={counterTime}
                    // timeLabels={false}
                    timeToShow={['D', 'H', 'M', 'S']}
                    // timeToShow={['H', 'M', 'S']}
                    size={9}
                    showSeparator={true}
                    separatorStyle={{
                      // color: theme?.colors?.text,
                      color: '#884D31',
                      marginBottom: 2,
                    }}
                    digitTxtStyle={{
                      color: '#884D31',
                      fontFamily: FONTS.medium,
                    }}
                    timeLabelStyle={{
                      color: theme?.colors?.text,
                      fontSize: 0,
                      backgroundColor: theme?.colors?.colorPrimary,
                      // paddingHorizontal: 2,
                      borderRadius: 2,
                      marginStart: 2,
                    }}
                  />
                ) : null}
                <View
                  style={{
                    // flex: 1,
                    marginEnd: 10,
                  }}
                />
              </View>
            </View>
          );
        }}
        data={flashDeal}
        extraData={flashDeal}
        numColumns={2}
        style={{
          flex: 1,
          marginHorizontal: 8,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <FlashDealProductItem
              navigation={navigation}
              index={index}
              item={item}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default FlashDealSale;

const styles = StyleSheet.create({
  sliderImage: {
    width: SIZES.width - 30,
    height: 150,
    overflow: 'hidden',
    borderRadius: 20,
    // marginTop: -40
  },
});
