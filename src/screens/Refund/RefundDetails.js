import {
  I18nManager,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SIZES, STRING} from '../../constants';
import {FONTS} from '../../constants/Fonts';
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import themeContext from '../../constants/themeContext';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {showProgressBar} from '../../redux/actions';
import {getUserOrderRefundById} from '../../redux/actions/CartApi';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import moment from 'moment';

let check = false;

const RefundDetails = ({navigation, route}) => {
  const theme = useContext(themeContext);

  const [receivedData, setReceivedData] = useState(null);
  const [orderData, setOrderData] = useState(null);

  const dispatch = useDispatch();
  const loginCount = useSelector(state => state?.state?.count);
  const userToken = useSelector(state => state?.state?.userToken);

  const isFocused = useIsFocused();

  useEffect(() => {
    let {item} = route?.params;
    setReceivedData(item);
    ShowConsoleLogMessage(item?._id);
    // ShowConsoleLogMessage(userToken);
    if (loginCount == 1) {
      if (isFocused) {
        dispatch(showProgressBar(true));
        dispatch(() => {
          getUserOrderRefundById(
            dispatch,
            navigation,
            userToken,
            item?._id,
            successCallback,
            errorCallback,
            BannerErrorCallback,
          );
        });
      }
    }
  }, [isFocused]);
  const successCallback = async data => {
    dispatch(showProgressBar(false));
    ShowConsoleLogMessage(JSON.stringify(data));
    setOrderData(data?.data);
  };

  const errorCallback = async data => {
    dispatch(showProgressBar(false));
    setOrderData(null);
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
          }}
        />

        <VegUrbanCommonToolBar
          title="Refund Details"
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
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
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
                    },
                  ]}>
                  Order id: {orderData?.order_id?.order_id}
                </Text>
              </View>
              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.white,
                    fontSize: 14,
                    marginVertical: 5,
                  },
                ]}>
                {orderData?.createdAt
                  ? `Date & Time: ${moment(orderData?.createdAt).format('LLL')}`
                  : ''}
              </Text>

              <View
                style={[
                  GlobalStyle.flexRowAlignCenter,
                  {
                    paddingBottom: 10,
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
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 12,
                      fontFamily: FONTS?.semi_old,
                      textAlign: 'center',
                      color: theme?.colors?.white,
                    }}>
                    Order Cancelled
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 12,
                    color: theme?.colors?.white,
                    fontFamily: FONTS?.regular,
                    textAlign: 'left',
                  }}>
                  Product Name:
                </Text>
                <Text
                  style={[
                    styles.finalPriceText,
                    {
                      // alignSelf: 'flex-start',
                      color: theme?.colors?.white,
                      flexGrow: 1,
                      fontSize: 16,
                      // fontWeight: 'bold',
                      fontFamily: FONTS.medium,
                    },
                  ]}>
                  {orderData?.product_id?.product_name}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 12,
                    color: theme?.colors?.white,
                    fontFamily: FONTS?.regular,

                    textAlign: 'center',
                  }}>
                  Seller Approval
                </Text>
                <Text
                  style={[
                    styles.finalPriceText,
                    {
                      // alignSelf: 'flex-start',
                      color: theme?.colors?.white,

                      fontSize: 16,
                      // fontWeight: 'bold',
                      fontFamily: FONTS.medium,
                    },
                  ]}>
                  {orderData?.seller_approval}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 12,
                    color: theme?.colors?.white,
                    fontFamily: FONTS?.regular,

                    textAlign: 'center',
                  }}>
                  Refund amount
                </Text>
                <Text
                  style={[
                    styles.finalPriceText,
                    {
                      // alignSelf: 'flex-start',
                      color: theme?.colors?.colorPrimary,
                      fontSize: 20,
                      // fontWeight: 'bold',
                      fontFamily: FONTS.semi_old,
                    },
                  ]}>
                  {STRING.APP_CURRENCY}{' '}
                  {orderData ? orderData?.refund_amount + '' : ''}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {orderData?.refund_reason?.length > 0 ? (
          <Text
            style={[
              styles.textName,
              {
                alignSelf: 'flex-start',
                color: theme?.colors?.white,
                marginStart: 20,
                marginTop: 10,
              },
            ]}>
            {/*Shipping Details - Coming soon... {orderData?.addressId?.addressName}*/}
            Cancellation Reason
          </Text>
        ) : null}

        {orderData?.refund_reason?.length > 0 ? (
          <Text
            style={[
              styles.textName,
              {
                alignSelf: 'flex-start',
                color: theme?.colors?.white,
                marginStart: 20,
                marginEnd: 5,
                marginTop: 10,
                marginBottom: 20,
                fontFamily: FONTS.regular,
              },
            ]}>
            {/*Shipping Details - Coming soon... {orderData?.addressId?.addressName}*/}
            {orderData?.refund_reason}
          </Text>
        ) : orderData?.refund_reason?.length == 0 ? (
          <Text
            style={[
              styles.textName,
              {
                alignSelf: 'flex-start',
                color: theme?.colors?.white,
                marginStart: 20,
                marginEnd: 5,
                marginTop: 10,
                marginBottom: 20,
                fontFamily: FONTS.regular,
              },
            ]}>
            Cancellation reason not found
          </Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RefundDetails;

const styles = StyleSheet.create({
  order: {
    fontSize: 16,
    // fontWeight:'bold',
    color: COLORS?.black,
    fontFamily: FONTS?.regular,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    marginTop: 2,
    fontFamily: FONTS?.regular,
  },
  date: {
    fontSize: 14,
    fontFamily: FONTS?.regular,

    marginEnd: 5,
    marginTop: 3,
    // marginLeft:20
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
  container: {
    // backgroundColor: 'red',
    // flexDirection:'row',
    alignItems: 'center',
    // padding: 8,
    // marginHorizontal: 0,
  },
  container1: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 8,
    // marginHorizontal: 0,
  },
  packetIcon: {
    width: 40,
    height: 40,
    backgroundColor: COLORS?.black,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  rightArrow: {
    width: 10, // Width of the right arrow
    height: 10, // Height of the right arrow
    borderRightWidth: 2, // Width of the right arrow line
    borderBottomWidth: 2, // Height of the right arrow line
    transform: [{rotate: '45deg'}], // To rotate it to form a right arrow
    borderColor: 'white', // Color of the right arrow
  },
  dots: {
    color: COLORS?.black,
    fontSize: 30, // Font size of the dots
    alignItems: 'center',
  },
  dotsss: {
    color: COLORS?.grey,
    fontSize: 30, // Font size of the dots
    alignItems: 'center',
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
    color: COLORS.colorPrimary,
  },
  monthTitle: {
    fontSize: 14,
    // fontFamily: FONTS.regular,
    color: COLORS.grey,
    marginBottom: 2.5,
  },
  wrapperOrder: {
    padding: 10,
    // margin: 2,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 12,
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
    height: 1,
    alignSelf: 'center',
    marginVertical: 5,
    marginTop: 20,
  },
  textlable: {
    fontSize: 16,
    color: COLORS?.black,
  },
  amounttext: {
    fontSize: 16,
    // fontWeight: 'bold',
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
    // borderRadius: 15,
    width: SIZES.width,

    display: 'flex',
    flexDirection: 'column',
    // paddingVertical: 8,
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
    marginTop: 0,
    // flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  innnerProductWrapperOrder: {
    flex: 1,
    marginTop: 0,
    marginStart: 10,
    // flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  textName: {
    fontFamily: FONTS?.semi_old,
    fontSize: 16,
    color: COLORS.black,
  },
  shipDetails: {
    marginStart: 15,
    marginTop: 0,
    fontSize: 14,
    fontFamily: FONTS.regular,
  },
  discountPrice: {
    fontFamily: FONTS?.regular,
    fontSize: 13,
    color: COLORS.black,
  },

  finalPriceText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 17,
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
