import {
  FlatList,
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
import {getUserOrderReturnById} from '../../redux/actions/CartApi';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import moment from 'moment/moment';

let check = false;

const ReturnOrderDetails = ({navigation, route}) => {
  const theme = useContext(themeContext);

  const [receivedData, setReceivedData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [productData, setProductData] = useState([]);

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
          getUserOrderReturnById(
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
    // ShowConsoleLogMessage(JSON.stringify(data));
    setOrderData(data?.data);
    setProductData(data?.productData);
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
  const renderItem = ({item}) => {
    // ShowConsoleLogMessage(item);
    const fa =
      ((parseInt(item?.amount) * parseInt(item?.flash_discount_percentage)) /
        100) *
      parseInt(item?.quantity);
    return (
      <View
        onPress={() => {}}
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
                {item?.product_name}
              </Text>
            </View>
            <View
              style={[
                {
                  flex: 1,
                  justifyContent: 'space-between',
                },
                GlobalStyle.flexRowAlignCenter,
              ]}>
              <Text
                style={[
                  styles.discountPrice,
                  {
                    flexGrow: 1,
                    color: theme?.colors?.white,
                    width: '50%',
                  },
                ]}>
                Qty = {item?.quantity}
              </Text>

              {item?.flash_discount_percentage > 0 ? (
                <Text
                  style={[
                    styles.finalPriceText,
                    {
                      alignSelf: 'flex-start',
                      color: theme?.colors?.colorPrimary,
                      marginTop: 5,
                    },
                  ]}>
                  {STRING.APP_CURRENCY} {/*{((parseInt(item?.amount) **/}
                  {/*  parseInt(item?.flash_discount_percentage)) /*/}
                  {/*  100) **/}
                  {/*  parseInt(item?.quantity)}*/}
                  {parseInt(item?.amount) * parseInt(item?.quantity) - fa}
                </Text>
              ) : (
                <Text
                  style={[
                    styles.finalPriceText,
                    {
                      alignSelf: 'flex-start',
                      color: theme?.colors?.colorPrimary,
                      marginTop: 5,
                    },
                  ]}>
                  {STRING.APP_CURRENCY}{' '}
                  {parseInt(item?.amount) * parseInt(item?.quantity)}
                </Text>
              )}

              {/*<Text*/}
              {/*  style={[*/}
              {/*    styles.finalPriceText,*/}
              {/*    {*/}
              {/*      color: theme?.colors?.colorPrimary,*/}
              {/*      flexGrow: 1,*/}
              {/*      textAlign: 'right',*/}
              {/*      width: '50%',*/}
              {/*    },*/}
              {/*  ]}>*/}
              {/*  {STRING.APP_CURRENCY}*/}
              {/*  {parseInt(item?.amount) * parseInt(item?.quantity)}*/}
              {/*</Text>*/}
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
          title="Return Order Details"
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

              <View
                style={{
                  flex: 1,
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 15,
                    color: theme?.colors?.white,
                    fontFamily: FONTS.medium,

                    textAlign: 'left',
                  }}>
                  Order Date & Time:
                </Text>
                <Text
                  style={[
                    styles.finalPriceText,
                    {
                      // alignSelf: 'flex-start',
                      color: theme?.colors?.white,
                      flexGrow: 1,
                      fontSize: 14,
                      fontFamily: FONTS?.regular,

                      // fontWeight: 'bold',
                    },
                  ]}>
                  {/*{orderData?.order_date}*/}
                  {orderData?.order_date
                    ? moment(orderData?.order_date).format('LLL')
                    : ''}
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 15,
                    color: theme?.colors?.white,
                    fontFamily: FONTS.medium,

                    textAlign: 'left',
                  }}>
                  Return Order Date & Time:
                </Text>
                <Text
                  style={[
                    styles.finalPriceText,
                    {
                      // alignSelf: 'flex-start',
                      color: theme?.colors?.white,
                      flexGrow: 1,
                      fontSize: 14,
                      fontFamily: FONTS?.regular,

                      // fontWeight: 'bold',
                    },
                  ]}>
                  {/*{orderData?.return_date}*/}
                  {orderData?.return_date
                    ? moment(orderData?.return_date).format('LLL')
                    : null}
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
                  Status
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
                  {orderData?.status}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <Text
            style={[
              styles.textName,
              {
                alignSelf: 'flex-start',
                color: theme?.colors?.white,
                marginStart: 20,
                marginTop: 10,
                // marginBottom: 20,
              },
            ]}>
            Product Details
          </Text>

          <FlatList
            style={{
              paddingStart: 5,
              paddingEnd: 5,
            }}
            ListHeaderComponent={() => {
              return <View style={{}} />;
            }}
            ListHeaderComponentStyle={{
              paddingTop: 5,
            }}
            showsVerticalScrollIndicator={false}
            data={productData}
            renderItem={renderItem}
          />
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

export default ReturnOrderDetails;

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
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 12,
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
