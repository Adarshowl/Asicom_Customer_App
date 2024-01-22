import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import {FONTS} from '../../constants/Fonts';
import GlobalStyle from '../../styles/GlobalStyle';
import ToolBarIcon from '../../utils/ToolBarIcon';
import {COLORS} from '../../constants/Colors';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {icons, SIZES, STRING} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import themeContext from '../../constants/themeContext';
import {
  getDateDiff,
  ShowConsoleLogMessage,
  ShowToastMessage,
  validateFieldNotEmpty,
} from '../../utils/Utility';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';
import {useDispatch, useSelector} from 'react-redux';
import {
  doSaveOfferOfflineRealm,
  getSavedCartProduct,
  isProductSavedFavorite,
  removeFromFavoriteRealm,
} from '../../utils/RealmUtility';
import {
  addToCartProduct,
  addToFavoriteProduct,
  createUserProductQuery,
  getUserCartProduct,
} from '../../redux/actions/CartApi';
import {showProgressBar} from '../../redux/actions';
import {
  getHomeProduct,
  getProductByID,
  getProductQueryByID,
  updateCartDataLength,
} from '../../redux/actions/HomeApi';
import ProductQueryAddModal from './ProductQueryAddModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CountDown from 'react-native-countdown-component';
import {IMAGE_BASE_URL} from '../../network/ApiEndPoints';

