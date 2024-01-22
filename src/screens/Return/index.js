import {
  FlatList,
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import {SIZES} from '../../constants';

import themeContext from '../../constants/themeContext';
import {FONTS} from '../../constants/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import {ShowConsoleLogMessage} from '../../utils/Utility';
import {showProgressBar} from '../../redux/actions';
import {useIsFocused} from '@react-navigation/native';
import {getUserReturnList} from '../../redux/actions/CartApi';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import moment from 'moment/moment';

const ReturnOrder = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [notificationList, setNotificationList] = useState([]);

  const dispatch = useDispatch();
  const loginCount = useSelector(state => state?.state?.count);
  const userToken = useSelector(state => state?.state?.userToken);

  const BannerErrorCallback = error => {
    ShowConsoleLogMessage('Banner call back called');
    dispatch(showProgressBar(false));
    // ShowToastMessage(error);
    ShowConsoleLogMessage(error);
  };
  const addressSuccessCallback = async data => {
    ShowConsoleLogMessage(JSON.stringify(data));
    dispatch(showProgressBar(false));
    setNotificationList(data?.data);
  };

  const addressErrorCallback = async data => {
    ShowConsoleLogMessage(JSON.stringify(data));
    dispatch(showProgressBar(false));
    setNotificationList([]);
    // setTimeout(() => {
    //   ShowToastMessage(data?.message || 'Something went wrong.');
    // }, 100);
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (loginCount == 1) {
      if (isFocused) {
        dispatch(showProgressBar(true));
        dispatch(() => {
          getUserReturnList(
            dispatch,
            navigation,
            userToken,
            addressSuccessCallback,
            addressErrorCallback,
            BannerErrorCallback,
          );
        });
      }
    } else {
    }
  }, [isFocused]);

  const theme = useContext(themeContext);

  const renderItem = ({item}) => {
    return (
      <View
        // activeOpacity={0.8}
        style={[
          styles.wrapperOrder,
          {
            // backgroundColor: '#F2F3F4',
            elevation: 2,
            backgroundColor: theme?.colors?.bg,
          },
        ]}>
        <View
          style={[
            GlobalStyle.flexRowAlignCenter,
            {
              paddingVertical: 5,
              alignItems: 'center',
            },
          ]}>
          <View style={styles.innnerWrapperOrder}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.white,
                    fontFamily: FONTS?.regular,
                  },
                ]}
                numberOfLines={1}>
                Order id: {item?.order_id?.order_id}
              </Text>
            </View>
            <Text
              style={[
                styles.textName,
                {
                  alignSelf: 'flex-start',
                  color: theme?.colors?.white,
                  fontFamily: FONTS?.regular,
                  fontSize: 14,
                },
              ]}
              numberOfLines={1}>
              Date & Time: {moment(item?.createdAt).format('LLL')}
            </Text>
            <View
              style={[
                GlobalStyle.flexRowAlignCenter,
                {
                  paddingBottom: 10,

                  // backgroundColor: 'red',
                },
              ]}>
              <View
                style={{
                  backgroundColor: theme?.colors?.colorimageback,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  padding: 4,
                  marginTop: 5,
                  // width: '38%',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 12,
                    color: theme?.colors?.white,
                    fontFamily: FONTS?.semi_old,
                    textAlign: 'center',
                  }}>
                  {item?.status}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                alignItems: 'flex-end',
                marginEnd: 10,
              }}>
              <VegUrbanCommonBtn
                height={30}
                width={'50%'}
                borderRadius={20}
                textSize={14}
                text={'View Details'}
                // textColor={COLORS?.white}
                textColor={theme?.colors?.text}
                backgroundColor={theme?.colors?.colorPrimary}
                onPress={() => {
                  // ShowToastMessage('Coming soon');
                  navigation.navigate('ReturnOrderDetails', {item: item});
                }}
                textStyle={{
                  fontFamily: FONTS?.medium,
                }}
              />
            </View>
          </View>
        </View>
      </View>
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
            backgroundColor: theme?.colors?.bg_color_onBoard,
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

        <VegUrbanCommonToolBar
          title={'Return Order'}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
            marginStart: 20,
            fontFamily: FONTS?.bold,
          }}
        />
        {/*<MaterialCommunityIcons*/}
        {/*  name={'dots-horizontal-circle-outline'}*/}
        {/*  size={26}*/}
        {/*  // color={COLORS.colorPrimary}*/}
        {/*  style={{*/}
        {/*    marginEnd: 10,*/}
        {/*  }}*/}
        {/*  color={theme?.colors?.textColor}*/}
        {/*/>*/}
      </View>
      <FlatList
        data={notificationList}
        // data={[]}
        style={{
          flex: 1,
        }}
        keyExtractor={item => item?._id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={() => {
          return (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.headingtext,
                {
                  color: theme?.colors?.white,
                  flexGrow: 1,
                  textAlign: 'center',
                  alignSelf: 'center',
                  marginTop: SIZES.width / 1.4,
                  fontFamily: FONTS.regular,
                },
              ]}>
              No return order found!
            </Text>
          );
        }}
      />

      {/*<FlatList*/}
      {/*  data={notificationList}*/}
      {/*  style={{*/}
      {/*    flex: 1,*/}
      {/*  }}*/}
      {/*  keyExtractor={item => item?._id?.toString()}*/}
      {/*  renderItem={({item}) => (*/}
      {/*    <View style={styles.notificationCategory}>*/}
      {/*      <Text*/}
      {/*        style={[*/}
      {/*          styles.categoryTitle,*/}
      {/*          {*/}
      {/*            color: theme?.colors?.textColor,*/}
      {/*          },*/}
      {/*        ]}>*/}
      {/*        {item.user_type}*/}
      {/*      </Text>*/}
      {/*    </View>*/}
      {/*  )}*/}
      {/*  ListEmptyComponent={() => {*/}
      {/*    return (*/}
      {/*      <Text*/}
      {/*        numberOfLines={1}*/}
      {/*        ellipsizeMode="tail"*/}
      {/*        style={[*/}
      {/*          styles.headingtext,*/}
      {/*          {*/}
      {/*            color: theme?.colors?.white,*/}
      {/*            flexGrow: 1,*/}
      {/*            textAlign: 'center',*/}
      {/*            alignSelf: 'center',*/}
      {/*            marginTop: SIZES.width / 2,*/}
      {/*            fontFamily: FONTS.regular,*/}
      {/*          },*/}
      {/*        ]}>*/}
      {/*        No notifications found!*/}
      {/*      </Text>*/}
      {/*    );*/}
      {/*  }}*/}
      {/*/>*/}
    </SafeAreaView>
  );
};

