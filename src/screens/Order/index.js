import {
  FlatList,
  I18nManager,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {icons, SIZES, STRING} from '../../constants';
import {FONTS} from '../../constants/Fonts';
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import themeContext from '../../constants/themeContext';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import {useDispatch, useSelector} from 'react-redux';
import {getUserOrderList} from '../../redux/actions/CartApi';
import {showProgressBar} from '../../redux/actions';
import {ShowConsoleLogMessage} from '../../utils/Utility';
import {useIsFocused} from '@react-navigation/native';
import VegUrbanEditText from '../../utils/EditText/VegUrbanEditText';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';
import {IMAGE_BASE_URL} from '../../network/ApiEndPoints';

const Order = ({navigation, route}) => {
  const theme = useContext(themeContext);
  const [show, setShow] = useState(false);

  const [selectedTab, setSelectedTab] = useState('Ongoing');

  const [orderList, setOrderList] = useState([]);
  const [masterOrderList, setMasterOrderList] = useState([]);
  const [showCartEmpty, setShowCartEmpty] = useState(false);
  const [text, setText] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const dispatch = useDispatch();
  const loginCount = useSelector(state => state?.state?.count);
  const userToken = useSelector(state => state?.state?.userToken);
  // ShowConsoleLogMessage(userToken);
  const [loading, setLoading] = useState(false);

  console.log('ggggg', masterOrderList);

  const isFocused = useIsFocused();

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      const newData = masterOrderList.filter(function (item) {
        // console.log('<<<<<< ', JSON.stringify(item));
        const itemData = item.order_id
          ? item.order_id.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setOrderList(newData);
      setText(text);
    } else {
      setOrderList(masterOrderList);
      setText(text);
    }
  };

  useEffect(() => {
    if (loginCount == 1) {
      // ShowConsoleLogMessage(userToken);
      if (isFocused) {
        setShowSearch(false);
        setText('');
        dispatch(showProgressBar(true));
        dispatch(() => {
          getUserOrderList(
            dispatch,
            navigation,
            userToken,
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
    // ShowConsoleLogMessage(JSON.stringify(data?.response[0]));
    setOrderList(data?.response);
    // setOrderList([]);
    setMasterOrderList(data?.response);
    setShowCartEmpty(data?.response?.length <= 0);
    // setShowCartEmpty(true);
  };

  const errorCallback = async data => {
    setShowCartEmpty(true);
    setOrderList([]);
    setMasterOrderList([]);
    dispatch(showProgressBar(false));
    // setTimeout(() => {
    //   ShowToastMessage(data?.message || 'Something went wrong.');
    // }, 100);
  };

  const BannerErrorCallback = error => {
    ShowConsoleLogMessage('Banner call back called');
    dispatch(showProgressBar(false));
    ShowConsoleLogMessage(error);
  };

  const renderItem = ({item, index}) => {
    let fa = 0;
    if (
      item?.flash_discount_percentage != undefined &&
      parseInt(item?.flash_discount_percentage) > 0
    ) {
      fa =
        ((parseInt(item?.amount) * parseInt(item?.flash_discount_percentage)) /
          100) *
        parseInt(item?.quantity);
    }
    return (
      <TouchableOpacity
        onPress={() => {
          // closeSignUpModal();
          // ShowConsoleLogMessage(item?._id);
          navigation.navigate('TrackList', {item: item});
        }}
        activeOpacity={0.8}
        style={[
          styles.wrapperOrder,
          {
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
          <VegUrbanImageLoader
            source={IMAGE_BASE_URL + item?.product_thumbnail[0]}
            styles={[
              {
                width: 90,
                height: 90,
                alignSelf: 'center',
                margin: 8,
                // resizeMode:'contain',
                borderRadius: 5,
                // marginTop: 30
              },
            ]}
          />

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
                    fontFamily: FONTS?.semi_old,
                  },
                ]}
                numberOfLines={1}>
                Order id: {item?.order_id}
              </Text>
            </View>
            {/*<View*/}
            {/*  style={[*/}
            {/*    {*/}
            {/*      flexWrap: 'wrap',*/}
            {/*      marginTop: 10,*/}
            {/*      alignItems: 'center',*/}
            {/*      marginBottom: 8,*/}
            {/*    },*/}
            {/*    GlobalStyle.flexRowAlignCenter,*/}
            {/*  ]}>*/}
            {/*  <View*/}
            {/*    style={{*/}
            {/*      borderRadius: 20,*/}
            {/*      width: 15,*/}
            {/*      height: 15,*/}
            {/*      backgroundColor: theme?.colors?.gray,*/}
            {/*      marginEnd: 10,*/}
            {/*    }}*/}
            {/*  />*/}
            {/*  <Text*/}
            {/*    style={[*/}
            {/*      styles.discountPrice,*/}
            {/*      {*/}
            {/*        color: theme?.colors?.white,*/}
            {/*        // color: theme?.colors?.,*/}
            {/*        marginRight: 5,*/}
            {/*      },*/}
            {/*    ]}>*/}
            {/*    Color*/}
            {/*  </Text>*/}
            {/*  <View*/}
            {/*    style={{*/}
            {/*      // width: 0,*/}
            {/*      // height: 13,*/}
            {/*      paddingVertical: 6,*/}
            {/*      borderWidth: 0.8,*/}
            {/*      borderColor: theme?.colors?.white,*/}
            {/*      marginStart: 7,*/}
            {/*      marginEnd: 10,*/}
            {/*    }}*/}
            {/*  />*/}
            {/*  <Text*/}
            {/*    style={[*/}
            {/*      styles.discountPrice,*/}
            {/*      {*/}
            {/*        color: theme?.colors?.white,*/}
            {/*      },*/}
            {/*    ]}>*/}
            {/*    Size = S*/}
            {/*  </Text>*/}
            {/*  <View*/}
            {/*    style={{*/}
            {/*      // width: 0,*/}
            {/*      // height: 13,*/}
            {/*      paddingVertical: 6,*/}
            {/*      borderWidth: 0.8,*/}
            {/*      borderColor: theme?.colors?.white,*/}
            {/*      marginStart: 10,*/}
            {/*      marginEnd: 10,*/}
            {/*    }}*/}
            {/*  />*/}
            {/*  <Text*/}
            {/*    style={[*/}
            {/*      styles.discountPrice,*/}
            {/*      {*/}
            {/*        color: theme?.colors?.white,*/}
            {/*      },*/}
            {/*    ]}>*/}
            {/*    Qty = {item?.quantity}*/}
            {/*  </Text>*/}
            {/*</View>*/}
            {item?.is_cancelled != 'Active' ? (
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
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 12,
                      color: theme?.colors?.white,
                      fontFamily: FONTS?.semi_old,
                      textAlign: 'center',
                    }}>
                    {item?.delivery_status}
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: theme?.colors?.colorimageback,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    padding: 4,
                    marginTop: 5,
                    // width: '38%',
                    alignItems: 'center',
                    marginStart: 10,
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 12,
                      color: theme?.colors?.white,
                      fontFamily: FONTS?.semi_old,

                      textAlign: 'center',
                    }}>
                    {item?.payment_status}
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: theme?.colors?.colorimageback,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    padding: 4,
                    marginTop: 5,
                    // width: '38%',
                    alignItems: 'center',
                    marginStart: 10,
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 12,
                      color: theme?.colors?.white,
                      fontFamily: FONTS?.semi_old,

                      textAlign: 'center',
                    }}>
                    {item?.payment_mode}
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: theme?.colors?.colorimageback,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  padding: 4,
                  marginTop: 5,
                  // width: '38%',
                  // flexGrow: 1,
                  alignItems: 'flex-start',
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
                  Order Cancelled
                </Text>
              </View>
            )}
            <View
              style={[
                GlobalStyle.flexRowAlignCenter,
                {
                  paddingBottom: 10,
                  // backgroundColor: 'red',
                },
              ]}>
              <>
                {item?.is_return == 'Active' ? (
                  <View
                    style={{
                      backgroundColor: theme?.colors?.colorimageback,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                      padding: 4,
                      marginTop: 5,
                      // width: '38%',
                      // flexGrow: 1,
                      alignItems: 'flex-start',
                      alignSelf: 'flex-start',
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 12,
                        color: theme?.colors?.white,
                        fontFamily: FONTS?.medium,

                        textAlign: 'center',
                      }}>
                      Order Return
                    </Text>
                  </View>
                ) : null}

                {item?.is_refund == 'Active' ? (
                  <View
                    style={{
                      backgroundColor: theme?.colors?.colorimageback,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                      padding: 4,
                      marginTop: 5,
                      marginStart: 5,
                      // width: '38%',
                      // flexGrow: 1,
                      alignItems: 'flex-start',
                      alignSelf: 'flex-start',
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 12,
                        color: theme?.colors?.white,
                        fontFamily: FONTS?.medium,

                        textAlign: 'center',
                      }}>
                      Refund Amount
                    </Text>
                  </View>
                ) : null}
              </>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {/*<Text*/}
              {/*  style={[*/}
              {/*    styles.finalPriceText,*/}
              {/*    {*/}
              {/*      // alignSelf: 'flex-start',*/}
              {/*      color: theme?.colors?.colorPrimary,*/}
              {/*      marginTop: 8,*/}
              {/*    },*/}
              {/*  ]}>*/}
              {/*  /!*{STRING.APP_CURRENCY} {item?.totalamount}*!/*/}
              {/*  {STRING.APP_CURRENCY} {item?.amount * item?.quantity}*/}
              {/*</Text>*/}

              {item?.flash_discount_percentage != undefined &&
              item?.flash_discount_percentage > 0 ? (
                <Text
                  style={[
                    styles.finalPriceText,
                    {
                      alignSelf: 'flex-start',
                      color: theme?.colors?.colorPrimary,
                      marginTop: 5,
                    },
                  ]}>
                  {STRING.APP_CURRENCY}
                  {parseInt(item?.amount) * parseInt(item?.quantity) - fa}
                  {/*{parseInt(item?.amount) -*/}
                  {/*  ((parseInt(item?.amount) **/}
                  {/*    parseInt(item?.flash_discount_percentage)) /*/}
                  {/*    100) **/}
                  {/*    parseInt(item?.quantity)}*/}
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
              <VegUrbanCommonBtn
                height={30}
                width={'50%'}
                borderRadius={20}
                textSize={14}
                text={'Track Order'}
                // textColor={COLORS?.white}
                textColor={theme?.colors?.text}
                backgroundColor={theme?.colors?.colorPrimary}
                onPress={() => {
                  // closeSignUpModal();
                  // ShowConsoleLogMessage(item?._id);
                  navigation.navigate('TrackList', {item: item});
                }}
                textStyle={{
                  fontFamily: FONTS?.medium,
                }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
          title="Order"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
          }}
          textStyle={{
            color: theme.colors.textColor,
            fontSize: 20,
            fontFamily: FONTS?.bold,
          }}
        />
        {showCartEmpty ? null : (
          // <AntDesign
          //   name={'search1'}
          //   size={26}
          //   style={{
          //     marginEnd: 10,
          //   }}
          //   onPress={() => {
          //     // navigation.navigate('Search');
          //     setShowSearch(!showSearch);
          //     setText('');
          //   }}
          //   color={theme?.colors?.textColor}
          // />
          <TouchableOpacity
            style={{
              marginEnd: 15,
            }}
            onPress={() => {
              // navigation.navigate('Search');
              setShowSearch(!showSearch);
              setText('');
            }}>
            <Image
              source={icons.search}
              style={{
                height: 22,
                width: 22,
                tintColor: theme?.colors?.white,
              }}
            />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps={'handled'}>
        {loginCount == 1 ? (
          <View style={styles.container}>
            {/*<View style={styles.container}>*/}
            {/*  <View style={styles.tabRow}>*/}
            {/*    <TouchableOpacity*/}
            {/*      onPress={() => setSelectedTab('Ongoing')}*/}
            {/*      style={[*/}
            {/*        styles.tab,*/}
            {/*        {*/}
            {/*          borderBottomWidth: 2,*/}
            {/*          borderBottomColor:*/}
            {/*            selectedTab === 'Ongoing'*/}
            {/*              ? theme?.colors?.colorPrimary*/}
            {/*              : theme?.colors?.bg,*/}
            {/*        },*/}
            {/*      ]}>*/}
            {/*      <Text*/}
            {/*        style={[*/}
            {/*          styles.text,*/}
            {/*          {*/}
            {/*            color: theme?.colors?.textColor,*/}
            {/*            fontFamily: FONTS?.medium,*/}
            {/*          },*/}
            {/*        ]}>*/}
            {/*        Ongoing*/}
            {/*      </Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*    <TouchableOpacity*/}
            {/*      onPress={() => setSelectedTab('Completed')}*/}
            {/*      style={[*/}
            {/*        styles.tab,*/}
            {/*        {*/}
            {/*          // backgroundColor: selectedTab === 'Ongoing' ? 'blue' : 'gray',*/}
            {/*          borderBottomWidth: 2,*/}
            {/*          borderBottomColor:*/}
            {/*            selectedTab === 'Completed'*/}
            {/*              ? theme?.colors?.colorPrimary*/}
            {/*              : theme?.colors?.bg,*/}
            {/*        },*/}
            {/*      ]}>*/}
            {/*      <Text*/}
            {/*        style={[*/}
            {/*          styles.text,*/}
            {/*          {*/}
            {/*            color: theme?.colors?.textColor,*/}
            {/*            fontFamily: FONTS?.medium,*/}
            {/*          },*/}
            {/*        ]}>*/}
            {/*        Completed*/}
            {/*      </Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*  </View>*/}
            {/*</View>*/}
            {showCartEmpty ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 20,
                }}>
                <Text
                  style={[
                    GlobalStyle.bothSideText,
                    {
                      color: theme?.colors?.white,
                      fontSize: 18,
                      fontFamily: FONTS?.medium,
                      textAlign: 'center',
                      marginBottom: 20,
                    },
                  ]}>
                  No orders found
                </Text>
                <VegUrbanCommonBtn
                  height={40}
                  width={'100%'}
                  borderRadius={20}
                  textSize={16}
                  textColor={theme?.colors?.text}
                  text={'Shop Now'}
                  backgroundColor={theme?.colors?.colorPrimary}
                  onPress={() => {
                    // navigation.navigate('Home');
                    navigation.goBack();
                  }}
                  textStyle={{
                    fontFamily: FONTS?.bold,
                  }}
                />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                }}>
                {showSearch ? (
                  <View
                    style={{
                      paddingHorizontal: 10,
                    }}>
                    <VegUrbanEditText
                      placeholder={'Search by id'}
                      // label={STRING.email}
                      iconPosition={'right'}
                      value={text}
                      style={{
                        color: theme?.colors?.textColor,
                      }}
                      icon={
                        <AntDesign
                          name={'close'}
                          size={20}
                          onPress={() => {
                            setShowSearch(false);
                            setText('');
                            setOrderList(masterOrderList);
                          }}
                          color={theme?.colors?.grey}
                          style={{}}
                        />
                      }
                      keyBoardType={'default'}
                      onChangeText={v => {
                        searchFilterFunction(v);
                      }}
                    />
                  </View>
                ) : null}

                <FlatList
                  data={orderList}
                  keyExtractor={item => item._id}
                  renderItem={renderItem}
                  ListEmptyComponent={() => {
                    return text ? (
                      <Text
                        style={[
                          GlobalStyle.bothSideText,
                          {
                            color: theme?.colors?.white,
                            fontSize: 18,
                            fontFamily: FONTS?.medium,
                            textAlign: 'center',
                            marginBottom: 20,
                          },
                        ]}>
                        No orders found
                      </Text>
                    ) : null;
                  }}
                />
              </View>
            )}
            <View style={styles.divLine} />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
            }}>
            <Text
              style={[
                GlobalStyle.bothSideText,
                {
                  color: theme?.colors?.white,
                  fontSize: 18,
                  fontFamily: FONTS?.medium,
                  textAlign: 'center',
                  marginBottom: 20,
                },
              ]}>
              Sign in to get better experience
            </Text>
            <VegUrbanCommonBtn
              height={40}
              width={'100%'}
              borderRadius={20}
              textSize={16}
              textColor={theme.colors?.text}
              text={'Sign In'}
              backgroundColor={theme?.colors?.colorPrimary}
              onPress={() => {
                navigation.navigate('Auth', {screen: 'Login'});
              }}
              textStyle={{
                fontFamily: FONTS?.bold,
              }}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Order;

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