const ProductDetail = ({navigation, route}) => {
  const theme = useContext(themeContext);
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const userToken = useSelector(state => state?.state?.userToken);
  const loginCount = useSelector(state => state?.state?.count);
  const cartDataLength = useSelector(
    state => state?.homeReducer?.cartDataLength,
  );

  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]); // Maintain selected sizes in state

  // let {item, isFavorite, data} = route.params;
  const [counterTime, setCounterTime] = useState(0);
  const [endDate, setEndDate] = useState(null);
  const [items, setItem] = useState(null);
  const [rating, setRating] = useState(null);

  const [finalAmount, setFinalAmount] = useState(null);
  const [productData, setProductData] = useState([]);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [reason, setReason] = useState('');

  /*****
   *
   *
   *
   */
  // const getActorProfile = item => {
  //   if (item?.actor_id == undefined) {
  //     setProfileLoading(true);
  //     ApiCall('get', null, API_END_POINTS.API_GET_ACTOR_DETAILS + '' + item?.id)
  //       // console.log('get profile modal body .....>>>>>' + JSON.stringify(body));
  //
  //       .then(response => {
  //         if (response?.data?.data == true) {
  //           setActorData(response?.data?.detail);
  //           setShowFullProfileModal(true);
  //           (async () => {
  //             // let a = await processMediaArray(item?.media);
  //             // setAttachments(a);
  //             // ShowConsoleLogMessage(item?.media);
  //             processMediaArray(response?.data?.detail?.actor_media)
  //               ?.then(response => {
  //                 setAttachments(response);
  //                 setProfileLoading(false);
  //               })
  //               .catch(error => {
  //                 setProfileLoading(false);
  //                 ShowConsoleLogMessage(error);
  //               })
  //               .finally(() => {
  //                 if (profileLoading) {
  //                   setProfileLoading(false);
  //                 }
  //               });
  //           })();
  //         } else {
  //           setActorData(null);
  //         }
  //       })
  //
  //       .catch(err => {
  //         console.log('ERROR in login api => ', err);
  //         ShowToastMessage('Something went wrong');
  //         setProfileLoading(false);
  //       })
  //       .finally(() => {
  //         // setProfileLoading(false);
  //       });
  //   } else {
  //     setProfileLoading(true);
  //     ApiCall(
  //       'get',
  //       null,
  //       API_END_POINTS.API_GET_ACTOR_DETAILS + '' + item?.actor_id,
  //     )
  //       // console.log('get profile modal body .....>>>>>' + JSON.stringify(body));
  //
  //       .then(response => {
  //         if (response?.data?.data == true) {
  //           setActorData(response?.data?.detail);
  //           setShowFullProfileModal(true);
  //           (async () => {
  //             // let a = await processMediaArray(item?.media);
  //             // setAttachments(a);
  //             // ShowConsoleLogMessage(item?.media);
  //             processMediaArray(response?.data?.detail?.actor_media)
  //               ?.then(response => {
  //                 setAttachments(response);
  //                 setProfileLoading(false);
  //               })
  //               .catch(error => {
  //                 setProfileLoading(false);
  //                 ShowConsoleLogMessage(error);
  //               })
  //               .finally(() => {
  //                 if (profileLoading) {
  //                   setProfileLoading(false);
  //                 }
  //               });
  //           })();
  //         } else {
  //           setActorData(null);
  //         }
  //       })
  //
  //       .catch(err => {
  //         console.log('ERROR in login api => ', err);
  //         ShowToastMessage('Something went wrong');
  //         setProfileLoading(false);
  //       })
  //       .finally(() => {
  //         // setProfileLoading(false);
  //       });
  //   }
  // };
  /**
   *
   *
   */

  const showLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  const hideLogoutModal = () => {
    setReason('');
    setLogoutModalVisible(false);
  };
  const handleLogoutConfirm = () => {
    if (validateFieldNotEmpty(reason)) {
      ShowToastMessage('Please enter your query...');
    } else {
      dispatch(showProgressBar(true));
      dispatch(() => {
        createUserProductQuery(
          dispatch,
          navigation,
          userToken,
          items?._id,
          reason,
          successCancelCallback,
          errorCancelCallback,
          BannerErrorCallback,
        );
      });
    }
  };

  const successCancelCallback = async data => {
    dispatch(showProgressBar(false));
    // ShowConsoleLogMessage(JSON.stringify(data));
    ShowToastMessage(data?.message);
    hideLogoutModal();
    dispatch(() => {
      getProductQueryByID(
        dispatch,
        navigation,
        items?._id,
        successQueryCallback,
        errorQueryCallback,
        BannerErrorCallback,
      );
    });
  };

  const errorCancelCallback = async data => {
    dispatch(showProgressBar(false));
    setTimeout(() => {
      ShowToastMessage(data?.message || 'Something went wrong.');
    }, 100);
  };

  const [remainingQuantity, setRemainingQuantity] = useState(0);
  useEffect(() => {
    const {item} = route.params;
    const {endDate} = route.params;
    if (endDate != undefined) {
      const counterTime1 = getDateDiff(endDate);
      setEndDate(endDate);
      setCounterTime(counterTime1);
    }
    dispatch(showProgressBar(true));
    (async () => {
      if (item?.product_id?._id != undefined) {
        let is_product_save = await isProductSavedFavorite(
          item?.product_id?._id,
        );
        setFav(is_product_save);
      } else {
        let is_product_save = await isProductSavedFavorite(
          item?._id || item?.product_id?._id,
        );
        setFav(is_product_save);
      }
    })();

    // ShowConsoleLogMessage(item?._id + ' ---- ' + item?.product_id?._id);
    // ShowConsoleLogMessage(item?.quantity);
    if (item?.product_id?._id != undefined) {
      // ShowConsoleLogMessage('if part');
      dispatch(() => {
        getProductByID(
          dispatch,
          navigation,
          item?.product_id?._id,
          successCallback,
          errorCallback,
          BannerErrorCallback,
        );
      });

      dispatch(() => {
        getProductQueryByID(
          dispatch,
          navigation,
          item?.product_id?._id,
          successQueryCallback,
          errorQueryCallback,
          BannerErrorCallback,
        );
      });
    } else if (item?.listID) {
      // ShowConsoleLogMessage('if part');
      dispatch(() => {
        getProductByID(
          dispatch,
          navigation,
          item?.listID,
          successCallback,
          errorCallback,
          BannerErrorCallback,
        );
      });

      dispatch(() => {
        getProductQueryByID(
          dispatch,
          navigation,
          item?.listID,
          successQueryCallback,
          errorQueryCallback,
          BannerErrorCallback,
        );
      });
    } else {
      // ShowConsoleLogMessage('else part');
      dispatch(() => {
        getProductByID(
          dispatch,
          navigation,
          item?._id,
          successCallback,
          errorCallback,
          BannerErrorCallback,
        );
      });

      dispatch(() => {
        getProductQueryByID(
          dispatch,
          navigation,
          item?._id,
          successQueryCallback,
          errorQueryCallback,
          BannerErrorCallback,
        );
      });
    }

    if (loginCount == 1) {
      getOnline();
    } else {
      getFromLocal();
    }
  }, []);

  const getFromLocal = () => {
    getSavedCartProduct()
      .then(res => {
        if (res?.length > 0) {
          dispatch(updateCartDataLength(res?.length));
        } else {
          dispatch(updateCartDataLength(0));
        }
      })
      .catch(() => {})
      .finally(() => {});
  };

  const getOnline = async () => {
    dispatch(() => {
      getUserCartProduct(
        dispatch,
        navigation,
        userToken,
        data => {
          dispatch(updateCartDataLength(data?.response?.length));
        },
        data => {
          dispatch(updateCartDataLength(0));
        },
        BannerErrorCallback,
      );
    });
  };
  const successCallback = async data => {
    // ShowConsoleLogMessage(
    //   'successCallback called after product data -> ' + JSON.stringify(data),
    // );
    dispatch(showProgressBar(false));
    // item = data?.response;
    setItem(data?.response);
    setRating(data?.ratingData);

    ShowConsoleLogMessage(data?.response?.is_flash_deal);
    if (data?.response?.is_flash_deal == 'Active') {
      const counterTime1 = getDateDiff(data?.response?.flash_enddate);
      setCounterTime(counterTime1);
      setEndDate(counterTime1);

      let sum =
        parseInt(data?.response?.amount) -
        (parseInt(data?.response?.amount) *
          parseInt(data?.response?.flash_offer_percentage)) /
          100;
      setFinalAmount(sum);
    } else {
      let sum = parseInt(data?.response?.amount);
      setFinalAmount(sum);
    }

    setRemainingQuantity(data?.response?.quantity - data?.response?.sold);
  };

  const errorCallback = async data => {
    dispatch(showProgressBar(false));
    setItem(null);

    setTimeout(() => {
      ShowToastMessage(data?.message || 'Something went wrong.');
    }, 100);
  };

  const successQueryCallback = async data => {
    setProductData(data?.data);
    dispatch(showProgressBar(false));
  };

  const errorQueryCallback = async data => {
    dispatch(showProgressBar(false));
    setProductData([]);
  };

  const BannerErrorCallback = error => {
    ShowConsoleLogMessage('Banner call back called');
    dispatch(showProgressBar(false));
    ShowConsoleLogMessage(error);
  };

  const renderItem = ({item}) => {
    // ShowConsoleLogMessage(item);
    return (
      <View
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
          <View style={styles.innnerWrapperOrder}>
            <View style={[GlobalStyle.flexRowAlignCenter, {}]}>
              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.white,
                    fontFamily: FONTS.semi_old,
                  },
                ]}>
                Que:{' '}
                <Text
                  style={[
                    styles.textName,
                    {
                      alignSelf: 'flex-start',
                      fontFamily: FONTS.regular,
                      color: theme?.colors?.white,
                    },
                  ]}>
                  {item?.question}
                </Text>
              </Text>
            </View>

            {item?.reply_status == 'Replied' ? (
              <View
                style={[
                  GlobalStyle.flexRowAlignCenter,
                  {
                    marginTop: 5,
                  },
                ]}>
                <Text
                  style={[
                    styles.textName,
                    {
                      alignSelf: 'flex-start',
                      color: theme?.colors?.white,
                      fontFamily: FONTS.semi_old,
                    },
                  ]}>
                  Ans:{' '}
                  <Text
                    style={[
                      styles.textName,
                      {
                        alignSelf: 'flex-start',
                        fontFamily: FONTS.regular,
                        color: theme?.colors?.white,
                      },
                    ]}>
                    {item?.answer}
                  </Text>
                </Text>
              </View>
            ) : (
              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.white,
                    marginTop: 5,
                    fontFamily: FONTS.semi_old,
                  },
                ]}>
                {item?.reply_status}
              </Text>
            )}

            <View
              style={[
                GlobalStyle.flexRowAlignCenter,
                {
                  marginTop: 5,
                },
              ]}>
              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.white,
                    fontFamily: FONTS.semi_old,
                  },
                ]}>
                Asked by:{' '}
                <Text
                  style={[
                    styles.textName,
                    {
                      alignSelf: 'flex-start',
                      fontFamily: FONTS.regular,
                      color: theme?.colors?.white,
                    },
                  ]}>
                  {item?.customer_id?.name}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const toggleSizeSelection = sizeCode => {
    // if (selectedSizes.includes(sizeCode)) {
    //   setSelectedSizes(selectedSizes.filter(code => code !== sizeCode));
    // } else {
    //   setSelectedSizes([...selectedSizes, sizeCode]);
    // }
    if (sizeCode == selectedSizes) {
      setSelectedSizes([]);
    } else {
      setSelectedSizes(sizeCode);
    }
  };
  const handleColorSelect = color => {
    if (color == selectedColors) {
      setSelectedColors([]);
    } else {
      setSelectedColors(color);
    }
  };

  const [fav, setFav] = useState(false);
  // ShowConsoleLogMessage(route?.params?.item);
  const scrollViewRef = useRef();

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      <ScrollView ref={scrollViewRef}>
        <View
          style={[
            styles.sliderMainContainer,
            {
              backgroundColor: theme?.colors?.colorimageback,
            },
          ]}>
          <SwiperFlatList
            autoplay={true}
            autoplayDelay={3}
            autoplayLoop={true}
            // data={[
            //   route?.params?.item?.image + '',
            // ]}
            data={
              items?.product_images?.length > 0
                ? items?.product_images
                : [items?.thumbnail_image]
            }
            autoplayLoopKeepAnimation={true}
            paginationDefaultColor={'#e4e4e4'}
            paginationActiveColor={COLORS.colorPrimary}
            paginationStyleItemActive={styles.paginationStyleItem}
            paginationStyleItemInactive={styles.paginationStyleItem}
            onMomentumScrollEnd={(index, total, context) => {
              // When the slider changes position, show the arrow button
            }}
            renderItem={({item}) =>
              item != 'null' ? (
                <View>
                  <VegUrbanImageLoader
                    source={
                      items?.product_images?.length > 0
                        ? IMAGE_BASE_URL + item
                        : IMAGE_BASE_URL + items?.thumbnail_image
                    }
                    styles={[styles.sliderImage, {}]}
                  />
                </View>
              ) : null
            }
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            justifyContent: 'space-between',
            // alignItems: 'center',
            flex: 1,
          }}>
          <Text
            style={[
              styles.productNameText,
              {
                alignSelf: 'flex-start',
                color: theme.colors.white,
                fontSize: 30,
                flex: 1,
              },
            ]}>
            {items?.product_name ? items?.product_name : ''}
          </Text>
          <ToolBarIcon
            title={Octicons}
            iconName={fav ? 'heart-fill' : 'heart'}
            icSize={14}
            icColor={fav ? theme?.colors?.hearttext : theme?.colors?.hearttext}
            style={{
              backgroundColor: theme?.colors?.colorPrimary,
              borderRadius: 30,
              width: 25,
              height: 25,
              marginTop: 10,
            }}
            onPress={() => {
              if (loginCount == 1) {
                dispatch(() => {
                  addToFavoriteProduct(
                    dispatch,
                    navigation,
                    userToken,
                    items?._id + '',
                    () => {},
                    () => {},
                    () => {},
                  );
                  if (!fav) {
                    doSaveOfferOfflineRealm(
                      items?._id,
                      items?.thumbnail_image
                        ? IMAGE_BASE_URL + items?.thumbnail_image
                        : '',
                      items?.product_name,
                      items?.amount,
                    );
                  } else {
                    removeFromFavoriteRealm(items?._id);
                  }
                  dispatch(() =>
                    getHomeProduct(
                      dispatch,
                      navigation,
                      () => {},
                      () => {},
                      () => {},
                    ),
                  );
                });
              } else {
                if (!fav) {
                  doSaveOfferOfflineRealm(
                    items?._id,
                    items?.thumbnail_image
                      ? IMAGE_BASE_URL + items?.thumbnail_image
                      : '',

                    items?.product_name,
                    items?.amount,
                  );
                  dispatch(() =>
                    getHomeProduct(
                      dispatch,
                      navigation,
                      () => {},
                      () => {},
                      () => {},
                    ),
                  );
                } else {
                  removeFromFavoriteRealm(items?._id);
                  dispatch(() =>
                    getHomeProduct(
                      dispatch,
                      navigation,
                      () => {},
                      () => {},
                      () => {},
                    ),
                  );
                }
              }
              setFav(!fav);
            }}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginStart: 15,
            marginTop: 5,
          }}>
          <View
            style={{
              backgroundColor: theme?.colors?.colorimageback,
              paddingHorizontal: 10,
              borderRadius: 5,
              padding: 5,
              // marginTop: 5,
            }}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: FONTS?.bold,
                color: theme?.colors?.textColor,
              }}>
              {items?.sold} sold
            </Text>
          </View>
          <AntDesign
            name={'star'}
            size={18}
            color={theme?.colors?.textColor}
            style={{
              marginEnd: 5,
              marginStart: 10,
            }}
          />
          <Text
            style={[
              styles.itemPrice,
              {
                color: theme.colors.textColor,
                marginLeft: 2,
                alignItems: 'center',
                fontFamily: FONTS?.regular,
                // marginBottom: 5
              },
            ]}>
            {/* 0 (0 Reviews) */}
            ({rating?.totalReviews} Reviews)

          </Text>
        </View>
        <View style={styles.divideLine} />
        {endDate != null && counterTime > 0 ? (
          <View
            style={[
              GlobalStyle.flexRowAlignCenter,
              {
                marginVertical: 10,
              },
            ]}>
            <Text
              style={[
                styles.productNameText,
                {
                  alignSelf: 'center',
                  color: theme.colors.white,
                  fontFamily: FONTS.medium,
                  fontSize: 14,
                  marginTop: 0,
                },
              ]}>
              Deal ends in
            </Text>

            <CountDown
              digitStyle={{
                // backgroundColor: theme?.colors?.colorPrimary,
                padding: 1,
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

            <View
              style={{
                paddingEnd: 12,
              }}
            />
            <Text style={[styles.itemOfferPrice, {color: theme.colors.white}]}>
              {/*{STRING.APP_CURRENCY}*/}
              {items?.flash_offer_percentage || items?.flash_offer_percentage}
              {'%'}
              off
            </Text>
          </View>
        ) : null}
        <Text
          style={[
            styles.productNameText,
            {
              alignSelf: 'flex-start',
              color: theme.colors.white,
              // fontWeight:'bold'
              fontSize: 20,
            },
          ]}>
          Description
        </Text>
        <Text
          style={[
            styles.descriptionText,
            {
              alignSelf: 'flex-start',
              color: theme.colors.textColor,
              // fontWeight:'bold'
            },
          ]}>
          {items?.description || '--'}
        </Text>
        <View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
            }}>
            <View
              style={{
                flex: 1,
              }}>
              <Text
                style={[
                  styles.productNameText,
                  {
                    alignSelf: 'flex-start',
                    color: theme.colors.white,
                    fontSize: 20,
                    marginTop: 15,
                    // marginBottom: 10,
                  },
                ]}>
                Size
              </Text>
              <View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={[
                    styles.colorList,
                    {
                      // marginRight: 10
                      paddingBottom: 10,
                    },
                  ]}>
                  {items?.productsize?.length > 0 ? (
                    items?.productsize?.map((size, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.colorItem,
                          {
                            // theme?.colors?.categorycolor
                            // : theme?.colors?.btntextColor,
                            borderWidth: 1,
                            borderColor: theme.colors?.grey,
                            backgroundColor:
                              selectedSizes == size
                                ? theme?.colors?.categorycolor
                                : theme?.colors?.btntextColor,
                          },
                        ]}
                        onPress={() => toggleSizeSelection(size)}>
                        <Text
                          style={[
                            styles.sizeLabel,
                            {
                              color:
                                selectedSizes == size
                                  ? 'white'
                                  : theme?.colors?.white,
                            },
                          ]}>
                          {size}
                        </Text>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text
                      style={[
                        styles.descriptionText,
                        {
                          alignSelf: 'flex-start',
                          color: theme.colors.textColor,
                          // fontWeight:'bold'
                        },
                      ]}>
                      No sizes available
                    </Text>
                  )}
                </ScrollView>
              </View>
            </View>
            <View
              style={{
                width: 0,
                height: 60,
                backgroundColor: theme?.colors?.bg_color_onBoard,
                flex: 0.1,
              }}
            />

            <View
              style={{
                flex: 1,
              }}>
              <Text
                style={[
                  styles.productNameText,
                  {
                    alignSelf: 'flex-start',
                    color: theme.colors.white,
                    fontSize: 20,
                    marginTop: 15,
                    // marginBottom: 10,
                  },
                ]}>
                Colors
              </Text>
              <View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={[
                    styles.colorList,
                    {
                      paddingBottom: 10,
                    },
                  ]}>
                  {items?.productcolor?.length > 0 ? (
                    items?.productcolor?.map((color, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.colorItem,
                          {backgroundColor: color + ''},
                          // selectedColors.includes(color.code) ? styles.selectedColor : null,
                        ]}
                        onPress={() => handleColorSelect(color)}

                        // onPress={() => toggleColorSelection(color.code)}
                      >
                        {selectedColors === color && (
                          <Octicons
                            name="check"
                            size={30}
                            color={theme?.colors?.textColor}
                            style={styles.checkIcon}
                          />
                        )}
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text
                      style={[
                        styles.descriptionText,
                        {
                          alignSelf: 'flex-start',
                          color: theme.colors.textColor,
                          // fontWeight:'bold'
                        },
                      ]}>
                      No colors available
                    </Text>
                  )}
                </ScrollView>
              </View>
            </View>
          </View>

          <View
            style={[
              GlobalStyle.flexRowAlignCenter,
              {
                paddingVertical: 5,
              },
            ]}>
            <Text
              style={[
                styles.productNameText,
                {
                  alignSelf: 'flex-start',
                  color: theme.colors.white,
                  fontSize: 20,
                  marginTop: 15,
                  marginBottom: 10,
                  // fontWeight:'bold'
                },
              ]}>
              {STRING.quantity}
            </Text>

            <View
              style={[
                GlobalStyle.flexRowAlignCenter,
                {
                  // marginHorizontal: 15,
                  alignSelf: 'center',
                  // flex: 1,
                  width: '30%',
                  marginTop: 5,
                  backgroundColor: theme.colors.colorimageback,
                  borderRadius: 20,
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                },
              ]}>
              <AntDesign
                name="minus"
                size={22}
                color={theme?.colors?.textColor}
                onPress={() => {
                  setCount(prev => (prev > 1 ? prev - 1 : prev));
                }}
              />
              <Text
                style={[
                  styles.qtyText,
                  {
                    color: theme.colors.white,
                  },
                ]}>
                {count}
              </Text>
              <AntDesign
                name="plus"
                size={22}
                color={theme?.colors?.textColor}
                onPress={() => {
                  if (items?.quantity - items?.sold > 0) {
                    if (count != items?.quantity - items?.sold) {
                      setCount(prev => prev + 1);
                    } else {
                      ShowToastMessage('Max quantity reached');
                    }
                  } else {
                    ShowToastMessage('Product out of stock');
                  }
                }}
              />
            </View>
          </View>
        </View>
        {items ? (
          <Text
            style={{
              fontSize: 12,
              fontFamily: FONTS?.semi_old,

              color: theme?.colors?.textColor,
              marginStart: 15,
              marginBottom: 15,
              marginTop: 5,
            }}>
            Stock available:{' '}
            {items?.quantity - items?.sold > 0
              ? items?.quantity - items?.sold
              : '0'}
          </Text>
        ) : null}

        <View
          style={{
            backgroundColor: theme?.colors?.colorimageback,
            paddingVertical: 10,
            paddingHorizontal: 15,
            marginBottom: 10,
          }}>
          <View>
            <Text
              style={{
                fontSize: 12,
                fontFamily: FONTS?.semi_old,
                color: theme?.colors?.textColor,
                marginBottom: 10,
              }}>
              Seller Name:
            </Text>

            <Text
              style={{
                fontSize: 12,
                fontFamily: FONTS?.regular,
                color: theme?.colors?.textColor,
                marginBottom: 10,
              }}>
              {items?.userId?.name}
            </Text>
          </View>
          {/*<Text*/}
          {/*  style={{*/}
          {/*    fontSize: 12,*/}
          {/*    fontFamily: FONTS?.semi_old,*/}
          {/*    color: theme?.colors?.textColor,*/}
          {/*  }}>*/}
          {/*  Added by: {items?.addedby?.toLocaleUpperCase()}*/}
          {/*</Text>*/}
        </View>
        {productData?.length == 0 ? null : (
          <View>
            <Text
              style={[
                styles.productNameText,
                {
                  alignSelf: 'flex-start',
                  color: theme.colors.white,
                  // fontWeight:'bold'
                  fontSize: 20,
                },
              ]}>
              Product Queries
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
        )}

        <View style={GlobalStyle.paddingBottom} />
        {/* <View style={styles.divideLine} /> */}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginBottom: 5,
        }}>
        <View style={{}}>
          <Text
            style={[
              // styles.productNameText,
              {
                alignSelf: 'flex-start',
                color: theme.colors.white,
                fontFamily: FONTS?.medium,
                fontSize: 14,
              },
            ]}>
            Total Price
          </Text>
          <View style={[GlobalStyle.flexRowAlignCenter]}>
            <Text
              style={[
                styles.textPrice,
                {
                  alignSelf: 'flex-start',
                  color: theme.colors.white,
                  fontFamily: FONTS?.bold,
                },
              ]}>
              {/*{items?.flash_offer_percentage}*/}
              {STRING?.APP_CURRENCY}
              {items?.is_flash_deal == 'Active'
                ? parseInt(finalAmount) * count
                : items?.amount
                ? parseInt(items?.amount) * count
                : ''}
            </Text>

            {items?.is_flash_deal == 'Active' ? (
              <Text
                style={[
                  styles.textPrice,
                  {
                    alignSelf: 'flex-start',
                    color: theme.colors.white,
                    fontFamily: FONTS?.bold,
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'solid',
                  },
                ]}>
                {' '}
                {STRING?.APP_CURRENCY}
                {parseInt(items?.amount)}{' '}
              </Text>
            ) : null}
          </View>
        </View>
        <VegUrbanCommonBtn
          height={38}
          width={'55%'}
          borderRadius={20}
          textSize={18}
          textColor={theme?.colors?.text}
          text="Add to Cart"
          iconPosition={'left'}
          icon={
            // <MaterialIcons
            //   name={'shopping-cart'}
            //   size={20}
            //   color={theme?.colors?.btnTextColor}
            //   style={{
            //     marginEnd: 20,
            //     // marginStart: 30,
            //   }}
            // />

            <Image
              source={icons.tab_cart}
              style={{
                height: 25,
                tintColor: theme?.colors?.text,
                width: 25,
                marginEnd: 20,
              }}
            />
          }
          backgroundColor={theme.colors.colorPrimary}
          onPress={async () => {
            // navigation.navigate('Carts');
            // ShowConsoleLogMessage(selectedSizes);
            // ShowConsoleLogMessage(items?.quantity - items?.sold != 0);
            // ShowConsoleLogMessage(remainingQuantity + ' --- remainingQuantity');
            // if (count <= remainingQuantity && selectedColors && selectedSizes) {
            //   // Reduce the remaining quantity
            //   setRemainingQuantity(remainingQuantity - count);
            if (items?.quantity - items?.sold > 0) {
              if (items?.quantity - items?.sold != 0) {
                if (selectedSizes?.length == 0) {
                  ShowToastMessage('Please select size');
                } else if (selectedColors?.length == 0) {
                  ShowToastMessage('Please select color');
                } else {
                  if (loginCount == 0) {
                    navigation.navigate('Auth', {screen: 'Login'});

                    // ShowToastMessage('Added to cart');
                    // doSaveProductCart(
                    //   items?._id + '',
                    //   parseInt(items?.amount) + '',
                    //   items?.quantity + '',
                    //   parseInt(items?.amount) * count + '',
                    //   count + '',
                    //   selectedColors,
                    //   selectedSizes,
                    //   items?.sold + '',
                    //   items?.product_name,
                    //   items?.thumbnail_image || '',
                    // );
                    //
                    // getFromLocal();
                  } else {
                    // ShowConsoleLogMessage(finalAmount);
                    if (items?.is_flash_deal == 'Active') {
                      dispatch(() => {
                        addToCartProduct(
                          dispatch,
                          navigation,
                          userToken,
                          items?._id + '',
                          count + '',
                          // parseInt(items?.amount)  + '',
                          parseInt(finalAmount) * count + '',
                          selectedColors,
                          selectedSizes,
                          data => {
                            // ShowConsoleLogMessage(data?.message + '');
                            if (data?.message === 'Add to Cart Successful') {
                              dispatch(
                                updateCartDataLength(cartDataLength + 1),
                              );
                            }
                            ShowToastMessage(
                              data?.message || 'Add to cart successful',
                            );
                          },
                          data => {
                            ShowToastMessage(
                              data?.errors || 'Unable to add to cart',
                            );
                          },
                          BannerErrorCallback,
                        );
                      });
                    } else {
                      dispatch(() => {
                        addToCartProduct(
                          dispatch,
                          navigation,
                          userToken,
                          items?._id + '',
                          count + '',
                          // parseInt(items?.amount)  + '',
                          parseInt(finalAmount) * count + '',

                          selectedColors,
                          selectedSizes,
                          data => {
                            // ShowConsoleLogMessage(data?.message + '');
                            if (data?.message === 'Add to Cart Successful') {
                              dispatch(
                                updateCartDataLength(cartDataLength + 1),
                              );
                            }
                            ShowToastMessage(
                              data?.message || 'Add to cart successful',
                            );
                          },
                          data => {
                            ShowToastMessage(
                              data?.errors || 'Unable to add to cart',
                            );
                          },
                          BannerErrorCallback,
                        );
                      });

                      // await getOnline();
                    }
                  }
                }
              } else {
                ShowToastMessage('Product out of stock');
              }
            } else {
              ShowToastMessage('Product out of stock');
            }
            // } else {
            //   ShowToastMessage('Product out of stock');
            // }
          }}
          style={{}}
          textStyle={{
            fontFamily: FONTS?.bold,
            //  color: theme.colors.btnTextColor,
          }}
        />
      </View>

      <Ionicons
        name="ios-arrow-back"
        color={COLORS.white}
        size={25}
        style={[
          styles.backIcon,
          {
            position: 'absolute',
            top: 15,
            left: 15,
            borderRadius: 25,
            padding: 10,
            backgroundColor: '#80808080',
          },
        ]}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MainContainer', {
            screen: 'Cart',
          });
          // navigation.navigate('Cart');
        }}
        style={[
          styles.backIcon,
          {
            position: 'absolute',
            top: 15,
            right: 15,
            borderRadius: 25,
            padding: 10,
            backgroundColor: '#80808080',
          },
        ]}>
        <Ionicons name="cart" color={COLORS.white} size={25} />
        <Text
          style={{
            color: COLORS.white,

            fontSize: 14,
            fontFamily: FONTS.semi_old,
            position: 'absolute',
            right: 2,
            top: 5,
            backgroundColor: theme.colors.colorPrimary,
            paddingHorizontal: 2,
            borderRadius: 25,
          }}>
          {' '}
          {cartDataLength}{' '}
        </Text>
      </TouchableOpacity>

      {loginCount == 1 ? (
        <TouchableOpacity
          onPress={() => {
            showLogoutModal();
          }}
          style={[
            styles.backIcon,
            {
              position: 'absolute',
              bottom: 60,
              right: 15,
              borderRadius: 25,
              padding: 10,
              backgroundColor: theme.colors.colorPrimary,
            },
          ]}>
          <MaterialIcons name="mode-edit" color={theme.colors.text} size={25} />
        </TouchableOpacity>
      ) : null}

      <View style={{flex: 1}}>
        <ProductQueryAddModal
          visible={isLogoutModalVisible}
          onCancel={hideLogoutModal}
          onConfirm={handleLogoutConfirm}
          email={reason}
          onChange={v => setReason(v)}
        />
      </View>
    </SafeAreaView>
  );
};
export default ProductDetail;
const styles = StyleSheet.create({
  sizeLabel: {
    fontSize: 14,
    fontFamily: FONTS?.medium,
  },
  locationArrow: {
    marginEnd: 10,
    height: 25,
    width: 25,
    backgroundColor: COLORS.colorPrimary,
    borderRadius: 50,
  },
  divideLine: {
    backgroundColor: COLORS.light_gray,
    height: 0.6,
    marginTop: 15,
  },
  qtyText: {
    fontFamily: FONTS?.bold,
    fontSize: 18,
    color: COLORS.black,
    textAlign: 'center',
    // flex: 0.3,
  },
  qText: {
    // fontFamily: 'OpenSans-SemiBold',
    fontFamily: FONTS?.bold,

    fontSize: 18,
    color: COLORS.black,
    marginStart: 15,
    marginEnd: 10,
  },
  endTimeText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 18,
    color: COLORS.colorPrimary,
    marginStart: 15,
    marginEnd: 15,
    marginTop: 15,
  },
  itemOfferPrice: {
    fontSize: 14,
    fontFamily: FONTS?.regular,

    color: COLORS.light_gray,
    // textAlign: 'center',
    // marginTop: 5,
  },
  descriptionText: {
    fontFamily: FONTS?.regular,
    fontSize: 15,
    color: COLORS.black,
    marginStart: 15,
    marginEnd: 10,
    marginTop: 10,
  },
  ratingText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: COLORS.black,
    marginStart: 5,
    marginEnd: 15,
    marginTop: 3,
  },
  weightText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: COLORS.grey,
    marginStart: 15,
    marginEnd: 15,
    marginTop: 3,
  },
  productNameText: {
    // fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    color: COLORS.black,
    marginStart: 15,
    marginEnd: 15,
    marginTop: 10,
    fontFamily: FONTS?.semi_old,
    // fontWeight: 'bold',
  },
  textPrice: {
    // fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    color: COLORS.black,
    // marginStart: 15,
    marginEnd: 15,
    // marginTop: 5,
    fontFamily: FONTS.medium,
    // fontWeight: 'bold',
  },
  originalPriceText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: COLORS.gray,
    marginStart: 5,
    textDecorationColor: COLORS.black,
    alignSelf: 'flex-end',
    marginBottom: 2,
  },
  priceText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 17,
    color: COLORS.colorPrimary,
    marginStart: 15,
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
  sliderMainContainer: {
    height: 300,
    width: SIZES.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderImage: {
    width: SIZES.width,
    // width:'100%',
    // width:270,
    height: 300,
    // width: 300,
    // overflow: 'hidden',
    borderRadius: 5,
  },
  paginationStyleItem: {
    height: 8,
    width: 8,
    borderRadius: 5,
  },
  image: {
    width: SIZES.width - 20,
    marginTop: 3,
    height: 100,
    borderRadius: 3,
    alignSelf: 'center',
  },
  offerText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
    color: COLORS.bitter_sweet,
    backgroundColor: COLORS.pale_pink,
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 5,
    paddingHorizontal: 10,
    // borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  typeImage: {
    position: 'absolute',
    top: 7,
    right: 10,
    height: 22,
    width: 22,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorList: {
    flexDirection: 'row',
    paddingRight: 15,
  },
  colorItem: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  colorLabel: {
    fontSize: 16,
    fontFamily: FONTS?.bold,
    // fontWeight: 'bold',
    color: 'white',
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: 'black',
  },
  checkIcon: {
    // position: 'absolute',
    // top: 5,
    // right: 5,
    alignItems: 'center',
  },
});