export default ReturnOrder;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    flex: 1,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 20,
    color: COLORS?.black,
  },
  tab: {
    padding: 10,
    width: '50%',
    alignItems: 'center',
    marginHorizontal: 20,
    // borderRadius: 5,
  },
  wrapper: {
    padding: 15,
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    // marginVertical: 20,
    borderRadius: 12,
    // paddingBottom: 60

    // paddingVertical:5
  },
  amountwrapper: {
    padding: 15,
    backgroundColor: COLORS.white,
    marginHorizontal: 18,
    // marginVertical: 20,
    borderRadius: 12,
    marginBottom: 30,
    // paddingBottom: 60

    // paddingVertical:5
  },
  month: {
    fontSize: 22,
    // fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  monthTitle: {
    fontSize: 14,
    // fontFamily: FONTS.regular,
    color: COLORS.grey,
    marginBottom: 2.5,
  },
  wrapperOrder: {
    padding: 5,
    // margin: 2,
    backgroundColor: COLORS.white,
    marginHorizontal: 12,
    marginVertical: 10,
    borderRadius: 12,
    paddingHorizontal: 6,
    // paddingVertical:5
  },
  itemImage: {
    width: '30%',
    height: 100,
    borderRadius: 20,

    // resizeMode: 'center',
    // alignItems: 'center',
    // resizeMode: 'stretch',
    // marginBottom: 10
  },
  divLine: {
    height: 0.5,
    width: '95%',
    backgroundColor: COLORS.gray,
    alignSelf: 'center',
    marginVertical: 5,
    marginTop: 10,
  },
  textlable: {
    fontSize: 16,
    color: COLORS?.black,
  },
  amounttext: {
    fontSize: 16,
    fontFamily: FONTS.semi_old,
    color: COLORS?.black,
  },
  modalBackground: {
    flex: 1,
    // alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#00000080',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    width: SIZES.width,
    display: 'flex',
    flexDirection: 'column',
  },
  qtyText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    color: COLORS.black,
    textAlign: 'center',
    flex: 0.3,
  },
  originalPrice: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
    textDecorationLine: 'line-through',
    color: COLORS.black,
    marginStart: 8,

    textDecorationColor: COLORS.black,
  },
  deleteSaveText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 14,
    color: COLORS.red,
    textAlign: 'center',
    flex: 1,
    marginTop: 5,
  },
  image: {
    height: 90,
    width: '28%',
    // margin:6,
    marginTop: 5,
    resizeMode: 'stretch',
    borderRadius: 5,
    // paddingTop:10
    // resizeMode:'contain',
  },
  innnerWrapper: {
    flex: 1,
    marginStart: 10,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innnerWrapperOrder: {
    flex: 1,
    marginStart: 10,
    marginTop: 0,
    // flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  textName: {
    fontFamily: FONTS?.bold,
    fontSize: 16,
    color: COLORS.black,
  },
  discountPrice: {
    fontFamily: FONTS?.bold,
    fontSize: 13,
    color: COLORS.black,
  },
  // qtyText: {
  //   fontFamily: 'OpenSans-Regular',
  //   fontSize: 13,
  //   color: COLORS.black,
  // },
  finalPriceText: {
    fontFamily: FONTS?.semi_old,
    fontSize: 16,
    color: COLORS.colorPrimary,
    marginTop: 3,
  },
  createProfile: {
    fontSize: 16,
    // fontFamily: FONTS.regular,
    color: COLORS.grey,
    lineHeight: 24,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 16,
    color: COLORS.black,
    // fontFamily: FONTS.semi_bold,
  },
});
